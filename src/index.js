import {
    join
} from 'path';
import {
    error,
    success,
} from 'consola';
import {
    DB,
    PORT,
    IN_PROD
} from './config';
import {
    ApolloServer,
} from 'apollo-server-express';
import {
    schemaDirectives
} from './graphql/directives';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import * as AppModels from './models';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import AuthMiddleware from './middlewares/auth';

const app = express();
// Remove x-powered-by header
app.disable("x-powered-by");
app.use(AuthMiddleware);
app.use(bodyParser.json());

// Set Express Static Directory
app.use(express.static(join(__dirname, './uploads')));

// Define the Apollo-Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    playground: !IN_PROD,
    context: ({
        req
    }) => {

        let {
            user,
            isAuth,
        } = req;

        return {
            req,
            user,
            isAuth,
            ...AppModels,
        };
    }
});

// Function to start express and apollo server 
const startApp = async () => {
    try {
        // Connect With MongoDB Database
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        success({
            badge: true,
            message: `Successfully connected with the database ${DB}`,
        });

        // Apply Apollo-Express-Server Middlware to express application
        server.applyMiddleware({
            app,
            cors: true
        });

        // Start Listening on the Server
        app.listen(PORT, () =>
            success({
                badge: true,
                message: `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
            })
        );
    } catch (err) {
        error({
            badge: true,
            message: err.message
        });
    }
}

// Invoke Start Application Function
startApp();