/* eslint-disable no-unused-vars */

// arrival time mapping
const getArraivalTime = (rv) => {
  if (rv <= 25) return 1;
  if (rv <= 65) return 2;
  if (rv <= 85) return 3;
  return 4;
};

// able service time
const getAbleServiceTime = (rv) => {
  if (rv <= 30) return 2;
  if (rv < 58) return 3;
  if (rv < 83) return 4;
  return 5;
};

// baker service time
const getBakerServiceTime = (rv) => {
  if (rv <= 35) return 3;
  if (rv < 60) return 4;
  if (rv < 80) return 5;
  return 6;
};

// main simulation logic
export const runAbleBaker = (prevData = []) => {
  const i = prevData.length;

  const rvAT = Math.floor(Math.random() * 100) + 1;
  const rvST = Math.floor(Math.random() * 100) + 1;

  const IAT = getArraivalTime(rvAT);
  const AT = i === 0 ? IAT : prevData[i - 1].AT + IAT;

  const ableST = getAbleServiceTime(rvST);
  const bakerST = getBakerServiceTime(rvST);

  // last completion times
  const lastAble = [...prevData].reverse().find((r) => r.ableST > 0);
  const lastBaker = [...prevData].reverse().find((r) => r.bakerST > 0);

  const ableFreeAt = lastAble ? lastAble.ableTSE : 0;
  const bakerFreeAt = lastBaker ? lastBaker.bakerTSE : 0;

  let server = "";
  let TSB = 0;
  let ST = 0;

  // ABLE–BAKER DECISION LOGIC
  if (i === 0) {
    // Rule 1: first customer → Able
    server = "Able";
    TSB = AT;
    ST = ableST;
  } else if (AT >= ableFreeAt && AT >= bakerFreeAt) {
    // Rule 3: both free → Able
    server = "Able";
    TSB = AT;
    ST = ableST;
  } else if (AT >= ableFreeAt) {
    // Rule 2: Able free
    server = "Able";
    TSB = AT;
    ST = ableST;
  } else if (AT >= bakerFreeAt) {
    // Able busy, Baker free
    server = "Baker";
    TSB = AT;
    ST = bakerST;
  } else {
    // Rule 4: both busy → wait for first free
    if (ableFreeAt <= bakerFreeAt) {
      server = "Able";
      TSB = ableFreeAt;
      ST = ableST;
    } else {
      server = "Baker";
      TSB = bakerFreeAt;
      ST = bakerST;
    }
  }

  const TSE = TSB + ST;
  const callerDelay = TSB - AT;
  const TSS = ST + callerDelay;

  return {
    customer: i + 1,
    rvAT,
    rvST,
    IAT,
    AT,

    // Able
    ableTSB: server === "Able" ? TSB : 0,
    ableST: server === "Able" ? ST : 0,
    ableTSE: server === "Able" ? TSE : ableFreeAt,

    // Baker
    bakerTSB: server === "Baker" ? TSB : 0,
    bakerST: server === "Baker" ? ST : 0,
    bakerTSE: server === "Baker" ? TSE : bakerFreeAt,

    callerDelay,
    TSS,
    server,
  };
};

// summary calculation logic
export const calculateSummary = (data) => {
  if (!data.length) return null;

  const totalCustomers = data.length;

  let totalCallerDelay = 0;
  let totalIAT = 0;

  let totalAbleST = 0;
  let totalBakerST = 0;
  let ableCount = 0;
  let bakerCount = 0;

  let waitingCustomers = 0;
  let totalWaitingDelay = 0;

  data.forEach((row) => {
    totalIAT += row.IAT;
    totalCallerDelay += row.callerDelay;

    if (row.ableST > 0) {
      totalAbleST += row.ableST;
      ableCount++;
    }

    if (row.bakerST > 0) {
      totalBakerST += row.bakerST;
      bakerCount++;
    }

    if (row.callerDelay > 0) {
      waitingCustomers++;
      totalWaitingDelay += row.callerDelay;
    }
  });

  return {
    // YOUR required formulas
    avgIAT: (totalIAT / totalCustomers).toFixed(2),
    avgWaitingTime: (totalCallerDelay / totalCustomers).toFixed(2),

    // Service time averages
    avgAbleServiceTime: ableCount
      ? (totalAbleST / ableCount).toFixed(2)
      : "0.00",

    avgBakerServiceTime: bakerCount
      ? (totalBakerST / bakerCount).toFixed(2)
      : "0.00",

    // Waiting-time-for-waiters-only
    avgWaitingForThoseWhoWait: waitingCustomers
      ? (totalWaitingDelay / waitingCustomers).toFixed(2)
      : "0.00",
  };
};
