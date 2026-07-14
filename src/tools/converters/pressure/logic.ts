import { convertUnits } from '../converterEngine';
import { pressureConfig } from './config';

export function convertPressure(value: number, from: string, to: string): number {
  return convertUnits(value, from, to, pressureConfig);
}
