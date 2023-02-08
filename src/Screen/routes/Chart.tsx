import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../../api";
import { useCoinId } from "./Coin";
import ReactApexChart from "react-apexcharts";
import React from "react";

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

function Chart() {
  const { coinId } = useCoinId();
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
  );

  const coinChart = data?.map((coin) => ({
    x: new Date(coin.time_open),
    y: [
      parseFloat(coin.open),
      parseFloat(coin.high),
      parseFloat(coin.low),
      parseFloat(coin.close),
    ],
  }));
  console.log(coinChart);

  return (
    <div>
      {isLoading ? (
        "Loading"
      ) : (
        <ReactApexChart
          type="candlestick"
          height={300}
          width={500}
          series={[
            {
              data: coinChart!,
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              type: "candlestick",
              height: 350,
            },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
