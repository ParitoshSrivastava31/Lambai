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
    current: number      // habit score 0–100, typically 25–55
    withLambai: number   // always 91
    label: string        // "Growth environment score" not "Potential Unlocked"
    isAlreadyOptimised: boolean  // edge case: someone scored above 91
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

// ─── LIFESTYLE PENALTIES (used for height gap calculation only) ───────────────
// These cm values feed into the gap/trajectory numbers, not the bar.
const LIFESTYLE_PENALTIES: Record<keyof LifestyleInputs, { poor: number; moderate: number; optimal: number }> = {
  sleep: { poor: 1.8, moderate: 0.8, optimal: 0 },
  activity: { poor: 1.4, moderate: 0.6, optimal: 0 },
  protein: { poor: 2.0, moderate: 0.8, optimal: 0 },
  screenTime: { poor: 0.8, moderate: 0.4, optimal: 0 },
  sunExposure: { poor: 1.0, moderate: 0.4, optimal: 0 },
  calcium: { poor: 1.4, moderate: 0.6, optimal: 0 }
}

// ─── HABIT SCORES (used for the progress bar only) ────────────────────────────
// Weighted by impact on growth. Max total = 100.
// Average Indian child scores roughly 30–50.
// Lambai target is always fixed at 91.
const HABIT_SCORES = {
  sleep: {
    poor: 8,   // < 7h — GH severely suppressed
    moderate: 18,  // 7–8h — below optimal
    optimal: 30   // 8–10h — peak GH window
  },
  activity: {
    sedentary: 5,   // no growth plate stimulation
    '30min': 12,  // minimal
    '1hr': 20,  // good
    '2hr+': 25   // best for growth plates
  },
  protein: {
    rarely: 3,   // insufficient raw material
    sometimes: 8,
    daily: 16,
    multiple: 20   // optimal
  },
  screenTime: {
    always: 3,   // melatonin fully blocked
    most: 6,
    rarely: 11,
    never: 15   // sleep hygiene optimal
  },
  sunExposure: {
    minimal: 2,  // vitamin D deficient
    moderate: 5,
    daily: 10  // optimal vitamin D
  }
  // calcium intentionally excluded — 5 inputs already cover 100 pts
  // keeping it clean and the math tight
}

const GROWTH_END_AGE = 18
const LAMBAI_TARGET_SCORE = 91 // fixed ceiling we promise

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
  if (inches === 12) return `${feet + 1}'0"`
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

// ─── HABIT SCORE ─────────────────────────────────────────────────────────────
// Returns 0–100. Measures quality of child's growth environment.
// Completely independent of child's current height or age.
// This is what feeds the progress bar — not height math.
function getHabitScore(inputs: LifestyleInputs): number {
  const score =
    HABIT_SCORES.sleep[inputs.sleep] +
    HABIT_SCORES.activity[inputs.activity] +
    HABIT_SCORES.protein[inputs.protein] +
    HABIT_SCORES.screenTime[inputs.screenTime] +
    HABIT_SCORES.sunExposure[inputs.sunExposure]

  return Math.min(100, Math.max(0, score))
}

function getCelebrityComparison(fatherHeightCm: number): {
  name: string; fatherHeight: string; sonHeight: string; message: string
} {
  const fatherFt = fatherHeightCm / 30.48

  if (fatherFt <= 5.5) {
    return {
      name: 'Sachin Tendulkar',
      fatherHeight: "5'4\"",
      sonHeight: "6'1\"",
      message: "Sachin's son Arjun grew to 6'1\" — 9 inches taller than his father. Your son has better genetics than Sachin did."
    }
  } else if (fatherFt <= 5.8) {
    return {
      name: 'Aamir Khan',
      fatherHeight: "5'6\"",
      sonHeight: "5'11\"",
      message: "Aamir's son Azad is already tracking taller. With the right protocol, yours could go further."
    }
  } else {
    return {
      name: 'Shah Rukh Khan',
      fatherHeight: "5'8\"",
      sonHeight: "6'1\"",
      message: "Shah Rukh's son Aryan is set to exceed 6 feet. Your son's ceiling is in that range — if the environment is right."
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

  // Genetic ceiling — upper range for maximum ambition
  const medianGc = ((fatherHeightCm + motherHeightCm + 13) / 2) + 2.5
  const upperGc = medianGc + 8.5
  const gcRounded = Math.round(upperGc * 10) / 10

  // Current trajectory
  const percentOfAdult = getPercentOfAdultHeight(childAgeYears)
  const cth = childCurrentHeightCm / percentOfAdult
  const cthRounded = Math.round(cth * 10) / 10

  // Height gap
  const lifestylePenalty = getLifestylePenalty(lifestyleInputs)
  const optimisedPotential = gcRounded - lifestylePenalty
  const gapCm = Math.max(0, optimisedPotential - cthRounded)
  const gapRounded = Math.round(gapCm * 10) / 10

  // Growth window
  const growthWindow = getGrowthWindowRemaining(childAgeYears, childAgeMonths)

  // ── Habit score for the progress bar ──────────────────────────────────────
  // This is the ONLY thing that feeds potentialUnlocked.
  // It is completely decoupled from the child's current height.
  // Average Indian child: 25–50. Lambai target: 91. Gap is always meaningful.
  const currentHabitScore = getHabitScore(lifestyleInputs)
  const isAlreadyOptimised = currentHabitScore >= LAMBAI_TARGET_SCORE

  const potentialUnlocked = {
    current: currentHabitScore,
    withLambai: isAlreadyOptimised ? currentHabitScore : LAMBAI_TARGET_SCORE,
    label: 'Growth environment score',
    isAlreadyOptimised
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