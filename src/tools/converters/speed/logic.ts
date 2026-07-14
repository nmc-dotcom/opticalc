import { convertUnits } from '../converterEngine';
import { speedConfig } from './config';

export function convertSpeed(value: number, from: string, to: string): number {
  return convertUnits(value, from, to, speedConfig);
}
