import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  return (
    <div className="text-left text-lg py-3 m-auto flex flex-col md:flex-row items-center justify-center">
      <input
        className="rounded p-2 w-full sm:w-[90%] md:w-[500px] mb-2 md:mb-0 md:mr-3"
        type="text"
        placeholder="State, city or town"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        onClick={() => {
          searchTerm && navigate(`/search?searchTerm=${searchTerm}`);
        }}
        className="rounded bg-orange-600 px-9 py-2 text-white max-w-[200px]"
      >
        {"Let's go"}
      </button>
    </div>
  );
};

export default SearchBar;
