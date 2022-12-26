import { TTradeDataFromServer } from "../types/types";

export const prepareDataToDataset = (data: TTradeDataFromServer) => {
    return Object.entries(data).map(([k, v]) => {
        return {
          id: k,
          x: v.date,
          y: v.value,
        };
      });
}