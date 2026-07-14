import React from 'react';
import { UniversalConverterComponent } from '../UniversalConverterComponent';
import { angleConfig } from './config';

export const AngleConverter: React.FC = () => {
  return <UniversalConverterComponent config={angleConfig} />;
};
export default AngleConverter;
