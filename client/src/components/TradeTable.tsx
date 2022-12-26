import React from "react";
import { useAppContext } from "../context/AppContext";
import { format } from "date-fns";
import { datePattern } from "../App";
import styled from "styled-components";

export const TradeTable = () => {
  const [{ tradeData }] = useAppContext();
  
  const [rowIndex, setRowIndex] = React.useState<number | null>();
  
  return (
    <Table style={{width: '100%', backgroundColor: '#2C333D'}}>
      <TableHead>
        <THeadRow>
          <th><THeadText>Value</THeadText></th>
          <th><THeadText>Date and time</THeadText></th>
          {/*TODO: remove unused element, styles for trows*/}
          <th></th>
        </THeadRow>
      </TableHead>
      <tbody>
        {Object.entries(tradeData).map(([key, value], idx) => {
          return (
            <TableRow
                key={key}
                onMouseEnter={() => {
                    setRowIndex(idx)}}
                onMouseLeave={() => setRowIndex(null)}
            >
              <TableData><ValueText>{value.value}</ValueText></TableData>
              <TableData><DateText>{format(new Date(value.date), datePattern)}</DateText></TableData>
              {<RemoveButton isHidden={rowIndex !== idx}>kek</RemoveButton>}
            </TableRow>
          );
        })}
      </tbody>
    </Table>
  );
};

const THeadText = styled.span`
    color: #FFFFFF;
`;

const ValueText = styled.span`
    color: #CAD3E8;
`;

const DateText = styled.span`
    color: #9AA5BE;
`;

const TableData = styled.td`
    text-align: center;
`;

const TableHead = styled.thead`
    background-color: #282F39;
`;

const Table = styled.table`
  width: 100$;
  background-color: #2C333D;
`;

const RemoveButton = styled.button<{isHidden: boolean}>`
    visibility: ${props => props.isHidden ? 'hidden' : 'visible'}
`;

const THeadRow = styled.tr`
  height: 48px;
  min-height: 48px; 
`;

const TableRow = styled.tr`
    height: 48px;
    min-height: 48px;   
    &:hover {
        background-color: #303E4B;
    }
`

