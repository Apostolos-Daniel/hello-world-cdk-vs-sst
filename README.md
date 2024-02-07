# testing-dd-trace-with-vitest

I am trying to use the Datadog tracer [`dd-trace`](https://github.com/DataDog/dd-trace-js)  for setting a custom tag during a Lambda function handler invocations.

I know there is documentation to automatically instrument each function on the [sst docs](https://docs.sst.dev/advanced/monitoring) and <https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/dd_libraries/nodejs/?tab=locally> but I haven't been able to set a tag successfully yet. 

I get a variety of issues depending on what I try. The default isssue I get is:

The  app crashes with "Trace: TypeError [ERR_INVALID_ARG_TYPE]: The "paths[0]" argument must be of type string. Received undefined" if I even try to import the tracer. 

Any ideas?