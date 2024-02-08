# Setting a custom tag with `dd-trace` in a Lambda function

I am trying to use the Datadog tracer [`dd-trace`](https://github.com/DataDog/dd-trace-js) for setting a custom tag during a Lambda function handler invocation.

I know there is documentation to automatically instrument each function on the [sst docs](https://docs.sst.dev/advanced/monitoring) and <https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/dd_libraries/nodejs/?tab=locally> but I haven't been able to set a tag successfully yet. 

I get a variety of issues depending on what I try. The default isssue I get is the following.

The  app crashes when I try to import the tracer, with the following error:

```bash
Trace: TypeError [ERR_INVALID_ARG_TYPE]: The "paths[0]" argument must be of type string. Received undefined" 
```

## A bit more detail

We followed this documentation about [configuring dd-trace with Typescript and bundlers](https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#typescript-and-bundlers) almost to the letter. We still get the error when running sst locally.

While debugging the issue we discovered that the "reserved env variable" `LAMBDA_TASK_ROOT` is not set in the Lambda environment, it's `undefined` when the `dd-trace` library tries to access it. In particular, the function [registerLambdaHook](https://github.com/DataDog/dd-trace-js/blob/eae0c8c8871920f2b811950d7154d790ee547d0d/packages/dd-trace/src/lambda/runtime/ritm.js#L86) in [ritm.js](https://github.com/DataDog/dd-trace-js/blob/eae0c8c8871920f2b811950d7154d790ee547d0d/packages/dd-trace/src/lambda/runtime/ritm.js). When trying to [resolve the path](https://github.com/DataDog/dd-trace-js/blob/eae0c8c8871920f2b811950d7154d790ee547d0d/packages/dd-trace/src/lambda/runtime/ritm.js#L94), an exception is thrown because the `LAMBDA_TASK_ROOT` environment variable is `undefined`, which crashes the sst app.

```js
/**
 * Register a hook for the Lambda handler to be executed when
 * the file is required.
 */
const registerLambdaHook = () => {
  const lambdaTaskRoot = process.env.LAMBDA_TASK_ROOT
  const originalLambdaHandler = process.env.DD_LAMBDA_HANDLER

  if (originalLambdaHandler !== undefined) {
    const [moduleRoot, moduleAndHandler] = _extractModuleRootAndHandler(originalLambdaHandler)
    const [_module] = _extractModuleNameAndHandlerPath(moduleAndHandler)

    const lambdaStylePath = path.resolve(lambdaTaskRoot, moduleRoot, _module)
    const lambdaFilePath = _getLambdaFilePath(lambdaStylePath)
```

## Steps to reproduce

1. Install node modules and run `sst dev`:
```bash
npm install
sst dev
```
2. Hit the endpoint with a `GET` request:
```bash
curl -X GET https://<api-id>.execute-api.<region>.amazonaws.com/
```
3. See the app crashing with the error message:
```bash
Trace: TypeError
[ERR_INVALID_ARG_TYPE]: The "paths[0]" argument must be of type string. Received undefined
```





Any ideas?