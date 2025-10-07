"use client";

import { useState, useMemo } from "react";
import BillInput from "./BillInput";
import TipSelector from "./TipSelector";
import PeopleInput from "./PeopleInput";
import ResultsPanel from "./ResultsPanel";
import ResetButton from "./ResetButton";
import { 
  toNumber, 
  calculateTipAmounts, 
  formatCurrency, 
  isValidPositiveNumber,
  isZeroValue 
} from "@/utils/calculations";

export default function TipCalculator() {
  const [bill, setBill] = useState<string>("");
  const [people, setPeople] = useState<string>("");
  const [customTip, setCustomTip] = useState<string>("");
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  // Calculate effective tip percentage
  const effectiveTip = useMemo(() => {
    const custom = toNumber(customTip);
    if (customTip !== "" && custom >= 0) return custom;
    return selectedTip ?? 0;
  }, [customTip, selectedTip]);

  // Calculate results
  const { tipPerPerson, totalPerPerson } = useMemo(() => {
    const billAmount = toNumber(bill);
    const peopleCount = toNumber(people);
    return calculateTipAmounts(billAmount, peopleCount, effectiveTip);
  }, [bill, people, effectiveTip]);

  // Determine if reset should be disabled
  const resetDisabled = useMemo(() => {
    const hasBill = isValidPositiveNumber(bill);
    const hasPeople = isValidPositiveNumber(people);
    const hasTip = (selectedTip !== null && selectedTip !== 0) || 
                   (customTip.trim() !== "" && toNumber(customTip) !== 0);
    return !(hasBill || hasPeople || hasTip);
  }, [bill, people, selectedTip, customTip]);

  // Check for zero people error
  const hasZeroPeopleError = isZeroValue(people);

  // Event handlers
  const handleSelectPreset = (percentage: number) => {
    setSelectedTip(percentage);
    setCustomTip("");
  };

  const handleCustomTipChange = (value: string) => {
    setCustomTip(value);
    setSelectedTip(null);
  };

  const handleReset = () => {
    setBill("");
    setPeople("");
    setCustomTip("");
    setSelectedTip(null);
  };

  return (
    <main className="min-h-screen grid place-items-center bg-[#c5e4e7] p-6">
      <div className="w-full max-w-5xl">
        <div className="flex justify-center mb-8">
          <img src="/images/logo.svg" alt="Splitter" className="h-8 md:h-10" />
        </div>

        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_32px_43px_rgba(79,166,175,0.2)] grid gap-6 md:gap-8 md:grid-cols-2">
          {/* Left column - Inputs */}
          <div className="flex flex-col gap-6">
            <BillInput value={bill} onChange={setBill} />
            
            <TipSelector
              selectedTip={selectedTip}
              customTip={customTip}
              onSelectPreset={handleSelectPreset}
              onCustomChange={handleCustomTipChange}
            />
            
            <PeopleInput 
              value={people} 
              onChange={setPeople} 
              hasError={hasZeroPeopleError}
            />
          </div>

          {/* Right column - Results */}
          <div className="flex flex-col justify-between">
            <ResultsPanel
              tipPerPerson={formatCurrency(tipPerPerson)}
              totalPerPerson={formatCurrency(totalPerPerson)}
            />
            
            <div className="mt-6 md:mt-8">
              <ResetButton onReset={handleReset} disabled={resetDisabled} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}