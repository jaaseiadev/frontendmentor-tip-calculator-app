interface PeopleInputProps {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

export default function PeopleInput({ value, onChange, hasError }: PeopleInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label htmlFor="people" className="text-[#5e7a7d] text-sm font-semibold">
          Number of People
        </label>
        {hasError && (
          <span id="people-error" className="text-orange-500 text-sm font-semibold">
            Can't be zero
          </span>
        )}
      </div>
      <div className="relative">
        <img 
          src="/images/icon-person.svg" 
          alt="" 
          aria-hidden 
          className="absolute left-4 top-1/2 -translate-y-1/2" 
        />
        <input
          id="people"
          type="number"
          placeholder="0"
          inputMode="numeric"
          min={0}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={hasError}
          aria-describedby={hasError ? "people-error" : undefined}
          className={`w-full bg-[#f3f9fa] text-[#00494d] text-2xl font-bold rounded-md pl-10 pr-4 py-3 text-right border-2 focus:outline-none ${
            hasError 
              ? "border-orange-500 focus:border-orange-500" 
              : "border-transparent focus:border-[#26c0ab]"
          }`}
        />
      </div>
    </div>
  );
}