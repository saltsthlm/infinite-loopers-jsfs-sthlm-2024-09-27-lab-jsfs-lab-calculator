class Calculator {
  a: number;
  b: number;
  input: string;

  constructor(a: number, b: number, input: string) {
    this.a = a;
    this.b = b;
    this.input = input;
  }

  collectOperator() {
    "placeholder"
  }
  get evaluate() {
    switch (this.operator) {
      case "+":
        return this.addition(this.a, this.b);
      case "-":
        return this.subtraction(this.a, this.b);
      case "*":
        return this.multiplication(this.a, this.b);
      case "/":
        return this.division(this.a, this.b);
      default:
        throw new Error("Faulty input");
    }
  }
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

const calc = new Calculator(4, 5);

console.log(calc.evaluate);

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
}
