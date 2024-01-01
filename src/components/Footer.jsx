import React from "react";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2 lg:w-[900px] flex justify-between text-white">
      <span>Copyright &copy;2023</span>
      <span>
        Created by -{" "}
        <a
          rel="noreferrer"
          target="_blank"
          href="https://github.com/NaZmuZ-SaKiB"
        >
          NaZmuZ SaKiB
        </a>
      </span>
    </div>
  );
};

export default Footer;
