# Salt Calculator

## What you will be doing today

Today you will be working in the Node.js environment and will setup a new project from scratch with `npm` and `git`. At the end of the day you will have a working calculator with a CLI (Command Line Interface) implementation. If you have time, you will also implement a REST API which can handle HTTP requests from a client to perform calculations.

By the end of the day you will be comfortable with:

- Setting up the project for TypeScript development in Node, as we did in the lecture, including types for Node.
- Setting up your own tooling for coding linting from scratch.
- Unit testing a Typescript program/app.
- Understanding how [the stdin and stdout methods from the 'process' module in NodeJS](https://nodejs.org/api/process.html#process_process_stdin) work with the terminal.
- Understanding how to test HTTP calls using the [Rest Client for VScode](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

## Testing and linting setup

### Linting

**NOTE** In this project we are setting up the tooling for code linting ourselves. 

- Run `npm init` to initialize `npm` with a `package.json` file. Answer the prompts appropriately.
- Since we're working with TypeScript, we want to set up ESLint with TypeScript in our project. Go to the [Getting Started instructions](https://typescript-eslint.io/getting-started) and follow the steps (All three steps).
- At this point, you should have a `.eslintrc.js` file created in the root folder having code as follows:
```js
/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
};
```
- Now, make the following adjustments to the `package.json` file:
```json
{
  ...,
  "scripts": {
    "lint": "eslint ./src/**/*.ts", // <-- this
    "test": "echo \"Error: no test specified\" && exit 1"
  },
}
```
- Install the [ESLint VSCode extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- Since we have `['eslint:recommended', 'plugin:@typescript-eslint/recommended'],` in the `.eslintrc.js` file, this won't work well with the VSCode extension and the output of `npm run lint` will be different than what we see in VSCode. For example, run `npm run lint` and you won't see any errors.
- Create a new file inside the `src` folder. Name it `greeter.ts`
- Now open the `src/greeter.ts` and add the following code:
```ts
class Greeter {
  get hello() {

  }
}
```

Now, if you run `npm run lint` you will see all the errors that you also see in VSCode as follows:
```bash
some-path/jsfs-lab-calculator/src/cli.ts
   1:27  error  'process' is not defined  no-undef
  15:1   error  'process' is not defined  no-undef
  17:3   error  'process' is not defined  no-undef

some-path/jsfs-lab-calculator/src/greeter.ts
  1:7  error  'Greeter' is defined but never used           no-unused-vars
  1:7  error  'Greeter' is defined but never used           @typescript-eslint/no-unused-vars
  2:3  error  Expected to return a value in getter 'hello'  getter-return

some-path/jsfs-lab-calculator/src/server.ts
  14:30  error  'console' is not defined  no-undef

```

Awesome. One more thing to fix. Since we're working with nodejs modules, we need to tell eslint that. Update the `.eslintrc.js` as follows:
```ts
/* eslint-env node */
module.exports = {
    env: { // add this block
        node: true
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
};
```

If you run `npm run lint`, you should only see the issue with our code:
```bash
some-path/jsfs-lab-calculator/src/greeter.ts
  1:7  error  'Greeter' is defined but never used           no-unused-vars
  1:7  error  'Greeter' is defined but never used           @typescript-eslint/no-unused-vars
  2:3  error  Expected to return a value in getter 'hello'  getter-return
```

> Note: You may want to install @types/node as well as as ts-node and typescript. You can run the following command for it: `npm i --save-dev @types/node ts-node`

Now update the `greeter.ts` as follows:
```ts
class Greeter {
  get hello() {
    return 'Hello salt!'
  }
}

export default new Greeter();
```

#### Time for discussion

Take some time and discuss in your team about what you just did. Try to decode every part of the `package.json` file that relates to linting, and go through the `.eslintrc.js` file and make sure that it makes sense to everyone in the mob.

### Testing

Set up the project to use the Jest as test runner. 

- Install jest:
```bash
npm i -D ts-jest @types/jest
```

Create Jest config using the following command:
```bash
npx ts-jest config:init
```

Create a new file under the src folder named `greeter.test.ts`:
```ts
import greeter from "./greeter"

describe('Greeter', () => {
  it('should greet', () => {
    expect(greeter.hello).toBe('Hello salt!');
  })
})
```

If you run `npm run lint` now, you will see the following errors:
```
some-path/jsfs-lab-calculator/src/greeter.test.ts
  3:1  error  'describe' is not defined  no-undef
  4:5  error  'it' is not defined        no-undef
  5:9  error  'expect' is not defined    no-undef
```

This is because our ESLint doesn't understand Jest. Update the `.eslintrc.js` file as follows:
```js
/* eslint-env node */
module.exports = {
  env: { // add this block
    node: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
};
```

With the above change, you will not see any lint errors any more. Now modify the `test` script in the `package.json` file as follows:
```
{
  ...
  "scripts": {
    "lint": "eslint ./src/**/*.ts",
    "test": "jest"
  },
  ...
}
```

Now, if you run `npm run test` or `npm t` (shortcut), you will see that the tests pass for `greeter.test.ts` file but fail for the `cli.test.ts`. Yayy! Progress!

#### Running lint before tests

Edit `package.json` so that eslint runs before the test suites. For this, edit the `package.json` and add a new `script` named `pretest` as follows:

```json
{
  ...
  "dependencies": {...}
  "devDependencies": {...},
  "scripts": {
    "lint": "eslint src/**/*.ts",
    "pretest": "npm run lint", <-- this one
    "test": "jest"
  },
  ...
}
```

## Lab instructions

### The calculator

Create a calculator module with an `evaluate` function that _takes a mathematical expression as a string_. For example: `calculator.evaluate('4+5')`. (This expression should return 9) The calculator should handle _addition_, _subtraction_, _multiplication_ and _division_ of integers. It only has to handle simple expressions like `a+b`. It's ok to reject expressions like `a+b-c` or `a+(b+c)`. However, make sure you reject in a graceful manner. _Don't break the program_.

Use _TDD_ to develop the code! Don't forget your test files need to end with `.test.ts` otherwise jest won't be able to find them automatically.

You should **NOT** use the built-in JavaScript `eval` function. As this exercise is more about implementing the function yourselves. And using _TDD_ to do it.

Here are some examples of tests you may want to create:

- should calculate add expressions
- should calculate subtract expressions
- should calculate multiply expressions
- should calculate division expressions
- should throw an exception when the denominator in division is zero
- should throw an exception when expression is not valid (invalid mathematical expression)
- should handle spaces in expression (like any of the following expressions are ok: "a+b", "a + b", "a&nbsp;&nbsp;&nbsp; + b")

### Build a CLI for the calculator

Modify the file `cli.ts` to use the calculator from command line. This code is difficult to test - it's not worth the effort. However, the implementation is fairly minimal, so we will have to make sure that it works by testing it manually by running. 

First, add two scripts in the package.json as follows:

```json
{
  ...,
  "scripts": {
    "lint": "eslint src/**/*.ts",
    "pretest": "npm run lint",
    "test": "jest",
    "cli": "ts-node src/cli.ts"
  },
  ...
}
```

```bash
npm run cli
```

## Build a REST API to the calculator

- Create your backend API in `src/server.ts` file so that your calculator is available through http calls.
- The api should _only_ accept `GET` requests. The expression is passed to the backend as a _query parameter_. (Note that you have to URL-encode the expression!).
- Begin by creating a new script in `package.json` as follows:

```json
{
  "scripts": {
    ...,
    "cli": "ts-node src/cli.ts",
    "start:server": "ts-node src/server.ts" <-- this one
  },
  ...
}

```
- Now start the server by running `npm run start:server` from the project's root folder.

## Testing your API calls

For testing the API calls, we recommend you to use the [Rest Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) for VSCode so you don't have to leave VSCode while working on your app.

Create a new file in the project and name it `calculator.rest`. Add the following code to it:
```http
GET http://localhost:8080 HTTP/1.1
```

Click the `Send Request` button above it and you should see a response as follows:
```
HTTP/1.1 200 OK
Content-Type: text/plain
Date: Mon, 21 Aug 2023 11:32:23 GMT
Connection: close
Transfer-Encoding: chunked

Hello salt!
```

An example request for the calculator may look like this:

```http
GET http://localhost:8080/calculator?q=4%2B5 HTTP/1.1
```
The response should be as follows:

```
HTTP/1.1 200 OK
Date: Tue, 29 May 2018 13:30:17 GMT
Connection: keep-alive
Transfer-Encoding: chunked

{"result":9}
```

- Invalid expressions should return the http code 400 "Bad Request" and an error message. For example:

```
GET http://localhost:8080/calculator?q=foo HTTP/1.1
```

The above should return the following response:
```http
HTTP/1.1 400 Bad Request
Date: Tue, 29 May 2018 13:32:30 GMT
Connection: keep-alive
Transfer-Encoding: chunked

{"error":"Expression is not recognized."}
```

And if there is no expression passed as follows:

```
GET http://localhost:8080/calculator HTTP/1.1
```

The response should be:

```http
HTTP/1.1 400 Bad Request
Date: Tue, 29 May 2018 13:32:52 GMT
Connection: keep-alive
Transfer-Encoding: chunked

{"error":"Could not parse query string."}
```

- Any unexpected error should return http code 500 "Internal Error".

Here are some test that your tests should verify:

- should reject POST request with status 405
- should return 500 on unknown internal error
- should return 400 bad request when the error is defined as Invalid expressions
- should respond to bad requests with error message
- should respond with bad request when query parameters are missing
- should respond to valid requests with 200
- should respond with result in body

## Enhance the calculator

- If the expression only contains one operand, the response sent should be that operand itself.
Example: 

```http
GET http://localhost:8080/calculator?q=42 HTTP/1.1
```
The above returns:
```http
HTTP/1.1 200 OK
Date: Tue, 29 May 2018 13:32:30 GMT
Connection: keep-alive
Transfer-Encoding: chunked

{"result":42}
```

- The calculator should accept floating numbers, e.g. expressions like "4.3-12.8".
- The calculator should accept negative integers too. Example:

```http
GET http://localhost:8080/calculator?q=-6%2B5 HTTP/1.1
```
The above should return with response:

```http
HTTP/1.1 200 OK
Date: Tue, 29 May 2018 13:30:17 GMT
Connection: keep-alive
Transfer-Encoding: chunked

{"result":-1}
```

Here are some examples of tests you may want to create:

- should not accept orphans (x.y.z is considered an orphan)

---

Good luck and have fun!
