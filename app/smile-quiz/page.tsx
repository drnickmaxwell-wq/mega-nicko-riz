'use client';
import dynamic from 'next/dynamic';
const SmileQuiz = dynamic(() => import('@/features/quiz/SmileQuiz').then(m=>m.SmileQuiz), { ssr: false });

export default function SmileQuizPage() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-semibold mb-6">AI Smile Quiz</h1>
      <SmileQuiz />
    </main>
  );
}
