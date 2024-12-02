// components/ProjectStatusChart.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartData,
  ChartOptions,
} from 'chart.js';

// Registrar los componentes necesarios para Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface ProjectStatusChartProps {
  labels: string[];
  data: number[];
}

export function ProjectStatusChart({ labels, data }: ProjectStatusChartProps) {
  const chartData: ChartData<'doughnut'> = {
    labels,
    datasets: [
      {
        label: 'Estado del Proyecto',
        data,
        backgroundColor: ['#FF9F40', '#4CAF50', '#FFC107'], // Colores para "En ejecución", "Terminado", "Por terminar"
        borderColor: 'white',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Estado del Proyecto',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
}
