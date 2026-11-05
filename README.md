# NEXORA STORE – Tienda virtual con Vue 3

Tienda de productos tecnológicos con catálogo, carrito y factura. Demuestra componentes, **props** (padre → hijo) y **emits** (hijo → padre).

## Tecnologías
Vue 3 (Composition API, `<script setup>`), Vite, JavaScript, HTML y CSS.

## Estructura
```
src/
├── App.vue                  (único dueño del estado)
├── main.js
├── components/
│   ├── AppHeader.vue
│   ├── ListaProductos.vue
│   ├── ProductoCard.vue     (se repite con v-for)
│   ├── CarritoCompra.vue
│   ├── FacturaCompra.vue
│   └── AppFooter.vue
├── data/productos.js        (10 productos iniciales)
├── utils/formato.js         (COP y precio con descuento)
├── utils/calculos.js        (subtotal, descuentos, IVA 19 %, total)
└── assets/styles/main.css
```

## Props
- AppHeader: `nombreTienda`, `cantidadItems`
- ListaProductos: `productos`
- ProductoCard: `producto` (obligatoria)
- CarritoCompra: `items`, `resumen`
- FacturaCompra: `nombreTienda`, `items`, `resumen`, `numeroFactura`, `fecha`
- AppFooter: `nombreTienda`, `anio`, `contacto`

## Emits
- AppHeader: `ver-carrito`
- ProductoCard: `agregar-al-carrito` (objeto producto)
- ListaProductos: `agregar-producto` (reenvía el de la tarjeta)
- CarritoCompra: `incrementar`, `decrementar`, `eliminar` (id) y `finalizar-compra`
- FacturaCompra: `nueva-compra`

## Flujo de comunicación
`ProductoCard` → `agregar-al-carrito` → `ListaProductos` → `agregar-producto` → `App.vue` → actualiza `carrito` → los hijos reciben datos nuevos por props.

## Estado centralizado
`App.vue` guarda con `ref`: `productos`, `carrito`, `mostrarFactura` y `numeroFactura` (más la fecha y el aviso temporal). Los totales salen de un `computed` y se pasan por props, así carrito y factura siempre coinciden. Los hijos nunca modifican props.

## Cálculos
`subtotalConDescuento = subtotalRegular - totalDescuentos`; `iva = subtotalConDescuento × 0.19`; `total = subtotalConDescuento + iva`.

## Instalación y ejecución
```
npm install
npm run dev      # http://localhost:5173/
npm run build    # compilación de producción
```
