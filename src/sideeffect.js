// TODO もっといい感じに抽象化できるのでは
export const createSideEffect = (sideEffect) => (actions) =>
  new Proxy(actions, {
    get(target, propertyName /*, receiver*/) {
      const effect = sideEffect(target);
      if (propertyName in effect) {
        return (...args) => effect[propertyName](...args);
      } else {
        return target[propertyName];
      }
    },
  });
