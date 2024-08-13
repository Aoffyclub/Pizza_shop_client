import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import TypingAnimation from "@/components/magicui/typing-animation";
import MenuCard from "@/components/MenuCard";

const Menu = () => {
  const [dataProduct, setDataProduct] = useState([]);

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BASE_API + "/api/product"
      );
      setDataProduct(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch menu.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:px-10 px-4 sm:mt-10 mt-4 items-center sm:items-start">
      <div className="flex pl-10">
        <TypingAnimation
          text={"Pizza menu 🛒"}
          className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 px-4 md:px-28 lg:px-32 xl:px-44 mt-5">
        {dataProduct?.map((data) => (
          <MenuCard data={data} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
