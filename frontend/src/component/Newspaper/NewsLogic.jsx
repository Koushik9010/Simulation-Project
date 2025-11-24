// types of newsdays mapping
const getNewsdayTypes = (rv) => {
  if (rv <= 35) return "Good";
  if (rv >= 36 && rv <= 80) return "Fair";
  if (rv >= 81 && rv <= 100) return "Poor";
};

// Demand response mapping
const getNewsdayValue = (type, rv) => {
  // ----- POOR -----
  if (type === "Poor") {
    if (rv >= 1 && rv <= 44) return 40;
    if (rv >= 45 && rv <= 66) return 50;
    if (rv >= 67 && rv <= 82) return 60;
    if (rv >= 83 && rv <= 94) return 70;
    if (rv >= 95 && rv <= 100) return 80;
  }

  // ----- FAIR -----
  if (type === "Fair") {
    if (rv >= 1 && rv <= 10) return 40;
    if (rv >= 11 && rv <= 28) return 50;
    if (rv >= 29 && rv <= 68) return 60;
    if (rv >= 69 && rv <= 88) return 70;
    if (rv >= 89 && rv <= 96) return 80;
    if (rv >= 97 && rv <= 100) return 90;
  }

  // ----- GOOD -----
  if (type === "Good") {
    if (rv >= 1 && rv <= 3) return 40;
    if (rv >= 4 && rv <= 8) return 50;
    if (rv >= 9 && rv <= 23) return 60;
    if (rv >= 24 && rv <= 43) return 70;
    if (rv >= 44 && rv <= 78) return 80;
    if (rv >= 79 && rv <= 93) return 90;
    if (rv >= 94 && rv <= 100) return 100;
  }

  return ""; // default
};

export const newspaperSimulation = (
  stockInput,
  sellingPriceInput,
  buyingPriceInput,
  day
) => {
  const stock = Number(stockInput);
  const sellingPrice = Number(sellingPriceInput) / 100;
  const buyingPrice = Number(buyingPriceInput) / 100;

  const rvType = Math.floor(Math.random() * 100) + 1; // random for news day
  const rvDemand = Math.floor(Math.random() * 100) + 1; // random for demand

  const newsdayType = getNewsdayTypes(rvType);
  const demand = getNewsdayValue(newsdayType, rvDemand);

  const revenue = demand * sellingPrice;
  const lostProfit = demand > stock ? (demand - stock) * (17 / 100) : 0;
  const salvage = demand < stock ? (stock - demand) * (5 / 100) : 0;
  const dailyProfit = revenue - stock * buyingPrice - lostProfit + salvage;
  const cost = stock * buyingPrice;

  return {
    day,
    rvType,
    newsdayType,
    rvDemand,
    demand,
    revenue: Number(revenue.toFixed(2)),
    lostProfit: Number(lostProfit.toFixed(2)),
    salvage: Number(salvage.toFixed(2)),
    dailyProfit: Number(dailyProfit.toFixed(2)),
    buyingPrice,
    sellingPrice,
    stock,
    cost: Number(cost.toFixed(2)),
  };
};
