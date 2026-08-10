"use client";

import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface RadarChartProps {
  data: { label: string; score: number }[];
  primaryColor?: string;
}

export function RadarChart({ data, primaryColor = "#2d2d2d" }: RadarChartProps) {
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Your score",
        data: data.map((d) => d.score),
        backgroundColor: `${primaryColor}15`,
        borderColor: primaryColor,
        borderWidth: 2,
        pointBackgroundColor: primaryColor,
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 25,
          display: true,
          backdropColor: "transparent",
          font: { size: 11, family: "DM Sans, sans-serif" },
          color: "#8a8a8a",
        },
        grid: {
          color: "#c8d0d840",
        },
        angleLines: {
          color: "#c8d0d840",
        },
        pointLabels: {
          font: { size: 13, family: "DM Sans, sans-serif", weight: "bold" as const },
          color: "#2d2d2d",
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { raw: unknown }) => `${ctx.raw}%`,
        },
      },
    },
  };

  return <Radar data={chartData} options={options} />;
}
