import { StackContext, Api, EventBus, Function } from "sst/constructs";

export function API({ stack }: StackContext) {
  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10,
    },
  });

  const fn = new Function(stack, "MyFunction", {
    handler: "packages/functions/src/lambda.handler",
    functionName: "hello-world-sst",
    // currentVersionOptions: {
    //   provisionedConcurrentExecutions: 1,
    // },
    environment: {
      DD_VERSION: "1.0.0",
    },
  });
  const version = fn.currentVersion;


  const api = new Api(stack, "api", {
    routes: {
      "GET /": {
        function: fn,
      },
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
