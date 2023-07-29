import React, { useEffect, useState } from "react";
import { decode } from "html-entities";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import EmojiGif from "@/public/emoji.gif";
import Info from "./info";

const notify = (htmlCode) => toast(`${decode(htmlCode)} copied`);

const Emoji = ({ emojies }) => {
  const [emoji, setEmoji] = useState(emojies);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSticky, setIsSticky] = useState(false);
  const [info, setInfo] = useState(false);

  useEffect(() => {
    const uniqueCategories = emojies?.map((cat) => cat.category);
    const categories = new Set(uniqueCategories);
    const categoriesArr = [...categories];
    setCategories(categoriesArr);
  }, [emojies]);

  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 280);
    return `hsl(${hue}, 100%, 90%)`;
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

  const handleCopy = (htmlCode) => {
    navigator.clipboard
      .writeText(htmlCode)
      .then(() => {
        console.log("Copied to clipboard:", htmlCode);
        notify(htmlCode);
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
        notify(htmlCode);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Set isSticky to true if the scroll position is greater than or equal to 10
      setIsSticky(window.scrollY >= 120);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage =
      "url(\"data:image/svg+xml,%3Csvg width='5' height='5' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234f4f51' fill-opacity='0.3' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E\")";
    // "linear-gradient(to top, #3d7eaa, #ffe47a)";
  }, []);

  return (
    <>
      <div
        className="fixed -right-4 bottom-10 flex justify-center items-center rounded-full"
        style={{
          transform: "scaleX(-1)", // This flips the image horizontally
        }}
      >
        {/* <FiInfo size={28} color="#000" /> */}
        <Image
          className="cursor-pointer"
          src={EmojiGif}
          width={120}
          height={120}
          alt="know more"
          onClick={() => setInfo(true)}
        />
      </div>

      {info ? (
        <>
          <Info setInfo={setInfo} />
        </>
      ) : (
        <div className={`p-10 px-4 mt-0 pt-0`}>
          <div className="text-center mt-20 relative z-30 mb-16">
            <h1
              className={`text-2xl font-extrabold bg-yellow-400 inline border-8  border-double border-black py-3 px-5 rounded-3xl`}
            >
              emoji world
            </h1>
          </div>
          <div
            className={`flex justify-evenly font-bold items-center mb-7 text-bold sticky top-10 z-20 ${
              isSticky
                ? "bg-black px-1 py-4 pb-2 rounded-lg sticky-background zoomed-in border-0"
                : ""
            }`}
          >
            <button
              className={`bg-black  text-lg  hover:bg-white hover:text-black border-black rounded-md mb-2 px-4 py-1 border-2 transition-all ${
                selectedCategory.toLocaleLowerCase() === "all" &&
                "active_category"
              } ${
                isSticky &&
                selectedCategory.toLocaleLowerCase() === "all" &&
                "active_category"
                  ? "bg-white text-black "
                  : "bg-black text-white "
              } 
              ${isSticky && "!hover:bg-black !hover:text-white"}
              `}
              onClick={(e) => handleCategory(e)}
            >
              all
            </button>
            {categories?.map((category) => (
              <button
                className={`bg-black text-base hover:bg-white hover:text-black border-black rounded-md mb-2 mx-2 px-4 py-1 border-2 transition-all ${
                  selectedCategory.toLocaleLowerCase() ===
                    category.toLocaleLowerCase() && "active_category"
                } ${
                  isSticky &&
                  selectedCategory.toLocaleLowerCase() ===
                    category.toLocaleLowerCase() &&
                  "active_category"
                    ? "bg-white text-black "
                    : "bg-black text-white "
                } 
              ${isSticky && "!hover:bg-black !hover:text-white !border-0"}
              `}
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
                onClick={() => handleCopy(emoji?.htmlCode?.[0])}
              >
                <h1
                  className={`font-extrabold text-sm text-black font-comfortaa`}
                  // style={{ color: isDarkMode && getRandomPastelColor() }}
                >
                  {emoji?.name?.slice(0, 1).toUpperCase()}
                  {emoji?.name?.slice(1)}
                </h1>
                <h4 className={` text-black text-sm`}>
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
      )}
      <Toaster
        position="top-right"
        toastOptions={{
          // Define default options
          duration: 2000,
          style: {
            background: "#000",
            color: "#fff",
            marginTop: isSticky && "120px",
          },
        }}
      />
    </>
  );
};

export default Emoji;
