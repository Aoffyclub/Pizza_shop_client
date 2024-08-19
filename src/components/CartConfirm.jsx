import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const CartConfirm = ({ data, totalPrice, setOpen }) => {
  const [cartItems, setCartItems] = useState(data);
  const SubmitOrder = async () => {
    console.log("click Submit");
  };
  useEffect(() => {
    setCartItems(data);
    console.log(data);
  }, [data]);

  return (
    <div className="my-10 w-[100%] flex justify-end">
      <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Please check order list before submit order ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="overflow-scroll no-scrollbar h-[50vh]">
                <Table>
                  <TableHeader>
                    <TableRow className="font-bold text-md">
                      <TableHead className="sm:w-[50px]">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="sm:w-[50px] text-right">
                        Quatity
                      </TableHead>
                      <TableHead className="sm:w-[50px] text-right">
                        Price
                      </TableHead>
                      <TableHead className="sm:w-[50px] text-right">
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
                            className="h-[40px] w-[40px] rounded-xl"
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
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen((prev) => !prev)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => setOpen((prev) => !prev)}>
              <Button onClick={SubmitOrder}>OK</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CartConfirm;
