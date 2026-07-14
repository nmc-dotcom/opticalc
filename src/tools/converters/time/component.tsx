import React from 'react';
import { UniversalConverterComponent } from '../UniversalConverterComponent';
import { timeConfig } from './config';

export const TimeConverter: React.FC = () => {
  return <UniversalConverterComponent config={timeConfig} />;
};
export default TimeConverter;
