import React, { useEffect, useState } from "react";
import OverviewCard from "./OverviewCard";

const MainPage = () => {
  const [isCatching, setIsCatching] = useState(false);
  const [testState, setTestState] = useState(false);

  const fetchPokemon = () => {
    setIsCatching(true);
    chrome.storage.local.set({ isCatching: true });

    // to change the state for show / unshown the pokeball (still not working yet)
    chrome.runtime.sendMessage({ action: "performAction" }, (response) => {
      if (response && response.result) {
        console.log("Popup received a response:", response.result);
        setTestState(true);
      }
    });
  };

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      const activeTab = tabs[0];
      if (activeTab) {
        chrome.tabs.sendMessage(activeTab.id, {
          action: "executeFunction",
        });
      }
    });
  }, [fetchPokemon]);

  return (
    <div className="w-[400px] p-6">
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
          amount={0}
          bgColor="bg-[#B5E4CA]"
        />
        <div className="mx-auto py-6">
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
        <div className="mx-auto py-6">
          <button
            // type="submit"
            className="text-neutral-50 text-[15px] font-bold leading-normal h-12 px-5 py-3 bg-blue-500 hover:bg-blue-400 rounded-xl w-[186px]"
          >
            View my Pokemons
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
