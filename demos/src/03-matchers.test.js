test("test obj", () => {
  const data = { name: "Jesus" };
  expect(data).toEqual({ name: "Jesus" });
});

test("test null", () => {
  const data = null;
  expect(data).toBeNull();
  expect(data).not.toBeUndefined();
});

test("test boolean", () => {
  expect(true).toEqual(true);
  expect(false).toEqual(false);
  expect(0).toBeFalsy();
  expect("").toBeFalsy();
  expect(false).toBeFalsy();
});

test("test string", () => {
  expect("Jesus").toMatch(/esu/);
});

test("test arrays", () => {
  const numbers = [1, 2, 3, 4, 5];
  expect(numbers).toContain(3);
});
