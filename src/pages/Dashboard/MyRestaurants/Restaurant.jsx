import { Link } from "react-router-dom";

import getEvgRating from "../../../../utils/avgRating";

export default function Restaurant({ restaurant }) {
  const { name, bookings, reviews, slug } = restaurant;
  return (
    <tr className="text-center h-12">
      <td className="px-3 text-sm text-gray-700">{name}</td>
      <td className="px-1 text-sm text-gray-700">
        {getEvgRating(reviews).toFixed(2)}
      </td>
      <td className="px-1 text-sm text-gray-700">{bookings.length}</td>
      <td className="px-1 text-sm text-blue-400 hover:text-blue-600">
        <Link to={`/dashboard/my-restaurant/${slug}`}>View/ Update</Link>
      </td>
    </tr>
  );
}
