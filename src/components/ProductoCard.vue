<script setup>
import { computed, ref } from 'vue'
import { formatearMoneda, valorConDescuento } from '../utils/formato'

const props = defineProps({
  producto: { type: Object, required: true }
})
const emit = defineEmits(['agregar-al-carrito'])

// Precio final = valor × (1 - descuento / 100)
const precioFinal = computed(() => valorConDescuento(props.producto.valor, props.producto.descuento))
const tieneDescuento = computed(() => props.producto.descuento > 0)

// Alternativa visual si la imagen falla
const imagenFallida = ref(false)
</script>

<template>
  <article class="card">
    <div class="card__media">
      <span v-if="tieneDescuento" class="etiqueta">-{{ producto.descuento }}%</span>
      <img v-if="!imagenFallida" :src="producto.imagen" :alt="producto.nombre" loading="lazy" @error="imagenFallida = true" />
      <div v-else class="card__vacia" role="img" :aria-label="producto.nombre">📦</div>
    </div>
    <div class="card__cuerpo">
      <h3 class="card__titulo">{{ producto.nombre }}</h3>
      <p class="card__desc">{{ producto.descripcion }}</p>
      <div class="precios">
        <span v-if="tieneDescuento" class="precio-viejo">{{ formatearMoneda(producto.valor) }}</span>
        <span class="precio-final">{{ formatearMoneda(precioFinal) }}</span>
      </div>
      <button class="btn btn--primario" type="button" @click="emit('agregar-al-carrito', producto)">Comprar</button>
    </div>
  </article>
</template>
