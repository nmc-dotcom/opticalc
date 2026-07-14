import { convertUnits } from '../converterEngine';
import { areaConvConfig } from './config';

export function convertArea(value: number, from: string, to: string): number {
  return convertUnits(value, from, to, areaConvConfig);
}
