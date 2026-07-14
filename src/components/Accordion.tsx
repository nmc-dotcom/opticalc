import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AccordionProps {
  id?: string;
  title: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
  id,
  title,
  icon,
  defaultOpen = true,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      id={id}
      className="border border-[#E2D8C2] rounded-2xl bg-[#FBF8F0] shadow-sm overflow-hidden transition-all duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 bg-[#ECE4D2] hover:bg-[#E2D8C2] transition-colors duration-200 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-xl text-[#2F6B4F]">{icon}</span>}
          <h3 className="text-base font-semibold text-[#2C2A24]">{title}</h3>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-[#2F6B4F]/70 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-6 py-5 border-t border-[#E2D8C2] bg-[#FBF8F0]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
