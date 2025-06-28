import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    console.log(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        user,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      if (res.data.success) {
        setUser(res.data.user);
        alert(res.data.message);
        setUser({ name: "", email: "", password: "" });
        navigate("/login");
      }
    } catch (error) {
      console.error("User registration failed", error);
    }
  };

  return (
    <section className="mt-8 lg:mt-14 flex justify-center items-center">
      <div className="relative w-10/12 sm:w-3/4 md:w-2/5 lg:w-1/4 border-2 rounded-xl p-4 md:p-6 bg-[#E7F0DC]">
        <h1 className="text-center mt-3 text-2xl font-bold">Register</h1>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Name</label>
            <input
              onChange={handleChange}
              className="border p-2 rounded-lg bg-white"
              type="text"
              placeholder="Enter your name"
              name="name"
              value={user.name}
            />
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <label className="text-sm font-semibold">Email</label>
            <input
              onChange={handleChange}
              className="border p-2 rounded-lg bg-white"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={user.email}
            />
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <label className="text-sm font-semibold">Password</label>
            <input
              onChange={handleChange}
              className="border p-2 rounded-lg bg-white"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={user.password}
            />
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <button
              type="submit"
              className="bg-[#579d3e] hover:bg-[#31691d] text-white font-bold p-2 rounded-lg"
            >
              Register
            </button>
            <p className="mt-2 text-center text-sm">
              Already have an account?
              <NavLink className="text-indigo-600 font-semibold" to={"/login"}>
                Login
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
