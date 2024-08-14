import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import camerIcons from "../images/icons/camera.png";
import userIcons from "../images/icons/user.png";

import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { ContextProviderContext } from "@/provider/contextProvider";
import axios from "axios";

const ProfileAccount = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    image: "",
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

  const uploadImg = () => {
    const input = document.getElementById("upload_file");
    input.click(); // Trigger the file input's click event
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    console.log(formData);

    try {
      await axios
        .request({
          method: "POST",
          url: import.meta.env.VITE_BASE_API + "/api/upload",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
          data: formData,
        })
        .then((res) => {
          toast.success("Image uploaded successfully");
          getUserDetail();
        });
    } catch (error) {
      toast.error("Can't upload image");
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:px-10 px-4 sm:mt-10 mt-4">
      {/* Profile update */}
      <div className="sm:w-[80%] w-[100%] flex flex-col items-center gap-4 border-2 rounded-lg shadow-lg p-4">
        <div className="relative  rounded-full h-[150px] w-[150px]">
          <img
            src={
              userDetail.image != ""
                ? import.meta.env.VITE_BASE_API + userDetail.image
                : userIcons
            }
            alt=""
            className="rounded-full h-[150px] w-[150px] bg-white shadow-md"
          />
          <div
            onClick={uploadImg}
            className="flex items-center justify-center  rounded-full h-[30px] w-[30px] absolute bottom-0 right-0 bg-white dark:bg-slate-500 shadow-sm border-2"
          >
            <img src={camerIcons} alt="" className=" h-[20px] w-[20px] " />
            <input
              type="file"
              className="hidden"
              id="upload_file"
              onChange={handleFileChange}
            />
          </div>
        </div>

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
