type PricingMap = {
  [productName: string]: {
    ally: Record<number, number>
    notAlly: Record<number, number>
    enemy: Record<number, number>
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
    enemy: {
      1: 4000,
      2: 3950,
      3: 3900,
      4: 3850,
      5: 3800,
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
    enemy: {
      1: 15000,
      2: 14500,
      3: 14000,
      4: 13500,
      5: 13000,
    },
  },
  PENDRIVE_EXPLOSAO_TCHACABUM: {
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
    enemy: {
      1: 15000,
      2: 14500,
      3: 14000,
      4: 13500,
      5: 13000,
    },
  },
}
