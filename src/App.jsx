import { useEffect, useState } from "react";
import Header from "./components/Header";
import PostList from "./components/PostList";

function App() {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");

    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  const [caption, setCaption] = useState("");

  // darkMode
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");

    return savedTheme === "true";
  });

  // テーマ保存
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // 選択画像
  const [selectedImage, setSelectedImage] = useState(null);

  // localStorage保存
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // 画像選択
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // 画像URL生成
    const imageUrl = URL.createObjectURL(file);

    setSelectedImage(imageUrl);
  };

  // 投稿追加
  const addPost = () => {
    if (caption.trim() === "" || !selectedImage) return;

    const newPost = {
      id: Date.now(),
      user: "you",
      image: selectedImage,
      likes: 0,
      caption,
      liked: false,
    };

    setPosts([newPost, ...posts]);

    setCaption("");
    setSelectedImage(null);
  };

  // いいね
  const toggleLike = (id) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      }

      return post;
    });

    setPosts(updatedPosts);
  };

  // 削除
  const deletePost = (id) => {
    const filteredPosts = posts.filter((post) => post.id !== id);

    setPosts(filteredPosts);
  };

  // 編集
  const editPost = (id, newCaption) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          caption: newCaption,
        };
      }

      return post;
    });

    setPosts(updatedPosts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-200 dark:from-gray-800 dark:via-black dark:to-gray-900 transition">
      <Header />
      <div className="max-w-md mx-auto pt-4 flex justify-end">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white dark:bg-gray-800 dark:text-white px-4 py-2 rounded-xl shadow transition"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* 投稿フォーム */}
      <div className="max-w-md mx-auto mt-6 bg-white  dark:bg-gray-900 dark:text-white p-4 rounded-2xl transition shadow space-y-4">
        {/* キャプション */}
        <input
          type="text"
          placeholder="説明"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border text-black dark:text-white dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg"
        />

        {/* ファイル選択 */}
        <label className="block">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <div className="bg-gray-200 dark:bg-gray-800 active:scale-95 hover:scale-110 transition p-3 rounded-xl text-center cursor-pointer font-semibold">
            画像を選択
          </div>
        </label>

        {/* プレビュー */}
        {selectedImage && (
          <img
            src={selectedImage}
            alt=""
            className="w-full h-72 object-cover rounded-xl"
          />
        )}

        {/* 投稿 */}
        <button
          onClick={addPost}
          className="w-full active:scale-95 hover:scale-110 transition bg-blue-500 text-white p-3 rounded-lg cursor-pointer"
        >
          投稿
        </button>
      </div>

      <PostList
        posts={posts}
        toggleLike={toggleLike}
        deletePost={deletePost}
        editPost={editPost}
      />
    </div>
  );
}

export default App;
