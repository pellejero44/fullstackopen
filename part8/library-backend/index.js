require('./mongo');
const { ApolloServer, gql, UserInputError } = require('apollo-server');
const { v1: uuid } = require('uuid');
const Book = require('./models/book');
const Author = require('./models/author');

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String]!
    id: ID!
  }

  type Query {
    allAuthors: [Author!]!
    allBooks: [Book!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    allAuthors: async (root, args) => {
      return await Author.find({});
    },
    allBooks: async (root, args) => {
      return await Book.find({}).populate('author');
    },
  },
  Author: {
    bookCount: (root) => Book.collection.countDocuments(),
  },
  Mutation: {
    addBook: async (root, args) => {
      const bookExists = await Book.findOne({ title: args.title });
      if (bookExists) {
        throw new UserInputError('title must be unique', {
          invalidArgs: args.title,
        });
      }

      const authorExists = await Author.findOne({ name: args.author });
      if (!authorExists) {
        const author = new Author({ name: args.author });

        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      const foundAuthor = await Author.findOne({ name: args.author });
      const book = new Book({ ...args, author: foundAuthor });

      try {
        const response = await book.save();
        return response;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: (root, args) => {
      const authorIndex = authors.findIndex((a) => a.name === args.name);
      if (authorIndex === -1) return null;

      const author = authors[authorIndex];
      const updateAuthor = { ...author, born: args.setBornTo };
      authors[authorIndex] = updateAuthor;
      return updateAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
