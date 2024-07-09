const Person = require("./05-person");

describe("Test for Person Class", () => {
  let person;

  beforeEach(() => {
    person = new Person("Juan", 45, 1.7);
  });

  test("should return down", () => {
    // Arrange
    person.weight = 45;
    // Act
    const imc = person.calcIMC();
    // Assert
    expect(imc).toBe("down");
  });

  test("should return normal", () => {
    // Arrange
    person.weight = 59;
    // Act
    const imc = person.calcIMC();
    // Assert
    expect(imc).toBe("normal");
  });
});
