import React from 'react';
import { UniversalConverterComponent } from '../UniversalConverterComponent';
import { temperatureConfig } from './config';

export const TemperatureConverter: React.FC = () => {
  return <UniversalConverterComponent config={temperatureConfig} />;
};
export default TemperatureConverter;
