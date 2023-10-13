import React from "react";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "../store";

interface CardProps {
  img: string;
  title: string;
  amount?: number;
  bgColor?: string;
}

const OverviewCard: React.FC<CardProps> = ({ img, title, amount, bgColor }) => {
  const pokeSaved = useSelector((state: RootState) => state.data.pokeSaved);
  return (
    <div
      className={`w-[352px] h-[132px] p-4  bg-opacity-25 rounded-xl justify-start items-start flex  ${bgColor}`}
    >
      <div className="grow shrink basis-0 p-4 flex-row justify-start items-start gap-4 flex">
        <div className="w-12 h-12 p-3 bg-zinc-900 rounded-[48px] justify-center items-center inline-flex">
          <img
            src={img}
            alt="img"
            className=" relative flex-col justify-start items-start flex w-12 h-12"
          />
        </div>
        <div className="self-stretch justify-start items-start gap-4 inline-flex">
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
            <div className="self-stretch justify-start items-center gap-1 inline-flex">
              <div className="text-neutral-700 text-[13px] font-semibold leading-none">
                {title}
              </div>
            </div>
            <div className="self-stretch text-zinc-900 text-5xl font-semibold leading-[48px]">
              {amount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
