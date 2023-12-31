import Image from "next/image";
import { Inter } from "next/font/google";
import Emoji from "@/components/emoji";
import Footer from "@/components/footer";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ emojies }) {
  // useEffect(() => {
  //   AOS.init();
  // }, []);

  return (
    <main className="m-10">
      <Emoji emojies={emojies} />
      <Footer />
    </main>
  );
}

export const getStaticProps = async () => {
  const getEmojis = await fetch("https://emojihub.yurace.pro/api/all");
  const emojies = await getEmojis.json();
  return {
    props: { emojies },
  };
};
