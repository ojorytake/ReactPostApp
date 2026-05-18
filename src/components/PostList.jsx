import Post from "./Post";

function PostList({
  posts,
  toggleLike,
  deletePost,
  editPost,
}) {

  return (
    <div className="max-w-md mx-auto mt-6 space-y-6">

      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          toggleLike={toggleLike}
          deletePost={deletePost}
          editPost={editPost}
        />
      ))}

    </div>
  );
}

export default PostList;