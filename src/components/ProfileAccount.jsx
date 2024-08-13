import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { ContextProviderContext } from "@/provider/contextProvider";
import axios from "axios";

const ProfileAccount = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    image: "kkkk",
    email: "",
    birth: "",
  });
  const { token, userDetail, getUserDetail } = useContext(
    ContextProviderContext
  );

  const handleChangeUserInfo = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post(
        import.meta.env.VITE_BASE_API + "/api/userInfo",
        JSON.stringify(userInfo),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        getUserDetail();
      });

    try {
    } catch (error) {
      toast.error("Can't update or add datails user info");
    }
  };


  return (
    <div className="flex flex-col gap-3 sm:px-10 px-4 sm:mt-10 mt-4">
      {/* Profile update */}
      <div className="sm:w-[80%] w-[100%] flex flex-col items-center gap-4 border-2 rounded-lg shadow-lg p-4">
        <img
          src={import.meta.env.VITE_BASE_API + userDetail.image}
          alt=""
          className="rounded-full h-[150px] w-[150px] bg-white shadow-md"
        />

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex gap-2 items-center ">
            <Label htmlFor="firstName" className="w-[120px] font-bold">
              First name :
            </Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              className="font-bold"
              placeholder={userDetail.firstName}
              onChange={handleChangeUserInfo}
              required
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label htmlFor="lastName" className="w-[120px] font-bold">
              Last name :
            </Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              className="font-bold"
              placeholder={userDetail.lastName}
              onChange={handleChangeUserInfo}
              required
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label htmlFor="email" className="w-[120px] font-bold">
              Email :
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              className="font-bold"
              placeholder={userDetail.email}
              onChange={handleChangeUserInfo}
              required
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label htmlFor="birth" className="w-[120px] font-bold">
              Birth day :
            </Label>
            <Input
              type="date"
              id="birth"
              name="birth"
              className="font-bold"
              onChange={handleChangeUserInfo}
              required
            />
          </div>
          <div>
            <Button
              variant="outline"
              type="submit"
              className="font-bold md:text-xl text-base"
            >
              Update profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileAccount;
