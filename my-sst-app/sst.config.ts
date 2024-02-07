import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";
import { Stack } from "sst/constructs";
import { Datadog } from "datadog-cdk-constructs-v2";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

export default {
  config(_input) {
    return {
      name: "my-sst-app",
      region: "us-east-1",
    };
  },
  async stacks(app) {
    const datadogApiKeySecretArn =
      "arn:aws:secretsmanager:us-east-1:643476110649:secret:DdApiKeySecret-XiVnMDcSAlrU-GhvrL0";
      // Allow functions to access secret
      app.addDefaultFunctionPermissions([
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: [datadogApiKeySecretArn],
          actions: ["secretsmanager:GetSecretValue"],
        }),
      ]);
      // Exclude from the function bundle
      // since they'll be loaded from the Layer
      app.setDefaultFunctionProps({
        nodejs: {
          install: ["datadog-lambda-js"],
        },
      });
    app.stack(API);

    await app.finish();

      // Attach the Datadog contruct to each stack
      app.node.children.forEach((stack) => {
        if (stack instanceof Stack) {
          const datadog = new Datadog(stack, "datadog", {
            // Get the latest version from
            // https://github.com/Datadog/datadog-lambda-js/releases
            nodeLayerVersion: 105,
            // Get the latest version from
            // https://github.com/Datadog/datadog-lambda-extension/releases
            extensionLayerVersion: 53,
            site: "datadoghq.eu",
            apiKeySecretArn: datadogApiKeySecretArn,
            env: app.stage,
            service: app.name,
            // Just a recommendation, feel free to change the version per your CI/CD
            version:
              process.env.SEED_BUILD_SERVICE_SHA ||
              process.env.GITHUB_SHA ||
              undefined,
          });

          datadog.addLambdaFunctions(stack.getAllFunctions());
        }
      });
  }
} satisfies SSTConfig;
