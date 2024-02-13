import { setTag } from '../../../helpers/';
import { ApiHandler } from "sst/node/api";
import { datadog } from "datadog-lambda-js";

export const handler = datadog(ApiHandler(async (_evt) => {
  setTag('foo', 'bar');
  return {
    statusCode: 200,
    body: `Hello world. The time is ${new Date().toISOString()}`,
  };
}));
 