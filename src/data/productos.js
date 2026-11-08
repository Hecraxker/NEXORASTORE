const img = (n) => new URL(`../assets/images/${n}.svg`, import.meta.url).href

export const catalogoInicial = [
  { id: 1, nombre: 'Portátil Zenith 15', imagen: img('portatil'), descripcion: 'Portátil 15.6" Ryzen 7, 16 GB RAM, SSD 512 GB', valor: 2899000, descuento: 15 },
  { id: 2, nombre: 'Audífonos Pulse ANC', imagen: img('audifonos'), descripcion: 'Audífonos Bluetooth con cancelación de ruido', valor: 189000, descuento: 20 },
  { id: 3, nombre: 'Mouse Glide Pro', imagen: img('mouse'), descripcion: 'Mouse inalámbrico ergonómico de 4000 DPI', valor: 89000, descuento: 0 },
  { id: 4, nombre: 'Teclado Forge TKL', imagen: img('teclado'), descripcion: 'Teclado mecánico retroiluminado sin teclado numérico', valor: 159000, descuento: 10 },
  { id: 5, nombre: 'Monitor Vista 27', imagen: img('monitor'), descripcion: 'Monitor IPS 27" QHD a 144 Hz', valor: 799000, descuento: 0 },
  { id: 6, nombre: 'Smartphone Orbit X', imagen: img('smartphone'), descripcion: 'Smartphone 6.7" AMOLED, 256 GB, cámara de 50 MP', valor: 1799000, descuento: 25 },
  { id: 7, nombre: 'Cámara Web Clara 4K', imagen: img('camara'), descripcion: 'Cámara web 4K con enfoque automático y micrófono dual', valor: 249000, descuento: 0 },
  { id: 8, nombre: 'Parlante Boom Mini', imagen: img('parlante'), descripcion: 'Parlante Bluetooth resistente al agua, 12 h de batería', valor: 129000, descuento: 30 },
  { id: 9, nombre: 'Smartwatch Tempo S', imagen: img('smartwatch'), descripcion: 'Reloj inteligente con GPS y monitor cardíaco', valor: 459000, descuento: 0 },
  { id: 10, nombre: 'Cargador Rápido 65W', imagen: img('cargador'), descripcion: 'Cargador GaN USB-C de 65 W para portátil y celular', valor: 99000, descuento: 5 }
]
