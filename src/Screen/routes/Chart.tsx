import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../../api";
import { useCoinId } from "./Coin";
import ReactApexChart from "react-apexcharts";

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
  return (
    <div>
      {isLoading ? (
        "Loading"
      ) : (
        <ReactApexChart
          type="line"
          height={300}
          width={500}
          series={[
            {
              name: "sales",
              data: data?.map((price) => parseFloat(price.close)) as number[],
            },
          ]}
          options={{
            colors: ["#00b894"],
            theme: {
              mode: "dark",
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            chart: {
              toolbar: {
                show: false,
              },
              background: "#2d3436",
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
