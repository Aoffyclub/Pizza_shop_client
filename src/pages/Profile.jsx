import { Link, Outlet, useNavigate } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ContextProviderContext } from "@/provider/contextProvider";
import { useContext } from "react";

const Profile = () => {
  const { token, localToken } = useContext(ContextProviderContext);
  const navigate = useNavigate();
  const deleteUser = async () => {
    try {
      await axios
        .request({
          url: import.meta.env.VITE_BASE_API + "/api/user",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          toast.success("User deleted successfully");
          localStorage.removeItem("token");
          localToken(null);
          setTimeout(() => {
            navigate("/");
          }, 1500);
        });
    } catch (error) {
      toast.error("Can't delete user please try again");
    }
  };
  return (
    <div className="flex sm:flex-row flex-col w-full mt">
      <div className="flex flex-col gap-3 sm:w-[25%] sm:mt-10 mt-4 sm:items-end items-center">
        <div className="p-4 flex items-start sm:flex-col sm:w-[200px] gap-4 border-2 rounded-lg shadow-lg font-semibold">
          <Link to={"/profile/account"}>
            <p>Account</p>
          </Link>
          <Link to={"/profile/address"}>
            <p>Address</p>
          </Link>

          {/* delete user */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <p className="cursor-pointer">Delete account</p>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you to delete this account?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action will be delete an acoount. Are you sure you want
                  to delete this account?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>
                  <Button onClick={deleteUser}>OK</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="sm:w-[75%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
