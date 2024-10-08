describe("Evaluate", () => {
  it("should add numbers", () => {
    const result = addition(4, 5);
    expect(result).toBe(9);
  });
  it("should subtract numbers", () => {
    const result = subtraction(4, 5);
    expect(result).toBe(-1);
  });
  it("should multiply numbers", () => {
    const result = multiplication(4, 5);
    expect(result).toBe(20);
  });
  it("should divsion numbers", () => {
    const result = divison(4, 2);
    expect(result).toBe(2);
  });
});
