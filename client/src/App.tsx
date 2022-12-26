import React from "react";
import * as io from "socket.io-client";
import { NewDealModal } from "./components/NewDealModal";
import { Chart } from "./components/Chart";
import { TradeTable } from "./components/TradeTable";
import { useAppContext } from "./context/AppContext";
import { AppHeader } from "./components/AppHeader";
import styled from "styled-components";
import ReactDOM from "react-dom";

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

  const modalRoot =
    document.getElementById("modal-root") ?? document.createElement("div");

  const ModalPortal = () =>
    ReactDOM.createPortal(
      <NewDealModal onClose={handleCloseModal} />,
      modalRoot
    );

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
    <AppMainContainer isBlurred={isModalOpen}>
      <AppHeader handleOpenModal={handleOpenModal} />
      <Chart />
      {isModalOpen && <ModalPortal />}
      <TradeTable />
    </AppMainContainer>
  );
}

export default App;

const AppMainContainer = styled.div<{ isBlurred: boolean }>`
  ${(props) => (props.isBlurred ? "filter: blur(15px)" : null)};
  width: 400px;
`;
