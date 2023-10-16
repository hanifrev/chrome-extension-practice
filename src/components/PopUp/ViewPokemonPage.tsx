import React, { useEffect, useState } from "react";

const ViewPage = () => {
  const [state, setState] = useState<any>();
  const [pokeArray, setPokeArray] = useState();

  useEffect(() => {
    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
    //   if (tabs && tabs[0]) {
    //     const tab = tabs[0];
    //     chrome.cookies.get({ url: tab.url, name: "pokemonArray" }, (cookie) => {
    //       if (cookie) {
    //         console.log(cookie.value);
    //         setState(cookie.value);
    //       } else {
    //         console.log("Cookie not found");
    //       }
    //     });
    //   }
    // });

    chrome.storage.local.get("theArray", (result) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        const myData = result.theArray;
        if (myData) {
          console.log("---ARRAY RETRIEVED", myData);
          setPokeArray(myData);
          const length = myData.length;
          console.log(myData.length);
          // chrome.storage.local.set({ theArrayLength: length });
        } else {
          console.log("---no array found");
        }
      }
    });
  }, []);

  console.log("--ARRAY", pokeArray);

  return (
    <div className="flex flex-col gap-3">
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
