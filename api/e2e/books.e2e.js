const request = require("supertest");
const { MongoClient } = require("mongodb");
const createApp = require("../src/app");
const { config } = require("../src/config");
const { generateManyBooks } = require("../src/fakes/book.fake");

const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;

//Integration Test
describe("Test for books endpoint", () => {
  let app = null;
  let server = null;
  let database = null;
  beforeAll(async () => {
    jest.setTimeout(10000);
    app = createApp();
    server = app.listen(3001);
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    database = client.db(DB_NAME);
  });

  afterAll(async () => {
    await server.close();
    await database.dropDatabase();
  });

  describe("test for [GET] /api/v1/books", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("should return a list of books", async () => {
      const fakeBooks = generateManyBooks(2);
      const seedData = await database.collection("books").insertMany(fakeBooks);
      return request(app)
        .get("/api/v1/books")
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toEqual(seedData.insertedCount);
        });
    });
  });
});
