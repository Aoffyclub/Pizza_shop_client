import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { ContextProviderContext } from "@/provider/contextProvider";
import { toast } from "react-hot-toast";
import TypingAnimation from "@/components/magicui/typing-animation";

const Order = () => {
  const [order, setOrder] = useState([]);
  const { token } = useContext(ContextProviderContext);
  useEffect(() => {
    getOrder();
  }, [token]);

  const getOrder = async () => {
    try {
      await axios
        .request({
          url: import.meta.env.VITE_BASE_API + "/api/order",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data.data[0]);
          setOrder(res.data.data);
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
            text={"Your order items"}
            className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold"
          />
        </div>

        {/* Loop order */}
        <div className="w-[100%] flex flex-col gap-4">
          {order.map((order) => (
            <div className="w-[100%] flex flex-col gap-2 border-2 rounded-xl shadow-lg md:p-5 p-2">
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

              <div className="text-end md:text-lg text-base font-semibold">
                Total price : {order.totalPrice} Bath
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
