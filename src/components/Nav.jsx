import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Toggle from "./Toggle";
import { Link, useNavigate } from "react-router-dom";
import { ContextProviderContext } from "@/provider/contextProvider";
import pizza from "../images/pizza.png";
import userIcons from "../images/icons/user.png";

const Nav = () => {
  const { localToken, token, userDetail } = useContext(ContextProviderContext);
  const [loginCreate, setLoginCreate] = useState("login");
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(userDetail);
  }, [userDetail]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    callAPI();
  };

  const callAPI = async () => {
    let setAPI = loginCreate == "login" ? "/api/login" : "/api/user";
    try {
      await axios
        .post(import.meta.env.VITE_BASE_API + setAPI, JSON.stringify(inputs), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // handle success
          toast.success(res.data.message);
          if (loginCreate == "login") {
            localToken(res.data.token);
          } else {
            setLoginCreate("login");
          }
        });
    } catch (error) {
      if (error.response.status == 404 || error.response.status == 400) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.response.data.error[0]);
      }
    }
  };

  const logOut = () => {
    toast.success("Log out success");
    setTimeout(() => {
      localStorage.removeItem("token");
      localToken(null);
      navigate("/");
    }, 700);
  };
  return (
    <div className="flex items-center justify-between w-full h-[75px] px-5 shadow-lg border-t-2 bg-white dark:bg-[#020817] dark:border-b-[1px] sticky top-0 overflow-hidden z-10">
      <div className="sm:flex hidden">
        <Link to={"/"}>
          <img src={pizza} alt="" className="h-[60px] w-[120px]" />
        </Link>
      </div>
      <div className="flex gap-8 items-center">
        <div>
          <ul className="flex items-center gap-4 md:text-lg text-base font-bold">
            <Link to={"/"}>
              <li className="cursor-pointer">Home</li>
            </Link>
            <Link to={"/menu"}>
              <li className="cursor-pointer">Menu</li>
            </Link>
            <Link to={"/cart"}>
              <li className="cursor-pointer">Cart</li>
            </Link>
          </ul>
        </div>

        <div className="flex gap-2 items-center">
          {token ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full font-bold md:text-lg text-base"
                >
                  Profile
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-2xl">Profile</SheetTitle>
                  <SheetDescription>
                    <div className="flex flex-col gap-4 mt-4 mb-10">
                      {userDetail ? (
                        <div className="flex flex-col gap-2 text-lg">
                          <img
                            src={
                              userDetail.image != ""
                                ? import.meta.env.VITE_BASE_API +
                                  userDetail.image
                                : userIcons
                            }
                            alt=""
                            className="h-[70px] w-[70px] rounded-full shadow-md border-2"
                          />
                          <div>
                            <p>Username : {userDetail.username}</p>
                          </div>
                          <div>
                            <p>Fisrt Name : {userDetail.firstName}</p>
                          </div>
                          <div>
                            <p>Last Name : {userDetail.lastName}</p>
                          </div>
                          <div>
                            <p>Email : {userDetail.email}</p>
                          </div>
                          <div>
                            <p>Birth Day : {userDetail.birth}</p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p>No data</p>
                        </div>
                      )}
                    </div>
                  </SheetDescription>
                </SheetHeader>

                <SheetFooter>
                  <SheetClose asChild>
                    <div className="flex gap-2">
                      <Link to="/profile/account">
                        <Button
                          variant="outline"
                          onClick={(prev) => setOpen(!prev)}
                        >
                          Edit profile
                        </Button>
                      </Link>
                      <div>
                        <Button onClick={logOut} variant="outline">
                          Log out
                        </Button>
                      </div>
                    </div>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="font-bold md:text-lg text-base"
                >
                  Log in
                </Button>
              </SheetTrigger>
              <SheetContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <SheetHeader>
                    <SheetTitle>
                      <div className="flex gap-2">
                        <div
                          onClick={() => setLoginCreate("login")}
                          className={`${
                            loginCreate == "login"
                              ? "border-b-2 font-bold"
                              : "font-normal"
                          }  cursor-pointer`}
                        >
                          Log in
                        </div>
                        <div
                          onClick={() => setLoginCreate("create")}
                          className={`${
                            loginCreate == "create"
                              ? "border-b-2 font-bold"
                              : "font-normal"
                          }  cursor-pointer`}
                        >
                          Create
                        </div>
                      </div>
                    </SheetTitle>
                    <SheetDescription>
                      <div className="flex flex-col gap-5 mt-5">
                        <Input
                          type="text"
                          placeholder="username"
                          name="username"
                          value={inputs.username}
                          onChange={handleChange}
                        />

                        <Input
                          type="password"
                          placeholder="password"
                          name="password"
                          autoComplete="current-password"
                          value={inputs.password}
                          onChange={handleChange}
                        />
                      </div>
                    </SheetDescription>
                  </SheetHeader>

                  <SheetFooter>
                    <SheetClose asChild>
                      <Button variant="outline" type="submit">
                        {loginCreate == "login" ? "Log in" : "Create account"}
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </form>
              </SheetContent>
            </Sheet>
          )}

          <Toggle />
        </div>
      </div>
    </div>
  );
};

export default Nav;
