// src/utils/whatsapp.ts

import type { ProductoCarrito } from '../types/index'

/**
 * Genera el mensaje que se enviará por WhatsApp con formato Printica
 * @param nombre - Nombre del cliente
 * @param productos - Array de productos en el carrito
 * @param total - Total acumulado
 * @param direccion - Dirección de entrega (opcional)
 * @returns string con el mensaje completo
 */
export function generarMensajeWhatsApp(
  nombre: string,
  productos: ProductoCarrito[],
  total: number,
  direccion?: string
): string {
  const saludo = `👋 ¡Hola Printica! Soy *${nombre}* y quiero hacer el siguiente pedido:\n`

  const lista = productos
    .map(
      (prod) =>
        `• ${prod.nombre} x${prod.cantidad} - Gs. ${prod.precio.toLocaleString()}`
    )
    .join('\n')

  const resumen = `\n\n🧾 *Total:* Gs. ${total.toLocaleString()}`
  const datosExtra = direccion ? `\n\n📍 *Dirección:* ${direccion}` : ''

  return `${saludo}\n${lista}${resumen}${datosExtra}\n\n✅ Pedido generado desde *Printica Web*.`
}

/**
 * Genera un link directo a WhatsApp con el mensaje ya listo
 * @param numero - Número de teléfono (ej. 595986271647)
 * @param mensaje - Mensaje ya generado por `generarMensajeWhatsApp`
 * @returns string con el enlace completo
 */
export function generarLinkWhatsApp(numero: string, mensaje: string): string {
  const urlMensaje = encodeURIComponent(mensaje)
  return `https://wa.me/${numero}?text=${urlMensaje}`
}
