
import tracer from 'dd-trace';
if (process.env.IS_LOCAL) {
  console.log(`process.env.IS_LOCAL=${process.env.IS_LOCAL}`);
  process.env.LAMBDA_TASK_ROOT = "./my-sst-app";
  console.log(`process.env.LAMBDA_TASK_ROOT=${process.env.LAMBDA_TASK_ROOT}`);
} else {
  console.log(`not local`);
  tracer.init();
}


export const setTag = (tagName: string, tagValue: unknown) => {
  // const span = tracer.scope().active();

  // if (!span) {
  //   throw new Error('Active span not available');
  // }

  // span.setTag(tagName, tagValue);
};
