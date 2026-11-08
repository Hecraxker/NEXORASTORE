const formatoCOP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0
})

export const formatearMoneda = (valor) => formatoCOP.format(valor)

// Valor con descuento: valor × (1 - descuento / 100), redondeado
export const valorConDescuento = (valor, descuento) =>
  Math.round(valor * (1 - descuento / 100))
