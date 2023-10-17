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
            <div className="pb-3">
              <div className="bg-[#EFEFEF]">
                <img
                  src={item.URL}
                  alt="img"
                  className="h-[200px] pb-4 mx-auto"
                />
              </div>
              <div className="flex flex-row justify-between pt-4">
                <ul>
                  <li className="text-2xl">
                    <b>{item.nickname}</b>
                  </li>
                  <li className="text-[15px]">
                    <b>{item.originName}</b>
                  </li>
                </ul>
                <div className="bg-red-500 text-white px-[20px] py-3 font-bold h-12 flex items-center rounded-xl">
                  Release
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ViewPage;
