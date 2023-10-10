import React, { useState } from "react";
import Pokeball from "./Logo/Pokeball";
import Modal from "./Modal";

const ThirdParty = () => {
  const [modal, setModal] = useState(false);
  const [thirdParty, setThirdParty] = useState(false);

  const handleClick = () => {
    console.log("click ball");
    setModal(!modal);
  };

  const fetchPokemon = () => {};

  return (
    <>
      <div
        onClick={handleClick}
        style={{ bottom: 0, position: "absolute" }}
        className="w-[300px] h-[300px] z-[99999] mx-auto left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] "
      >
        {<Pokeball />}
      </div>
      {modal && <Modal />}
    </>
  );
};

export default ThirdParty;
