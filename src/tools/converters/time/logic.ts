import { convertUnits } from '../converterEngine';
import { timeConfig } from './config';

export function convertTime(value: number, from: string, to: string): number {
  return convertUnits(value, from, to, timeConfig);
}
