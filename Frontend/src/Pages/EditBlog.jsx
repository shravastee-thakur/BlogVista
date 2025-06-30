import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditBlog = () => {
  const { blogId } = useParams();
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const viewBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/post/getPostById/${blogId}`
        );
        console.log(res.data);

        if (res.data.success) {
          const blog = res.data.post;

          setTitle(blog.title);
          setCategory(blog.category);
          setDescription(blog.description);
          setCoverImage(blog.coverImage);
        }
      } catch (error) {
        console.error("Failed to fetch blog by id", error);
      }
    };
    if (blogId) {
      viewBlog();
    }
  }, [blogId]);

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/post/updatePost/${blogId}`,
        {
          title,
          category,
          description,
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
        navigate("/myBlogs");
      }
    } catch (error) {
      console.error("Failed to edit blog", error);
    }
  };
  return (
    <form onSubmit={handleEdit} className="px-6 py-8 space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="w-full p-2 border rounded"
      />

      <ReactQuill value={description} onChange={setDescription} />
      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Update Blog
      </button>
    </form>
  );
};

export default EditBlog;
