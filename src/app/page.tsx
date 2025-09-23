"use client";

import { useMemo, useState } from "react";

const TIP_PRESETS = [5, 10, 15, 25, 50] as const;

function toNumber(v: string): number {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

export default function Home() {
  const [bill, setBill] = useState<string>("");
  const [people, setPeople] = useState<string>("");
  const [customTip, setCustomTip] = useState<string>("");
  const [tipPercent, setTipPercent] = useState<number | null>(null);

  const effectiveTip = useMemo<number>(() => {
    const custom = toNumber(customTip);
    if (customTip !== "" && custom >= 0) return custom;
    return tipPercent ?? 0;
  }, [customTip, tipPercent]);

  const { tipPerPerson, totalPerPerson } = useMemo(() => {
    const b = Math.max(0, toNumber(bill));
    const pRaw = toNumber(people);
    const p = pRaw > 0 ? pRaw : 0;
    const tipRate = Math.max(0, effectiveTip) / 100;

    if (p === 0) {
      return { tipPerPerson: 0, totalPerPerson: 0 };
    }

    const tipTotal = b * tipRate;
    const tipEach = tipTotal / p;
    const totalEach = (b + tipTotal) / p;
    return { tipPerPerson: tipEach, totalPerPerson: totalEach };
  }, [bill, people, effectiveTip]);

  const resetDisabled = useMemo(() => {
    const hasBill = bill.trim() !== "" && toNumber(bill) !== 0;
    const hasPeople = people.trim() !== "" && toNumber(people) !== 0;
    const hasTip = (tipPercent !== null && tipPercent !== 0) || (customTip.trim() !== "" && toNumber(customTip) !== 0);
    return !(hasBill || hasPeople || hasTip);
  }, [bill, people, tipPercent, customTip]);

  const formatMoney = (n: number) => `$${n.toFixed(2)}`;

  const onClickPreset = (pct: number) => {
    setTipPercent(pct);
    setCustomTip("");
  };

  const onChangeCustom = (v: string) => {
    setCustomTip(v);
    setTipPercent(null);
  };

  const onReset = () => {
    setBill("");
    setPeople("");
    setCustomTip("");
    setTipPercent(null);
  };
  const isZeroPeople = people.trim() !== "" && toNumber(people) === 0;
  return (
    <main className="min-h-screen grid place-items-center bg-[#c5e4e7] p-6">
      <div className="w-full max-w-5xl">
        <div className="flex justify-center mb-8">
          {/* Logo */}
          <img src="/images/logo.svg" alt="Splitter" className="h-8 md:h-10" />
        </div>

        {/* Card */}
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_32px_43px_rgba(79,166,175,0.2)] grid gap-6 md:gap-8 md:grid-cols-2">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {/* Bill */}
            <div className="flex flex-col gap-2">
              <label htmlFor="bill" className="text-[#5e7a7d] text-sm font-semibold">
                Bill
              </label>
              <div className="relative">
                <img src="/images/icon-dollar.svg" alt="" aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="bill"
                  type="number"
                  placeholder="0"
                  inputMode="decimal"
                  min={0}
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  className="w-full bg-[#f3f9fa] text-[#00494d] text-2xl font-bold rounded-md pl-10 pr-4 py-3 text-right border-2 border-transparent focus:outline-none focus:border-[#26c0ab]"
                />
              </div>
            </div>

            {/* Select Tip % */}
            <div className="flex flex-col gap-3">
              <span className="text-[#5e7a7d] text-sm font-semibold">Select Tip %</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TIP_PRESETS.map((pct) => {
                  const isSelected = customTip === "" && tipPercent === pct;
                  return (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => onClickPreset(pct)}
                      className={
                        (isSelected
                          ? "bg-[#26c0ab] text-[#00494d]"
                          : "bg-[#00494d] text-white") +
                        " font-bold text-xl rounded-md py-2.5"
                      }
                      aria-pressed={isSelected}
                    >
                      {pct}%
                    </button>
                  );
                })}
                <input
                  type="number"
                  placeholder="Custom"
                  inputMode="decimal"
                  min={0}
                  value={customTip}
                  onChange={(e) => onChangeCustom(e.target.value)}
                  className="bg-[#f3f9fa] text-[#00494d] text-xl font-bold rounded-md px-4 py-2.5 text-center border-2 border-transparent focus:outline-none focus:border-[#26c0ab]"
                  aria-label="Custom tip"
                />
              </div>
            </div>

            {/* Number of People */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="people" className="text-[#5e7a7d] text-sm font-semibold">
                  Number of People
                </label>
                {isZeroPeople && (
                  <span id="people-error" className="text-orange-500 text-sm font-semibold">
                    Can’t be zero
                  </span>
                )}
              </div>
              <div className="relative">
                <img src="/images/icon-person.svg" alt="" aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="people"
                  type="number"
                  placeholder="0"
                  inputMode="numeric"
                  min={0}
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  aria-invalid={isZeroPeople}
                  aria-describedby={isZeroPeople ? "people-error" : undefined}
                  className={`w-full bg-[#f3f9fa] text-[#00494d] text-2xl font-bold rounded-md pl-10 pr-4 py-3 text-right border-2 focus:outline-none ${
                    isZeroPeople ? "border-orange-500 focus:border-orange-500" : "border-transparent focus:border-[#26c0ab]"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="bg-[#00494d] rounded-xl p-6 md:p-8 flex flex-col gap-6 md:gap-8 justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col leading-tight">
                  <span className="text-white font-semibold">Tip Amount</span>
                  <span className="text-[#7f9c9f] text-xs font-semibold">/ person</span>
                </div>
                <div className="text-[#26c0ab] text-4xl md:text-5xl font-extrabold" aria-live="polite">
                  {formatMoney(tipPerPerson)}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col leading-tight">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-[#7f9c9f] text-xs font-semibold">/ person</span>
                </div>
                <div className="text-[#26c0ab] text-4xl md:text-5xl font-extrabold" aria-live="polite">
                  {formatMoney(totalPerPerson)}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onReset}
              disabled={resetDisabled}
              className="w-full bg-[#26c0ab] disabled:bg-[#0d686d]/40 text-[#00494d] font-extrabold tracking-wider rounded-md py-3 disabled:opacity-50"
            >
              RESET
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
