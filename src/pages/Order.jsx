import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { ContextProviderContext } from "@/provider/contextProvider";
import { toast } from "react-hot-toast";
import TypingAnimation from "@/components/magicui/typing-animation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Qr from "../images/qr.png";

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

const Order = () => {
  const [orders, setOrders] = useState([]); // Renamed to `orders` to store the original data
  const [filteredOrders, setFilteredOrders] = useState([]); // New state for filtered data
  const [tab, setTab] = useState("pending");
  const { token } = useContext(ContextProviderContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getOrder();
    }
  }, [token]);

  const dataTab = [
    {
      name: "Pending",
      state: "pending",
      active: tab === "pending",
    },
    {
      name: "Process",
      state: "processing",
      active: tab === "processing",
    },
    {
      name: "Ship",
      state: "shipped",
      active: tab === "shipped",
    },
    {
      name: "Complete",
      state: "delivered",
      active: tab === "delivered",
    },
    {
      name: "Cancel",
      state: "cancelled",
      active: tab === "cancelled",
    },
  ];

  const getOrder = async () => {
    try {
      const res = await axios.request({
        url: import.meta.env.VITE_BASE_API + "/api/order",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      setOrders(res.data.data);
      filterOrders("pending", res.data.data); // Set initial filtered data to "pending"
    } catch (error) {
      if (error.response.status === 404 || error.response.status === 400) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.response.data.error[0]);
      }
    }
  };

  const filterOrders = (status, allOrders = orders) => {
    setTab(status);
    const filtered = allOrders.filter((item) => item.status === status);
    setFilteredOrders(filtered);
  };

  const OrderDetail = (orderID) => {
    navigate(`/order/${orderID}`);
  };

  const PayOnline = async (orderID) => {
 
    const mData = {
      order_id: orderID,
      status: "processing",
    };

    try {
      await axios
        .request({
          url: import.meta.env.VITE_BASE_API + "/api/order/status",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          data: mData,
        })
        .then((res) => {
          toast.success(res.data.message);
          getOrder();
        });
    } catch (error) {
      if (error.response.status === 404 || error.response.status === 400) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.response.data.error[0]);
      }
    }
  };

  const CancelOrder = async (orderID) => {
    console.log(orderID);
      const mData = {
        order_id: orderID,
        status: "cancelled",
      };

    try {
      await axios
        .request({
          url: import.meta.env.VITE_BASE_API + "/api/order/cancel",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          data: mData,
        })
        .then((res) => {
          toast.success(res.data.message);
          getOrder();
        });
    } catch (error) {
      if (error.response.status === 404 || error.response.status === 400) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.response.data.error[0]);
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:px-10 px-4 sm:mt-10 mt-4 items-center sm:items-start">
      <div className="flex flex-col w-[100%] md:px-10 gap-6 mb-4 overflow-scroll no-scrollbar">
        <div className="flex">
          <TypingAnimation
            text={"Your order items"}
            className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold"
          />
        </div>

        <div className="h-[50px] w-auto items-center flex gap-4 rounded-xl dark:bg-slate-800 bg-slate-100 border-2 shadow-lg px-4">
          {dataTab.map((data) => (
            <div
              key={data.name}
              onClick={() => filterOrders(data.state)}
              className={`w-[80px] h-[75%] flex items-center justify-center md:text-base text-sm rounded-xl font-semibold ${
                data.active
                  ? "dark:bg-slate-600 bg-slate-300 cursor-pointer"
                  : ""
              }`}
            >
              {data.name}
            </div>
          ))}
        </div>

        {/* Loop through filtered orders */}
        {filteredOrders.length > 0 ? (
          <div className="w-[100%] flex flex-col gap-4">
            {filteredOrders.map((order) => (
              <div
                key={order.order_id} // Added key for unique identification
                className="w-[100%] flex flex-col gap-2 border-2 rounded-xl shadow-lg md:p-5 p-2"
              >
                <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                  <p className="font-semibold md:text-lg text-sm">Order ID :</p>
                  <p className="md:text-lg text-sm"> {order.order_id}</p>
                </div>
                {order.orderItems.map((orderItem) => (
                  <div
                    key={orderItem.product_id}
                    className="flex md:px-6 py-2 items-center justify-between border-b-2"
                  >
                    <div className="flex gap-6 items-center">
                      <img
                        src={
                          import.meta.env.VITE_BASE_API +
                          orderItem.product.imageUrl
                        }
                        alt=""
                        className="md:h-[70px] md:w-[70px] h-[50px] w-[50px] rounded-xl"
                        loading="lazy"
                      />
                      <div className="flex flex-col">
                        <p className="font-semibold md:text-lg text-sm">
                          {orderItem.product.name}
                        </p>
                        <p>X {orderItem.quantity}</p>
                      </div>
                    </div>
                    <p>{orderItem.product.price * orderItem.quantity} Bath</p>
                  </div>
                ))}

                <div className="flex items-center justify-between md:text-lg text-base font-semibold">
                  <div className="flex gap-2 sm:flex-row flex-col">
                    <Button
                      onClick={() => OrderDetail(order.order_id)}
                      variant="outline"
                      className="font-bold"
                    >
                      Detail
                    </Button>
                    {tab == "pending" ? (
                      <div className="flex gap-2 sm:flex-row flex-col">
                        {/* Pay order */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" className="font-bold">
                              Pay Now
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Pay online with QR code?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                <div className="flex flex-col items-center gap-2 mt-4">
                                  <img
                                    src={Qr}
                                    alt=""
                                    className="h-[300px] rounded-xl"
                                  />
                                  <p>
                                    Order ID : <strong>{order.order_id}</strong>
                                  </p>
                                </div>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => PayOnline(order.order_id)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        {/* Cancel order */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" className="font-bold">
                              Cancel
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you absolutely sure to cancel order ID:{" "}
                                <strong>{order.order_id}</strong>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => CancelOrder(order.order_id)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    ) : null}
                  </div>
                  <p> Total price : {order.totalPrice} Bath</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center md:text-lg text-base">No Order</div>
        )}
      </div>
    </div>
  );
};

export default Order;
