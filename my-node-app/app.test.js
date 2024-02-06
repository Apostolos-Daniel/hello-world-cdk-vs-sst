// sum.test.js
import { expect, test } from 'vitest'
import tracer, { Scope, Span } from 'dd-trace';
import { mock } from 'vitest-mock-extended';
import { vi, describe, it, expect, beforeEach } from 'vitest';

it('return true', () => {
  expect(true).toBe(true)
})