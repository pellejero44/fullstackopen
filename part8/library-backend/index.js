const { ApolloServer, gql } = require('apollo-server');

const authors = [
  {
    name: 'Miguel',
    id: '56165415615151121561515615',
    born: 1975,
    bookCount: 2,
  },
  {
    name: 'Miguel 2',
    id: '5616541561510000000615',
    born: 1985,
    bookCount: 3,
  },
  {
    name: 'Miguel 3',
    id: '5616541666666561515615',
    born: 1995,
    bookCount: 1,
  },
];

const books = [
  {
    title: 'Clean Code',
    author: authors[0],
    published: 1975,
    genres: ['sciences'],
    id: '123456451213',
  },
  {
    title: 'Clean Code 2',
    author: authors[0],
    published: 1975,
    genres: ['sciences'],
    id: '123456451210',
  },
  {
    title: 'React 1',
    author: authors[1],
    published: 1985,
    genres: ['sciences'],
    id: '852225532445',
  },
  {
    title: 'React 2',
    author: authors[1],
    published: 1985,
    genres: ['sciences'],
    id: '852225532440',
  },
  {
    title: 'React 3',
    author: authors[1],
    published: 1985,
    genres: ['sciences'],
    id: '852225532441',
  },
  {
    title: 'Angular 1',
    author: authors[2],
    published: 1995,
    genres: ['sciences'],
    id: '852222222445',
  },
];

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
`;

const resolvers = {
  Query: {
    allAuthors: () => authors,
    allBooks: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
