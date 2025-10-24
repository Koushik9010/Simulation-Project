// Inter-arrival time mapping
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

// Service time mapping
const getServiceTime = (rv) => {
  if (rv <= 25) return 1;
  if (rv <= 35) return 2;
  if (rv <= 65) return 3;
  if (rv <= 75) return 4;
  if (rv <= 95) return 5;
  return 6; // 96–100
};

// Simulation step logic (1 customer at a time)
export const runSimulation = (prevData = []) => {
  const i = prevData.length;
  const rvAT = Math.floor(Math.random() * 1000) + 1;
  const rvST = Math.floor(Math.random() * 100) + 1;

  const IAT = getInterArrivalTime(rvAT);
  const ST = getServiceTime(rvST);

  const prevAT = i === 0 ? 0 : prevData[i - 1].AT;
  const prevTSE = i === 0 ? 0 : prevData[i - 1].TSE;

  const AT = i === 0 ? IAT : prevAT + IAT;
  const TSB = i === 0 ? AT : Math.max(prevTSE, AT);
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

// Summary calculation logic
export const calculateSummary = (data) => {
  if (!data || data.length === 0) return null;

  const WT = data.map((d) => d.WT || 0);
  const ST = data.map((d) => d.ST || 0);
  const IAT = data.map((d) => d.IAT || 0);
  const IOS = data.map((d) => d.IOS || 0);
  const TSS = data.map((d) => d.TSS || 0);
  const TSE = data.map((d) => d.TSE || 0);

  const n = data.length;
  const totalWT = WT.reduce((a, b) => a + b, 0);
  const totalST = ST.reduce((a, b) => a + b, 0);
  const totalIAT = IAT.reduce((a, b) => a + b, 0);
  const totalIOS = IOS.reduce((a, b) => a + b, 0);
  const totalTSS = TSS.reduce((a, b) => a + b, 0);
  const waited = WT.filter((w) => w > 0).length;
  const lastTSE = TSE[TSE.length - 1] || 0;

  return {
    avgWaitingTime: (totalWT / n).toFixed(2),
    probWait: (waited / n).toFixed(2),
    probIdle: lastTSE ? (totalIOS / lastTSE).toFixed(2) : "0.00",
    avgServiceTime: (totalST / n).toFixed(2),
    avgTimeBetweenArrival: n > 1 ? (totalIAT / (n - 1)).toFixed(2) : "0.00",
    avgWaitingForThoseWhoWait:
      waited > 0 ? (totalWT / waited).toFixed(2) : "0.00",
    avgTimeInSystem: (totalTSS / n).toFixed(2),
  };
};
