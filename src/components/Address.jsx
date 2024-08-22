import { useEffect, useState, useContext } from "react";
import { ContextProviderContext } from "@/provider/contextProvider";
import { toast } from "react-hot-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";

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

const Address = () => {
  const [address, setAddress] = useState([]);

  const { token } = useContext(ContextProviderContext);
  const [newAddress, SetNewAddress] = useState({
    address: "",
    city: "",
    province: "",
    zipCode: "",
    phoneNumber: "",
  });

  const [editaddress, setEditAddress] = useState({
    id: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    phoneNumber: "",
  });

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  useEffect(() => {
    getAddress();
  }, []);

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
          setAddress(res.data.data);
        });
    } catch (error) {
      toast.error("Failed to get address");
    }
  };
  const deleteAddress = async (id) => {
    setOpen3(false);
    let mData = {
      id: id,
    };
    try {
      await axios
        .request({
          url: import.meta.env.VITE_BASE_API + "/api/address",
          method: "DELETE",
          data: mData,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          getAddress();
        });
    } catch (error) {
      if (error.response.status == 404) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.response.data.error[0]);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    SetNewAddress((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const handleChange2 = (event) => {
    const { name, value } = event.target;
    setEditAddress((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  // Add new address
  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(false);
    console.log(newAddress);
    try {
      await axios
        .request({
          url: import.meta.env.VITE_BASE_API + "/api/address",
          method: "POST",
          data: newAddress,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          getAddress();
        });
    } catch (error) {
      if (error.response.status == 404) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.response.data.error[0]);
      }
    }
  };

  // Edit address
  const handleSubmit2 = async (event) => {
    event.preventDefault();
    setOpen2(false);

    let mData = {
      id: editaddress.id,
      address: editaddress.address,
      city: editaddress.city,
      province: editaddress.province,
      zipCode: editaddress.zipCode,
      phoneNumber: editaddress.phoneNumber,
    };

    try {
      await axios
        .request({
          url: import.meta.env.VITE_BASE_API + "/api/address",
          method: "PATCH",
          data: mData,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          getAddress();
        });
    } catch (error) {
      if (error.response.status == 404) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.response.data.error[0]);
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:px-10 px-4 sm:mt-10 mt-4 items-center sm:items-start">
      <div className="sm:w-[90%] w-[100%] flex flex-col items-center gap-4 border-2 rounded-lg shadow-lg p-4">
        <h1 className="font-bold text-lg"> Your address</h1>
        <div className="w-full flex justify-end">
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <p className="cursor-pointer text-[12px] border-b-2">
                New Address
              </p>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add new address</AlertDialogTitle>
                <AlertDialogDescription>
                  <div>Fill in the new address information.</div>
                  <div className="flex flex-col gap-3 mt-4">
                    <Input
                      type="text"
                      placeholder="Address"
                      name="address"
                      value={newAddress.address}
                      onChange={handleChange}
                    />

                    <Input
                      type="text"
                      placeholder="City"
                      name="city"
                      value={newAddress.city}
                      onChange={handleChange}
                    />
                    <Input
                      type="text"
                      placeholder="Province"
                      name="province"
                      value={newAddress.province}
                      onChange={handleChange}
                    />
                    <Input
                      type="number"
                      placeholder="Zip code"
                      name="zipCode"
                      value={newAddress.zipCode}
                      onChange={handleChange}
                    />
                    <Input
                      type="number"
                      placeholder="Phone number"
                      name="phoneNumber"
                      value={newAddress.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>
                  <Button onClick={handleSubmit}>OK</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {address?.map((data, index) => {
          return (
            <div
              key={data.id}
              className="flex border-[1px] sm:w-[85%] w-[95%] py-3 sm:pl-10 pl-2 pr-1 shadow-md rounded-md text-base"
            >
              <div className="flex flex-col sm:w-[90%] w-[85%]">
                <p>📌</p>
                <p>{data.address}</p>
                <div className="flex gap-2">
                  <p>{data.city}</p>
                  <p>{data.province}</p>
                  <p>{data.zipCode}</p>
                </div>
                <p>Phone number : {data.phoneNumber}</p>
              </div>
              <div className="sm:w-[10%] w-[15%] flex flex-col gap-2">
                <AlertDialog open={open2} onOpenChange={setOpen2}>
                  <AlertDialogTrigger asChild>
                    <Button
                      key={data.id}
                      variant="outline"
                      className="text-[10px]"
                      onClick={() => setEditAddress(data)}
                    >
                      Edit
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Edit address</AlertDialogTitle>
                      <AlertDialogDescription>
                        <div>Fill in the update address information.</div>
                        <div className="flex flex-col gap-3 mt-4">
                          <Input
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={editaddress.address}
                            onChange={handleChange2}
                          />

                          <Input
                            type="text"
                            placeholder="City"
                            name="city"
                            value={editaddress.city}
                            onChange={handleChange2}
                          />
                          <Input
                            type="text"
                            placeholder="Province"
                            name="province"
                            value={editaddress.province}
                            onChange={handleChange2}
                          />
                          <Input
                            type="number"
                            placeholder="Zip code"
                            name="zipCode"
                            value={editaddress.zipCode}
                            onChange={handleChange2}
                          />
                          <Input
                            type="number"
                            placeholder="Phone number"
                            name="phoneNumber"
                            value={editaddress.phoneNumber}
                            onChange={handleChange2}
                          />
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>
                        <Button onClick={handleSubmit2}>OK</Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog
                  key={"address" + data.id}
                  open={open3}
                  onOpenChange={setOpen3}
                >
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-[10px]">
                      Delete
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure to delete address ?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure to delete this address
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>
                        <Button onClick={() => deleteAddress(data.id)}>
                          OK
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Address;
