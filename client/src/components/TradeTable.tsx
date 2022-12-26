import React from "react";
import { useAppContext } from "../context/AppContext";
import { format } from "date-fns";
import { datePattern, socket } from "../App";
import styled from "styled-components";
import { CloseBtn } from "./NewDealModal";
import { ReactComponent as RemoveIcon } from "../icons/Trash.svg";
import { DISPLAY_DATA_COUNT } from "../constants/constants";

export const TradeTable = () => {
  const [{ tradeData, itemsToDisplay }, { onSetItemsToDisplay }] =
    useAppContext();

  const [rowIndex, setRowIndex] = React.useState<number | null>();

  const handleLoadNext = React.useCallback(() => {
    onSetItemsToDisplay((prev) => {
      return {
        ...prev,
        from: prev.from + DISPLAY_DATA_COUNT,
        to: prev.to + DISPLAY_DATA_COUNT,
      };
    });
  }, [onSetItemsToDisplay]);

  const handleLoadPrevious = React.useCallback(() => {
    onSetItemsToDisplay((prev) => {
      return {
        ...prev,
        from: prev.from - DISPLAY_DATA_COUNT,
        to: prev.to - DISPLAY_DATA_COUNT,
      };
    });
  }, [onSetItemsToDisplay]);

  return (
    <ContentContainer>
      <Table>
        <TableHead>
          <THeadRow>
            <th>
              <THeadText>Value</THeadText>
            </th>
            <th>
              <THeadText>Date and time</THeadText>
            </th>
            {/*TODO: remove unused element, styles for trows*/}
            <th></th>
          </THeadRow>
        </TableHead>
        <tbody>
          {Object.entries(tradeData)
            .slice(itemsToDisplay.from, itemsToDisplay.to)
            .map(([key, value], idx) => {
              return (
                <TableRow
                  key={key}
                  onMouseEnter={() => {
                    setRowIndex(idx);
                  }}
                  onMouseLeave={() => setRowIndex(null)}
                >
                  <TableData>
                    <ValueText>{value.value}</ValueText>
                  </TableData>
                  <TableData>
                    <DateText>
                      {format(new Date(value.date), datePattern)}
                    </DateText>
                  </TableData>
                  {
                    <TableData>
                      <RemoveButton
                        isHidden={rowIndex !== idx}
                        onClick={() => {
                          socket.emit("removeSingleTrade", key);
                        }}
                      >
                        <RemoveIcon />
                      </RemoveButton>
                    </TableData>
                  }
                </TableRow>
              );
            })}
        </tbody>
      </Table>
      <SubTableContent>
        {itemsToDisplay.from > 0 && (
          <LoadPreviousButton onClick={() => handleLoadPrevious()}>
            <LoadLessLabel>Load previous page</LoadLessLabel>
          </LoadPreviousButton>
        )}
        <LoadNextButton onClick={() => handleLoadNext()}>
          <LoadMoreLabel>Load next page</LoadMoreLabel>
        </LoadNextButton>
      </SubTableContent>
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  height: 467px;
  min-height: 467px;
  max-height: 467px;
  display: flex;
  flex-direction: column;
  z-index: 0;
`;

const Table = styled.table`
  height: 100%;
  width: 100$;
  background-color: #2c333d;
`;

const TableHead = styled.thead`
  background-color: #282f39;
`;

const TableData = styled.td`
  text-align: center;
  align-items: center;
`;

const THeadRow = styled.tr`
  height: 48px;
  min-height: 48px;
  max-height: 48px;
`;

const TableRow = styled.tr`
  height: 48px;
  min-height: 48px;
  &:hover {
    background-color: #303e4b;
  }
`;

const THeadText = styled.span`
  color: #ffffff;
`;

const ValueText = styled.span`
  color: #cad3e8;
`;

const DateText = styled.span`
  color: #9aa5be;
`;

const RemoveButton = styled(CloseBtn)<{ isHidden: boolean }>`
  visibility: ${(props) => (props.isHidden ? "hidden" : "visible")};
`;

const LoadNextButton = styled(CloseBtn)`
  background-color: rgba(0, 163, 255, 0.1);
  margin: 24px 0px 24px 0px;
  border-radius: 6px;
  width: 140px;
  height: 32px;
`;

const LoadPreviousButton = styled(LoadNextButton)`
  margin-right: 10px;
`;

const LoadMoreLabel = styled.span`
  color: #00a3ff;
`;

const LoadLessLabel = styled(LoadMoreLabel)``;

const SubTableContent = styled.div`
  display: flex;
  width: 100%;
  background-color: #282f39;
  justify-content: center;
`;
