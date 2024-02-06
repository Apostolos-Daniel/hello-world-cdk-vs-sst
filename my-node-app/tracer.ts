// tracer.js
import tracer from 'dd-trace';
tracer.init();

// define setTag function
export const setTag = (tagName: string, tagValue: unknown) => {
    const span = tracer.scope().active();
    
    if (!span) {
      throw new Error('Active span not available');
    }
  span.setTag(tagName, tagValue);
};

export default tracer;
