export interface LifestyleInputs {
  sleep: 'poor' | 'moderate' | 'optimal'
  activity: 'sedentary' | '30min' | '1hr' | '2hr+'
  protein: 'rarely' | 'sometimes' | 'daily' | 'multiple'
  screenTime: 'always' | 'most' | 'rarely' | 'never'
  sunExposure: 'minimal' | 'moderate' | 'daily'
  calcium: 'rarely' | 'once' | 'twice+'
}

export interface CalculatorResult {
  geneticCeiling: {
    cm: number
    feetInches: string
    rangeText: string
  }
  currentTrajectory: {
    cm: number
    feetInches: string
    percentOfAdult: number
  }
  optimisedPotential: {
    cm: number
    feetInches: string
  }
  gap: {
    cm: number
    feetInches: string
  }
  lifestylePenalty: number
  growthWindowRemaining: {
    years: number
    months: number
    totalMonths: number
  }
  potentialUnlocked: {
    current: number
    withLambai: number
  }
  celebrityComparison: {
    name: string
    fatherHeight: string
    sonHeight: string
    message: string
  }
}

const AGE_PERCENTAGE_MAP: Record<number, number> = {
  2: 0.50, 3: 0.53, 4: 0.55, 5: 0.57,
  6: 0.60, 7: 0.63, 8: 0.66, 9: 0.69,
  10: 0.72, 11: 0.76, 12: 0.81, 13: 0.88,
  14: 0.94, 15: 0.98, 16: 0.995, 17: 1.0
}

const LIFESTYLE_PENALTIES: Record<keyof LifestyleInputs, { poor: number; moderate: number; optimal: number }> = {
  sleep: { poor: 1.8, moderate: 0.8, optimal: 0 },
  activity: { poor: 1.4, moderate: 0.6, optimal: 0 },
  protein: { poor: 2.0, moderate: 0.8, optimal: 0 },
  screenTime: { poor: 0.8, moderate: 0.4, optimal: 0 },
  sunExposure: { poor: 1.0, moderate: 0.4, optimal: 0 },
  calcium: { poor: 1.4, moderate: 0.6, optimal: 0 }
}

const GROWTH_END_AGE = 18

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
  const midParentalHeight = ((fatherHeightCm + motherHeightCm + 13) / 2) + 2.5
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

function getPercentOfAdultHeight(ageYears: number): number {
  const age = Math.min(Math.max(ageYears, 2), 17)
  const lowerAge = Math.floor(age)
  const upperAge = Math.ceil(age)
  const percentLower = AGE_PERCENTAGE_MAP[lowerAge] || 0.72
  const percentUpper = AGE_PERCENTAGE_MAP[upperAge] || percentLower
  const fraction = age - lowerAge
  return percentLower + (percentUpper - percentLower) * fraction
}

function getGrowthWindowRemaining(ageYears: number, ageMonths: number): { years: number; months: number; totalMonths: number } {
  const totalAgeMonths = (ageYears * 12) + ageMonths
  const endMonths = GROWTH_END_AGE * 12
  const remaining = Math.max(0, endMonths - totalAgeMonths)
  return {
    years: Math.floor(remaining / 12),
    months: remaining % 12,
    totalMonths: remaining
  }
}

function getLifestylePenalty(inputs: LifestyleInputs): number {
  let total = 0
  
  if (inputs.sleep === 'poor') total += LIFESTYLE_PENALTIES.sleep.poor
  else if (inputs.sleep === 'moderate') total += LIFESTYLE_PENALTIES.sleep.moderate

  if (inputs.activity === 'sedentary') total += LIFESTYLE_PENALTIES.activity.poor
  else if (inputs.activity === '30min') total += LIFESTYLE_PENALTIES.activity.moderate

  if (inputs.protein === 'rarely') total += LIFESTYLE_PENALTIES.protein.poor
  else if (inputs.protein === 'sometimes') total += LIFESTYLE_PENALTIES.protein.moderate

  if (inputs.screenTime === 'always') total += LIFESTYLE_PENALTIES.screenTime.poor
  else if (inputs.screenTime === 'most') total += LIFESTYLE_PENALTIES.screenTime.moderate

  if (inputs.sunExposure === 'minimal') total += LIFESTYLE_PENALTIES.sunExposure.poor
  else if (inputs.sunExposure === 'moderate') total += LIFESTYLE_PENALTIES.sunExposure.moderate

  if (inputs.calcium === 'rarely') total += LIFESTYLE_PENALTIES.calcium.poor
  else if (inputs.calcium === 'once') total += LIFESTYLE_PENALTIES.calcium.moderate

  return total
}

function getCelebrityComparison(fatherHeightCm: number): { name: string; fatherHeight: string; sonHeight: string; message: string } {
  const fatherFt = fatherHeightCm / 30.48
  
  if (fatherFt >= 5.2 && fatherFt <= 5.5) {
    return {
      name: 'Sachin Tendulkar',
      fatherHeight: "5'4\"",
      sonHeight: "6'1\"",
      message: "Sachin's son Arjun grew to 6'1\" — 9 inches taller than his father. Your son has better genetics."
    }
  } else if (fatherFt > 5.5 && fatherFt <= 5.8) {
    return {
      name: 'Aamir Khan',
      fatherHeight: "5'6\"",
      sonHeight: "5'10\"",
      message: "Aamir's son Azad is already matching his height. With the right protocol, yours could exceed it."
    }
  } else {
    return {
      name: 'Shah Rukh Khan',
      fatherHeight: "5'9\"",
      sonHeight: "6'0\"",
      message: "Shah Rukh's son Aryan is set to exceed 6 feet. Your son's potential is in that league."
    }
  }
}

export function calculateFullResult(
  fatherHeightCm: number,
  motherHeightCm: number,
  childAgeYears: number,
  childAgeMonths: number,
  childCurrentHeightCm: number,
  lifestyleInputs: LifestyleInputs
): CalculatorResult {
  const medianGc = ((fatherHeightCm + motherHeightCm + 13) / 2) + 2.5
  const upperGc = medianGc + 8.5 // Using upper range for maximum FOMO
  const gcRounded = Math.round(upperGc * 10) / 10
  
  const percentOfAdult = getPercentOfAdultHeight(childAgeYears)
  const cth = childCurrentHeightCm / percentOfAdult
  const cthRounded = Math.round(cth * 10) / 10
  
  const lifestylePenalty = getLifestylePenalty(lifestyleInputs)
  const optimisedPotential = gcRounded - lifestylePenalty
  
  const gapCm = Math.max(0, optimisedPotential - cthRounded)
  const gapRounded = Math.round(gapCm * 10) / 10
  
  const growthWindow = getGrowthWindowRemaining(childAgeYears, childAgeMonths)
  
  const potentialUnlocked = {
    current: Math.min(100, Math.max(0, Math.round((cthRounded / gcRounded) * 100))),
    withLambai: Math.min(100, Math.max(0, Math.round((optimisedPotential / gcRounded) * 100)))
  }

  const celebrity = getCelebrityComparison(fatherHeightCm)
  
  return {
    geneticCeiling: {
      cm: gcRounded,
      feetInches: cmToFeetInches(gcRounded),
      rangeText: `${cmToFeetInches(medianGc - 8.5)} – ${cmToFeetInches(medianGc + 8.5)}`
    },
    currentTrajectory: {
      cm: cthRounded,
      feetInches: cmToFeetInches(cthRounded),
      percentOfAdult: Math.round(percentOfAdult * 100)
    },
    optimisedPotential: {
      cm: optimisedPotential,
      feetInches: cmToFeetInches(optimisedPotential)
    },
    gap: {
      cm: gapRounded,
      feetInches: cmToFeetInches(gapRounded)
    },
    lifestylePenalty,
    growthWindowRemaining: growthWindow,
    potentialUnlocked,
    celebrityComparison: celebrity
  }
}
