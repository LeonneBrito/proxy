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
      2: 3400,
      3: 3300,
      4: 3200,
      5: 2900,
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
      2: 11200,
      3: 10400,
      4: 9600,
      5: 7500,
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
      2: 9500,
      3: 9000,
      4: 8500,
      5: 8500,
    },
  },
}
