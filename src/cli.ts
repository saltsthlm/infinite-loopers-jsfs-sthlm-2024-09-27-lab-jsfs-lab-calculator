import { evaluate } from "./calculator";

const { stdin, stdout } = process;

const PROMPT = "Write something 👇";

stdout.write(PROMPT);
stdin.resume();

stdin.setEncoding("utf8");

stdin.on("data", (data) => {
  const dataString = data.toString();
  const result = evaluate(dataString);
  stdout.write(`Result: ${result}`);
  stdout.write(`\n${PROMPT}`);
});

process.on("SIGINT", () => {
  stdout.write("\n\nBye!\n");
  process.exit();
});
