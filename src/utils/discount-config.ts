type PricingMap = {
  [productName: string]: {
    ally: Record<number, number>
    notAlly: Record<number, number>
  }
}

export const fixedDiscountMap: PricingMap = {
  PENDRIVE_SUMMERELETROHITS_2025: {
    ally: {
      1: 3000,
      2: 2900,
      3: 2800,
      4: 2700,
      5: 2500,
    },
    notAlly: {
      1: 3500,
      2: 3450,
      3: 3400,
      4: 3350,
      5: 3200,
    },
  },
  NOTEBOOK_GAMER_ATM_EDITION: {
    ally: {
      1: 10000,
      2: 9500,
      3: 9000,
      4: 8500,
      5: 7500,
    },
    notAlly: {
      1: 12000,
      2: 11600,
      3: 11200,
      4: 10800,
      5: 10000,
    },
  },
  PENDRIVE_EXPLOSAO_TCHACABUM: {
    ally: {
      1: 8000,
      2: 7700,
      3: 7400,
      4: 7100,
      5: 6800,
    },
    notAlly: {
      1: 10000,
      2: 9700,
      3: 9400,
      4: 9100,
      5: 8800,
    },
  },
}
