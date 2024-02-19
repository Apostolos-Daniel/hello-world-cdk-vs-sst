import { it, beforeAll } from 'vitest';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as CdkApp from './MyStack';
import { initProject } from 'sst/project';
import { App, getStack } from 'sst/constructs';

// https://docs.aws.amazon.com/cdk/v2/guide/testing.html
// https://docs.sst.dev/testing#testing-infrastructure

let template: Template;

const beforeAllTimeoutMs = 60000;
beforeAll(async () => {
  await initProject({});
  const app = new App({ mode: 'deploy' });

  // Create the Database stack
  app.stack(CdkApp.API);

  // Wait for resources to finalize
  await app.finish();

  // Get the CloudFormation template of the stack
  const stack = getStack(CdkApp.API);
  template = Template.fromStack(stack);
}, beforeAllTimeoutMs);

it('has an API', () => {
  template.hasResourceProperties('AWS::ApiGatewayV2::Api', {
    Name: Match.stringLikeRegexp('-api$'),
    ProtocolType: 'HTTP',
  });
});