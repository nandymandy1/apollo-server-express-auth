import {
    NewPostRules
} from '../../validations';

export default {
    Query: {
        allPosts: async (_, {}, {
            Post
        }) => {
            let posts = await Post.find();
            return posts;
        },
    },
    Mutation: {
        createPost: async (_, {
            newPost
        }, {
            Post,
            user
        }) => {
            const {
                title,
                content,
                featuredImage
            } = newPost;

            // Validate the incoming new Post arguments
            await NewPostRules.validate({
                title,
                content
            }, {
                abortEarly: false
            });

            // Once the Validations are passed Create New Post
            const post = new Post(newPost);
            // Save the post
            let result = await post.save();

            result = {
                ...result.toObject(),
                id: result._id.toString()
            }

            return {
                ...result
            }
        }
    }
}