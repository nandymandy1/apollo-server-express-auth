import {
    join,
    parse
} from 'path';

import {
    mkdirSync,
    existsSync,
    createWriteStream
} from 'fs';

import {
    BASE_URL
} from '../../config';

import {
    ApolloError
} from 'apollo-server-express';

export default {
    Query: {
        hello: () => "I am Image Upload Resolver."
    },
    Mutation: {
        imageUploader: async (_, {
            file
        }) => {
            try {
                const {
                    filename,
                    createReadStream
                } = await file;

                let stream = createReadStream();

                let {
                    ext,
                    name
                } = parse(filename);

                name = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '_');

                let serverFile = join(
                    __dirname, `../../uploads/${name}-${Date.now()}${ext}`
                );

                serverFile = serverFile.replace(' ', '_');

                let writeStream = await createWriteStream(serverFile);

                await stream.pipe(writeStream);

                serverFile = `${BASE_URL}${serverFile.split('uploads')[1]}`;

                return serverFile;
            } catch (err) {
                throw new ApolloError(err.message);
            }
        },
    }
}