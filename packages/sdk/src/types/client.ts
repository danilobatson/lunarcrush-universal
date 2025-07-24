export interface LunarCrushConfig {
  baseUrl?: string;
  timeout?: number;
}

export class LunarCrushAPIError extends Error {
  public readonly code: number;
  
  constructor(code: number, message: string) {
    super(message);
    this.name = 'LunarCrushAPIError';
    this.code = code;
  }
}
