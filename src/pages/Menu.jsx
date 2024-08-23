import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import TypingAnimation from "@/components/magicui/typing-animation";
import MenuCard from "@/components/MenuCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Menu = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [prductCategory, setProductCategory] = useState([]);
  const [category, setCategory] = useState(null);

  const getMenu = async () => {
    try {
      const res = await axios
        .get(import.meta.env.VITE_BASE_API + "/api/product")
        .then((res) => {
          const uniqueCategories = res.data.data.reduce((acc, item) => {
            if (!acc.includes(item.category_id)) {
              acc.push(item.category_id);
            }
            return acc;
          }, []);

          setCategory(uniqueCategories);
          setDataProduct(res.data.data);
          setProductCategory(res.data.data);
        });
    } catch (err) {
      toast.error("Failed to fetch menu.");
      console.error(err);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  const selectCategory = (value) => {
    setProductCategory(
      dataProduct.filter((product) => product.category_id === value)
    );
  };

  return (
    <div className="flex flex-col gap-3 sm:px-10 px-4 sm:mt-10 mt-4 items-center sm:items-start">
      <div className="flexpl-10">
        <TypingAnimation
          text={"Pizza menu 🛒"}
          className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold "
        />
      </div>
      <div className="md:text-lg text-base font-bold ">
        <Select onValueChange={selectCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              {category?.map((data, index) => (
                <SelectItem value={data}>
                  {data.charAt(0).toUpperCase() + data.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid  grid-cols-1 md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 gap-6 px-4 mt-5">
        {prductCategory?.map((data) => (
          <MenuCard data={data} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
