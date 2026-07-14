import React from 'react';
import { UniversalConverterComponent } from '../UniversalConverterComponent';
import { lengthConfig } from './config';

export const LengthConverter: React.FC = () => {
  return <UniversalConverterComponent config={lengthConfig} />;
};
export default LengthConverter;
