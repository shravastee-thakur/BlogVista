import Navbar from "./Components/Navbar";
import AboutUs from "./Pages/AboutUs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import CreateBlog from "./Pages/CreateBlog";
import AllBlogs from "./Pages/AllBlogs";
import ViewBlog from "./Pages/ViewBlog";
import MyBlogs from "./Pages/MyBlogs";
import EditBlog from "./Pages/EditBlog";

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
          <Route path="/myBlogs" element={<MyBlogs />} />
          <Route path="/viewBlog/:blogId" element={<ViewBlog />} />
          <Route path="/editBlog/:blogId" element={<EditBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
