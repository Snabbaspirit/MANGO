import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables, ChartEvent } from "chart.js";
import { useAppContext } from "../context/AppContext";
import { prepareDataToDataset } from "../utils/appUtils";
ChartJS.register(...registerables);

const defaultChartOptions = {
  responsive: true,
  onHover: () => void 0,
  plugins: {
    tooltip: {
      enabled: false,
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        display: false,
      },
    },
    y: {
      ticks: {
        display: false,
      },
    },
  },
};

const defaultDataset = {
  datasets: [
    {
      backgroundColor: "#00A3FF",
      borderWidth: 3,
      pointBorderWidth: 1,
      borderColor: "#00A3FF",
      data: [],
      hoverBackgroundColor: "#FFFFFF",
      pointHoverRadius: 5,
      hoverBorderColor: "rgba(200, 200, 200, 1)",
      tension: 0.4,
    },
  ],
};

export const Chart = () => {
  const [{ tradeData, itemsToDisplay }] = useAppContext();

  const options = useMemo(() => {
    return {
      ...defaultChartOptions,
      onHover: (_: ChartEvent, elements: any[]) => {
        if (elements.length !== 0) {
          console.log("hover from options", elements);
        }
      },
    };
  }, []);

  const dataset = React.useMemo(() => {
    const formattedData = prepareDataToDataset(tradeData).slice(
      itemsToDisplay.from,
      itemsToDisplay.to
    );

    const defaultDatasetWithData = {
      ...defaultDataset,
      datasets: [
        ...defaultDataset.datasets.map((e) => {
          return {
            ...e,
            data: formattedData,
          };
        }),
      ],
    };

    return defaultDatasetWithData;
  }, [tradeData, itemsToDisplay]);

  return (
    <div>
      <Line
        style={{ background: "linear-gradient(#1E2530,#293341)" }}
        width={500}
        height={300}
        options={options}
        data={dataset}
      />
    </div>
  );
};
