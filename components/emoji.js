import React, { useEffect, useState } from "react";
import { decode } from "html-entities";
import { motion, AnimatePresence } from "framer-motion";
import Switch from "react-switch";
import { FiMoon, FiSun } from "react-icons/fi";

const Emoji = ({ emojies }) => {
  const [emoji, setEmoji] = useState(emojies);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const uniqueCategories = emojies?.map((cat) => cat.category);
    const categories = new Set(uniqueCategories);
    const categoriesArr = [...categories];
    setCategories(categoriesArr);
  }, []);

  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 280);
    return `hsl(${hue}, 100%, ${90}%)`;
  };
  const handleCategory = (e) => {
    setSelectedCategory(e.target.innerHTML.toLowerCase());
    setEmoji(
      e.target.innerHTML.toLowerCase() !== "all"
        ? emojies.filter(
            (c) => c.category.toLowerCase() === e.target.innerHTML.toLowerCase()
          )
        : emojies
    );
  };

  const handleDarkModeChange = (checked) => {
    setIsDarkMode(checked);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundImage =
        "linear-gradient(to bottom, #232526, #414345)";
    } else {
      document.body.style.backgroundImage =
        "url(\"data:image/svg+xml,%3Csvg width='5' height='5' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234f4f51' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E\")";
    }
    // "linear-gradient(to top, #3d7eaa, #ffe47a)";
  }, [isDarkMode]);

  return (
    <>
      <h1
        className={`text-center text-3xl font-bold ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Emoji World
      </h1>

      <div
        className={`fixed bottom-10 right-5 z-10 rotate-90 ${
          isDarkMode ? "bg-white" : "bg-black"
        }flex justify-center items-center rounded-3xl`}
      >
        <Switch
          id="darkModeToggle"
          checked={isDarkMode}
          onChange={handleDarkModeChange}
          onColor="#ccc"
          offColor="#ccc"
          checkedIcon={<FiMoon />}
          uncheckedIcon={<FiSun />}
          height={40}
          width={70}
          handleDiameter={20}
          className="react-switch"
        />
      </div>

      <div className={`p-10 ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <div className="flex justify-between items-center mb-10">
          <button
            className={`${
              !isDarkMode
                ? "bg-black text-white hover:bg-white  border-black hover:text-black"
                : "bg-white text-black hover:bg-black  border-white hover:text-white "
            } rounded-md mb-2  px-4 py-1 border-2  ${
              selectedCategory.toLocaleLowerCase() === "all" &&
              "active_category"
            }`}
            onClick={(e) => handleCategory(e)}
          >
            All
          </button>
          {categories?.map((category) => (
            <button
              className={`${
                !isDarkMode
                  ? "bg-black text-white hover:bg-white  border-black hover:text-black"
                  : "bg-white text-black hover:bg-black  border-white hover:text-white "
              } rounded-md mb-2  px-4 py-1 border-2   ${
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
        <motion.div
          className="flex flex-wrap justify-center items-center cursor-pointer"
          initial={{ opacity: 0, y: -20 }} // Initial animation values
          animate={{ opacity: 1, y: 0 }} // Animation values to be reached
          exit={{ opacity: 0, y: 20 }} // Animation values when the component is removed from the DOM
          transition={{ duration: 0.3 }} // Animation duration
        >
          {emoji?.map((emoji, i) => (
            <motion.div
              key={i}
              className="rounded-lg p-3 text-center m-2"
              style={{
                backgroundColor: getRandomPastelColor(),
                border: "2px solid #000",
                // border: `2px solid ${isDarkMode && getRandomPastelColor()}`,
                // boxShadow: isDarkMode
                //   ? `5px 5px 0px 0px ${getRandomPastelColor()} `
                //   : "",
              }} // Set the random pastel color
              whileHover={{ scale: 1.02 }} // Animation on hover
              whileTap={{ scale: 0.95 }} // Animation when clicked
            >
              <h1
                className={`font-semibold text-black`}
                // style={{ color: isDarkMode && getRandomPastelColor() }}
              >
                {emoji?.name?.slice(0, 1).toUpperCase()}
                {emoji?.name?.slice(1)}
              </h1>
              <h4
                className={`text-2xl ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {decode(emoji?.htmlCode?.[0])}
              </h4>
              <h5
                className={`text-sm`}
                // style={{ color: isDarkMode && getRandomPastelColor() }}
              >
                {emoji?.htmlCode?.[0]}
              </h5>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Emoji;
