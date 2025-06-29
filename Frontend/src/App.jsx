import Navbar from "./Components/Navbar";
import AboutUs from "./Pages/AboutUs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import CreateBlog from "./Pages/CreateBlog";
import AllBlogs from "./Pages/AllBlogs";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/allBlogs" element={<AllBlogs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
