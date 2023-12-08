"use server"

import { connectToDB } from "../mongoose";
import Post from "../models/post.model";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

   // Calculate the number of posts to skip based on the page number and page size.
const skipAmount = (pageNumber - 1) * pageSize;

// Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
const postsQuery = Post.find({ parentId: { $in: [null, undefined] } })
  .sort({ createdAt: "desc" })
  .skip(skipAmount)
  .limit(pageSize)
  .populate({
    path: "author",
    model: User,
  })
  .populate({
    path: "children", // Populate the children field
    populate: {
      path: "author", // Populate the author field within children
      model: User,
      select: "_id name parentId image", // Select only _id and username fields of the author
    },
  });

// Count the total number of top-level posts (threads) i.e., threads that are not comments.
const totalPostsCount = await Post.countDocuments({
  parentId: { $in: [null, undefined] },
}); // Get the total count of posts

const posts = await postsQuery.exec();

const isNext = totalPostsCount > skipAmount + posts.length;

return { posts, isNext };
}


interface Params {
  text: string,
  author: string,
  communityId: string | null,
  path: string,
}


  export async function createPost({ text, author, path }: Params) {

    try {

    connectToDB();
    const createdPost = await Post.create({
      text,
      author,
      
    });

    await User.findByIdAndUpdate(author, {
      $push: { posts: createdPost._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create post: ${error.message}`);
      
  }
  }

  export async function fetchPostById(postId: string) {
    connectToDB();
    try {
      const speak = await Post.findById(postId)
        .populate({
          path: "author",
          model: User,
          select: "_id id name image",
        }) // Populate the author field with _id and username
        .populate({
          path: "children", // Populate the children field
          populate: [
            {
              path: "author", // Populate the author field within children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
            {
              path: "children", // Populate the children field within children
              model: Post, // The model of the nested children (assuming it's the same "Thread" model)
              populate: {
                path: "author", // Populate the author field within nested children
                model: User,
                select: "_id id name parentId image", // Select only _id and username fields of the author
              },
            },
          ],
        })
        .exec();
  
      return speak;
    } catch (err) {
      console.error("Error while fetching post:", err);
      throw new Error("Unable to fetch post");
    }
  }

  export async function addCommentToPost(
    postId: string,
    commentText: string,
    userId: string,
    path: string
  ) {
    connectToDB();
  
    try {
      // Find the original post by its ID
      const originalPost = await Post.findById(postId);
  
      if (!originalPost) {
        throw new Error("Post not found");
      }
  
      // Create the new comment post
      const commentPost = new Post({
        text: commentText,
        author: userId,
        parentId: postId, // Set the parentId to the original post's ID
      });
  
      // Save the comment post to the database
      const savedCommentPost = await commentPost.save();
  
      // Add the comment thread's ID to the original thread's children array
      originalPost.children.push(savedCommentPost._id);
  
      // Save the updated original thread to the database
      await originalPost.save();
  
      revalidatePath(path);
    } catch (err) {
      console.error("Error while adding comment:", err);
      throw new Error("Unable to add comment");
    }
  }