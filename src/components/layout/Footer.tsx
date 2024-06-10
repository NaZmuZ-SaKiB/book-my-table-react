const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-[#0f1f47] to-[#5f6984] py-2 px-5 z-50">
      <div className="lg:w-[900px] mx-auto flex justify-between text-white">
        <span>Copyright &copy;2023</span>
        <span>
          Created by -{" "}
          <a
            className="underline"
            rel="noreferrer"
            target="_blank"
            href="https://github.com/NaZmuZ-SaKiB"
          >
            NaZmuZ SaKiB
          </a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
