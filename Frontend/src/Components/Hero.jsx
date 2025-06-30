import React from "react";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative  h-[calc(100vh-50px)] md:h-[calc(100vh-70px)] overflow-hidden bg-gray-900">
      <img
        src="/Coverforblog.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl text-white font-bold mb-6">
          Stories that matter.
          <br />
          Ideas that inspire.
        </h1>
        <p className="text-white text-lg md:text-xl font-semibold max-w-2xl md:mt-4">
          A space to write, discover, and connect through thoughtful content.
        </p>
        <NavLink to={"/allBlogs"}>
          <button
            type="submit"
            className="bg-amber-500 text-white font-bold px-5 py-1 md:px-8 md:py-2 rounded-full mt-10"
          >
            Start Reading
          </button>
        </NavLink>
      </div>
    </section>
  );
};

export default Hero;
