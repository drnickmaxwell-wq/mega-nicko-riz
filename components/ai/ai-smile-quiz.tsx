'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Star,
  Camera,
  Smile,
  Heart,
  Award,
  Zap
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  type: 'multiple' | 'scale' | 'image' | 'boolean';
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: string[];
}

interface QuizResult {
  score: number;
  category: string;
  recommendations: string[];
  treatments: string[];
  confidence: number;
}

const AISmileQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "How would you rate your current smile confidence?",
      type: "scale",
      scaleMin: 1,
      scaleMax: 10,
      scaleLabels: ["Not confident at all", "Extremely confident"]
    },
    {
      id: 2,
      question: "What bothers you most about your smile?",
      type: "multiple",
      options: [
        "Tooth color/staining",
        "Crooked or misaligned teeth",
        "Gaps between teeth",
        "Missing teeth",
        "Gum appearance",
        "Overall tooth shape",
        "Nothing - I love my smile!"
      ]
    },
    {
      id: 3,
      question: "How often do you hide your smile in photos or social situations?",
      type: "multiple",
      options: [
        "Always - I never show my teeth",
        "Often - I'm very self-conscious",
        "Sometimes - depends on the situation",
        "Rarely - only in certain circumstances",
        "Never - I'm comfortable with my smile"
      ]
    },
    {
      id: 4,
      question: "Have you experienced dental anxiety in the past?",
      type: "boolean",
      options: ["Yes, I'm very anxious about dental visits", "No, I'm comfortable with dental care"]
    },
    {
      id: 5,
      question: "What's your primary goal for your smile?",
      type: "multiple",
      options: [
        "Whiter, brighter teeth",
        "Straighter alignment",
        "Replace missing teeth",
        "Complete smile makeover",
        "Better oral health",
        "More youthful appearance",
        "Increased confidence"
      ]
    },
    {
      id: 6,
      question: "How important is treatment comfort to you?",
      type: "scale",
      scaleMin: 1,
      scaleMax: 10,
      scaleLabels: ["Not important", "Extremely important"]
    },
    {
      id: 7,
      question: "Are you interested in the latest dental technology?",
      type: "boolean",
      options: ["Yes, I want the most advanced treatments", "I prefer traditional approaches"]
    },
    {
      id: 8,
      question: "What's your timeline for achieving your ideal smile?",
      type: "multiple",
      options: [
        "As soon as possible",
        "Within 3 months",
        "Within 6 months",
        "Within a year",
        "I'm not in a hurry"
      ]
    }
  ];

  const handleAnswer = (questionId: number, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      analyzeResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const analyzeResults = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Calculate result based on answers
    const confidenceScore = answers[1] || 5;
    const anxietyLevel = answers[4] === "Yes, I'm very anxious about dental visits" ? "high" : "low";
    const comfortImportance = answers[6] || 5;
    
    let category = "Cosmetic Enhancement";
    let score = 75;
    let recommendations = [];
    let treatments = [];
    
    // Analyze answers to determine recommendations
    if (answers[2]?.includes("Tooth color/staining")) {
      treatments.push("Professional Teeth Whitening", "Porcelain Veneers");
      recommendations.push("Consider our advanced whitening treatments for dramatic color improvement");
    }
    
    if (answers[2]?.includes("Crooked or misaligned teeth")) {
      treatments.push("Clear Aligners", "Porcelain Veneers");
      recommendations.push("3D digital orthodontics can straighten your smile discreetly");
    }
    
    if (answers[2]?.includes("Missing teeth")) {
      treatments.push("3D Digital Implants", "Dental Bridges");
      recommendations.push("Our 3D-guided implant technology provides permanent tooth replacement");
      category = "Restorative Care";
    }
    
    if (anxietyLevel === "high" || comfortImportance >= 8) {
      treatments.push("Anxiety-Free Dentistry", "The Wand System");
      recommendations.push("Our anxiety-free approach with sedation options ensures complete comfort");
    }
    
    if (answers[7] === "Yes, I want the most advanced treatments") {
      treatments.push("3D Digital Dentistry", "AI Smile Design");
      recommendations.push("Experience our cutting-edge 3D technology for precise, predictable results");
      score += 10;
    }
    
    setResult({
      score,
      category,
      recommendations: recommendations.length > 0 ? recommendations : [
        "A comprehensive consultation will help determine the best treatment plan for your unique needs"
      ],
      treatments: treatments.length > 0 ? treatments : ["Comprehensive Consultation"],
      confidence: Math.min(95, score + Math.random() * 10)
    });
    
    setIsAnalyzing(false);
    setIsCompleted(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setResult(null);
    setIsAnalyzing(false);
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-16 h-16 text-white" />
            </motion.div>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            AI Analyzing Your Smile Profile
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Our advanced AI is processing your responses to create personalized recommendations...
          </p>
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-pink-500 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (isCompleted && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Your AI Smile Analysis
            </h1>
            <p className="text-xl text-slate-600">
              Personalized recommendations based on your unique profile
            </p>
          </motion.div>

          {/* Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Score & Category */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-100"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Smile Score</h2>
              
              <div className="text-center mb-6">
                <div className="text-6xl font-bold bg-gradient-to-r from-pink-500 to-teal-500 bg-clip-text text-transparent mb-2">
                  {result.score}
                </div>
                <div className="text-slate-600">out of 100</div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-600">Smile Potential</span>
                    <span className="font-semibold">{result.score}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-pink-500 to-teal-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${result.score}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-2">Category</h3>
                  <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-teal-500 text-white rounded-full text-sm font-semibold">
                    {result.category}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-100"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6">AI Recommendations</h2>
              
              <div className="space-y-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-slate-600 leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-3">Suggested Treatments</h3>
                <div className="flex flex-wrap gap-2">
                  {result.treatments.map((treatment, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
                    >
                      {treatment}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-pink-600 to-teal-600 rounded-3xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Smile?</h2>
              <p className="text-xl mb-8 opacity-90">
                Book a free consultation to discuss your personalized treatment plan
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-pink-600 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                  Book Free Consultation
                </button>
                <button 
                  onClick={resetQuiz}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-pink-600 transition-colors"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-pink-200 mb-6">
            <Sparkles className="w-5 h-5 text-pink-500 mr-2" />
            <span className="text-sm font-semibold text-slate-700">AI Smile Analysis</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Discover Your Perfect Smile
          </h1>
          <p className="text-xl text-slate-600">
            Answer a few questions and let our AI create a personalized treatment plan
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-slate-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-pink-500 to-teal-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-100 mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">
              {currentQ.question}
            </h2>

            {/* Multiple Choice */}
            {currentQ.type === 'multiple' && (
              <div className="space-y-4">
                {currentQ.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(currentQ.id, option)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${
                      answers[currentQ.id] === option
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-slate-200 hover:border-pink-300 hover:bg-pink-25'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-4 ${
                        answers[currentQ.id] === option
                          ? 'border-pink-500 bg-pink-500'
                          : 'border-slate-300'
                      }`}>
                        {answers[currentQ.id] === option && (
                          <CheckCircle className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <span className="text-slate-700">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Scale */}
            {currentQ.type === 'scale' && (
              <div className="space-y-6">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>{currentQ.scaleLabels?.[0]}</span>
                  <span>{currentQ.scaleLabels?.[1]}</span>
                </div>
                <div className="flex justify-between">
                  {Array.from({ length: currentQ.scaleMax! - currentQ.scaleMin! + 1 }, (_, i) => {
                    const value = currentQ.scaleMin! + i;
                    return (
                      <button
                        key={value}
                        onClick={() => handleAnswer(currentQ.id, value)}
                        className={`w-12 h-12 rounded-full border-2 font-bold transition-colors ${
                          answers[currentQ.id] === value
                            ? 'border-pink-500 bg-pink-500 text-white'
                            : 'border-slate-300 text-slate-600 hover:border-pink-300'
                        }`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Boolean */}
            {currentQ.type === 'boolean' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQ.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(currentQ.id, option)}
                    className={`p-6 rounded-xl border-2 transition-colors ${
                      answers[currentQ.id] === option
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-slate-200 hover:border-pink-300 hover:bg-pink-25'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-8 h-8 rounded-full border-2 mx-auto mb-3 ${
                        answers[currentQ.id] === option
                          ? 'border-pink-500 bg-pink-500'
                          : 'border-slate-300'
                      }`}>
                        {answers[currentQ.id] === option && (
                          <CheckCircle className="w-8 h-8 text-white" />
                        )}
                      </div>
                      <span className="text-slate-700 font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-colors ${
              currentQuestion === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          <button
            onClick={nextQuestion}
            disabled={!answers[currentQ.id]}
            className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-colors ${
              !answers[currentQ.id]
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-teal-500 text-white hover:from-pink-600 hover:to-teal-600'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISmileQuiz;

