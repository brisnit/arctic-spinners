const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function formatPrice(cents: number) {
  return usd.format(cents / 100);
}

export function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return raw.trim();
}

export function phoneHref(raw: string) {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 10 ? `tel:+1${digits}` : undefined;
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
