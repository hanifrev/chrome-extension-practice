import React from "react";
import Pokeball from "./Logo/Pokeball";

const ThirdParty = () => {
  return (
    <div
      onClick={() => console.log("pokeball")}
      className="w-[300px] h-[300px] z-[99999] mx-auto bg-red-500 fixed left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] "
    >
      <Pokeball />
    </div>
  );
};

export default ThirdParty;
