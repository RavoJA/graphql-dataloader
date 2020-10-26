import {ApolloServer, gql} from 'apollo-server-express';
import cors from 'cors';
import DataLoader from 'dataloader';
import express from 'express';
import {createConnection} from 'typeorm';
import Post from './entity/Post';
import Tag from './entity/Tag';
import {allPosts, readPosts, tagsOfPost, tagsOfPosts, userPost} from './service/postManager';
import {User} from "./entity/User";

createConnection().then(async () => {
    const tagLoader = new DataLoader<number, Tag[]>(tagsOfPosts);
    const userLoader = new DataLoader<number, User>(userPost);
    const app = express();
    app.use(cors());
    app.use((_, res, next) => {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        return next();
    });
    app.get('/', (req, res) => res.send('Hello World!'));
    app.get('/readPosts', readPosts);
    const typeDefs = gql`
        type Tag {
            id: ID!
            name: String!
        }
        type User {
            id: ID
            name: String
        }
        type Post {
            id: ID!
            name: String!
            tags: [Tag]
            user: User
        }
        type Query {
            allPosts: [Post]
        }
       
    `;
    const resolvers = {
        Post: {
            tags(post: Post) {
                return tagLoader.load(post.id);
            },
            user(post:Post) {
                return userLoader.load(post.id);
            }
        },
        Query: {
            allPosts,
        },
    };
    const server = new ApolloServer({typeDefs, resolvers});
    server.applyMiddleware({app});
    app.listen({port: 4000}, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
    );
}).catch((error) => console.log(error));
