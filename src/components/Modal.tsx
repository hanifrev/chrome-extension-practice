import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Loading from "../assets/Loading.json";
import Cookies from "js-cookie";

const Modal = () => {
  const [fetched, setFetched] = useState(false);
  const [data, setData] = useState<any>({});

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
              action="submit"
              style={{
                paddingTop: 16,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                width: 360,
                maxWidth: 360,
              }}
              // onSubmit={submitHandler}
            >
              <label
                htmlFor="nickname"
                style={{ fontSize: 15, color: "black" }}
              >
                Nickname
              </label>
              <input
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
