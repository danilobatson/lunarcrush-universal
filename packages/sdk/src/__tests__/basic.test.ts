import { describe, it, expect } from 'vitest';
import LunarCrushClient from '../index';

describe('LunarCrush SDK', () => {
  it('should initialize with default config', () => {
    const client = new LunarCrushClient();
    expect(client).toBeInstanceOf(LunarCrushClient);
  });

  it('should initialize with custom config', () => {
    const client = new LunarCrushClient({
      mode: 'production',
      debug: true,
      returnKeys: ['symbol', 'sentiment']
    });
    expect(client).toBeInstanceOf(LunarCrushClient);
  });

  it('should provide documentation', () => {
    const client = new LunarCrushClient();
    const docs = client.docs();
    expect(docs).toContain('topic:');
    expect(docs).toContain('creator:');
  });

  it('should provide method-specific documentation', () => {
    const client = new LunarCrushClient();
    const topicDocs = client.docs('topic');
    expect(topicDocs).toContain('Get data for any topic');
  });
});
