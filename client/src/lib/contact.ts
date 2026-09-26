/**
 * Datos de contacto de Dialez Holidays. Única fuente de verdad para los
 * botones de WhatsApp y teléfono de toda la web (y para el SEO).
 */
export const PHONE_E164 = "+34822263492";
export const PHONE_DISPLAY = "822 263 492";
export const PHONE_HREF = `tel:${PHONE_E164}`;
export const EMAIL = "contacto@dialezproperties.es";

const WHATSAPP_NUMBER = PHONE_E164.replace("+", "");

export const DEFAULT_WHATSAPP_TEXT = "Hola, me interesa la gestión de alquiler vacacional de mi vivienda en Tenerife.";

/** WhatsApp link with a prefilled message. */
export function whatsappUrl(text: string = DEFAULT_WHATSAPP_TEXT): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Management fee, the only pricing figure the site publishes. */
export const MANAGEMENT_FEE_PERCENT = 15;
