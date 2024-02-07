import { ApiHandler } from "sst/node/api";
import { datadog } from "datadog-lambda-js";
import tracer from "dd-trace";
tracer.init();

export const handler = datadog(ApiHandler(async (_evt) => {
  const span = tracer?.scope().active();
  if (span) {
    console.log('Setting tag');
    span.setTag('foo', 'bar');
  }
  return {
    statusCode: 200,
    body: `Hello world. The time is ${new Date().toISOString()}`,
  };
}));
 