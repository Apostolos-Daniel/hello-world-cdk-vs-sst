// Import your handler and necessary testing utilities from Vitest
import { describe, it, expect, vi } from 'vitest';
import { handler } from './lambda'; // Adjust the import path as necessary
import { setTag } from '../../../helpers'
import { beforeEach } from 'node:test';

// Mock the external dependencies using Vitest
vi.mock('datadog-lambda-js', () => ({
  datadog: vi.fn().mockImplementation((handler) => handler),
}));

vi.mock('../../../helpers/', () => ({
  setTag: vi.fn(),
}));

beforeEach(() => {
    vi.resetAllMocks();
    vi.resetModules();
});

describe('API Handler Tests', () => {
  it('responds with correct status code and body format', async () => {
    const mockEvent = {};
    const response = await handler(mockEvent);

    
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatch(/Hello world. The time is .*/);

    const { body } = response;
    const regex = /Hello world. The time is (\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+Z)/;
    const matches = body.match(regex);
    expect(matches).not.toBeNull(); // Ensures the date is in the expected format
  });

  it('setTag is called with expected values', async () => {
    // Define a mock event if your function uses event properties
    const mockEvent = {};

    // Invoke the handler
    const response = await handler(mockEvent);

    // Assertions
    expect(setTag).toHaveBeenCalledTimes(2);
    expect(setTag).toHaveBeenCalledWith('foo', 'bar');

  });
});
