import React from "react";

const Menu = ({ items }) => {
  return (
    <div id="restaurant_menu">
      <div className="mt-4 pb-1 mb-1">
        <h1 className="text-gray-700 text-left font-bold text-2xl md:text-3xl border-b pb-5">
          Menu
        </h1>
      </div>
      <div className="flex flex-wrap justify-between">
        {items.length ? (
          items.map((item) => (
            <div
              key={`item ${item.id}`}
              className=" border rounded p-3 w-full md:w-[49%] mb-3"
            >
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="font-light mt-1 text-sm">{item.description}</p>
              <p className="mt-7">{item.price}</p>
            </div>
          ))
        ) : (
          <p>This restaurant does not have any menu.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
