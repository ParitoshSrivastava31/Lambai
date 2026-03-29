export function calculateGeneticCeiling(
  fatherHeightCm: number,
  motherHeightCm: number
): {
  midParentalHeight: number
  rangeLow: number
  rangeHigh: number
  feetInches: string
  rangeText: string
} {
  const midParentalHeight = (fatherHeightCm + motherHeightCm + 13) / 2
  const rangeLow = midParentalHeight - 8.5
  const rangeHigh = midParentalHeight + 8.5

  return {
    midParentalHeight: Math.round(midParentalHeight * 10) / 10,
    rangeLow: Math.round(rangeLow * 10) / 10,
    rangeHigh: Math.round(rangeHigh * 10) / 10,
    feetInches: cmToFeetInches(midParentalHeight),
    rangeText: `${cmToFeetInches(rangeLow)} – ${cmToFeetInches(rangeHigh)}`
  }
}

export function cmToFeetInches(cm: number): string {
  const totalInches = cm / 2.54
  const feet = Math.floor(totalInches / 12)
  const inches = Math.round(totalInches % 12)
  
  if (inches === 12) {
    return `${feet + 1}'0"`
  }
  return `${feet}'${inches}"`
}

export function feetInchesToCm(feet: number, inches: number): number {
  return (feet * 12 + inches) * 2.54
}
