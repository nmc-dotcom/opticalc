import React from 'react';
import { UniversalConverterComponent } from '../UniversalConverterComponent';
import { dataConfig } from './config';

export const DataConverter: React.FC = () => {
  return <UniversalConverterComponent config={dataConfig} />;
};
export default DataConverter;
