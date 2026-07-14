import React from 'react';
import { UniversalConverterComponent } from '../UniversalConverterComponent';
import { areaConvConfig } from './config';

export const AreaConverter: React.FC = () => {
  return <UniversalConverterComponent config={areaConvConfig} />;
};
export default AreaConverter;
