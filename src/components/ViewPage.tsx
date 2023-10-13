import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const ViewPage = () => {
  const [state, setState] = useState<any>();

  const pokeSaved = useSelector((state: RootState) => state.data.pokeSaved);

  useEffect(() => {
    // const pokeSaved = useSelector((state: RootState) => state.data.pokeSaved);
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "updatePoke") {
        setState(message.countPoke);
        console.log("----updatepoke");
      }
    });
    setState(pokeSaved);
  }, [pokeSaved]);

  const cook = Cookies.get("cookPoke");

  return (
    <div>
      {/* <div onClick={() => setViewPage(false)}>BACK</div> */}
      <div className="font-bold">View Pokemon</div>
      {state}
      {cook}
    </div>
  );
};

export default ViewPage;
