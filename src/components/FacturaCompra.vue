<script setup>
import { formatearMoneda, valorConDescuento } from '../utils/formato'

defineProps({
  nombreTienda: { type: String, required: true },
  items: { type: Array, required: true },
  resumen: { type: Object, required: true },
  numeroFactura: { type: String, required: true },
  fecha: { type: String, required: true }
})
const emit = defineEmits(['nueva-compra'])
</script>

<template>
  <section class="seccion factura">
    <div class="factura__cab">
      <div>
        <h2 class="seccion__titulo">{{ nombreTienda }}</h2>
        <p class="factura__sub">Factura de venta</p>
      </div>
      <div class="factura__datos">
        <strong>{{ numeroFactura }}</strong>
        <span>Fecha: {{ fecha }}</span>
      </div>
    </div>

    <div class="tabla-scroll">
      <table class="tabla">
        <thead>
          <tr>
            <th>Producto</th><th>Cant.</th><th>Valor unitario</th><th>Descuento</th><th>Valor con descuento</th><th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.producto.id">
            <td><strong>{{ item.producto.nombre }}</strong><br /><small>{{ item.producto.descripcion }}</small></td>
            <td>{{ item.cantidad }}</td>
            <td>{{ formatearMoneda(item.producto.valor) }}</td>
            <td>{{ item.producto.descuento }}%</td>
            <td>{{ formatearMoneda(valorConDescuento(item.producto.valor, item.producto.descuento)) }}</td>
            <td>{{ formatearMoneda(valorConDescuento(item.producto.valor, item.producto.descuento) * item.cantidad) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <dl class="resumen resumen--factura">
      <div><dt>Total de descuentos</dt><dd>-{{ formatearMoneda(resumen.totalDescuentos) }}</dd></div>
      <div><dt>Subtotal después de descuentos</dt><dd>{{ formatearMoneda(resumen.subtotalConDescuento) }}</dd></div>
      <div><dt>IVA (19 %)</dt><dd>{{ formatearMoneda(resumen.iva) }}</dd></div>
      <div class="resumen__total"><dt>Total a pagar</dt><dd>{{ formatearMoneda(resumen.totalPagar) }}</dd></div>
    </dl>

    <div class="factura__acciones">
      <button class="btn btn--secundario" type="button" @click="$el.ownerDocument.defaultView.print()">Imprimir factura</button>
      <button class="btn btn--primario" type="button" @click="emit('nueva-compra')">Nueva compra</button>
    </div>
  </section>
</template>
