<script setup>
import { ref, computed } from 'vue'
import AppHeader from './components/AppHeader.vue'
import ListaProductos from './components/ListaProductos.vue'
import CarritoCompra from './components/CarritoCompra.vue'
import FacturaCompra from './components/FacturaCompra.vue'
import AppFooter from './components/AppFooter.vue'
import { catalogoInicial } from './data/productos'
import { calcularResumen } from './utils/calculos'

// ---- Estado compartido (solo vive aquí) ----
const productos = ref(catalogoInicial)
const carrito = ref([]) // [{ producto, cantidad }]
const mostrarFactura = ref(false)
const numeroFactura = ref(0) // último consecutivo emitido
const fechaFactura = ref('')
const aviso = ref('')
const seccionCarrito = ref(null)
let temporizadorAviso

// ---- Cálculos (una sola fuente para carrito y factura) ----
const resumen = computed(() => calcularResumen(carrito.value))
const cantidadTotal = computed(() => resumen.value.unidades)
const numeroFacturaTexto = computed(() => `FACT-${String(numeroFactura.value).padStart(4, '0')}`)

// ---- Acciones del carrito (siempre generan arreglos nuevos) ----
function agregarProducto(producto) {
  const existe = carrito.value.some((i) => i.producto.id === producto.id)
  carrito.value = existe
    ? carrito.value.map((i) => (i.producto.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i))
    : [...carrito.value, { producto, cantidad: 1 }]
  mostrarAviso(`${producto.nombre} agregado al carrito`)
}

function incrementar(id) {
  carrito.value = carrito.value.map((i) => (i.producto.id === id ? { ...i, cantidad: i.cantidad + 1 } : i))
}

function decrementar(id) {
  carrito.value = carrito.value
    .map((i) => (i.producto.id === id ? { ...i, cantidad: i.cantidad - 1 } : i))
    .filter((i) => i.cantidad > 0)
}

function eliminar(id) {
  carrito.value = carrito.value.filter((i) => i.producto.id !== id)
}

function finalizarCompra() {
  if (carrito.value.length === 0) return
  numeroFactura.value += 1
  fechaFactura.value = new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' })
  mostrarFactura.value = true
}

function nuevaCompra() {
  carrito.value = []
  mostrarFactura.value = false
}

function verCarrito() {
  seccionCarrito.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function mostrarAviso(texto) {
  aviso.value = texto
  clearTimeout(temporizadorAviso)
  temporizadorAviso = setTimeout(() => (aviso.value = ''), 2200)
}
</script>

<template>
  <AppHeader nombreTienda="NEXORA STORE" :cantidadItems="cantidadTotal" @ver-carrito="verCarrito" />

  <main class="contenedor">
    <FacturaCompra
      v-if="mostrarFactura"
      nombreTienda="NEXORA STORE"
      :items="carrito"
      :resumen="resumen"
      :numeroFactura="numeroFacturaTexto"
      :fecha="fechaFactura"
      @nueva-compra="nuevaCompra"
    />
    <template v-else>
      <section class="hero">
        <h1>Tecnología que rinde, a precio claro.</h1>
        <p>Portátiles, audífonos, monitores y más, con descuentos reales y factura al instante.</p>
      </section>
      <div class="layout">
        <ListaProductos :productos="productos" @agregar-producto="agregarProducto" />
        <div ref="seccionCarrito" class="layout__carrito">
          <CarritoCompra
            :items="carrito"
            :resumen="resumen"
            @incrementar="incrementar"
            @decrementar="decrementar"
            @eliminar="eliminar"
            @finalizar-compra="finalizarCompra"
          />
        </div>
      </div>
    </template>
  </main>

  <Transition name="aviso"><div v-if="aviso" class="aviso" role="status">{{ aviso }}</div></Transition>

  <AppFooter nombreTienda="NEXORA STORE" :anio="new Date().getFullYear()" contacto="soporte@nexorastore.co · +57 300 000 0000" />
</template>
