import { convertUnits } from '../converterEngine';
import { temperatureConfig } from './config';

export function convertTemperature(value: number, from: string, to: string): number {
  return convertUnits(value, from, to, temperatureConfig);
}
