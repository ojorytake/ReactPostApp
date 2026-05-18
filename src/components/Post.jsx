import { Heart, Trash2, Pencil } from "lucide-react";
import { useState } from "react";

function Post({ post, toggleLike, deletePost, editPost }) {
  // 編集
  const [isEditing, setIsEditing] = useState(false);

  // 編集中テキスト
  const [editText, setEditText] = useState(post.caption);

  // 保存
  const handleSave = () => {
    editPost(post.id, editText);

    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white rounded-2xl shadow transition">
      {/* ユーザー名 */}
      <div className="p-4 font-bold flex justify-between items-center">
        <span>{post.user}</span>

        {/* 右ボタン */}
        <div className="flex gap-3">
          {/* 編集 */}
          <button
            className="p-2 rounded-full hover:scale-110 transition cursor-pointer"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Pencil size={20} />
          </button>

          {/* 削除 */}
          <button
            className="p-2 rounded-full hover:scale-110 transition cursor-pointer"
            onClick={() => deletePost(post.id)}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* 画像 */}
      <img src={post.image} alt="" className="w-full h-72 object-cover" />

      {/* 下部分 */}
      <div className="p-4">
        {/* いいね */}
        <button
          onClick={() => toggleLike(post.id)}
          className="p-2 rounded-full hover:scale-110 transition cursor-pointer"
        >
          <Heart fill={post.liked ? "red" : "white"} />
        </button>

        <p className="font-semibold mt-2">{post.likes} likes</p>

        {/* 編集モード */}
        {isEditing ? (
          <div className="mt-3 space-y-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full border p-2 rounded-lg"
            />

            <div className="flex gap-3">
              {/* 保存 */}
              <button
                onClick={handleSave}
                className="cursor-pointer flex-1 bg-blue-500 hover:scale-110 transition text-white py-2 rounded-xl font-semibold transition"
              >
                保存
              </button>

              {/* キャンセル */}
              <button
                onClick={() => {
                  setEditText(post.caption);
                  setIsEditing(false);
                }}
                className="cursor-pointer flex-1 bg-gray-200 dark:bg-gray-800 hover:scale-110 transition py-2 rounded-xl font-semibold transition"
              >
                キャンセル
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-2">
            <span className="font-bold mr-2">{post.user}</span>

            {post.caption}
          </p>
        )}
      </div>
    </div>
  );
}

export default Post;
