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

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface CounterpartMovementsChartProps {
  ingresos: number;
  gastos: number;
}

export function CounterpartMovementsChart({ ingresos, gastos }: CounterpartMovementsChartProps) {
  const chartData: ChartData<'doughnut'> = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [
      {
        label: 'Ingresos vs Gastos',
        data: [ingresos, gastos],
        backgroundColor: ['#2ECC71', '#E74C3C'], // Colores verde para ingresos, rojo para gastos
        borderColor: 'white',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Ingresos vs Gastos en Movimientos de Contrapartidas',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
}
