/**
 * Format to Brazilian currency
 */

import { InputState } from 'react-input-mask';

export default function maskToCurrency({
  nextState,
  currency = 'Brazilian',
}: {
  nextState: InputState;
  currency?: 'Brazilian' | 'American';
}) {
  const { value } = nextState || {};

  if (currency === 'Brazilian') {
    let amountFormatted = value?.replace?.(/\D/g, '')?.replace?.(/^0+/g, '');
    if (amountFormatted?.length === 1) {
      return {
        ...nextState,
        value: `R$ 0,0${amountFormatted}`,
        selection: {
          start: amountFormatted.length + 6,
          end: amountFormatted.length + 6,
        },
      };
    }

    if (amountFormatted?.length === 2) {
      return {
        ...nextState,
        value: `R$ 0,${amountFormatted}`,
        selection: {
          start: amountFormatted.length + 5,
          end: amountFormatted.length + 5,
        },
      };
    }

    const amountFormattedWithComma = amountFormatted?.replace?.(
      /(?=\d{2})(\d{2})$/,
      ',$1'
    );
    const amountFormattedWithDot = amountFormattedWithComma?.replace?.(
      /(\d)(?=(\d{3})+(?!\d))/g,
      '$1.'
    );

    if (amountFormattedWithDot) {
      return {
        ...nextState,
        value: `R$ ${amountFormattedWithDot}`,
        selection: {
          start: amountFormattedWithDot.length + 3,
          end: amountFormattedWithDot.length + 3,
        },
      };
    }
  }

  if (currency === 'American') {
    return {
      ...nextState,
      value: Number(value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    };
  }

  return nextState;
}
