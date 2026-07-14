import React from 'react';
import { UniversalConverterComponent } from '../UniversalConverterComponent';
import { pressureConfig } from './config';

export const PressureConverter: React.FC = () => {
  return <UniversalConverterComponent config={pressureConfig} />;
};
export default PressureConverter;
