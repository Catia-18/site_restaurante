import { MenuItem, RESTAURANT_INFO } from '../data/restaurantData';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface OrderDetails {
  customerName?: string;
  orderType?: 'delivery' | 'takeaway' | 'dine-in';
  deliveryAddress?: string;
  notes?: string;
}

export function formatKwanzas(value: number): string {
  return `${value.toLocaleString('pt-AO')} AKZ`;
}

export function sanitizePhoneNumber(phone: string): string {
  // Cleans all non-numeric characters
  const digits = phone.replace(/\D/g, '');
  // If the user entered local 9-digit number starting with 9 (e.g. 941678866), prepend Angola country code 244
  if (digits.length === 9 && digits.startsWith('9')) {
    return `244${digits}`;
  }
  return digits;
}

/**
 * Builds the official WhatsApp URL for multi-item cart orders:
 */
export function buildCartWhatsAppUrl(
  cart: CartItem[],
  phoneNumber: string = RESTAURANT_INFO.defaultPhone,
  details?: OrderDetails
): string {
  const cleanPhone = sanitizePhoneNumber(phoneNumber);
  
  if (cart.length === 0) {
    const generalMsg = `Olá, ${RESTAURANT_INFO.name}! Gostaria de consultar o menu do dia e fazer um pedido.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(generalMsg)}`;
  }

  const itemsList = cart
    .map(
      (c) =>
        `• ${c.item.name} — Quantidade: ${c.quantity} (${formatKwanzas(c.item.price * c.quantity)})`
    )
    .join('\n');

  const total = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);

  const lines: string[] = [
    `Olá, ${RESTAURANT_INFO.name}! Gostaria de fazer um pedido.`,
    '',
    'Os meus produtos:',
    itemsList,
    '',
    `Total estimado: ${formatKwanzas(total)}`,
  ];

  if (details?.orderType) {
    const typeMap: Record<string, string> = {
      delivery: 'Entrega ao Domicílio',
      takeaway: 'Takeaway (Levantar no Restaurante)',
      'dine-in': 'Consumo na Esplanada / Mesa',
    };
    lines.push(`Modalidade: ${typeMap[details.orderType] || details.orderType}`);
  }

  if (details?.customerName && details.customerName.trim().length > 0) {
    lines.push(`Cliente: ${details.customerName.trim()}`);
  }

  if (details?.deliveryAddress && details.deliveryAddress.trim().length > 0) {
    lines.push(`Morada / Detalhes: ${details.deliveryAddress.trim()}`);
  }

  if (details?.notes && details.notes.trim().length > 0) {
    lines.push(`Observações: ${details.notes.trim()}`);
  }

  lines.push('');
  lines.push('Podem ajudar-me com a confirmação do pedido e as instruções de pagamento?');
  lines.push('');
  lines.push('Obrigado!');

  const fullText = lines.join('\n');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullText)}`;
}

/**
 * Direct WhatsApp link for a single dish
 */
export function buildSingleItemWhatsAppUrl(
  item: MenuItem,
  phoneNumber: string = RESTAURANT_INFO.defaultPhone,
  quantity: number = 1
): string {
  const cleanPhone = sanitizePhoneNumber(phoneNumber);
  const total = item.price * quantity;

  const lines = [
    `Olá, ${RESTAURANT_INFO.name}! Gostaria de fazer um pedido.`,
    '',
    'Os meus produtos:',
    `• ${item.name} — Quantidade: ${quantity} (${formatKwanzas(total)})`,
    '',
    `Total estimado: ${formatKwanzas(total)}`,
    '',
    'Podem ajudar-me com a confirmação do pedido e as instruções de pagamento?',
    '',
    'Obrigado!',
  ];

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(lines.join('\n'))}`;
}
