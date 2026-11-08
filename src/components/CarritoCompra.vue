<script setup>
import { computed } from 'vue'
import { formatearMoneda, valorConDescuento } from '../utils/formato'

const props = defineProps({
  items: { type: Array, required: true },
  resumen: { type: Object, required: true }
})
const emit = defineEmits(['incrementar', 'decrementar', 'eliminar', 'finalizar-compra'])

const vacio = computed(() => props.items.length === 0)
</script>

<template>
  <section class="seccion carrito">
    <h2 class="seccion__titulo">Tu carrito</h2>

    <p v-if="vacio" class="vacio">Aún no hay productos en el carrito. Elige algo del catálogo para empezar.</p>

    <ul v-else class="lista-carrito">
      <li v-for="item in items" :key="item.producto.id" class="linea">
        <img class="linea__img" :src="item.producto.imagen" :alt="item.producto.nombre" />
        <div class="linea__info">
          <strong>{{ item.producto.nombre }}</strong>
          <span class="linea__desc">{{ item.producto.descripcion }}</span>
          <span class="linea__precio">
            <s v-if="item.producto.descuento > 0">{{ formatearMoneda(item.producto.valor) }}</s>
            {{ formatearMoneda(valorConDescuento(item.producto.valor, item.producto.descuento)) }}
            <em v-if="item.producto.descuento > 0" class="mini-etiqueta">-{{ item.producto.descuento }}%</em>
          </span>
        </div>
        <div class="linea__acciones">
          <div class="cantidad">
            <button type="button" aria-label="Disminuir cantidad" @click="emit('decrementar', item.producto.id)">−</button>
            <span>{{ item.cantidad }}</span>
            <button type="button" aria-label="Aumentar cantidad" @click="emit('incrementar', item.producto.id)">+</button>
          </div>
          <button class="btn-texto" type="button" @click="emit('eliminar', item.producto.id)">Eliminar</button>
        </div>
      </li>
    </ul>

    <dl v-if="!vacio" class="resumen">
      <div><dt>Subtotal sin descuentos</dt><dd>{{ formatearMoneda(resumen.subtotalRegular) }}</dd></div>
      <div><dt>Total de descuentos</dt><dd>-{{ formatearMoneda(resumen.totalDescuentos) }}</dd></div>
      <div><dt>Total de productos</dt><dd>{{ resumen.unidades }}</dd></div>
      <div class="resumen__total"><dt>Total a pagar (IVA incluido)</dt><dd>{{ formatearMoneda(resumen.totalPagar) }}</dd></div>
    </dl>

    <button class="btn btn--primario btn--ancho" type="button" :disabled="vacio" @click="emit('finalizar-compra')">
      Finalizar compra
    </button>
  </section>
</template>
