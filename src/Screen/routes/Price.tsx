import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { fetchCoinPrice } from "../../api";
import { useCoinId } from "./Coin";

interface IHistoricalData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const PriceList = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.textColor};
  height: 40px;
  width: 100%;
  border-radius: 15px;
  margin: 10px;
  padding: 15px 30px;
  display: flex;
  align-items: center;
  text-align: center;
`;
const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

function Price() {
  const { coinId } = useCoinId();
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinPrice(coinId)
  );
  const currentPrice = data ? data[20] : null;
  return (
    <div>
      {isLoading ? (
        "Loading"
      ) : (
        <PriceBox>
          <PriceList>Open Price : ${currentPrice?.open}</PriceList>
          <PriceList>Close Price : ${currentPrice?.close}</PriceList>
          <PriceList>High Price : ${currentPrice?.high}</PriceList>
          <PriceList>Low Price : ${currentPrice?.low}</PriceList>
          <PriceList>
            Volume : {parseFloat(currentPrice?.close as string).toFixed(1)}
          </PriceList>
        </PriceBox>
      )}
    </div>
  );
}

export default Price;
