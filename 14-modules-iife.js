const CounterModule = (function () {
  let count = 0; // private

  function increment() {
    count++;
  }

  function getCount() {
    return count;
  }

  return {
    increment,
    getCount,
  };
})();

CounterModule.increment();
console.log(CounterModule.getCount()); // 1
