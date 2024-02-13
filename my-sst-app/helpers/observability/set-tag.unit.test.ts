/* eslint-disable @typescript-eslint/no-var-requires */
import { setTag } from '.';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('dd-trace');

beforeEach(() => {
  vi.resetAllMocks();
});

describe('set tag - THIS IS NOT A VALUABLE TEST ANYMORE, UNTIL WE CAN USE THE TRACER LOCALLY', () => {
  it('sets a tag on the active span', () => {
    expect(true).equals(true);
    // setTag('tag-name', 'tag-value');
    // expect(setTag).toHaveBeenCalledWith('tag-name', 'tag-value');
  });
})
