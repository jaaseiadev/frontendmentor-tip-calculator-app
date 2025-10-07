export function toNumber(value: string): number {
  const num = parseFloat(value);
  return Number.isFinite(num) ? num : 0;
}

export function calculateTipAmounts(
  bill: number,
  people: number,
  tipPercent: number
): { tipPerPerson: number; totalPerPerson: number } {
  const billAmount = Math.max(0, bill);
  const peopleCount = people > 0 ? people : 0;
  const tipRate = Math.max(0, tipPercent) / 100;

  if (peopleCount === 0) {
    return { tipPerPerson: 0, totalPerPerson: 0 };
  }

  const totalTip = billAmount * tipRate;
  const tipPerPerson = totalTip / peopleCount;
  const totalPerPerson = (billAmount + totalTip) / peopleCount;

  return { tipPerPerson, totalPerPerson };
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function isValidPositiveNumber(value: string): boolean {
  const num = toNumber(value);
  return value.trim() !== "" && num > 0;
}

export function isZeroValue(value: string): boolean {
  return value.trim() !== "" && toNumber(value) === 0;
}