import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";

const ViewBlog = () => {
  const [blogDetail, setBlogDetail] = useState(null);
  const { blogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const viewBlogs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/post/getPostById/${blogId}`
        );
        console.log(res.data);

        if (res.data.success) {
          setBlogDetail(res.data.post);
        }
      } catch (error) {
        console.error("Failed to fetch blog by id", error);
      }
    };
    if (blogId) {
      viewBlogs();
    }
  }, [blogId]);

  if (!blogDetail) return <p className="text-center mt-10">Loading...</p>;

  return (
    <section>
      <div className="flex flex-col justify-center mt-8">
        <div key={blogDetail._id}>
          <img
            src={blogDetail.coverImage}
            className="w-[280px] md:w-[400px] lg:w-[600px] mx-auto"
          />
          <h1 className="text-xl md:text-3xl lg:text-5xl md:px-6 lg:px-10 font-bold text-center pt-4 lg:pt-8">
            {blogDetail.title}
          </h1>
          <div className="flex items-center gap-3 pt-4 px-6 md:px-10 lg:pt-8">
            <img
              className="w-[30px] h-[30px]"
              src={blogDetail.author.profileImage || "/user.png"}
            />
            <div>
              <p className="font-bold">{blogDetail.author.name}</p>
              <p className="text-sm">
                {new Date(blogDetail.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
          <p
            className="py-4 text-justify px-6 md:px-10 md:text-xl"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blogDetail.description),
            }}
          ></p>

          <div className="flex justify-center pb-4">
            <button
              className="bg-blue-700 px-6 py-1 rounded-full text-white"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewBlog;
