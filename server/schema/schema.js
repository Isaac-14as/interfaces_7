const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;


const Books = require('../models/book');
const Authors = require('../models/author');


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        date_of_birth: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Books.find({ authorId: parent.id});
            },
        },
    }),
});




const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: { 
            type: AuthorType,
            resolve(parent, args) {
                return Authors.findById(parent.authorId);
            }
        },
    }),
});





const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: GraphQLString },
				date_of_birth: { type: GraphQLString },
			},
			resolve(parent, args) {
				const author = new Authors({
					name: args.name,
					date_of_birth: args.date_of_birth,
				});
				return author.save();
			},
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: GraphQLString },
				genre: { type: GraphQLString },
				authorId: { type: GraphQLID },
			},
			resolve(parent, args) {
				const book = new Books({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId,
				});
				return book.save();
			},
		},


        deleteAuthor: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Authors.findByIdAndRemove(args.id);
			}
		},
		deleteBook: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Books.findByIdAndRemove(args.id);
			}
		},
		updateAuthor: {
			type: AuthorType,
			args: {
				id: { type: GraphQLID },
				name: { type: new GraphQLNonNull(GraphQLString) },
				date_of_birth: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				return Authors.findByIdAndUpdate(
					args.id,
					{ $set: { name: args.name, date_of_birth: args.date_of_birth } },
					{ new: true },
				);
			},
		},
		updateBook: {
			type: BookType,
			args: {
				id: { type: GraphQLID },
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: GraphQLID },
			},
			resolve(parent, args) {
				return Books.findByIdAndUpdate(
					args.id,
					{ $set: { name: args.name, genre: args.genre, authorId: args.authorId } },
					{ new: true },
				);
			},
		},


	}
});










const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Books.findById(args.id);
        },
    },
    author: {
        type: AuthorType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return Authors.findById(args.id)
        },
    },
    books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
            return Books.find({});
        }
    },
    authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent, args) {
            return Authors.find({});
        }
    },

 }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});














// const books = [
//     {name: '1984', genre: 'роман', authorId: '1'},
//     {name: 'Преступление и наказание', genre: 'роман', authorId: '2'},
//     {name: 'Мёртвые души', genre: 'роман', authorId: '3'},
//     {name: 'Горе от ума', genre: 'комедия', authorId: '4'},
//     {name: 'Ревизор', genre: 'комедия', authorId: '3'},
//     {name: 'Игроки', genre: 'комедия', authorId: '3'},
//     {name: 'Глотнуть воздуха', genre: 'сатира', authorId: '1'},

//     {name: 'Бедные люди', genre: 'роман', authorId: '2'},
//     {name: 'Игрок', genre: 'роман', authorId: '2'},

//     { name: 'Двойник', genre: 'повесть', authorId: '2'},
// ];





// const authors = [
//     {name: 'Джордж Оруэлл', date_of_birth: '25.06.1903'}, 638dc0549a2a11728e880cd6 1
//     {name: 'Фёдор Достоевский', date_of_birth: '11.11.1821'}, 638dc0be9a2a11728e880cd8 2
//     {name: 'Николай Гоголь', date_of_birth: '04.03.1809'}, 638dc0d89a2a11728e880cd9 3
//     {name: 'Александр Грибоедов', date_of_birth: '15.01.1795'}, 638dc0ed9a2a11728e880cda 4
// ];


// const books = [
//     {id: '1', name: '1984', genre: 'роман', authorId: '1'},
//     {id: '2', name: 'Преступление и наказание', genre: 'роман', authorId: '2'},
//     {id: '3', name: 'Мёртвые души', genre: 'роман', authorId: '3'},
//     {id: '4', name: 'Горе от ума', genre: 'комедия', authorId: '4'},
//     {id: '5', name: 'Ревизор', genre: 'комедия', authorId: '3'},
//     {id: '6', name: 'Игроки', genre: 'комедия', authorId: '3'},
//     {id: '7', name: 'Глотнуть воздуха', genre: 'сатира', authorId: '1'},
//     {id: '8', name: 'Бедные люди', genre: 'роман', authorId: '2'},
//     {id: '9', name: 'Игрок', genre: 'роман', authorId: '2'},
//     {id: '10', name: 'Двойник', genre: 'повесть', authorId: '2'},
// ];

// const authors = [
//     {id: '1', name: 'Джордж Оруэлл', date_of_birth: '25.06.1903'},
//     {id: '2', name: 'Фёдор Достоевский', date_of_birth: '11.11.1821'},
//     {id: '3', name: 'Николай Гоголь', date_of_birth: '04.03.1809'},
//     {id: '4', name: 'Александр Грибоедов', date_of_birth: '15.01.1795'},
// ];