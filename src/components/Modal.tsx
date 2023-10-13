import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Loading from "../assets/Loading.json";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { pokeCatchData, pokeCount } from "../reducers/pokeSlice";

const Modal = () => {
  const [fetched, setFetched] = useState(false);
  const [data, setData] = useState<any>({});
  const [imgUrl, setImgUrl] = useState("");
  const [nickname, setNickname] = useState("");
  const [saved, setSaved] = useState(false);

  const pokeSaved: any = useSelector(
    (state: RootState) => state.data.pokeSaved
  );
  const getCatchData = useSelector(
    (state: RootState) => state.data.pokemonCatch
  );
  const dispatch = useDispatch<AppDispatch>();

  console.log("--catched data", getCatchData);

  useEffect(() => {
    chrome.runtime.sendMessage({
      message: "FETCH",
    });

    chrome.storage.local.get("PokemonData", (result) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        const myData = result.PokemonData;
        if (myData) {
          console.log("Data retrieved:", myData);
          setData(myData);
          setTimeout(() => {
            setFetched(true);
          }, 2000);
          Cookies.set("pokename", myData.species.name);
        } else {
          console.log("No data found");
        }
      }
    });
  }, []);

  console.log("DATA POKEMON:", data);
  //

  const handleSave = (e: any) => {
    e.preventDefault();
    dispatch(pokeCount(pokeSaved + 1));

    const dataToStore: any = {
      nickname: nickname,
      URL: data && data.sprites.front_default,
      originName: data && data.species.name,
    };

    dispatch(pokeCatchData(dataToStore));

    setTimeout(() => {
      setSaved(true);
    }, 1000);
  };

  {
    saved && alert("saved");
  }
  useEffect(() => {
    chrome.runtime.sendMessage({ type: "pokeData", dataPoke: getCatchData });
    console.log("---data set to cookie");

    // @ts-ignore
    Cookies.set("pokemonArray", getCatchData);
  }, [handleSave]);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "updatePoke", countPoke: pokeSaved });
    console.log("----updatepokeModal");
    Cookies.set("cookPoke", pokeSaved);
  }, [pokeSaved]);

  // useEffect(() => {
  //   // Load the existing data array from cookies, or initialize an empty array
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
  //     if (tabs && tabs[0]) {
  //       const tab = tabs[0];
  //       const tabUrl = tab.url;

  //       // Retrieve the existing data array from cookies
  //       chrome.cookies.get({ url: tabUrl, name: "myDataArray" }, (cookie) => {
  //         let dataArray = [];

  //         if (cookie) {
  //           dataArray = JSON.parse(cookie.value);
  //         }

  //         // Add the new data to the array
  //         dataArray.push(dataToStore);

  //         // Store the updated array back in a cookie
  //         chrome.cookies.set(
  //           {
  //             url: tabUrl,
  //             name: "myDataArray",
  //             value: JSON.stringify(dataArray),
  //             // expirationDate: Math.floor(Date.now() / 1000) + 3600, // Cookie expiration time (1 hour from now)
  //           },
  //           () => {
  //             if (chrome.runtime.lastError) {
  //               console.error(chrome.runtime.lastError);
  //             } else {
  //               console.log(
  //                 "Data stored in the array in the cookie:",
  //                 dataToStore
  //               );
  //             }
  //           }
  //         );
  //       });
  //     }
  //   });
  // }, [handleSave]);

  return (
    <div
      className="fixed flex flex-col w-[900px] bg-white"
      style={{
        padding: "33px",
        display: "flex",
        flexDirection: "column",
        background: "#FFFFFF",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "600px",
        width: "940px",
        borderRadius: 20,
        zIndex: 99999,
      }}
    >
      <div style={{ fontSize: "32px", fontWeight: 800, color: "#000000" }}>
        Catch a pokemon
      </div>
      <div>{pokeSaved}</div>
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
      <div>
        {fetched ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={data && data.sprites.front_default}
              alt="pokemon"
              className="w-[200px] h-[200px]"
              style={{ width: 200, height: 200 }}
            />
            <div style={{ fontWeight: 700, fontSize: 40, color: "black" }}>
              Congratulations!
            </div>
            <div
              style={{
                fontWeight: 500,
                fontSize: 20,
                color: "black",
                paddingTop: 16,
              }}
            >
              You've found a <b>{data && data.species.name}</b>
            </div>
            <form
              style={{
                paddingTop: 16,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                width: 360,
                maxWidth: 360,
              }}
              onSubmit={handleSave}
            >
              <label
                htmlFor="nickname"
                style={{ fontSize: 15, color: "black" }}
              >
                Nickname
              </label>
              <input
                onChange={(e) => setNickname(e.target.value)}
                type="text"
                id="nickname"
                style={{
                  fontSize: 15,
                  color: "black",
                  padding: 15,
                  borderRadius: 12,
                  background: "#F4F4F4",
                }}
                // onChange={inputHandler}
                // value={nicknameVal}
              />
              <button
                style={{
                  width: "100%",
                  padding: 20,
                  background: "#2A85FF",
                  borderRadius: 12,
                  color: "white",
                }}
                // onClick={handleSave}
              >
                Save
              </button>
            </form>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
