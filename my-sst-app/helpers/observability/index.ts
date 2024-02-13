if (process.env.IS_LOCAL) {
  console.log(`process.env.IS_LOCAL=${process.env.IS_LOCAL}`);
  process.env.LAMBDA_TASK_ROOT = "./my-sst-app";
  console.log(`process.env.LAMBDA_TASK_ROOT=${process.env.LAMBDA_TASK_ROOT}`);
}

import { setTag } from "./set-tag";
import { sendMetric } from "./send-metric";

export { setTag, sendMetric };
