import React from 'react';
import { UniversalConverterComponent } from '../UniversalConverterComponent';
import { speedConfig } from './config';

export const SpeedConverter: React.FC = () => {
  return <UniversalConverterComponent config={speedConfig} />;
};
export default SpeedConverter;
