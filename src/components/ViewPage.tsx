import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const ViewPage = () => {
  const [state, setState] = useState<any>();
  const [pokeArray, setPokeArray] = useState();
  const [nickname, setNickname] = useState("");
  const [origin, setOrigin] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      if (tabs && tabs[0]) {
        const tab = tabs[0];
        chrome.cookies.get({ url: tab.url, name: "pokemonArray" }, (cookie) => {
          if (cookie) {
            console.log(cookie.value);
            setState(cookie.value);
          } else {
            console.log("Cookie not found");
          }
        });
      }
    });
  });

  console.log(state);

  const decodedData: any = decodeURIComponent(state && state);
  //   const dataArray = JSON.parse(decodedData);
  //   const dataArray = JSON.parse(decodedData && decodedData);

  console.log("---VIEW", decodedData);

  useEffect(() => {
    if (decodedData && decodedData) {
      try {
        const dataArray = JSON.parse(decodedData && decodedData);
        console.log("---VIEW", dataArray);
        setPokeArray(dataArray);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.error("Decoded data is undefined or empty.");
    }
  }, [decodedData]);

  console.log("--ARRAY", pokeArray);

  return (
    <div className="flex flex-col gap-3">
      {/* <div onClick={() => setViewPage(false)}>BACK</div> */}
      {pokeArray &&
        // @ts-ignore
        pokeArray.map((item: any, index) => {
          return (
            <ul>
              <li>
                {index + 1}. Nickname: <b>{item.nickname}</b>
              </li>
              <li className="pl-3">
                Original Name: <b>{item.originName}</b>
              </li>
            </ul>
          );
        })}
    </div>
  );
};

export default ViewPage;
