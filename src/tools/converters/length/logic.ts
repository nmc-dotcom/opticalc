import { convertUnits } from '../converterEngine';
import { lengthConfig } from './config';

export function convertLength(value: number, from: string, to: string): number {
  return convertUnits(value, from, to, lengthConfig);
}
