import React from 'react';
import { UniversalConverterComponent } from '../UniversalConverterComponent';
import { weightConfig } from './config';

export const WeightConverter: React.FC = () => {
  return <UniversalConverterComponent config={weightConfig} />;
};
export default WeightConverter;
