import { Link } from "react-scroll";

const RestaurantNavbar = () => {
  return (
    <nav className="flex text-sm sm:text-reg z-50 border-b pt-2 sticky top-0 bg-white text-gray-500 font-medium overflow-y-scroll">
      <Link
        activeClass="text-orange-600 !border-orange-600"
        to="restaurant_title"
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
        className="mr-7 pb-2 border-b-2 border-transparent cursor-pointer hover:text-orange-600 hover:border-orange-600"
      >
        Overview
      </Link>
      <Link
        activeClass="text-orange-600 !border-orange-600"
        to="restaurant_images"
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
        className="mr-7 pb-2 border-b-2 border-transparent cursor-pointer hover:text-orange-600 hover:border-orange-600"
      >
        Photos
      </Link>
      <Link
        activeClass="text-orange-600 !border-orange-600"
        to="restaurant_menu"
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
        className="mr-7 pb-2 border-b-2 border-transparent cursor-pointer hover:text-orange-600 hover:border-orange-600"
      >
        Menu
      </Link>
      <Link
        activeClass="text-orange-600 !border-orange-600"
        to="restaurant_reviews"
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
        className="mr-7 pb-2 border-b-2 border-transparent cursor-pointer hover:text-orange-600 hover:border-orange-600"
      >
        Reviews
      </Link>
    </nav>
  );
};

export default RestaurantNavbar;
