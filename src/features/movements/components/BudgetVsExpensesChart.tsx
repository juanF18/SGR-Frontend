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

interface BudgetVsExpensesChartProps {
  presupuesto: number; // Presupuesto total
  gastos: number; // Gastos totales
}

export function BudgetVsExpensesChart({ presupuesto, gastos }: BudgetVsExpensesChartProps) {
  const chartData: ChartData<'doughnut'> = {
    labels: ['Presupuesto', 'Gastos'],
    datasets: [
      {
        label: 'Presupuesto vs Gastos',
        data: [presupuesto, gastos],
        backgroundColor: ['#3498DB', '#FF33A6'], // Colores azul para presupuesto, rojo para gastos
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
        text: 'Presupuesto vs Gastos',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
}
