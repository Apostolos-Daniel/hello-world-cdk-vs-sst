import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class MyCdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    const helloLambda = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'HelloHandler', {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X, // Execution environment
      entry: 'lambda/hello.ts', // Path to the Lambda code
      functionName: 'hello-world-cdk', // Function name
      tracing: cdk.aws_lambda.Tracing.ACTIVE, // Enable active tracing
  });
  
  // Define an API Gateway REST API resource backed by the "helloLambda".
  const restApi = new cdk.aws_apigateway.LambdaRestApi(this, 'Endpoint', {
      handler: helloLambda,
  });

  }
}
