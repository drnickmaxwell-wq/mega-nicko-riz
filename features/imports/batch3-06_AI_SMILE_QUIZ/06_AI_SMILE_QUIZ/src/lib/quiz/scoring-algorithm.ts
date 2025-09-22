interface QuizAnswer {
  questionId: string
  answer: string | string[]
  score: number
  category: string
}

interface SmileScores {
  aesthetic: number
  health: number
  functional: number
  confidence: number
  overall: number
}

interface CategoryWeights {
  aesthetic: number
  health: number
  functional: number
  confidence: number
}

// Scoring weights for different categories
const CATEGORY_WEIGHTS: CategoryWeights = {
  aesthetic: 0.3,
  health: 0.35,
  functional: 0.25,
  confidence: 0.1
}

// Score multipliers based on answer patterns
const SCORE_MULTIPLIERS = {
  // High concern answers get lower scores
  high_concern: 0.3,
  moderate_concern: 0.6,
  low_concern: 0.9,
  no_concern: 1.0,
  
  // Positive lifestyle factors boost scores
  excellent_hygiene: 1.2,
  good_hygiene: 1.0,
  poor_hygiene: 0.7,
  
  // Age-based adjustments
  young_adult: 1.1,
  middle_aged: 1.0,
  senior: 0.9
}

export function calculateSmileScore(answers: QuizAnswer[]): SmileScores {
  // Initialize category scores
  const categoryScores = {
    aesthetic: 0,
    health: 0,
    functional: 0,
    confidence: 0
  }
  
  const categoryCounts = {
    aesthetic: 0,
    health: 0,
    functional: 0,
    confidence: 0
  }

  // Calculate base scores for each category
  answers.forEach(answer => {
    const category = answer.category as keyof typeof categoryScores
    if (categoryScores[category] !== undefined) {
      categoryScores[category] += answer.score
      categoryCounts[category]++
    }
  })

  // Calculate average scores for each category
  Object.keys(categoryScores).forEach(category => {
    const key = category as keyof typeof categoryScores
    if (categoryCounts[key] > 0) {
      categoryScores[key] = categoryScores[key] / categoryCounts[key]
    }
  })

  // Apply contextual adjustments
  const adjustedScores = applyContextualAdjustments(categoryScores, answers)

  // Calculate overall weighted score
  const overall = (
    adjustedScores.aesthetic * CATEGORY_WEIGHTS.aesthetic +
    adjustedScores.health * CATEGORY_WEIGHTS.health +
    adjustedScores.functional * CATEGORY_WEIGHTS.functional +
    adjustedScores.confidence * CATEGORY_WEIGHTS.confidence
  )

  // Normalize all scores to 0-100 range
  return {
    aesthetic: Math.round(Math.max(0, Math.min(100, adjustedScores.aesthetic))),
    health: Math.round(Math.max(0, Math.min(100, adjustedScores.health))),
    functional: Math.round(Math.max(0, Math.min(100, adjustedScores.functional))),
    confidence: Math.round(Math.max(0, Math.min(100, adjustedScores.confidence))),
    overall: Math.round(Math.max(0, Math.min(100, overall)))
  }
}

function applyContextualAdjustments(
  baseScores: typeof categoryScores, 
  answers: QuizAnswer[]
): typeof categoryScores {
  let adjustedScores = { ...baseScores }

  // Analyze answer patterns for contextual adjustments
  const answerPatterns = analyzeAnswerPatterns(answers)

  // Apply hygiene-based adjustments
  if (answerPatterns.hygieneLevel) {
    const multiplier = SCORE_MULTIPLIERS[answerPatterns.hygieneLevel as keyof typeof SCORE_MULTIPLIERS] || 1.0
    adjustedScores.health *= multiplier
    adjustedScores.overall *= (multiplier * 0.5 + 0.5) // Reduced impact on overall
  }

  // Apply age-based adjustments
  if (answerPatterns.ageGroup) {
    const multiplier = SCORE_MULTIPLIERS[answerPatterns.ageGroup as keyof typeof SCORE_MULTIPLIERS] || 1.0
    Object.keys(adjustedScores).forEach(category => {
      const key = category as keyof typeof adjustedScores
      adjustedScores[key] *= multiplier
    })
  }

  // Apply concern level adjustments
  if (answerPatterns.overallConcernLevel) {
    const multiplier = SCORE_MULTIPLIERS[answerPatterns.overallConcernLevel as keyof typeof SCORE_MULTIPLIERS] || 1.0
    adjustedScores.confidence *= multiplier
  }

  // Boost scores for positive lifestyle factors
  if (answerPatterns.hasPositiveFactors) {
    adjustedScores.health *= 1.1
    adjustedScores.functional *= 1.05
  }

  // Penalty for multiple high-concern areas
  if (answerPatterns.highConcernCount > 3) {
    const penalty = 0.9 - (answerPatterns.highConcernCount - 3) * 0.05
    Object.keys(adjustedScores).forEach(category => {
      const key = category as keyof typeof adjustedScores
      adjustedScores[key] *= Math.max(0.7, penalty)
    })
  }

  return adjustedScores
}

function analyzeAnswerPatterns(answers: QuizAnswer[]): any {
  const patterns: any = {
    hygieneLevel: null,
    ageGroup: null,
    overallConcernLevel: null,
    hasPositiveFactors: false,
    highConcernCount: 0
  }

  answers.forEach(answer => {
    const answerText = Array.isArray(answer.answer) ? answer.answer.join(' ') : answer.answer
    const lowerAnswer = answerText.toLowerCase()

    // Analyze hygiene patterns
    if (answer.questionId === 'oral_hygiene') {
      if (lowerAnswer.includes('twice daily') && lowerAnswer.includes('floss')) {
        patterns.hygieneLevel = 'excellent_hygiene'
      } else if (lowerAnswer.includes('daily')) {
        patterns.hygieneLevel = 'good_hygiene'
      } else {
        patterns.hygieneLevel = 'poor_hygiene'
      }
    }

    // Analyze age patterns
    if (answer.questionId === 'age_range') {
      if (lowerAnswer.includes('18-30')) {
        patterns.ageGroup = 'young_adult'
      } else if (lowerAnswer.includes('31-50')) {
        patterns.ageGroup = 'middle_aged'
      } else if (lowerAnswer.includes('50+')) {
        patterns.ageGroup = 'senior'
      }
    }

    // Count high concern areas
    if (answer.score < 30) {
      patterns.highConcernCount++
    }

    // Identify positive factors
    if (lowerAnswer.includes('excellent') || 
        lowerAnswer.includes('very good') || 
        lowerAnswer.includes('no issues')) {
      patterns.hasPositiveFactors = true
    }
  })

  // Determine overall concern level
  const averageScore = answers.reduce((sum, answer) => sum + answer.score, 0) / answers.length
  if (averageScore < 40) {
    patterns.overallConcernLevel = 'high_concern'
  } else if (averageScore < 60) {
    patterns.overallConcernLevel = 'moderate_concern'
  } else if (averageScore < 80) {
    patterns.overallConcernLevel = 'low_concern'
  } else {
    patterns.overallConcernLevel = 'no_concern'
  }

  return patterns
}

export function getScoreInterpretation(scores: SmileScores): {
  overall: string
  aesthetic: string
  health: string
  functional: string
  confidence: string
} {
  const interpretScore = (score: number): string => {
    if (score >= 85) return 'Excellent'
    if (score >= 70) return 'Good'
    if (score >= 55) return 'Fair'
    if (score >= 40) return 'Needs Attention'
    return 'Requires Treatment'
  }

  return {
    overall: interpretScore(scores.overall),
    aesthetic: interpretScore(scores.aesthetic),
    health: interpretScore(scores.health),
    functional: interpretScore(scores.functional),
    confidence: interpretScore(scores.confidence)
  }
}

export function getScoreColor(score: number): string {
  if (score >= 85) return 'text-green-600'
  if (score >= 70) return 'text-blue-600'
  if (score >= 55) return 'text-yellow-600'
  if (score >= 40) return 'text-orange-600'
  return 'text-red-600'
}

export function getScoreBgColor(score: number): string {
  if (score >= 85) return 'bg-green-100'
  if (score >= 70) return 'bg-blue-100'
  if (score >= 55) return 'bg-yellow-100'
  if (score >= 40) return 'bg-orange-100'
  return 'bg-red-100'
}

