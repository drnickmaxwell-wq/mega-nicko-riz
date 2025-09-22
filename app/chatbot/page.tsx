'use client';
import dynamic from 'next/dynamic';
const ChatWidget = dynamic(() => import('@/features/chatbot/ChatWidget'), { ssr: false });

export default function Chatbot() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-semibold">AI Concierge</h1>
      <div className="mt-6 max-w-3xl"><ChatWidget /></div>
    </main>
  );
}
