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

  const interval: React.MutableRefObject<
    ReturnType<typeof setInterval> | undefined
  > = React.useRef();

  React.useEffect(() => {
    interval.current = setInterval(() => {
      setActualDate(new Date());
    }, 1000);

    return () => clearInterval(interval.current);
  }, []);

  return (
    <Container>
      <ModalHeader>
        <ModalLabel>Make a New Deal</ModalLabel>
        <CloseBtn onClick={onClose}>
          <CloseIcon />
        </CloseBtn>{" "}
      </ModalHeader>

      <InputContainer>
        <InputLabel>Current Date</InputLabel>
        <Input readOnly type="text" value={format(actualDate, datePattern)} />
      </InputContainer>

      <InputContainer>
        <InputLabel>Enter Value</InputLabel>
        <Input
          type="text"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </InputContainer>

      <ModalFooter>
        <ProceedButton
          onClick={() => {
            socket.emit("message", {
              id: uuid(),
              date: new Date(),
              value: inputValue,
            });
            const timeout = setTimeout(() => {
              onClose();
              clearTimeout(timeout);
            }, 1000);
          }}
        >
          Proceed
        </ProceedButton>
      </ModalFooter>
    </Container>
  );
};

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 40px;
  height: 108px;
  background: #353940;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const Container = styled.div`
  left: 40px;
  top: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  width: 334px;
  background: rgba(255, 255, 255, 0.12);
  position: absolute;
  z-index: 999;
`;

const Input = styled.input`
  width: 266px;
  height: 48px;
  background: rgba(44, 51, 61, 0.5);
  border: 1px solid #3c4251;
  border-radius: 6px;
  font: 1em/1.25em Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: #9aa5be;

  &:hover {
    border: 1px solid #00a3ff;
    box-shadow: 0px 0px 0px 4px rgba(0, 163, 255, 0.1);
  }

  &:focus {
    outline: 0;
    border: 1px solid #00a3ff;
    box-shadow: 0px 0px 0px 4px rgba(0, 163, 255, 0.1);
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 15px;
`;

const InputLabel = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #9aa5be;
`;

const ModalHeader = styled.div`
  margin-top: 30px;
  margin-bottom: 33px;
  display: flex;
  justify-content: space-between;
  height: 30px;
  width: 263px;
`;

export const CloseBtn = styled.button`
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`;

const ModalLabel = styled.span`
  color: #ffffff;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
`;

const ProceedButton = styled(CloseBtn)`
  background: linear-gradient(180deg, #3eaeff 0%, #00aae0 100%);
  box-shadow: 0px 0px 0px 3px rgba(0, 170, 224, 0.19);
  border-radius: 6px;
  width: 120px;
  height: 48px;
`;
