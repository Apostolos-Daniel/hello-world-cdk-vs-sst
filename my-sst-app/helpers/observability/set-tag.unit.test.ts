/* eslint-disable @typescript-eslint/no-var-requires */
import tracer, { Scope, Span } from 'dd-trace';
import { setTag } from '.';
import { mock } from 'vitest-mock-extended';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('dd-trace');

beforeEach(() => {
  vi.resetAllMocks();
});

describe('set tag', () => {
  it('sets a tag on the active span', () => {
    const mockScope = mock<Scope>();
    const mockSpan = mock<Span>();

    mockScope.active.mockReturnValue(mockSpan);
    vi.mocked(tracer.scope).mockReturnValue(mockScope);
    setTag('tag-name', 'tag-value');
    expect(mockSpan.setTag).toHaveBeenCalledWith('tag-name', 'tag-value');
  });
})
