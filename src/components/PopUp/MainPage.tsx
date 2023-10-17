import React, { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "../../store";
import OverviewCard from "./OverviewCard";
import ViewPage from "./ViewPokemonPage";

const MainPage = () => {
  const [isCatching, setIsCatching] = useState(false);
  const [testState, setTestState] = useState(false);
  const [viewPage, setViewPage] = useState(false);
  const [count, setCount] = useState<any>(0);

  const fetchPokemon = () => {
    setIsCatching(true);
    chrome.storage.local.set({ isCatching: true });

    // to change the state for show / unshown the pokeball
    chrome.runtime.sendMessage({ action: "performAction" }, (response) => {
      if (response && response.result) {
        console.log("Popup received a response:", response.result);
        setTestState(true);
      }
    });
  };

  const Logout = () => {
    chrome.runtime.sendMessage({ action: "logout" }, (response) => {
      chrome.storage.local.clear(() => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          console.log("Local storage has been cleared.");
        }
      });
      if (response && response.result) {
        console.log("----logout clicked");
      }
    });
  };

  // const pokeSaved = useSelector((state: RootState) => state.data.pokeSaved);

  // get pokemon count
  useEffect(() => {
    chrome.storage.local.get("theArrayLength", (result) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        const myData = result.theArrayLength;
        if (myData) {
          console.log("---LENGT RETRIEVED", myData);
          setCount(myData);
        } else {
          console.log("---no length found");
        }
      }
    });
  });

  return (
    <Provider store={store}>
      <div className="w-[400px] p-6">
        {viewPage ? (
          <div>
            <div
              className="cursor-pointer text-[20px] font-semibold"
              onClick={() => setViewPage(false)}
            >
              BACK
            </div>
            <div className="font-bold text-[32px] pb-2">My Pokemons</div>
            <ViewPage />
          </div>
        ) : (
          <div className="flex flex-col gap-8 mx-auto">
            <div className="justify-start items-center gap-4 flex">
              <div className="w-4 h-8 relative bg-violet-300 rounded" />
              <div className="text-zinc-900 text-base md:text-xl font-semibold leading-loose">
                Overview
              </div>
            </div>
            <OverviewCard
              img="https://i.imgur.com/7bU84cU.png"
              title="Pokemons Catched"
              bgColor="bg-[#B5E4CA]"
              amount={count}
            />
            <div className="mx-auto py-">
              <button
                // type="submit"
                className={`text-neutral-50 text-[15px] font-bold leading-normal h-12 px-5 py-3 bg-blue-500 hover:bg-blue-400 rounded-xl w-[176px] ${
                  isCatching ? "bg-red-500" : "bg-blue-500"
                }`}
                onClick={fetchPokemon}
              >
                Catch a Pokemons
              </button>
            </div>
            <div className="mx-auto py-2">
              <button
                onClick={() => setViewPage(true)}
                className="text-neutral-50 text-[15px] font-bold leading-normal h-12 px-5 py-3 bg-blue-500 hover:bg-blue-400 rounded-xl w-[186px]"
              >
                View my Pokemons
              </button>
            </div>
            <div className="mx-auto py-2">
              <button
                onClick={Logout}
                className="text-neutral-50 text-[15px] font-bold leading-normal h-12 px-5 py-3 bg-blue-500 hover:bg-blue-400 rounded-xl w-[186px]"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </Provider>
  );
};

export default MainPage;
