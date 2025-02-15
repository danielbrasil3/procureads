
import { stripe } from '../src/app/utils/stripe_key';




export async function fetchSubscriptionByEmail(email: string) {
  const customers = await stripe.customers.list({
    email,
    limit: 1,
    expand: ['data.subscriptions'],
  });

  if (customers.data.length === 0) {
    return null;
  }

  if (customers.data[0].subscriptions?.data.length === 0) {
    return null;
  }

  const subscription = customers.data[0].subscriptions?.data[0];

  return subscription;
}

export function translateSubscriptionStatus(status: string) {
  switch (status) {
    case 'active':
      return 'Ativo';
    case 'canceled':
      return 'Cancelado';
    case 'incomplete':
      return 'Incompleto';
    case 'incomplete_expired':
      return 'Incompleto Expirado';
    case 'past_due':
      return 'Atrasado';
    case 'trialing':
      return 'Em Teste';
    case 'unpaid':
      return 'Não Pago';
    default:
      return status;
  }
}

export function translateSubscriptionInterval(interval: string) {
  switch (interval) {
    case 'day':
      return 'Diário';
    case 'week':
      return 'Semanal';
    case 'month':
      return 'Mensal';
    case 'year':
      return 'Anual';
    default:
      return interval;
  }
}