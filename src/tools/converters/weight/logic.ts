import { convertUnits } from '../converterEngine';
import { weightConfig } from './config';

export function convertWeight(value: number, from: string, to: string): number {
  return convertUnits(value, from, to, weightConfig);
}
