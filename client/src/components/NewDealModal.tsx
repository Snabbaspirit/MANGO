import React from "react";
import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../icons/close.svg";
import { datePattern, socket } from "../App";
import { v1 as uuid } from "uuid";
import { format } from "date-fns";

interface IModalProps {
  onClose: () => void;
}

export const NewDealModal = (props: IModalProps) => {
  const { onClose } = props;

  const [inputValue, setInputValue] = React.useState<string>("");
  const [actualDate, setActualDate] = React.useState<Date>(new Date());

  React.useEffect(() => {

    const interval = setInterval(() => {
        setActualDate(new Date());
    }, 1000);

    return () => clearInterval(interval)

  }, []);

  return (
    <Container>
      <ModalHeader>
        Make a New Deal{" "}
        <CloseBtn onClick={onClose}>
          <CloseIcon />
        </CloseBtn>{" "}
      </ModalHeader>
      <form>
        <input
          style={{ display: "block" }}
          type="text"
          value={format(actualDate, datePattern)}
        />
        <input
          type="text"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </form>
      <button
        onClick={() => {
          socket.emit("message", {
            id: uuid(),
            date: new Date(),
            value: inputValue,
          });
          onClose();
        }}
      >
        Proceed
      </button>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 5% 5%;
  width: 334px;
  height: 430px;
  background: gray;
`;

const ModalHeader = styled.div`
  height: 30px;
  width: 263px;
`;

const CloseBtn = styled.button`
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`;
