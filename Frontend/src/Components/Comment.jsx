import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const Comment = ({ blogId }) => {
  const [postComment, setPostComment] = useState("");
  const [showComment, setShowComment] = useState([]);
  const [count, setCount] = useState("");
  const { accessToken, userId } = useContext(AuthContext);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/comment/createComment",
        {
          post: blogId,
          text: postComment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        alert(res.data.message);
        setPostComment("");
      }
    } catch (error) {
      console.error("Failed to post a comment", error);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/comment/getComment"
        );
        console.log(res.data);
        if (res.data.success) {
          setShowComment(res.data.comments);
          setCount(res.data.count);
        }
      } catch (error) {
        console.error("Failed to get comments");
      }
    };

    getComments();
  }, []);
  return (
    <div className="px-10 pb-4">
      <div>
        <h1 className="text-xl font-bold">Comments ({count})</h1>
        <div className="flex flex-col">
          <label className="py-3">Write a response</label>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            className="w-full outline-none bg-slate-100"
            value={postComment}
            onChange={(e) => setPostComment(e.target.value)}
          />
        </div>
        <button
          onClick={handlePost}
          className="bg-amber-500 mt-3 text-white font-medium md:font-bold px-2 md:py-1 md:px-5 rounded-full "
        >
          Post
        </button>
      </div>

      <div>
        {showComment.map((comment) => {
          return (
            <div key={comment._id} className="pt-3">
              <div className="flex items-center gap-3">
                <img
                  className="w-[30px] h-[30px]"
                  src={comment.user.profileImage || "/user.png"}
                />
                <div>
                  <h3 className="font-bold">{comment.user.name}</h3>
                  <p className="text-sm">
                    {new Date(comment.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
              <p>{comment.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
