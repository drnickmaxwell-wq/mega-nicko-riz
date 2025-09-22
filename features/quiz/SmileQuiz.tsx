"use client";
import Link from "next/link";

export default function SmileQuiz() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="font-semibold mb-2">AI Smile Quiz</h3>
      <p className="text-white/70">Answer a few questions and we’ll suggest options.</p>
      <Link href="/ai-smile-quiz" className="inline-block mt-3 underline text-[var(--turquoise,#40C4B4)]">
        Open the AI Smile Quiz
      </Link>
    </div>
  );
}
