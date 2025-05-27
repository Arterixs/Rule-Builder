import { v4 } from 'uuid';
import type { UUID } from 'src/core/types';

export function generateUUID() {
  return v4() as UUID;
}
