class Calculator {
  addition(a: number, b: number) {
    return a + b;
  }
  subtraction(a: number, b: number) {
    return a - b;
  }
  multiplication(a: number, b: number) {
    return a * b;
  }
  division(a: number, b: number) {
    if (b !== 0) {
      return a / b;
    }
    return "cant divide by zero";
  }
}

export function evaluate(inp: string) {
  const collectOperator = inp.match(/[+\-/*]/g);
  if (!collectOperator || collectOperator.length > 1) {
    return "Invalid operator";
  }

  const operator = collectOperator[0];

  const arr = inp.split(operator, 10);
  const a = parseInt(arr[0]);
  const b = parseInt(arr[arr.length - 1]);

  let result;

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
  return `result: ${result}`;
}
