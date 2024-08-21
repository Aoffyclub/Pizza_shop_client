import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "./ui/button";
import { ContextProviderContext } from "@/provider/contextProvider";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const MenuCard = ({ data }) => {
  const { token } = useContext(ContextProviderContext);

  const addToCart = async (id) => {
    if (!token) {
      toast.error("Please login to add product to cart");
      return;
    }
    try {
      let mData = {
        product_id: id,
        quantity: "1",
      };
      await axios
        .request({
          url: import.meta.env.VITE_BASE_API + "/api/cart",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          data: mData,
        })
        .then((res) => {
          toast.success("Product added to cart successfully");
        });
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };
  return (
    <div>
      <div
        key={data.id}
        className="relative flex flex-col items-center pb-4 rounded-lg shadow-md dark:bg-[#363333] dark:border-[1px] overflow-hidden"
      >
        <div className="md:h-[350px] h-[200px] w-full  overflow-hidden">
          <img
            src={import.meta.env.VITE_BASE_API + data.imageUrl}
            alt={data.name}
            className="md:h-[350px] h-[200px] w-full hover:scale-110 hover:duration-75 "
          />
        </div>
        <div className="px-6 w-full mt-4 flex flex-col gap-2">
          <h2 className="font-bold text-xl md:text-3xl lg:text-3xl xl:text-4xl">
            {data.name}
          </h2>
          <p className="font-bold text-xl md:text-2xl lg:text-2xl xl:text-3xl">
            {data.price} Bath
          </p>
          <p className="text-lg md:text-xl lg:text-xl xl:text-2xl">
            {data.description}
          </p>
          <Button
            variant="outline"
            className="text-lg md:text-xl lg:text-xl xl:text-2xl w-[130px] rounded-full mt-2"
            onClick={() => addToCart(data.product_id)}
          >
            Add Cart
          </Button>
        </div>
        <BorderBeam />
      </div>
    </div>
  );
};

export default MenuCard;
