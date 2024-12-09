export const formatInput = (value: string) => {
  if (value === '') return '';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0, // Para no mostrar decimales en la moneda
  }).format(Number(value.replace(/[$,]/g, ''))); // Elimina los símbolos de moneda y comas
};
