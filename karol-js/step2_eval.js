const replEnv = {
  '+': (a, b) => a+b,
  '-': (a, b) => a-b,
  '*': (a, b) => a*b,
  '/': (a, b) => Math.floor(a/b),
};

const readline = require('../js/node_readline');
const {readStr} = require('./reader');
const {prStr} = require('./printer');

const read = input => readStr(input);
const lispEval = (input) => {
  if (!Array.isArray(input)) {
    return evalAst(input, replEnv);
  } else {
    if (input.length === 0) {
      return input;
    }
    const list = evalAst(input, replEnv);
    return list[0].apply(list[0], list.slice(1));
  }
  return null;
};
const print = input => prStr(input);
const rep = (input, replEnv) => print(
    lispEval(
      read(input)
    )
  );

const evalAst = (ast, replEnv) => {
  if (ast && ast.type === 'symbol') {
    const fn = replEnv[ast.value];
    if (!fn) {
      throw new Error(`'${ast.value}' not found.`);
    }
    return fn;
  }
  if (Array.isArray(ast)) {
    return ast.map(lispEval);
  }
  return ast.value;
};

while (true) {
  try {
    const input = readline.readline('user> ');
    if (!input || input.length === 0) {
      break;
    }
    console.log(rep(input, replEnv));
  } catch(e) {
    console.log(e.message);
  }
}
