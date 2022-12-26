import React from "react";
import { TTradeDataFromServer } from "../types/types";
import { DISPLAY_DATA_COUNT } from "../constants/constants";

interface IItemsToDisplay {
  from: number;
  to: number;
}

export interface IAppData {
  tradeData: TTradeDataFromServer;
  itemsToDisplay: IItemsToDisplay;
}

export interface IAppHandlers {
  onSetTradeData: React.Dispatch<React.SetStateAction<TTradeDataFromServer>>;
  onSetItemsToDisplay: React.Dispatch<React.SetStateAction<IItemsToDisplay>>;
}

const defaultAppData: [IAppData, IAppHandlers] = [
  {
    tradeData: {},
    itemsToDisplay: { from: 0, to: DISPLAY_DATA_COUNT },
  },
  {
    onSetTradeData: () => void 0,
    onSetItemsToDisplay: () => void 0,
  },
];

const Context = React.createContext(defaultAppData);

export const AppContext = ({ children }: { children: React.ReactNode }) => {
  const [tradeData, setTradeData] = React.useState<TTradeDataFromServer>(
    defaultAppData[0].tradeData
  );

  const [itemsToDisplay, setItemsToDisplay] = React.useState(
    defaultAppData[0].itemsToDisplay
  );

  return (
    <Context.Provider
      value={[
        { tradeData, itemsToDisplay },
        {
          onSetTradeData: setTradeData,
          onSetItemsToDisplay: setItemsToDisplay,
        },
      ]}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => React.useContext(Context);
