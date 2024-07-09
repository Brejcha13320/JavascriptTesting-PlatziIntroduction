const BooksService = require("./books.service");
const { generateOneBook, generateManyBooks } = require("./../fakes/book.fake");

const mockGetAll = jest.fn();
jest.mock("../lib/mongo.lib.js", () =>
  jest.fn().mockImplementation(() => {
    return {
      getAll: mockGetAll,
      create: () => {},
    };
  })
);

describe("Test for BooksService", () => {
  let service;
  beforeEach(() => {
    service = new BooksService();
    jest.clearAllMocks();
  });

  //Nico with mockImplementation
  describe("Test for BooksService [Nico - mockImplementation]", () => {
    describe("test for getBooks with mockImplementation in MongoLib", () => {
      test("should return a list book", async () => {
        // Arranger
        let fakeBooks = generateManyBooks();
        mockGetAll.mockResolvedValue(fakeBooks);
        // Act
        const books = await service.getBooks({});
        // Assert
        expect(books.length).toEqual(fakeBooks.length);
        expect(mockGetAll).toHaveBeenCalled();
        expect(mockGetAll).toHaveBeenCalledWith("books", {});
      });
      test("should return a list of 20 book", async () => {
        // Arranger
        let fakeBooks = generateManyBooks(20);
        mockGetAll.mockResolvedValue(fakeBooks);
        // Act
        const books = await service.getBooks({});
        // Assert
        expect(books.length).toEqual(fakeBooks.length);
        expect(mockGetAll).toHaveBeenCalled();
        expect(mockGetAll).toHaveBeenCalledWith("books", {});
      });
      test("should do match with name of first element", async () => {
        // Arranger
        let fakeBook = [generateOneBook()];
        mockGetAll.mockResolvedValue(fakeBook);
        // Act
        const books = await service.getBooks();
        console.log(books);
        // Assert
        expect(books.length).toEqual(1);
        expect(books[0].name).toEqual(fakeBook[0].name);
      });
    });
  });

  //Owner with spyOn
  describe("Test for BooksService [Owner - spyOn]", () => {
    describe("test for getBooks with spyOn in BooksService", () => {
      test("should return a list book", async () => {
        //Arranger
        let fakeBooks = generateManyBooks();
        const spyGetAll = jest.spyOn(service, "getBooks");
        spyGetAll.mockResolvedValue(fakeBooks);
        //Act
        const books = await service.getBooks({});
        //Assert
        expect(books.length).toEqual(fakeBooks.length);
        expect(spyGetAll).toHaveBeenCalled();
        expect(spyGetAll).toHaveBeenCalledWith({});
      });
      test("should return a list of 20 books", async () => {
        //Arranger
        let fakeBooks = generateManyBooks(20);
        const spyGetAll = jest.spyOn(service, "getBooks");
        spyGetAll.mockResolvedValue(fakeBooks);
        //Act
        const books = await service.getBooks({});
        //Assert
        expect(books.length).toEqual(fakeBooks.length);
        expect(spyGetAll).toHaveBeenCalled();
        expect(spyGetAll).toHaveBeenCalledWith({});
      });
      test("should do match with name of first element", async () => {
        //Arranger
        let fakeBook = [generateOneBook()];
        const spyGetAll = jest.spyOn(service, "getBooks");
        spyGetAll.mockResolvedValue(fakeBook);
        //Act
        const books = await service.getBooks({});
        //Assert
        expect(books.length).toEqual(1);
        expect(books[0].name).toEqual(fakeBook[0].name);
      });
    });
  });
});
