interface ResultsPanelProps {
  tipPerPerson: string;
  totalPerPerson: string;
}

export default function ResultsPanel({ tipPerPerson, totalPerPerson }: ResultsPanelProps) {
  return (
    <div className="bg-[#00494d] rounded-xl p-6 md:p-8 flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col leading-tight">
            <span className="text-white font-semibold">Tip Amount</span>
            <span className="text-[#7f9c9f] text-xs font-semibold">/ person</span>
          </div>
          <div className="text-[#26c0ab] text-4xl md:text-5xl font-extrabold" aria-live="polite">
            {tipPerPerson}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col leading-tight">
            <span className="text-white font-semibold">Total</span>
            <span className="text-[#7f9c9f] text-xs font-semibold">/ person</span>
          </div>
          <div className="text-[#26c0ab] text-4xl md:text-5xl font-extrabold" aria-live="polite">
            {totalPerPerson}
          </div>
        </div>
      </div>
    </div>
  );
}