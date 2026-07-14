import { convertUnits } from '../converterEngine';
import { volumeConfig } from './config';

export function convertVolume(value: number, from: string, to: string): number {
  return convertUnits(value, from, to, volumeConfig);
}
