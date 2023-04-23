import React from "react";

const Header = ({ name, location }) => {
  return (
    <div className="overflow-hidden">
      <div className="bg-center pb-12 pt-7 sm:pb-14 sm:pt-10 md:pb-24 md:pt-20 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl 2xl:text-7xl text-white capitalize text-shadow text-center">
          {name}-({location.name})
        </h1>
      </div>
    </div>
  );
};

export default Header;
