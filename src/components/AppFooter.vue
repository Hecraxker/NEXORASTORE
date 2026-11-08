<script setup>
defineProps({
  nombreTienda: { type: String, required: true },
  anio: { type: Number, required: true },
  contacto: { type: String, required: true }
})
</script>

<template>
  <footer class="footer">
    <div class="contenedor footer__fila">
      <strong>{{ nombreTienda }}</strong>
      <span>{{ contacto }}</span>
      <span>© {{ anio }} {{ nombreTienda }}. Todos los derechos reservados.</span>
    </div>
  </footer>
</template>
