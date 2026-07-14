import React from 'react';
import {
  Receipt,
  Percent,
  LineChart,
  PiggyBank,
  Coins,
  Tag,
  Activity,
  Layout,
  CalendarDays,
  UserCheck,
  Ruler,
  Scale,
  Maximize,
  CupSoda,
  Thermometer,
  Zap,
  Clock,
  Database,
  Compass,
  RefreshCw,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Receipt,
  Percent,
  LineChart,
  PiggyBank,
  Coins,
  Tag,
  Activity,
  Layout,
  CalendarDays,
  UserCheck,
  Ruler,
  Scale,
  Maximize,
  CupSoda,
  Thermometer,
  Zap,
  Clock,
  Database,
  Compass,
  RefreshCw,
};

interface IconMapperProps {
  name: string;
  className?: string;
}

export const IconMapper: React.FC<IconMapperProps> = ({ name, className }) => {
  const IconComponent = iconMap[name] || Compass; // 폴백용
  return <IconComponent className={className} />;
};
