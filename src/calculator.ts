import { throwDeprecation } from "process";

function evaluate(inp: string) {
  const collectOperator = inp.match(/[+-/*]/);
  if (!collectOperator || collectOperator.length > 1) {
    throw new Error("Wrong format");
  }

  const operator = collectOperator[0];

  const arr = inp.split("+", 10);
  const a = parseInt(arr[0]);
  const b = parseInt(arr[arr.length - 1]);

  let result = 0;

  switch (operator) {
    case "+":
      result = addition(a, b);
      break;
    case "-":
      result = subtraction(a, b);
      break;
    case "*":
      result = multiplication(a, b);
      break;
    case "/":
      result = division(a, b);
      break;

    default:
      throw new Error("Faulty input");
  }
  return result;
}

function addition(a: number, b: number) {
  return a + b;
}
function subtraction(a: number, b: number) {
  return a - b;
}
function multiplication(a: number, b: number) {
  return a * b;
}
function division(a: number, b: number) {
  return a / b;
}

console.log(evaluate("40+50"));
