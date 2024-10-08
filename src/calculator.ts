import { throwDeprecation } from "process";

function evaluate(inp: string) {
  const arr = inp.split("+", 10);
  const a = arr[0];
  const b = arr[arr.length - 1];

  let result = 0;

  switch (operator) {
    case "+":
      result = addition(a,b);
      break;
    case "-":
      result = subtraction(a,b);
      break;
    case "*":
      result = multiplication(a,b);
      break;
    case "/":
      result = division(a,b);
      break;

    default:
      throw new Error ("Faulty input");
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

evaluate("40+50");
