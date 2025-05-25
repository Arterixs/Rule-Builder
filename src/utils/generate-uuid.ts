import { v4 } from 'uuid';
import type { UUID } from '../types';

export function generateUUID() {
  return v4() as UUID;
}
