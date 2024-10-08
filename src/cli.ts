const { stdin, stdout } = process;

const PROMPT = 'Write something 👇';

stdout.write(PROMPT);
stdin.resume()

stdin.setEncoding('utf8');

stdin.on('data', data => {
  stdout.write(`echo ${data}`);
  stdout.write(`\n${PROMPT}`);
});

process.on('SIGINT', () => {
  stdout.write('\n\nBye!\n');
  process.exit();
});
