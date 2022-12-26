import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../icons/Logo.svg";
import { CloseBtn } from "./NewDealModal";

export const AppHeader = ({
  handleOpenModal,
}: {
  handleOpenModal: () => void;
}) => {
  return (
    <HeaderContainer>
      <LogoWithLabel>
        <Logo width={40} height={40} />
        <Label>Mango Deals</Label>
      </LogoWithLabel>
      <AddNewDealButton onClick={handleOpenModal}>
        <NewDealLabel>New Deal</NewDealLabel>
      </AddNewDealButton>
    </HeaderContainer>
  );
};

const Label = styled.p`
  letter-spacing: 0.3rem;
  color: #ffffff;
  margin-left: 5px;
`;

const LogoWithLabel = styled.p`
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(#1f252f, #27303e);
`;

export const AddNewDealButton = styled(CloseBtn)`
  background: linear-gradient(180deg, #3eaeff 0%, #00aae0 100%);
  border: 3px solid #1b4154;
  border-radius: 6px;
  width: 90px;
  height: 30px;
  margin-right: 20px;
`;

const NewDealLabel = styled.span`
  color: #ffffff;
`;
