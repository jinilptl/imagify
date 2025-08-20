import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { delay, motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowlogin, backendUrl, setToken, setUser } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        console.log('login call');
           
        const { data } = await axios.post(
          "http://localhost:4000/api/v1/user/login",
          { email, password },
          { withCredentials: true } // VERY IMPORTANT if backend uses cookies
        );
            console.log("data is ",data);
            
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowlogin(false);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
         "http://localhost:4000/api/v1/user/signup",
          { name, email, password },
          { withCredentials: true }
        );
          console.log("signup data is ",data);
          
        if(data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          setShowlogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm text-center mb-6">
          Welcome back! Please sign in to continue
        </p>

        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.user_icon} alt="" />
            <input
              type="text"
              className="outline-none text-sm w-full"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="" />
          <input
            type="email"
            className="outline-none text-sm w-full"
            placeholder="Email id"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.lock_icon} alt="" />
          <input
            type="password"
            className="outline-none text-sm w-full"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <p className=" text-sm text-blue-600 my-4 cursor-pointer">
          Forgot Password
        </p>

        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-2 rounded-full mt-6"
        >
          {state === "Login" ? "login" : "Create Account"}
        </button>

        {/* write forgot passwoed line??? */}
        {state === "Login" ? (
          <p className="mt-5 text-center text-sm">
            Don't have an account?
            <span
              onClick={() => {
                setState("Sign up");
              }}
              className="text-blue-600 cursor-pointer ml-1"
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-2 text-center text-sm">
            Already have an account?
            <span
              onClick={() => {
                setState("Login");
              }}
              className="text-blue-600 cursor-pointer ml-1"
            >
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => {
            setShowlogin(false);
          }}
          src={assets.cross_icon}
          alt="Close"
          className="absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
};

export default Login;
