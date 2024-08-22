import TypingAnimation from "@/components/magicui/typing-animation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { ContextProviderContext } from "@/provider/contextProvider";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import CartConfirm from "@/components/CartConfirm";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { token } = useContext(ContextProviderContext);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [address, setAddress] = useState([]);
  const [choiceAddress, setChoiceAddress] = useState([]);

  useEffect(() => {
    if (token) {
      getCartItems();
      getAddress();
    }
  }, [token]);

  const getCartItems = async () => {
    try {
      await axios
        .request({
          url: import.meta.env.VITE_BASE_API + "/api/cart",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setCartItems(res.data.data);
          let price = 0;
          res.data.data.forEach((item) => {
            price += item.totalPrice;
          });
          setTotalPrice(price);
        });
    } catch (error) {
      if (error.response.status == 404 || error.response.status == 400) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.response.data.error[0]);
      }
    }
  };

  const removeItem = async (item) => {
    try {
      await axios
        .request({
          url: import.meta.env.VITE_BASE_API + "/api/cart",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          data: {
            product_id: item,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          getCartItems();
        });
    } catch (error) {
      if (error.response.status == 404 || error.response.status == 400) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.response.data.error[0]);
      }
    }
  };

  const getAddress = async () => {
    try {
      await axios
        .get(import.meta.env.VITE_BASE_API + "/api/address", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data.data[0]);
          setAddress(res.data.data);
          // setChoiceAddress(res.data.data[0]);
        });
    } catch (error) {
      toast.error("Failed to get address");
    }
  };

  const selectAddress = (value) => {
    if (!address) {
      return;
    }
    var select = address.filter((data) => data.id == value);
    setChoiceAddress(select);
  };

  return (
    <div className="flex flex-col gap-3 sm:px-10 px-4 sm:mt-10 mt-4 items-center sm:items-start">
      <div className="flex pl-10">
        <TypingAnimation
          text={"Items in cart 🍕"}
          className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold"
        />
      </div>



      {cartItems.length == 0 ? (
        <div className="flex items-center w-full justify-center text-xl mt-2">
          No item
        </div>
      ) : (
        <div className="flex flex-col w-[100%]">
          <Table>
            <TableCaption>A list of your order price to pay.</TableCaption>
            <TableHeader>
              <TableRow className="font-bold text-lg">
                <TableHead className="sm:w-[200px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="sm:w-[100px] text-right">
                  Quatity
                </TableHead>
                <TableHead className="sm:w-[100px] text-right">Price</TableHead>
                <TableHead className="sm:w-[100px] text-right">
                  Amount
                </TableHead>
                <TableHead className="sm:w-[100px] text-right">
                  Remove
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems?.map((data, index) => (
                <TableRow key={data.product_id}>
                  <TableCell className="font-medium">
                    <img
                      src={import.meta.env.VITE_BASE_API + data.imageUrl}
                      loading="lazy"
                      alt=""
                      className="md:h-[150px] md:w-[150px] h-[50px] w-[50px] rounded-xl"
                    />
                  </TableCell>
                  <TableCell className="font-semibold text-xl">
                    {data.name}
                  </TableCell>
                  <TableCell className="text-right">{data.quantity}</TableCell>
                  <TableCell className="text-right">{data.price}</TableCell>
                  <TableCell className="text-right">
                    {data.totalPrice}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      onClick={() => {
                        removeItem(data.product_id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>Total</TableCell>
                <TableCell className="text-right">
                  {parseFloat(totalPrice)} Bath
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <div className="flex gap-10 mt-10 md:flex-row flex-col ">
            <div className="flex flex-col gap-2 md:text-lg text-base font-bold w-[20%] ">
              <p>Address</p>
              <Select onValueChange={selectAddress} >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select your address" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {address.map((address, index) => (
                      <SelectItem value={address.id}>
                        Address {index + 1}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {choiceAddress?.map((address) => (
              <div className="flex flex-col gap-1 py-4 px-10 border-2 rounded-xl w-[100%] md:w-[80%]">
                <p>📌</p>
                <p>{address.address}</p>
                <div className="flex gap-2">
                  <p>{address.city}</p>
                  <p>{address.province}</p>
                  <p>{address.zipCode}</p>
                </div>
                <p>Phone number : {address.phoneNumber}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end w-[100%] my-10">
            <Button
              variant="outline"
              className="cursor-pointer md:text-lg text-base font-bold "
              onClick={() => setOpenConfirm((prev) => !prev)}
            >
              Submit Order
            </Button>
          </div>
        </div>
      )}

      {!openConfirm ? (
        ""
      ) : (
        <CartConfirm
          data={cartItems}
          totalPrice={totalPrice}
          address={choiceAddress}
          setOpen={setOpenConfirm}
        />
      )}
    </div>
  );
};

export default Cart;
