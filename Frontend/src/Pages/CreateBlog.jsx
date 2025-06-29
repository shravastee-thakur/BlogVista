import axios from "axios";
import { useContext, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AuthContext } from "../context/AuthProvider";

const CreateBlog = () => {
  const { createBlog } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      const success = await createBlog(formData);
      if (success) {
        setTitle(""),
          setDescription(""),
          setCategory(""),
          setCoverImage(null),
          (fileInputRef.current.value = "");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-700">Create New Post</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          placeholder="Post title"
          className="w-full border outline-none px-4 py-2 rounded focus:ring-2 focus:ring-[#85A947] focus:border-transparent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          placeholder="Enter category"
          className="w-full border outline-none px-4 py-2 rounded focus:ring-2 focus:ring-[#85A947] focus:border-transparent"
          value={category}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Cover Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-[#85A947] file:text-white
            hover:file:bg-[#6c8d3e]"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          placeholder="Write your post content here..."
          className="bg-white rounded border border-gray-300"
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image"],
              ["clean"],
            ],
          }}
          theme="snow"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-2 bg-[#85A947] text-white font-semibold rounded hover:bg-[#6c8d3e] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Publishing..." : "Publish"}
      </button>
    </form>
  );
};

export default CreateBlog;
