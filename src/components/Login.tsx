import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import PokemonLogo from "./Logo/PokemonLogo";
import { useNavigate } from "react-router-dom";

interface LoginPage {
  onLogin?: () => void;
}

const Login: React.FC<LoginPage> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const centered: React.CSSProperties = {
    margin: "0",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  const navigate = useNavigate();

  const handleLogin = (e: any) => {
    localStorage.setItem("theUsername", username);
    const theusername = localStorage.getItem("theUsername");

    chrome.storage.local.set({ username }, () => {
      console.log(`${username} is the username`);
    });

    if (theusername) {
      navigate("/main");
    }
  };

  useEffect(() => {
    const myForm = document.querySelector("#myForm");

    if (myForm) {
      console.log("Form element found:", myForm);

      myForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission

        // @ts-ignore
        const username = document.getElementById("username").value;
        // @ts-ignore
        const password = document.getElementById("password").value;

        console.log("Form submitted. Username:", username);
        console.log("Password:", password);

        chrome.runtime.sendMessage({ username, password }, (response) => {
          console.log("Response from background script:", response.message);
        });
      });
    } else {
      console.log("Form element not found.");
    }
  }, []);

  return (
    <div className="w-[400px] h-[500px]">
      <div className="flex flex-col gap-8 w-[320px]" style={centered}>
        <PokemonLogo />
        <div className="text-zinc-900 text-5xl font-semibold leading-[48px]">
          Login
        </div>
        <form
          id="myForm"
          onSubmit={handleLogin}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="h-12 p-3 bg-zinc-100 rounded-xl text-neutral-600 text-[15px] font-semibold mt-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className=" h-12 p-3 bg-zinc-100 rounded-xl text-neutral-600 text-[15px] font-semibold mt-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="text-neutral-50 text-[15px] font-bold leading-normal h-12 px-5 py-3 bg-blue-500 hover:bg-blue-400 rounded-xl"
          >
            Sign in
          </button>
        </form>
        <div>
          <span className="text-gray-500 text-sm font-semibold leading-normal">
            Don’t have an account?{" "}
          </span>
          {/* <Link href="/signup"> */}
          <span className="text-zinc-900 text-sm font-semibold leading-normal">
            Sign up.
          </span>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
