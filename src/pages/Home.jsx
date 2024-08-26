import pizzaBg from "../images/pizza_bg.jpg";
import pizzaBg2 from "../images/bg_image.jpg";
import { Button } from "@/components/ui/button";

import SparklesText from "@/components/magicui/sparkles-text";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

const Home = () => {
  const [bgImage, setBgImage] = useState(pizzaBg);
   useEffect(() => {
     const handleResize = () => {
       if (window.innerWidth >= 768) {
         setBgImage(pizzaBg);
       } else {
         setBgImage(pizzaBg2); 
       }
     };

     handleResize(); 
     window.addEventListener("resize", handleResize); 

     return () => {
       window.removeEventListener("resize", handleResize); 
     };
   }, []);
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="relative flex flex-col h-[calc(100vh-65px)] w-full justify-center gap-10 text-[#b8adad]">
        <img
          src={bgImage}
          alt="pizza image bg"
          className="absolute w-[100%] h-[100%] -z-10 "
        />
        <div className="flex pl-4">
          <SparklesText
            className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold"
            text={"Good pizza choice are good life to eat"}
          />
        </div>

        <p className="pl-4 w-[90%] md:w-[40%] text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
          nostrum mollitia nisi ratione autem eligendi, ex impedit nemo adipisci
          velit est, ?
        </p>
        <div className="pl-4">
          <Link to={"/menu"}>
            <Button className="text-xl"> Order</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
