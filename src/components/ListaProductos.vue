<script setup>
import ProductoCard from './ProductoCard.vue'

defineProps({
  productos: { type: Array, required: true }
})
const emit = defineEmits(['agregar-producto'])
</script>

<template>
  <section id="catalogo" class="seccion">
    <h2 class="seccion__titulo">Catálogo</h2>
    <div class="grid">
      <!-- Reenvía agregar-al-carrito de cada tarjeta como agregar-producto -->
      <ProductoCard
        v-for="producto in productos"
        :key="producto.id"
        :producto="producto"
        @agregar-al-carrito="emit('agregar-producto', $event)"
      />
    </div>
  </section>
</template>
