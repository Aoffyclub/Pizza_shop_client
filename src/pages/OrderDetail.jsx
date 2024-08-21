import TypingAnimation from "@/components/magicui/typing-animation";
import { ContextProviderContext } from "@/provider/contextProvider";
import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const OrderDetail = () => {
  let { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const { token } = useContext(ContextProviderContext);
  useEffect(() => {
    if (token) {
      getOrderDetail();
    }
  }, []);

  const getOrderDetail = async () => {
    try {
      await axios
        .request({
          url: import.meta.env.VITE_BASE_API + "/api/order/" + orderId,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data.data.orderItems);
          setOrderData(res.data.data);
        });
    } catch (error) {
      if (error.response.status == 404 || error.response.status == 400) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.response.data.error[0]);
      }
    }
  };
  return (
    <div className="flex flex-col gap-3 sm:px-10 px-4 sm:mt-10 mt-4 items-center sm:items-start">
      <div className="flex flex-col w-[100%] md:px-10 gap-6 overflow-scroll no-scrollbar">
        <div className="flex">
          <TypingAnimation
            text={"Your order details"}
            className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold"
          />
        </div>

        <div className="w-[100%] flex flex-col gap-4">
          {orderData ? (
            <div className="w-[100%] flex flex-col  gap-2 border-2 rounded-xl shadow-lg sm:p-5 p-2">
              <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                <p className="font-semibold md:text-xl text-sm">
                  Order ID : {orderData.order_id}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                <p className="font-semibold md:text-lg text-sm">
                  Order Date : {orderData.createdAt.slice(0, 10)}{" "}
                  <span className="pl-2">Time : {orderData.createdAt.slice(11,19)}</span>
                </p>
              </div>
              {orderData.orderItems &&
                orderData.orderItems.map((orderItem) => (
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
                        className="md:h-[120px] md:w-[120px] h-[60px] w-[60px] rounded-xl"
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

              <div className="flex items-center justify-between md:text-xl text-sm font-semibold">
                <div>
                  <p>
                    Status order :
                    <span className="px-2">
                      {orderData.status.toUpperCase()}{" "}
                    </span>
                  </p>
                </div>
                <p> Total price : {orderData.totalPrice} Bath</p>
              </div>

              <div className="flex flex-col w-[100%] p-5 ">
                <div className="flex flex-col gap-1 py-4 px-10 border-2 rounded-xl w-[100%]">
                  <p className="font-semibold">Address to send 📌</p>
                  <p>{orderData.address.address}</p>
                  <div className="flex gap-2">
                    <p>{orderData.address.city}</p>
                    <p>{orderData.address.province}</p>
                    <p>{orderData.address.zipCode}</p>
                  </div>
                  <p>Phone number : {orderData.address.phoneNumber}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">Loading ...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
