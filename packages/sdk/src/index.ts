export { LunarCrushClient } from './client';
export { LunarCrushClient as default } from './client';
export type * from './types';
export const VERSION = '1.0.0';

import { LunarCrushClient } from './client';
import type { LunarCrushConfig } from './types';

export function createClient(config: LunarCrushConfig = {}) {
  return new LunarCrushClient(config);
}
