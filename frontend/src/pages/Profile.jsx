import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { displayMsg } from "../assets/Pop";

const Profile = () => {
  const { userId } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/blogs/user/${userId}`);
      setBlogs(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/blogs/${id}`);
      if (res.data.success) {
        setBlogs(blogs.filter((blog) => blog._id != id));
        displayMsg("Blog Deleted Successfully", 1);
      }
    } catch (err) {
      console.log(err);
      displayMsg("Internal Server Error", 0);
    }
  };

  const setDate = (createdAt) => {
    const blogDate = new Date(createdAt);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return blogDate.toLocaleDateString("en-US", options).replace(",", "");
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center flex-col items-center mt-16">
          <div className="text-3xl dark:text-primaryText font-bold my-6">
            Your Blogs
          </div>

          <div className="grid grid-cols-2 gap-5 justify-items-center">
            {blogs.map((blog) => (
              <Link key={blog._id} to={`/blogs/${blog._id}`}>
                <div className="flex flex-col items-center gap-x-4  p-1 m-2 w-xl cursor-pointer">
                  <img
                    className="w-[454px] h-[350px] object-cover"
                    src={blog.image}
                    alt=""
                  />
                  <div className="py-8 px-9 w-[454px]  h-[313px]  flex flex-col justify-between border border-t-0 dark:border-gray-700">
                    <div className="flex-col">
                      <p className="  dark:text-secondaryText text-lightSecondaryText text-sm mb-2">
                        {setDate(blog.createdAt)}
                      </p>
                      <span className="dark:text-primaryText  text-2xl line-clamp-2">
                        {blog.title}
                      </span>
                      <div
                        className="dark:text-secondaryText text-lightSecondaryText line-clamp-3 mt-3"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                      />
                    </div>
                    <button
                      onClick={(event) => {
                        event.stopPropagation(); // Prevent the click from bubbling up to the Link
                        event.preventDefault();
                        deleteBlog(blog._id);
                      }}
                      className=" hover:bg-error hover:text-black dark:border-error w-full py-2 border border-error text-error transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
