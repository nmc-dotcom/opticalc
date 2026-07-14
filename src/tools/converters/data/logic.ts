import { convertUnits } from '../converterEngine';
import { dataConfig } from './config';

export function convertData(value: number, from: string, to: string): number {
  return convertUnits(value, from, to, dataConfig);
}
