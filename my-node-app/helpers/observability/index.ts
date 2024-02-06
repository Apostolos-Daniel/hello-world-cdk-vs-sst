import { tracer } from 'dd-trace';
tracer.init();

import { setTag } from './set-tag';

export { setTag };
