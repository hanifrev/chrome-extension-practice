import React, { useState } from "react";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "../../store";
import Pokeball from "../Logo/Pokeball";
import Modal from "./Modal";

const ThirdParty = () => {
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    console.log("click ball");
    setModal(!modal);
  };

  const closeModal = () => {
    setModal(false);
  };

  const pokeSaved = useSelector((state: RootState) => state.data.pokeSaved);

  return (
    <Provider store={store}>
      <div
        onClick={handleClick}
        style={{ bottom: 0, position: "absolute" }}
        className="w-[300px] h-[300px] z-[99999] mx-auto left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] cursor-pointer"
      >
        {<Pokeball />}
        {pokeSaved}
      </div>
      {modal && <Modal closeModal={closeModal} />}
    </Provider>
  );
};

export default ThirdParty;
