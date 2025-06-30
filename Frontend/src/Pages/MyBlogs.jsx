import axios from "axios";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const viewMyBlogs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/post/getMyPosts",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setMyBlogs(res.data.posts);
        }
      } catch (error) {
        console.error("Failed to view my blogs", error);
      }
    };

    viewMyBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/post/deletePost/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        alert(res.data.message);
        setMyBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
      }
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 px-8 py-6 gap-8 md:grid-cols-2 lg:grid-cols-3 ">
        {myBlogs.map((blog) => {
          return (
            <div key={blog._id} className="bg-yellow-100 cursor-pointer">
              <img src={blog.coverImage} />
              <h1 className="text-center font-bold pt-3 line-clamp-1">
                {blog.title}
              </h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blog.description),
                }}
                className="text-justify px-6 pt-3 line-clamp-2"
              ></p>
              <div className="px-6 flex justify-between items-center gap-3 pt-3 pb-3">
                <div>
                  <p className="font-semibold text-sm">
                    {new Date(blog.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div>
                  <button onClick={() => navigate(`/editBlog/${blog._id}`)}>
                    <EditIcon />
                  </button>
                  <button onClick={() => handleDelete(blog._id)}>
                    <DeleteForeverOutlinedIcon />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyBlogs;
