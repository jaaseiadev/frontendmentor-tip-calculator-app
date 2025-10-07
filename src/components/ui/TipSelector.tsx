interface TipSelectorProps {
  selectedTip: number | null;
  customTip: string;
  onSelectPreset: (percentage: number) => void;
  onCustomChange: (value: string) => void;
}

const TIP_PRESETS = [5, 10, 15, 25, 50] as const;

export default function TipSelector({
  selectedTip,
  customTip,
  onSelectPreset,
  onCustomChange,
}: TipSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[#5e7a7d] text-sm font-semibold">Select Tip %</span>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {TIP_PRESETS.map((percentage) => {
          const isSelected = customTip === "" && selectedTip === percentage;
          return (
            <button
              key={percentage}
              type="button"
              onClick={() => onSelectPreset(percentage)}
              className={
                (isSelected
                  ? "bg-[#26c0ab] text-[#00494d]"
                  : "bg-[#00494d] text-white") +
                " font-bold text-xl rounded-md py-2.5 hover:bg-[#26c0ab] hover:text-[#00494d] transition-colors"
              }
              aria-pressed={isSelected}
            >
              {percentage}%
            </button>
          );
        })}
        <input
          type="number"
          placeholder="Custom"
          inputMode="decimal"
          min={0}
          value={customTip}
          onChange={(e) => onCustomChange(e.target.value)}
          className="bg-[#f3f9fa] text-[#00494d] text-xl font-bold rounded-md px-4 py-2.5 text-center border-2 border-transparent focus:outline-none focus:border-[#26c0ab]"
          aria-label="Custom tip percentage"
        />
      </div>
    </div>
  );
}