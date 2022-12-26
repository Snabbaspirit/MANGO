import React from "react";
import * as io from "socket.io-client";
import { NewDealModal } from "./components/NewDealModal";
import { Chart } from "./components/Chart";
import { TradeTable } from "./components/TradeTable";
import { useAppContext } from "./context/AppContext";
import { AppHeader } from "./components/AppHeader";

export const socket = io.connect("http://localhost:8080");
export const datePattern = "dd MMM yyyy hh:mm:ss";

function App() {
  const [, { onSetTradeData }] = useAppContext();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  React.useEffect(() => {
    socket.on("connect", () => {
      // Emit a request to get all the data from server
      socket.emit("getTradeData");
    });
  }, []);

  React.useEffect(() => {
    socket.on("dataFromServer", (allData) => {
      onSetTradeData(allData);
    });
  }, [onSetTradeData]);

  return (
    <div style={{ width: "400px" }}>
      <AppHeader handleOpenModal={handleOpenModal} />
      <Chart />
      {isModalOpen ? (
        <NewDealModal onClose={handleCloseModal} />
      ) : (
        <TradeTable />
      )}
    </div>
  );
}

export default App;
