import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import DOMPurify from "dompurify";

const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const getAllBlogs = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/v1/post/getAllPosts"
      );
      console.log(res.data);
      if (res.data.success) {
        setAllBlogs(res.data.allPosts);
      }
    };
    getAllBlogs();
  }, []);

  return (
    <section>
      <div className="grid grid-cols-1 px-8 py-6 gap-8 md:grid-cols-2 lg:grid-cols-3 ">
        {allBlogs.map((blog) => {
          return (
            <div key={blog._id} className="bg-yellow-100">
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
              <div className="px-6 flex items-center gap-3 pt-3 pb-3">
                <img
                  className="w-[40px] h-[40px]"
                  src={blog.author.profileImage || "/user.png"}
                  alt=""
                />
                <div>
                  <h3 className="font-bold">{blog.author.name}</h3>
                  <p className="">
                    {new Date(blog.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AllBlogs;
