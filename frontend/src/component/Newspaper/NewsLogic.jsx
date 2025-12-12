// // types of newsdays mapping
// const getNewsdayTypes = (rv) => {
//   if (rv <= 35) return "Good";
//   if (rv >= 36 && rv <= 80) return "Fair";
//   if (rv >= 81 && rv <= 100) return "Poor";
// };

// // Demand response mapping
// const demandValue = (type, rv) => {
//   // ----- POOR -----
//   if (type === "Poor") {
//     if (rv >= 1 && rv <= 44) return 40;
//     if (rv >= 45 && rv <= 66) return 50;
//     if (rv >= 67 && rv <= 82) return 60;
//     if (rv >= 83 && rv <= 94) return 70;
//     if (rv >= 95 && rv <= 100) return 80;
//   }

//   // ----- FAIR -----
//   if (type === "Fair") {
//     if (rv >= 1 && rv <= 10) return 40;
//     if (rv >= 11 && rv <= 28) return 50;
//     if (rv >= 29 && rv <= 68) return 60;
//     if (rv >= 69 && rv <= 88) return 70;
//     if (rv >= 89 && rv <= 96) return 80;
//     if (rv >= 97 && rv <= 100) return 90;
//   }

//   // ----- GOOD -----
//   if (type === "Good") {
//     if (rv >= 1 && rv <= 3) return 40;
//     if (rv >= 4 && rv <= 8) return 50;
//     if (rv >= 9 && rv <= 23) return 60;
//     if (rv >= 24 && rv <= 43) return 70;
//     if (rv >= 44 && rv <= 78) return 80;
//     if (rv >= 79 && rv <= 93) return 90;
//     if (rv >= 94 && rv <= 100) return 100;
//   }

//   return "";
// };

// export const newspaperSimulation = (
//   stockInput,
//   sellingPriceInput,
//   buyingPriceInput,
//   day
// ) => {
//   const stock = Number(stockInput);
//   const sellingPrice = Number(sellingPriceInput) / 100;
//   const buyingPrice = Number(buyingPriceInput) / 100;
//   const cost = stock * buyingPrice;

//   const rvType = Math.floor(Math.random() * 100) + 1; // random for news day
//   const rvDemand = Math.floor(Math.random() * 100) + 1; // random for demand

//   const newsdayType = getNewsdayTypes(rvType);
//   const demand = demandValue(newsdayType, rvDemand);

//   const revenue = demand * sellingPrice;
//   const lostProfit = demand > stock ? (demand - stock) * (17 / 100) : 0;
//   const salvage = demand < stock ? (stock - demand) * (5 / 100) : 0;
//   const dailyProfit = revenue - cost - lostProfit + salvage;

//   return {
//     day,
//     rvType,
//     newsdayType,
//     rvDemand,
//     demand,
//     revenue: Number(revenue.toFixed(2)),
//     lostProfit: Number(lostProfit.toFixed(2)),
//     salvage: Number(salvage.toFixed(2)),
//     dailyProfit: Number(dailyProfit.toFixed(2)),
//     buyingPrice,
//     sellingPrice,
//     stock,
//     cost: Number(cost.toFixed(2)),
//   };
// };

// -------------------------
// LINEAR CONGRUENTIAL GENERATOR (GLOBAL)
// -------------------------
let X = 12345; // global seed

const LCG = (a = 16807, c = 0, m = 2147483647) => {
  X = (a * X + c) % m;
  return X / m;          // returns number between 0 and 1
};

// -------------------------
// DEMAND RANGE MAPPING
// -------------------------
const getNewsdayTypes = (rv) => {
  if (rv <= 35) return "Good";
  if (rv <= 80) return "Fair";
  return "Poor";
};

const demandValue = (type, rv) => {
  // ----- POOR -----
  if (type === "Poor") {
    if (rv <= 44) return 40;
    if (rv <= 66) return 50;
    if (rv <= 82) return 60;
    if (rv <= 94) return 70;
    return 80;
  }

  // ----- FAIR -----
  if (type === "Fair") {
    if (rv <= 10) return 40;
    if (rv <= 28) return 50;
    if (rv <= 68) return 60;
    if (rv <= 88) return 70;
    if (rv <= 96) return 80;
    return 90;
  }

  // ----- GOOD -----
  if (type === "Good") {
    if (rv <= 3) return 40;
    if (rv <= 8) return 50;
    if (rv <= 23) return 60;
    if (rv <= 43) return 70;
    if (rv <= 78) return 80;
    if (rv <= 93) return 90;
    return 100;
  }

  return 0;
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
  const cost = stock * buyingPrice;

  // Random 1–100 for newsday
  const rvType = Math.floor(LCG() * 100) + 1;

  const newsdayType = getNewsdayTypes(rvType);

  // Random 1–100 for demand
  const rvDemand = Math.floor(LCG() * 100) + 1;

  const demand = demandValue(newsdayType, rvDemand);

  const revenue = demand * sellingPrice;
  const lostProfit = demand > stock ? (demand - stock) * 0.17 : 0;
  const salvage = demand < stock ? (stock - demand) * 0.05 : 0;
  const dailyProfit = revenue - cost - lostProfit + salvage;

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
