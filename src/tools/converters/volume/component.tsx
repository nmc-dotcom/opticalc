import React from 'react';
import { UniversalConverterComponent } from '../UniversalConverterComponent';
import { volumeConfig } from './config';

export const VolumeConverter: React.FC = () => {
  return <UniversalConverterComponent config={volumeConfig} />;
};
export default VolumeConverter;
