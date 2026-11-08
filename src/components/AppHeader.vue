<script setup>
// Props: datos que llegan desde App.vue
defineProps({
  nombreTienda: { type: String, required: true },
  cantidadItems: { type: Number, default: 0 }
})
// Emits: acciones que se comunican al padre
const emit = defineEmits(['ver-carrito'])
</script>

<template>
  <header class="header">
    <div class="contenedor header__fila">
      <a class="logo" href="#catalogo" aria-label="Ir al catálogo">
        <span class="logo__marca">N</span>{{ nombreTienda }}
      </a>
      <nav class="nav" aria-label="Navegación principal">
        <a class="nav__link" href="#catalogo">Catálogo</a>
        <button class="btn btn--carrito" type="button" @click="emit('ver-carrito')">
          <span aria-hidden="true">🛒</span> Carrito
          <span class="badge" aria-live="polite">{{ cantidadItems }}</span>
        </button>
      </nav>
    </div>
  </header>
</template>
