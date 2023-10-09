import React, { useState } from "react";
import Pokeball from "./Logo/Pokeball";
import Modal from "./Modal";

const ThirdParty = () => {
  const [modal, setModal] = useState(false);
  const handleClick = () => {
    console.log("click ball");
    setModal(!modal);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="w-[300px] h-[300px] bottom-0 z-[99999] mx-auto fixed left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] "
      >
        <Pokeball />
      </div>
      {modal && <Modal />}
    </>
  );
};

export default ThirdParty;
