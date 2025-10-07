interface BillInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BillInput({ value, onChange }: BillInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="bill" className="text-[#5e7a7d] text-sm font-semibold">
        Bill
      </label>
      <div className="relative">
        <img 
          src="/images/icon-dollar.svg" 
          alt="" 
          aria-hidden 
          className="absolute left-4 top-1/2 -translate-y-1/2" 
        />
        <input
          id="bill"
          type="number"
          placeholder="0"
          inputMode="decimal"
          min={0}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#f3f9fa] text-[#00494d] text-2xl font-bold rounded-md pl-10 pr-4 py-3 text-right border-2 border-transparent focus:outline-none focus:border-[#26c0ab]"
        />
      </div>
    </div>
  );
}