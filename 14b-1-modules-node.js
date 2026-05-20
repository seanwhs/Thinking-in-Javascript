// 14b-1-modules-node.js
let value = 0;

function add(x) {
  value += x;
  return value;
}

module.exports = { add };
