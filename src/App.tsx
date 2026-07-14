import React, { useState, useEffect } from 'react';
import { toolRegistry, getToolById } from './tools/registry';
import { IconMapper } from './components/IconMapper';
import { Accordion } from './components/Accordion';
import {
  Search,
  Star,
  Clock,
  ArrowLeft,
  Share2,
  Check,
  Calculator,
  Ruler,
  RefreshCw,
  ExternalLink,
  BookOpen,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // 1. 클라이언트 사이드 가상 라우팅 상태 (Hash 라우터 연동)
  const [currentToolId, setCurrentToolId] = useState<string | null>(null);

  // 2. 검색, 즐겨찾기, 최근 사용 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('calc_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [recentTools, setRecentTools] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('calc_recent');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 3. UI 알림 피드백 (공유 등)
  const [shareFeedback, setShareFeedback] = useState(false);

  // 3-1. 모바일 좌측 도구 메뉴 드로어 상태
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 4. URL Hash 변경 감지하여 라우팅 동기화
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash; // 예: #/tool/calc-vat
      if (hash.startsWith('#/tool/')) {
        const id = hash.replace('#/tool/', '');
        setCurrentToolId(id);
      } else {
        setCurrentToolId(null);
      }
    };

    // 초기 로드 시 감지
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 즐겨찾기 저장
  useEffect(() => {
    localStorage.setItem('calc_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // 최근 사용 목록 저장
  useEffect(() => {
    localStorage.setItem('calc_recent', JSON.stringify(recentTools));
  }, [recentTools]);

  // 드로어 열림 시 배경 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  // 드로어 열림 시 ESC 키로 닫기
  useEffect(() => {
    if (!isDrawerOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  // 도구 선택(이동) 시 핸들러
  const handleNavigateToTool = (id: string) => {
    window.location.hash = `#/tool/${id}`;
    // 최근 사용에 추가 (중복 제거 및 최신 순 정렬, 최대 4개 제한)
    setRecentTools((prev) => {
      const filtered = prev.filter((t) => t !== id);
      return [id, ...filtered].slice(0, 4);
    });
    setIsDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 메인 화면으로 복귀
  const handleBackToHome = () => {
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 즐겨찾기 토글
  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  // 현재 경로 복사 (공유 링크 만들기)
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    } catch (err) {
      console.error('공유 링크 복사 실패:', err);
    }
  };

  // 도구 데이터 필터링 (검색어 기준)
  const filteredTools = toolRegistry.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      item.config.title.toLowerCase().includes(query) ||
      item.config.description.toLowerCase().includes(query) ||
      item.config.subCategory.toLowerCase().includes(query)
    );
  });

  // 카테고리 분류
  const calculatorTools = filteredTools.filter((item) => item.config.category === 'calculator');
  const converterTools = filteredTools.filter((item) => item.config.category === 'converter');
  const currencyTools = filteredTools.filter((item) => item.config.category === 'currency');

  // 활성 도구 객체 찾기
  const activeTool = currentToolId ? getToolById(currentToolId) : null;

  // 좌측 도구 탐색 콘텐츠 (데스크톱 고정 사이드바 / 모바일 드로어 공용)
  const sidebarContent = (
    <>
      {/* 검색 바 */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-bold text-[#2F6B4F] uppercase tracking-widest pl-1">도구 검색</span>
        <div className="relative flex items-center rounded-xl bg-[#F3EEE0] border border-[#E2D8C2] focus-within:border-[#2F6B4F] focus-within:ring-2 focus-within:ring-[#2F6B4F]/10 transition-all duration-200">
          <Search className="absolute left-3 w-4 h-4 text-[#2F6B4F]/60" />
          <input
            type="text"
            placeholder="도구명을 검색하세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-transparent text-sm text-[#2C2A24] placeholder-[#6F695B]/60 outline-none font-medium"
          />
        </div>
      </div>

      {/* 도구 분류 목록 */}
      <div className="flex flex-col gap-5">
        {/* 1. 금융/생활 계산기 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-[#2F6B4F]/70 uppercase tracking-widest pl-1 flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" /> 올인원 계산기
          </span>
          <div className="flex flex-col gap-1">
            {calculatorTools.length > 0 ? (
              calculatorTools.map((item) => {
                const isSelected = currentToolId === item.config.id;
                return (
                  <button
                    key={item.config.id}
                    onClick={() => handleNavigateToTool(item.config.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl border text-left text-xs font-semibold cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#ECE4D2] border-[#2F6B4F] text-[#2C2A24]'
                        : 'bg-transparent border-transparent text-[#2F6B4F]/85 hover:bg-[#ECE4D2] hover:text-[#2C2A24]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <IconMapper name={item.config.icon} className={`w-3.5 h-3.5 ${isSelected ? 'text-[#2C2A24]' : 'text-[#2F6B4F]'}`} />
                      <span className="truncate">{item.config.title}</span>
                    </div>
                  </button>
                );
              })
            ) : (
              <span className="text-[11px] text-[#6F695B] pl-1 py-1">검색 결과 없음</span>
            )}
          </div>
        </div>

        <hr className="border-[#E2D8C2]" />

        {/* 2. 단위 변환기 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-[#2F6B4F]/70 uppercase tracking-widest pl-1 flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5" /> 단위 변환기
          </span>
          <div className="flex flex-col gap-1">
            {converterTools.length > 0 ? (
              converterTools.map((item) => {
                const isSelected = currentToolId === item.config.id;
                return (
                  <button
                    key={item.config.id}
                    onClick={() => handleNavigateToTool(item.config.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl border text-left text-xs font-semibold cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#ECE4D2] border-[#2F6B4F] text-[#2C2A24]'
                        : 'bg-transparent border-transparent text-[#2F6B4F]/85 hover:bg-[#ECE4D2] hover:text-[#2C2A24]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <IconMapper name={item.config.icon} className={`w-3.5 h-3.5 ${isSelected ? 'text-[#2C2A24]' : 'text-[#2F6B4F]'}`} />
                      <span className="truncate">{item.config.title}</span>
                    </div>
                  </button>
                );
              })
            ) : (
              <span className="text-[11px] text-[#6F695B] pl-1 py-1">검색 결과 없음</span>
            )}
          </div>
        </div>

        <hr className="border-[#E2D8C2]" />

        {/* 3. 실시간 환율 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-[#2F6B4F]/70 uppercase tracking-widest pl-1 flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> 실시간 환율
          </span>
          <div className="flex flex-col gap-1">
            {currencyTools.length > 0 ? (
              currencyTools.map((item) => {
                const isSelected = currentToolId === item.config.id;
                return (
                  <button
                    key={item.config.id}
                    onClick={() => handleNavigateToTool(item.config.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl border text-left text-xs font-semibold cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#ECE4D2] border-[#2F6B4F] text-[#2C2A24]'
                        : 'bg-transparent border-transparent text-[#2F6B4F]/85 hover:bg-[#ECE4D2] hover:text-[#2C2A24]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <IconMapper name={item.config.icon} className={`w-3.5 h-3.5 ${isSelected ? 'text-[#2C2A24]' : 'text-[#2F6B4F]'}`} />
                      <span className="truncate">{item.config.title}</span>
                    </div>
                  </button>
                );
              })
            ) : (
              <span className="text-[11px] text-[#6F695B] pl-1 py-1">검색 결과 없음</span>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F3EEE0] text-[#2C2A24] font-sans antialiased selection:bg-[#2F6B4F]/10 selection:text-[#2F6B4F]">
      
      {/* 글로벌 브랜딩 헤더 상단바 */}
      <header className="border-b border-[#E2D8C2] bg-[#F3EEE0]/85 backdrop-blur-md sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="md:hidden p-2 -ml-1.5 mr-0.5 rounded-lg text-[#2F6B4F] hover:bg-[#ECE4D2] transition-colors cursor-pointer"
              aria-label="도구 메뉴 열기"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#2F6B4F] text-white flex items-center justify-center font-serif font-extrabold italic text-lg shadow-sm shadow-[#2F6B4F]/10 group-hover:scale-105 transition-transform">
                O
              </div>
              <div className="flex flex-col text-left">
                <span className="text-base font-serif font-extrabold tracking-tight text-[#2C2A24]">OptiCalc</span>
                <span className="text-[9px] font-bold text-[#2F6B4F]/70 tracking-widest uppercase">by Holorado</span>
              </div>
            </button>
          </div>

          <nav className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider text-[#2F6B4F]/80">
            <a href="https://holorado.me" className="hover:text-[#2C2A24] transition-colors flex items-center gap-0.5">
              홀로라도 홈
            </a>
            <a href="https://pdf.holorado.me" target="_blank" rel="noreferrer" className="hover:text-[#2C2A24] transition-colors flex items-center gap-0.5">
              OptiPDF <ExternalLink className="w-3 h-3 text-[#2F6B4F]" />
            </a>
            <a href="https://img.holorado.me" target="_blank" rel="noreferrer" className="hover:text-[#2C2A24] transition-colors flex items-center gap-0.5">
              OptiImage <ExternalLink className="w-3 h-3 text-[#2F6B4F]" />
            </a>
          </nav>
        </div>
      </header>

      {/* 모바일 전용 도구 메뉴 드로어 (슬라이드 인/아웃 + 배경 오버레이) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              key="drawer-backdrop"
              className="md:hidden fixed inset-0 z-50 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.aside
              key="drawer-panel"
              className="md:hidden fixed inset-y-0 left-0 z-[60] w-80 max-w-[85vw] bg-[#FBF8F0] border-r border-[#E2D8C2] shadow-2xl p-5 flex flex-col gap-5 overflow-y-auto"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#2F6B4F] uppercase tracking-widest pl-1">도구 메뉴</span>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-[#6F695B] hover:bg-[#ECE4D2] hover:text-[#2C2A24] transition-colors cursor-pointer"
                  aria-label="도구 메뉴 닫기"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 메인 콘텐츠 영역 - 2단 사이드바 레이아웃 */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* 1. 좌측 도구 탐색 사이드바 (데스크톱 전용 고정 표시) */}
          <aside className="hidden md:flex md:w-80 md:shrink-0 flex-col gap-5 bg-[#FBF8F0] border border-[#E2D8C2] rounded-3xl p-5 shadow-sm">
            {sidebarContent}
          </aside>

          {/* 2. 우측 메인 대시보드 및 도구 상세 영역 */}
          <div className="flex-1 w-full min-w-0">
            <AnimatePresence mode="wait">
              {!activeTool ? (
                
                /* ==================================================
                   2-A. 홈 웰컴 인트로 대시보드 (아무 도구도 선택되지 않았을 때)
                   ================================================== */
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-8"
                >
                  {/* 히어로 환영 보드 */}
                  <div className="p-8 md:p-10 bg-[#FBF8F0] border border-[#E2D8C2] rounded-3xl flex flex-col gap-4 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#2F6B4F]/5 rounded-bl-full pointer-events-none" />
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold tracking-widest text-[#2F6B4F] uppercase bg-[#2F6B4F]/10 px-2.5 py-1 rounded-full self-start">
                        All-in-One Calc Engine
                      </span>
                      <h1 className="text-3xl md:text-4xl font-serif font-extrabold italic tracking-tight text-[#2C2A24] mt-1">
                        OptiCalc Ecosystem
                      </h1>
                      <p className="text-sm text-[#2C2A24]/80 font-serif leading-relaxed max-w-xl mt-1">
                        생활 속 다양한 계산과 단위 변환을 한 곳에서 빠르고 간결하게.
                        <br />
                        왼쪽 사이드바에서 원하시는 도구를 선택하시면 실시간 계산 화면이 즉각 로드됩니다.
                      </p>
                    </div>
                  </div>

                  {/* 도구 미리보기 카드 리스트 */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xs font-bold text-[#2F6B4F]/80 uppercase tracking-widest pl-1">제공 도구 개요</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 bg-[#FBF8F0] border border-[#E2D8C2] rounded-2xl flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[#2F6B4F] font-bold text-sm">
                          <Calculator className="w-4 h-4" />
                          <span>올인원 생활 금융 계산기</span>
                        </div>
                        <p className="text-xs text-[#2F6B4F]/70 leading-relaxed">
                          부가세, 대출 이자 계산, 복리 적금과 예금 계산 및 일상 속 할인율과 날짜/나이 측정을 즉시 처리합니다.
                        </p>
                      </div>

                      <div className="p-5 bg-[#FBF8F0] border border-[#E2D8C2] rounded-2xl flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[#2F6B4F] font-bold text-sm">
                          <Ruler className="w-4 h-4" />
                          <span>글로벌 표준 단위 변환기</span>
                        </div>
                        <p className="text-xs text-[#2F6B4F]/70 leading-relaxed">
                          길이, 무게, 넓이, 부피뿐만 아니라 데이터 용량, 기압, 속도, 각도 등 정밀한 전천후 변환표를 제공합니다.
                        </p>
                      </div>

                      <div className="p-5 bg-[#FBF8F0] border border-[#E2D8C2] rounded-2xl flex flex-col gap-2 sm:col-span-2">
                        <div className="flex items-center gap-2 text-[#2F6B4F] font-bold text-sm">
                          <RefreshCw className="w-4 h-4" />
                          <span>실시간 시장 환율 변환기</span>
                        </div>
                        <p className="text-xs text-[#2F6B4F]/70 leading-relaxed">
                          주요 글로벌 법정 통화(USD, EUR, JPY 등)의 실시간 정밀 고시 환율을 추적하고 양방향으로 즉각 환산합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                
                /* ==================================================
                   2-B. 개별 계산기 및 도구 상세 렌더링 화면
                   ================================================== */
                <motion.div
                  key={activeTool.config.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-6"
                >
                  {/* 상단 액션 바 */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handleBackToHome}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-[#2F6B4F] hover:text-[#2C2A24] rounded-lg transition-all duration-200 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>소개 화면으로</span>
                    </button>

                    <button
                      onClick={handleCopyLink}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold rounded-xl border transition-all cursor-pointer shadow-xs ${
                        shareFeedback
                          ? 'bg-[#ECE4D2] text-[#2F6B4F] border-[#E2D8C2]'
                          : 'bg-[#FBF8F0] text-[#2F6B4F] border-[#E2D8C2] hover:border-[#2F6B4F]'
                      }`}
                    >
                      {shareFeedback ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                      <span>{shareFeedback ? '공유 링크 복사 완료' : '공유하기'}</span>
                    </button>
                  </div>

                  {/* 도구 소개 타이틀 보드 */}
                  <div className="p-6 rounded-2xl bg-[#FBF8F0] border border-[#E2D8C2] flex items-start gap-4 shadow-xs">
                    <div className="p-3.5 bg-[#ECE4D2] border border-[#E2D8C2] rounded-xl text-[#2F6B4F]">
                      <IconMapper name={activeTool.config.icon} className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col text-left gap-1">
                      <span className="text-[9px] font-bold text-[#2F6B4F] tracking-widest uppercase bg-[#2F6B4F]/10 px-2 py-0.5 rounded self-start">
                        {activeTool.config.subCategory}
                      </span>
                      <h2 className="text-2xl font-serif font-extrabold text-[#2C2A24]">{activeTool.config.title}</h2>
                      <p className="text-xs text-[#2C2A24]/80 font-semibold leading-relaxed">
                        {activeTool.config.description}
                      </p>
                    </div>
                  </div>

                  {/* 실제 계산기 컴포넌트 실장 렌더링 */}
                  <div className="p-6 md:p-8 rounded-3xl bg-[#FBF8F0] border border-[#E2D8C2] shadow-md transition-all duration-300">
                    <activeTool.component />
                  </div>

                  {/* 도움말 & FAQ 콘텐츠 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
                    {/* 사용 예시 보드 */}
                    {activeTool.config.examples && activeTool.config.examples.length > 0 && (
                      <div className="p-6 bg-[#ECE4D2] border border-[#E2D8C2] rounded-2xl flex flex-col gap-4 shadow-xs">
                        <h4 className="text-xs font-bold text-[#2F6B4F]/80 uppercase tracking-widest mb-2 flex items-center gap-1.5 border-b border-[#E2D8C2] pb-2">
                          <BookOpen className="w-4 h-4 text-[#2F6B4F]" />
                          <span>실생활 사용 예시 시뮬레이션</span>
                        </h4>
                        {activeTool.config.examples.map((ex, idx) => (
                          <div key={idx} className="flex flex-col gap-2">
                            <h5 className="text-sm font-bold text-[#2C2A24]">💡 {ex.title}</h5>
                            <div className="p-4 bg-[#FBF8F0] border border-[#E2D8C2] rounded-xl text-xs flex flex-col gap-1.5">
                              <p className="font-semibold text-[#2C2A24]/70">
                                <span className="text-[#2F6B4F] font-bold mr-1">상황:</span>
                                {ex.scenario}
                              </p>
                              <p className="font-bold text-[#2F6B4F]">
                                <span className="text-[#2F6B4F]/75 font-bold mr-1">결과:</span>
                                {ex.result}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* FAQ 상세 도움말 */}
                    {activeTool.config.faq && activeTool.config.faq.length > 0 && (
                      <div className="p-6 bg-[#ECE4D2] border border-[#E2D8C2] rounded-2xl flex flex-col gap-4 shadow-xs">
                        <h4 className="text-xs font-bold text-[#2F6B4F]/80 uppercase tracking-widest mb-2 flex items-center gap-1.5 border-b border-[#E2D8C2] pb-2">
                          <HelpCircle className="w-4 h-4 text-[#2F6B4F]" />
                          <span>자주 묻는 질문 (FAQ)</span>
                        </h4>
                        <div className="flex flex-col gap-4 divide-y divide-[#E2D8C2]">
                          {activeTool.config.faq.map((item, idx) => (
                            <div key={idx} className={`flex flex-col gap-1.5 ${idx > 0 ? 'pt-3' : ''}`}>
                              <h5 className="text-xs font-bold text-[#2C2A24]">Q. {item.question}</h5>
                              <p className="text-xs font-semibold text-[#2C2A24]/80 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>

      {/* 푸터 영역 */}
      <footer className="border-t border-[#E2D8C2] bg-[#F3EEE0] mt-20 py-10 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-3 text-xs text-[#2F6B4F]/70 font-semibold">
          <div className="flex items-center gap-2">
            <span className="text-[#2F6B4F] font-extrabold font-serif italic text-sm">OptiCalc</span>
            <span>|</span>
            <span>생활 속 다양한 계산과 단위 변환을 한 곳에서</span>
          </div>
          <p>© 2026 Holorado Tools Ecosystem. All Rights Reserved.</p>
          <div className="flex gap-4 mt-1">
            <a href="https://holorado.me" className="hover:text-[#2F6B4F] transition-colors">홀로라도</a>
            <span>•</span>
            <a href="https://pdf.holorado.me" target="_blank" rel="noreferrer" className="hover:text-[#2F6B4F] transition-colors">OptiPDF</a>
            <span>•</span>
            <a href="https://img.holorado.me" target="_blank" rel="noreferrer" className="hover:text-[#2F6B4F] transition-colors">OptiImage</a>
            <span>•</span>
            <a href="https://holorado.me/privacy" target="_blank" rel="noreferrer" className="hover:text-[#2F6B4F] transition-colors">개인정보처리방침</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
