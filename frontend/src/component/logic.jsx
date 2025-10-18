// Inter-arrival time mapping (based on random value)
const getInterArrivalTime = (rv) => {
  if (rv <= 125) return 1;
  if (rv <= 250) return 2;
  if (rv <= 375) return 3;
  if (rv <= 500) return 4;
  if (rv <= 625) return 5;
  if (rv <= 750) return 6;
  if (rv <= 875) return 7;
  return 8; // 876–1000
};

// Service time mapping (based on random value)
const getServiceTime = (rv) => {
  if (rv <= 25) return 1;
  if (rv <= 35) return 2;
  if (rv <= 65) return 3;
  if (rv <= 75) return 4;
  if (rv <= 95) return 5;
  return 6; // 96–100
};

// Main simulation logic
export const runSimulation = (customers) => {
  const data = [];

  // Generate random numbers
  const randAT = Array.from(
    { length: customers },
    () => Math.floor(Math.random() * 1000) + 1
  );
  const randST = Array.from(
    { length: customers },
    () => Math.floor(Math.random() * 100) + 1
  );

  let prevAT = 0;
  let prevTSE = 0;

  for (let i = 0; i < customers; i++) {
    const rvAT = randAT[i];
    const rvST = randST[i];

    const IAT = getInterArrivalTime(rvAT);
    const ST = getServiceTime(rvST);

    const AT = i === 0 ? IAT : prevAT + IAT;
    const TSB = i === 0 ? 0 : Math.max(prevTSE, AT);
    const WT = TSB - AT;
    const TSE = TSB + ST;
    const TSS = WT + ST;
    const IOS = i === 0 ? 0 : TSB - prevTSE;

    data.push({
      customer: i + 1,
      rvAT,
      IAT,
      AT,
      rvST,
      ST,
      TSB,
      WT,
      TSE,
      TSS,
      IOS,
    });

    prevAT = AT;
    prevTSE = TSE;
  }

  return data;
};

// logic for dynamic simulation
export const generateNextCustomer = (prevData = []) => {
  const i = prevData.length;
  const rvAT = Math.floor(Math.random() * 1000) + 1;
  const rvST = Math.floor(Math.random() * 100) + 1;

  const IAT = getInterArrivalTime(rvAT);
  const ST = getServiceTime(rvST);

  const prevAT = i === 0 ? 0 : prevData[i - 1].AT;
  const prevTSE = i === 0 ? 0 : prevData[i - 1].TSE;

  const AT = i === 0 ? IAT : prevAT + IAT;
  const TSB = i === 0 ? 0 : Math.max(prevTSE, AT);
  const WT = TSB - AT;
  const TSE = TSB + ST;
  const TSS = WT + ST;
  const IOS = i === 0 ? 0 : TSB - prevTSE;

  return {
    customer: i + 1,
    rvAT,
    IAT,
    AT,
    rvST,
    ST,
    TSB,
    WT,
    TSE,
    TSS,
    IOS,
  };
};
