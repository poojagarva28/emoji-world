import React from "react";
import { motion } from "framer-motion";

const Info = ({ setInfo }) => {
  const variants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
  };
  return (
    <>
      <div
        className="infoblock flex text-center h-full w-screen justify-center items-center absolute z-40 top-0 left-0 infobg"
        onClick={() => setInfo(false)}
      >
        <motion.div
          className="infoblock flex text-center h-screen w-screen justify-center items-center absolute z-40 top-0 left-0 infobg"
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setInfo(false)}
          variants={variants}
        >
          <div className="bg-white  border-2 border-black p-4  rounded-lg w-2/4  h-auto relative">
            <div className="text-center mt-8 relative z-50 mb-10">
              <h1
                className={`text-lg font-extrabold bg-yellow-400 inline border-8  border-double border-black py-3 px-5 rounded-3xl`}
              >
                emoji world
              </h1>
            </div>
            <h3 className="text-xl font-extrabold mb-3">
              Welcome to Emoji World – the place where coding meets comedy!
              😜🎩✨
            </h3>
            <p>
              The wacky creation that happened when I mixed emojis with my
              coding obsession! 🎉 It&apos;s like I took a spoonful of HTML, a
              dash of Next.js, sprinkled some emojies all around, and BOOM!
              Emoji World was born!
            </p>
            <p>
              Now, let me geek out for a moment. I dove into the magical world
              of Next.js, creating smooth routes that make exploring emojis feel
              like riding a unicorn through a rainbow 🦄🌈. And those
              meticulously organized categories? They&apos;re like the perfectly
              stacked code blocks that make my inner neat freak jump for joy! 🤩
            </p>
            <p>
              But it&apos;s not all about technical wizardry – it&apos;s about
              spreading joy and laughter! Each emoji shines like a digital
              comedian, with vibrant images that give them superstar charisma.
              With just a click, you can copy the HTML code entity for your
              favorite emoji and sprinkle that emoji magic into your web
              projects. 💻✨
            </p>
            <p>
              Grab your virtual party hat, jump in, and let&apos;s make some
              HTML magic happen! 🪄
            </p>
            <p
              onClick={() => setInfo(false)}
              className="absolute -top-4 -right-4 bg-black w-8 h-8 z-50 rounded-lg text-white !m-0 !p-0 !pt-1 font-extrabold cursor-pointer"
            >
              X
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Info;
