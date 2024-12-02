// components/DonutChart.tsx
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

interface DonutChartProps {
  labels: string[];
  data: number[];
}

export function RubrosChart({ labels, data }: DonutChartProps) {
  const chartData: ChartData<'doughnut'> = {
    labels,
    datasets: [
      {
        label: 'Rubros de Gasto',
        data,
        backgroundColor: [
          '#FF5733', // Talento Humano
          '#33FF57', // Equipos y software
          '#3357FF', // Capacitación y eventos
          '#FF33A6', // Servicios tecnológicos y pruebas
          '#F1C40F', // Materiales, insumos y documentación
          '#9B59B6', // Protección del conocimiento y divulgación
          '#E74C3C', // Gastos de viaje
          '#3498DB', // Infraestructura
          '#1ABC9C', // Administrativos
          '#16A085', // Seguimiento
          '#2C3E50', // Otros
        ],
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
        text: 'Distribución de los Rubros de Gasto',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
}
