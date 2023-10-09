import React from "react";
import Lottie from "lottie-react";
import Loading from "../assets/Loading.json";

const Modal = () => {
  return (
    <div
      className="fixed flex flex-col w-[900px] bg-white"
      style={{
        padding: "33px",
        display: "flex",
        flexDirection: "column",
        background: "#FFFFFF",
        position: "fixed",
        transform: `translateX(50%) translateY(50%)`,
        borderRadius: 20,
      }}
    >
      <div style={{ fontSize: "32px", fontWeight: 800, color: "#000000" }}>
        Catch a pokemon
      </div>
      <div
        style={{
          fontWeight: 600,
          fontSize: "20px",
          paddingTop: "8px",
          paddingBottom: "32px",
          color: "grey",
        }}
      >
        It’s a wild west out there. Good luck, Pokemon Trainer
        IWannaBeTheVeryBest.
      </div>
      <div style={{ width: "320px", margin: "auto" }}>
        <Lottie animationData={Loading} loop={true} />
      </div>
      <div
        className="text-black text-2xl md:text-[40px] text-center font-semibold leading-[48px]"
        style={{
          fontWeight: 600,
          textAlign: "center",
          fontSize: 24,
          color: "#000",
          paddingTop: 38,
        }}
      >
        Looking for a pokemon
      </div>
    </div>
  );
};

export default Modal;
