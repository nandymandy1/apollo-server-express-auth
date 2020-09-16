import {
    NewPostRules
} from '../../validations';

import {
    ApolloError
} from 'apollo-server-express';

export default {
    Query: {
        /**
         * @DESC to Get all the Posts
         * @Access Public
         */
        allPosts: async (_, {}, {
            Post
        }) => {
            let posts = await Post.find().populate('author');
            return posts;
        },
        /**
         * @DESC to Get single the Post by ID
         * @Access Public
         */
        getPostById: async (_, {
            id
        }, {
            Post
        }) => {
            let post = await Post.findById(id).populate('author');
            return post;
        }
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
            } = newPost;

            // Validate the incoming new Post arguments
            await NewPostRules.validate({
                title,
                content
            }, {
                abortEarly: false
            });
            // Once the Validations are passed Create New Post
            const post = new Post({
                ...newPost,
                author: user.id
            });
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
            try {
                let post = await Post.findOneAndUpdate({
                        _id: id,
                        author: user.id
                    },
                    updatedPost, {
                        new: true
                    }
                );
                console.log("UPDATE_POST", post);
                if (!post) {
                    throw new Error("Unathorized Access");
                }
                return post;
            } catch (err) {
                throw new ApolloError(err.message);
            }
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
            try {
                let post = await Post.findOneAndDelete({
                    _id: id,
                    author: user.id
                });
                console.log("DELETE_POST", post);
                if (!post) {
                    throw new Error("Unathorized Access");
                }
                return {
                    success: true,
                    message: "Post Deleted Successfully."
                }
            } catch (err) {
                throw new ApolloError(err.message);
            }
        }
    }
}