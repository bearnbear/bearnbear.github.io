const priceModal = [
  {
    tier: 1,
    min: 0,
    max: 3599,
    price: 0.1
  },
  {
    tier: 2,
    min: 3600,
    max: 7099,
    price: 0.3
  },
  {
    tier: 3,
    min: 7100,
    max: 10499,
    price: 0.6
  },
  {
    tier: 4,
    min: 10500,
    max: 13799,
    price: 1.2
  },
  {
    tier: 5,
    min: 13800,
    max: 17049,
    price: 2.4
  },
  {
    tier: 6,
    min: 17050,
    max: 17150,
    price: 10
  },
  {
    tier: 7,
    min: 17151,
    max: 17153,
    price: 100
  }
]

export const calculateTotalPrice = (amount, totalSupply) => {
  const currentTierIndex = getCurrentTierIndex(totalSupply)
  console.log('currentTierIndex', currentTierIndex)
  if (totalSupply + amount < priceModal[currentTierIndex].max) {
    // withinTier
    const price = priceModal[currentTierIndex].price
    return amount * price
  } else {
    // crosstier
    const price1 = priceModal[currentTierIndex].price
    const price2 = priceModal[currentTierIndex + 1].price
    const amount1 = priceModal[currentTierIndex].max - totalSupply
    const amount2 = totalSupply + amount - priceModal[currentTierIndex].max
    return amount1 * price1 + amount2 * price2
  }
}

export const getCurrentTierIndex = (totalSupply) => {
  let currentTierIndex = 0
  console.log('totalSupply', totalSupply)
  for (let i = 0; i < priceModal.length; i++) {
    const tier = priceModal[i]
    console.log(tier)
    if ((totalSupply > tier.min || totalSupply === tier.min) && totalSupply < tier.max) {
      currentTierIndex = i
    }
  }
  return currentTierIndex
}
