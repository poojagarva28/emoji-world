import React, { useState } from "react";
import { motion } from "framer-motion";
import { decode } from "html-entities";
import toast, { Toaster } from "react-hot-toast";

const notify = (htmlCode) => toast(`${decode(htmlCode)} copied`);

const SearchEmoji = ({ setSearch, emojies }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const variants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);

    setSearchResult(
      emojies?.filter(
        (emoji) =>
          emoji?.name?.toLowerCase().includes(searchText) ||
          emoji?.htmlCode?.[0]?.toLowerCase().includes(searchText)
      )
    );

    if (searchText.length === 0) {
      setSearchResult([]);
    }
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

  return (
    <>
      <div className="text-center mt-8 relative z-50 mb-10">
        <h1
          className={`text-lg font-extrabold bg-yellow-400 inline border-8  border-double border-black py-3 px-5 rounded-3xl`}
        >
          emoji world
        </h1>
      </div>
      <div className="infoblock flex text-center h-full w-screen justify-center items-center absolute z-40 top-0 left-0 infobg">
        <motion.div
          className="infoblock flex text-center h-screen w-screen justify-center items-center absolute z-40 top-0 left-0 infobg"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
        >
          <div className="bg-white  border-2 border-black p-4  rounded-lg w-3/5  h-2/3 mt-6 relative">
            <label className="text-base font-extrabold mb-3">
              Search Emoji
            </label>
            <br />
            <div className="flex justify-center items-center">
              <input
                type="text"
                className="border-2 border-black rounded-lg ml-2 h-10 w-2/4 px-3"
                placeholder="Search Emoji....."
                value={searchText}
                onChange={(e) => handleSearch(e)}
              />
            </div>
            <br />
            <label className="text-base font-extrabold mb-3">
              Search Results
            </label>
            <div className="flex justify-center items-center">
              <div className="h-[300px] overflow-scroll w-2/4  border-2 border-black rounded-lg  text-left">
                {searchResult?.length > 0 ? (
                  <>
                    {searchResult?.map((searchedEmoji) => (
                      <div
                        onClick={() => handleCopy(searchedEmoji?.htmlCode?.[0])}
                        key={searchedEmoji?.name}
                        className="flex justify-between hover:bg-gray-100 px-4 py-1 items-center cursor-pointer searchbox"
                      >
                        <p title={searchedEmoji?.name}>
                          {searchedEmoji?.name?.length > 25 ? (
                            <>{`${searchedEmoji?.name?.slice(0, 25)}.....`}</>
                          ) : (
                            searchedEmoji?.name
                          )}
                        </p>
                        <p>
                          {searchedEmoji?.htmlCode?.[0]}
                          <span className="text-2xl ml-2">
                            {decode(searchedEmoji?.htmlCode?.[0])}
                          </span>
                        </p>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {searchText.length == 0 ? (
                      <p className="px-4 py-3">
                        Search emoji to see the result
                      </p>
                    ) : (
                      <p className="px-4 py-3">No emoji found</p>
                    )}
                  </>
                )}
              </div>
            </div>
            {searchText !== "" && (
              <p className="mt-2">
                {searchResult?.length == 1 ? (
                  <>{searchResult?.length} Emoji Found</>
                ) : (
                  <>{searchResult?.length} Emojis Found</>
                )}{" "}
              </p>
            )}
            <p
              onClick={() => setSearch(false)}
              className="absolute -top-4 -right-4 bg-black w-8 h-8 z-50 rounded-lg text-white !m-0 !p-0 !pt-1 font-extrabold cursor-pointer"
            >
              X
            </p>
          </div>
        </motion.div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          // Define default options
          duration: 2000,
          style: {
            background: "#000",
            color: "#fff",
          },
        }}
      />
    </>
  );
};

export default SearchEmoji;
