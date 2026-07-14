import { convertUnits } from '../converterEngine';
import { angleConfig } from './config';

export function convertAngle(value: number, from: string, to: string): number {
  return convertUnits(value, from, to, angleConfig);
}
