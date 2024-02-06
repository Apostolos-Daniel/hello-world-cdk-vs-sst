// sum.test.js
import tracer, { setTag } from './tracer';
import { Scope, Span } from 'dd-trace';
import { mock } from 'vitest-mock-extended';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import http from 'http';

vi.mock('dd-trace');

it('return true', () => {
  expect(true).toBe(true)
})

it('sets a tag on the active span', () => {
  const mockScope = mock<Scope>();
  const mockSpan = mock<Span>();

  mockScope.active.mockReturnValue(mockSpan);
  vi.mocked(tracer.scope).mockReturnValue(mockScope);

  // Use setTag on the span directly
  setTag("toli", "tag-value");
  expect(mockSpan.setTag).toHaveBeenCalledWith('toli', 'tag-value');
});

it('call api endpoints', async () => {
  const mockScope = mock<Scope>();
  const mockSpan = mock<Span>();

  mockScope.active.mockReturnValue(mockSpan);
  vi.mocked(tracer.scope).mockReturnValue(mockScope);

  // call the API
  http.get({
    hostname: 'localhost',
    port: 3000,
    path: '/',
    agent: false,  // Create a new agent just for this one request
  }, async (res) => {
    // Do stuff with response
    const { statusCode } = res;
    console.log(res);
  await expect(res).toBe('toli')
  });

  // 
  setTag("toli", "tag-value");
  expect(mockSpan.setTag).toHaveBeenCalledWith('toli', 'tag-value');
});