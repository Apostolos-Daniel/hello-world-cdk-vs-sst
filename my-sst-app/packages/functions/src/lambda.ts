//import { setTag } from '../../../helpers/';
import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: `Hello world - I'm an SST App. The time is ${new Date().toISOString()}`,
  };
});
 