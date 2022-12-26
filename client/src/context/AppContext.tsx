import React from "react";
import { TTradeDataFromServer } from "../types/types";

export interface IAppData {
  tradeData: TTradeDataFromServer;
}

export interface IAppHandlers {
  onSetTradeData: React.Dispatch<React.SetStateAction<TTradeDataFromServer>>;
}

const defaultAppData: [IAppData, IAppHandlers] = [
  { tradeData: {} },
  { onSetTradeData: () => void 0 },
];

const Context = React.createContext(defaultAppData);

export const AppContext = ({ children }: { children: React.ReactNode }) => {
  const [tradeData, setTradeData] = React.useState<TTradeDataFromServer>({});

  return (
    <Context.Provider value={[{ tradeData }, { onSetTradeData: setTradeData }]}>
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => React.useContext(Context);
