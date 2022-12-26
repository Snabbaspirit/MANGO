import React from "react";
import * as io from "socket.io-client";
import { NewDealModal } from "./components/NewDealModal";
import { Chart } from "./components/Chart";
import { ReactComponent as Logo } from "./icons/Logo.svg";
import styled from "styled-components";
import { TradeTable } from "./components/TradeTable";
import { useAppContext } from "./context/AppContext";

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
      // Emit a message that we want to get all the data from server
      socket.emit("getTradeData");
    });
  }, []);

  React.useEffect(() => {
    socket.on("dataFromServer", (allData) => {
      onSetTradeData(allData);
    });
  }, [onSetTradeData]);

  return (
    <div style={{ width: "400px", border: "1px solid red" }}>
      <AppHeader>
        <p>
          <Logo width={30} height={30} />
          <span>Mango Deals</span>
        </p>
        <button onClick={handleOpenModal}>New Deal</button>
      </AppHeader>
      <Chart />
      {isModalOpen ? <NewDealModal onClose={handleCloseModal} /> : <TradeTable />}
    </div>
  );
}

export default App;

const AppHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
