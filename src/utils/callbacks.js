// Utility for supporting callbacks from promise functions

const callbackMode = 'p5'; // changeable to node

export function callbackFromPromise(target, property, descriptor) {
  const fn = target[property];
  // eslint-disable-next-line no-param-reassign
  descriptor.value = function callbackFromPromiseInternal(...args) {
    const callbacks = [];
    for (let i = args.length - 1; i > 0; i -= 1) {
      if (typeof args[i] === 'function') {
        callbacks.unshift(args.pop());
      }
    }
    if (callbackMode === 'p5') {
      if (callbacks.length > 2) {
        throw new Error('Too many callbacks passed');
      }
      const promise = fn.apply(this, args);
      if (callbacks[0]) {
        promise.then(callbacks[0]);
      }
      if (callbacks[1]) {
        promise.catch(callbacks[1]);
      }
      return promise;
    } else if (callbackMode === 'node') {
      if (callbacks.length > 1) {
        throw new Error('Too many callbacks passed');
      }
      const promise = fn.apply(this, args);
      promise.then(value => callbacks[0](null, value));
      promise.catch(callbacks[0]);
      return promise;
    }
    throw new Error('Invalid callbackMode');
  };
  return descriptor;
}


export default callbackFromPromise;
