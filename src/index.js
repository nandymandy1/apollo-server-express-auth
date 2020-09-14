import {
    error,
    success,
} from 'consola';

import {
    DB,
    PORT,
    SECRET
} from './config';

import {
    User,
    Post
} from './models';

import {
    ApolloServer,
} from 'apollo-server-express';

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import {
    schemaDirectives
} from './graphql/directives';

import AuthMiddleware from './middlewares/auth';

const app = express();
app.use(AuthMiddleware);
app.use(bodyParser.json());

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    context: ({
        req
    }) => {

        let {
            user,
            isAuth,
        } = req;

        return {
            User,
            Post,
            req,
            user,
            isAuth
        };
    }
});

const startApp = async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        success({
            badge: true,
            message: `Successfully connected with the database ${DB}`,
        });

        server.applyMiddleware({
            app,
            cors: true
        });
        app.listen(PORT, () =>
            success({
                badge: true,
                message: `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
            })
        );
    } catch (err) {
        error({
            message: err.message,
            badge: true
        });
    }
}

startApp();