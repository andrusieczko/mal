const readline = require('../js/node_readline');
const {readStr} = require('./reader');
const {prStr} = require('./printer');

const read = input => readStr(input);
const lispEval = input => input;
const print = input => prStr(input);
const rep = input => print(
    lispEval(
      read(input)
    )
  );

while (true) {
  const input = readline.readline('user> ');
  if (!input || input.length === 0) {
    break;
  }
  console.log(rep(input));
}
