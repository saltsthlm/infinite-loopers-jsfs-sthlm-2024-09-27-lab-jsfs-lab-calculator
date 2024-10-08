import greeter from "./greeter";

describe("Greeter", () => {
  it("should greet", () => {
    expect(greeter.hello).toBe("Hello salt!");
  });
});
