import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { ContextProviderContext } from "@/provider/contextProvider";

const CartConfirm = ({ data, totalPrice, address, setOpen }) => {
  const [cartItems, setCartItems] = useState(data);
  const { token } = useContext(ContextProviderContext);

  const SubmitOrder = async () => {
    console.log("click Submit");
    setOpen((prev) => !prev);
    if (address.length <= 0) {
      toast.error("Please select your address!");
      return;
    } else {
      orderProduct();
    }
  };
  useEffect(() => {
    setCartItems(data);
    console.log(data);
  }, [data]);

  const orderProduct = async () => {
    try {
      let orderData = {
        address_id: address[0].id,
        totalPrice: totalPrice,
        products: cartItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      };

      console.log(orderData);

      await axios
        .request({
          url: import.meta.env.VITE_BASE_API + "/api/order",
          method: "POST",
          data: orderData,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          toast.success("Order placed successfully!");
          setCartItems([]);
        });
    } catch (error) {
      toast.error("Failed to place order");
      console.error(error.response.data.error[0]);
    }
  };

  return (
    <div className="my-10  flex justify-end">
      <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <p className="sm:text-xl text-base">
                {" "}
                Please check order list before submit order ?
              </p>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="overflow-scroll no-scrollbar md:h-[50vh] h-[40vh] w-[85vw] md:w-auto ">
                <Table>
                  <TableHeader>
                    <TableRow className="font-bold text-md">
                      <TableHead className="md:w-[50px] w-[20px]">
                        Image
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="md:w-[50px] w-[20px] text-right">
                        Quatity
                      </TableHead>
                      <TableHead className="md:w-[50px] w-[20px] text-right">
                        Price
                      </TableHead>
                      <TableHead className="md:w-[50px] w-[20px] text-right">
                        Amount
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
                            className="md:h-[40px] md:w-[40px] h-[30px] w-[30px]   rounded-xl"
                          />
                        </TableCell>
                        <TableCell className="font-semibold text-md">
                          {data.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {data.quantity}
                        </TableCell>
                        <TableCell className="text-right">
                          {data.price}
                        </TableCell>
                        <TableCell className="text-right">
                          {data.totalPrice}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={4}>Total</TableCell>
                      <TableCell className="text-right">
                        {parseFloat(totalPrice)} Bath
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>

                <div className="m-6">
                  {address.map((address) => (
                    <div className="flex flex-col gap-1 py-4 px-10 border-2 rounded-xl w-[100%]">
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
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen((prev) => !prev)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction>
              <Button onClick={SubmitOrder}>OK</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CartConfirm;
