import { valorConDescuento } from './formato'

export const TASA_IVA = 0.19

// Calcula todos los totales a partir de los items reales del carrito
export function calcularResumen(items) {
  const unidades = items.reduce((t, i) => t + i.cantidad, 0)
  const subtotalRegular = items.reduce((t, i) => t + i.producto.valor * i.cantidad, 0)
  const totalDescuentos = items.reduce(
    (t, i) =>
      t + (i.producto.valor - valorConDescuento(i.producto.valor, i.producto.descuento)) * i.cantidad,
    0
  )
  const subtotalConDescuento = subtotalRegular - totalDescuentos
  const iva = Math.round(subtotalConDescuento * TASA_IVA)
  const totalPagar = subtotalConDescuento + iva
  return { unidades, subtotalRegular, totalDescuentos, subtotalConDescuento, iva, totalPagar }
}
