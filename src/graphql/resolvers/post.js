import {
    NewPostRules
} from '../../validations';

export default {
    Query: {
        /**
         * @DESC to Get all the Posts
         * @Access Public
         */
        allPosts: async (_, {}, {
            Post
        }) => {
            let posts = await Post.find();
            return posts;
        },
    },
    Mutation: {
        /**
         * @DESC to Create new Post
         * @Params newPost{ title!, content!, featuredImage }
         * @Access Private
         */
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

            return result;
        },
        /**
         * @DESC to Update an Existing Post by ID
         * @Params updatedPost { title!, content!, featuredImage }
         * @Access Private
         */
        updatePost: async (_, {
            updatedPost,
            id,
        }, {
            Post,
            user
        }) => {
            let post = await Post.findByIdAndUpdate(
                id,
                updatedPost, {
                    new: true
                }
            );
            return post;
        },
        /**
         * @DESC to Delete an Existing Post by ID
         * @Params id!
         * @Access Private
         */
        deletePost: async (_, {
            id,
        }, {
            Post,
            user
        }) => {
            await Post.findByIdAndDelete(id);
            return {
                success: true,
                message: "Post Deleted Successfully."
            }
        }
    }
}