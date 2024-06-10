import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-[#0f1f47] to-[#5f6984] px-2 py-10  md:py-18">
      <div className="text-center">
        <h1 className="text-white text-lg text-medium sm:text-3xl md:text-5xl md:font-bold mb-2">
          Find your table for any occasion
        </h1>
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;
