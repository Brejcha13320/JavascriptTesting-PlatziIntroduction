const { faker } = require("@faker-js/faker");

const generateOneBook = () => {
  return {
    _id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
  };
};

const generateManyBooks = (size = 10) => {
  const fakeBooks = [];
  for (let index = 0; index < size; index++) {
    fakeBooks.push(generateOneBook());
  }
  return [...fakeBooks];
};

module.exports = {
  generateOneBook,
  generateManyBooks,
};
