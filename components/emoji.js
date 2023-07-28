import React, { useEffect, useState } from "react";
import { decode } from "html-entities";

const Emoji = ({ emojies }) => {
  const [emoji, setEmoji] = useState(emojies);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const uniqueCategories = emojies?.map((cat) => cat.category);
    const categories = new Set(uniqueCategories);
    const categoriesArr = [...categories];
    setCategories(categoriesArr);
  }, []);

  const handleCategory = (e) => {
    setSelectedCategory(e.target.innerHTML.toLowerCase());
    setEmoji(
      e.target.innerHTML.toLowerCase() != "all"
        ? emojies.filter(
            (c) => c.category.toLowerCase() == e.target.innerHTML.toLowerCase()
          )
        : emojies
    );
  };

  return (
    <div className="p-10">
      <div className="flex justify-around items-center mb-10">
        <button
          className={`bg-black rounded-md mb-2 text-white px-4 py-1 border-2 hover:bg-white hover:text-black hover:border-2 border-black ${
            selectedCategory.toLocaleLowerCase() === "all" && "active_category"
          }`}
          onClick={(e) => handleCategory(e)}
        >
          All
        </button>
        {categories?.map((category) => (
          <button
            className={`bg-black rounded-md mb-2 text-white px-4 py-1 border-2 hover:bg-white hover:text-black hover:border-2 border-black ${
              selectedCategory.toLocaleLowerCase() ===
                category.toLocaleLowerCase() && "active_category"
            }`}
            key={category}
            onClick={(e) => handleCategory(e)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {emoji?.map((emoji, i) => (
          <div
            key={i}
            className="border-2 border-gray-300 rounded-lg p-3 text-center m-2"
          >
            <h1 className="font-semibold">
              {emoji?.name?.slice(0, 1).toUpperCase()}
              {emoji?.name?.slice(1)}
            </h1>
            <h4 className="text-2xl">{decode(emoji?.htmlCode?.[0])}</h4>
            <h5 className="text-sm">{emoji?.htmlCode?.[0]}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Emoji;
