interface ResetButtonProps {
  onReset: () => void;
  disabled?: boolean;
}

export default function ResetButton({ onReset, disabled = false }: ResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onReset}
      disabled={disabled}
      className="w-full bg-[#26c0ab] disabled:bg-[#0d686d]/40 text-[#00494d] font-extrabold tracking-wider rounded-md py-3 disabled:opacity-50 hover:bg-[#9fe8df] disabled:hover:bg-[#0d686d]/40 transition-colors"
    >
      RESET
    </button>
  );
}