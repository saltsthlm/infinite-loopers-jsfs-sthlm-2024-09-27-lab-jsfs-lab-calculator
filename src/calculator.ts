function evaluate(inp: string) {
  const arr = inp.split("+", 10);
  const a = arr[0];
  const b = arr[arr.length - 1];
  console.log(addition(parseInt(a), parseInt(b)));
  console.log({ a });
  console.log({ b });
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
