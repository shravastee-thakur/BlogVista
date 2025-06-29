import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { accessToken, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate("/login");
    }
  };

  return (
    <>
      <nav className="h-[50px] md:h-[70px] relative flex justify-between items-center text-sm font-semibold px-4 md:px-12 bg-[#85A947]">
        <div>
          <h1 className="text-2xl text-white md:text-3xl lg:text-4xl font-bold">
            <NavLink to={"/"}>BlogVista</NavLink>
          </h1>
        </div>
        <div className="text-white flex items-center gap-4">
          <ul className="hidden md:flex gap-6 cursor-pointer">
            <li>
              <NavLink to={"/aboutUs"}>About Us</NavLink>
            </li>
            <li>Membership</li>
            <li>
              <NavLink to={"/createBlog"}>Write</NavLink>
            </li>
          </ul>
          {accessToken ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-medium md:font-bold px-2 md:py-1 md:px-5 rounded-xl"
            >
              Logout
            </button>
          ) : (
            <NavLink to={"/login"}>
              <button
                type="submit"
                className="bg-amber-500 text-white font-medium md:font-bold px-2 md:py-1 md:px-5 rounded-xl "
              >
                Login
              </button>
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
