'use client'

import React, { useState, useEffect } from 'react'
import { QuizQuestion } from './QuizQuestion'
import { QuizProgress } from './QuizProgress'
import { QuizResults } from './QuizResults'
import { QuizCTA } from './QuizCTA'
import { calculateSmileScore } from '@/lib/quiz/scoring-algorithm'
import { getRecommendations } from '@/lib/quiz/recommendation-rules'
import { trackQuizEvent } from '@/lib/quiz/quiz-analytics'
import { QUIZ_QUESTIONS } from '@/lib/data/quiz-questions'

interface SmileQuizProps {
  onComplete?: (results: QuizResults) => void
  enableAnalytics?: boolean
  showProgressBar?: boolean
  allowRetake?: boolean
  className?: string
}

interface QuizAnswer {
  questionId: string
  answer: string | string[]
  score: number
  category: string
}

interface QuizResults {
  answers: QuizAnswer[]
  scores: {
    aesthetic: number
    health: number
    functional: number
    confidence: number
    overall: number
  }
  recommendations: any[]
  completionTime: number
  userId?: string
}

interface QuizState {
  currentQuestion: number
  answers: QuizAnswer[]
  isComplete: boolean
  startTime: number
  results?: QuizResults
}

export function SmileQuiz({
  onComplete,
  enableAnalytics = true,
  showProgressBar = true,
  allowRetake = true,
  className = ''
}: SmileQuizProps) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    isComplete: false,
    startTime: Date.now()
  })

  const [isLoading, setIsLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  const currentQuestion = QUIZ_QUESTIONS[quizState.currentQuestion]
  const progress = ((quizState.currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100

  useEffect(() => {
    if (enableAnalytics && showWelcome) {
      trackQuizEvent('quiz_started', {
        timestamp: new Date().toISOString(),
        totalQuestions: QUIZ_QUESTIONS.length
      })
    }
  }, [enableAnalytics, showWelcome])

  const startQuiz = () => {
    setShowWelcome(false)
    setQuizState(prev => ({
      ...prev,
      startTime: Date.now()
    }))
  }

  const handleAnswer = async (answer: string | string[], score: number) => {
    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      answer,
      score,
      category: currentQuestion.category
    }

    const updatedAnswers = [...quizState.answers, newAnswer]

    if (enableAnalytics) {
      trackQuizEvent('question_answered', {
        questionId: currentQuestion.id,
        answer,
        score,
        questionNumber: quizState.currentQuestion + 1
      })
    }

    // Check if this is the last question
    if (quizState.currentQuestion === QUIZ_QUESTIONS.length - 1) {
      await completeQuiz(updatedAnswers)
    } else {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        answers: updatedAnswers
      }))
    }
  }

  const completeQuiz = async (answers: QuizAnswer[]) => {
    setIsLoading(true)

    try {
      // Calculate scores
      const scores = calculateSmileScore(answers)
      
      // Get recommendations
      const recommendations = await getRecommendations(scores, answers)
      
      // Calculate completion time
      const completionTime = Date.now() - quizState.startTime

      const results: QuizResults = {
        answers,
        scores,
        recommendations,
        completionTime
      }

      setQuizState(prev => ({
        ...prev,
        isComplete: true,
        results
      }))

      if (enableAnalytics) {
        trackQuizEvent('quiz_completed', {
          scores,
          completionTime,
          totalQuestions: QUIZ_QUESTIONS.length,
          recommendations: recommendations.length
        })
      }

      onComplete?.(results)

    } catch (error) {
      console.error('Quiz completion error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const retakeQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      answers: [],
      isComplete: false,
      startTime: Date.now()
    })
    setShowWelcome(true)

    if (enableAnalytics) {
      trackQuizEvent('quiz_retaken', {
        timestamp: new Date().toISOString()
      })
    }
  }

  const goToPreviousQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
        answers: prev.answers.slice(0, -1) // Remove last answer
      }))
    }
  }

  if (showWelcome) {
    return (
      <div className={`max-w-4xl mx-auto ${className}`}>
        <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-white">😊</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            AI Smile Assessment
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Discover your perfect smile with our AI-powered assessment. Get personalized 
            treatment recommendations based on your unique needs and goals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-white/60 rounded-lg">
              <span className="text-2xl">⏱️</span>
              <div className="text-left">
                <div className="font-semibold">3-5 Minutes</div>
                <div className="text-sm text-gray-600">Quick & Easy</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-white/60 rounded-lg">
              <span className="text-2xl">🤖</span>
              <div className="text-left">
                <div className="font-semibold">AI-Powered</div>
                <div className="text-sm text-gray-600">Intelligent Analysis</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-white/60 rounded-lg">
              <span className="text-2xl">🎯</span>
              <div className="text-left">
                <div className="font-semibold">Personalized</div>
                <div className="text-sm text-gray-600">Custom Results</div>
              </div>
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-lg"
          >
            Start Your Smile Assessment
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Free assessment • No obligation • Instant results
          </p>
        </div>
      </div>
    )
  }

  if (quizState.isComplete && quizState.results) {
    return (
      <div className={`max-w-4xl mx-auto ${className}`}>
        <QuizResults 
          results={quizState.results}
          onRetake={allowRetake ? retakeQuiz : undefined}
        />
        <QuizCTA results={quizState.results} />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={`max-w-4xl mx-auto ${className}`}>
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Analyzing Your Smile...</h3>
          <p className="text-gray-600">
            Our AI is processing your responses to create personalized recommendations.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      
      {/* Progress Bar */}
      {showProgressBar && (
        <QuizProgress 
          current={quizState.currentQuestion + 1}
          total={QUIZ_QUESTIONS.length}
          progress={progress}
        />
      )}

      {/* Question */}
      <div className="mt-6">
        <QuizQuestion
          question={currentQuestion}
          questionNumber={quizState.currentQuestion + 1}
          totalQuestions={QUIZ_QUESTIONS.length}
          onAnswer={handleAnswer}
          onPrevious={quizState.currentQuestion > 0 ? goToPreviousQuestion : undefined}
        />
      </div>

      {/* Quiz Info */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          Question {quizState.currentQuestion + 1} of {QUIZ_QUESTIONS.length} • 
          Estimated time remaining: {Math.ceil((QUIZ_QUESTIONS.length - quizState.currentQuestion - 1) * 0.5)} minutes
        </p>
      </div>
    </div>
  )
}

