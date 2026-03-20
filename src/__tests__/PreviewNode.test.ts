/**
 * Basic tests for PreviewNode.execute()
 * Tests the passthrough behavior and node descriptor fields.
 */

import { PreviewNode } from '../nodes/PreviewNode/PreviewNode.node';

// Minimal mock for IExecuteFunctions
function makeMockContext(params: Record<string, unknown>): ReturnType<typeof jest.fn> & { getInputData: jest.Mock; getNodeParameter: jest.Mock } {
  const items = [{ json: { test: 'data' } }];
  return {
    getInputData: jest.fn(() => items),
    getNodeParameter: jest.fn((name: string) => params[name]),
  } as unknown as ReturnType<typeof jest.fn> & { getInputData: jest.Mock; getNodeParameter: jest.Mock };
}

describe('PreviewNode', () => {
  let node: PreviewNode;

  beforeEach(() => {
    node = new PreviewNode();
  });

  describe('description', () => {
    it('has correct node type name', () => {
      expect(node.description.name).toBe('previewNode');
    });

    it('has n8n-nodes-preview package prefix in displayName context', () => {
      expect(node.description.displayName).toBe('Preview');
    });

    it('has orange default color', () => {
      expect(node.description.defaults?.color).toBe('#ff9800');
    });

    it('has inputs and outputs', () => {
      expect(node.description.inputs).toHaveLength(1);
      expect(node.description.outputs).toHaveLength(1);
    });

    it('has all required properties', () => {
      const propNames = node.description.properties.map(p => p.name);
      expect(propNames).toContain('label');
      expect(propNames).toContain('previewSize');
      expect(propNames).toContain('itemIndex');
      expect(propNames).toContain('passThrough');
      expect(propNames).toContain('maxItems');
      expect(propNames).toContain('showFilename');
      expect(propNames).toContain('autoExpand');
    });
  });

  describe('execute()', () => {
    it('passes through items when passThrough=true', async () => {
      const ctx = makeMockContext({ passThrough: true });
      const result = await node.execute.call(ctx as never);
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0]).toEqual({ json: { test: 'data' } });
    });

    it('returns empty array when passThrough=false', async () => {
      const ctx = makeMockContext({ passThrough: false });
      const result = await node.execute.call(ctx as never);
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveLength(0);
    });
  });
});
