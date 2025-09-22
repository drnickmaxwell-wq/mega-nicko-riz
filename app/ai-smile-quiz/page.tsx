"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { LeadSchema } from "@/lib/utils/validators";

type Step = 1 | 2 | 3;

export default function AiSmileQuizPage() {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<any>({ interest: "implants" });
  const [status, setStatus] = useState<string>("");

  async function submitLead() {
    try {
      const res = await fetch("/api/leads/quiz", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(answers),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("Thanks! We’ll be in touch shortly.");
    } catch {
      setStatus("Could not submit. Please call 01273 453109.");
    }
  }

  return (
    <main className="mx-auto max-w-[var(--maxw,1200px)] px-6 py-16">
      <h1 className="text-3xl font-semibold">AI Smile Quiz</h1>
      {step === 1 && (
        <section className="mt-6">
          <p className="text-white/80 mb-4">What are you most interested in?</p>
          <div className="flex flex-wrap gap-2">
            {["implants","spark-aligners","3d-printed-veneers","whitening","cosmetic","other"].map(i => (
              <Button key={i} onClick={() => { setAnswers((a:any)=>({...a, interest:i})); setStep(2);} }>{i}</Button>
            ))}
          </div>
        </section>
      )}
      {step === 2 && (
        <section className="mt-6">
          <p className="text-white/80 mb-4">Tell us a bit about your smile goals</p>
          <textarea className="w-full h-28 rounded-xl bg-white/5 border border-white/10 p-3"
            onChange={(e)=> setAnswers((a:any)=>({...a, goals:e.target.value}))} />
          <div className="mt-4"><Button onClick={()=>setStep(3)}>Next</Button></div>
        </section>
      )}
      {step === 3 && (
        <section className="mt-6 space-y-3">
          <input placeholder="Name" className="w-full rounded-xl bg-white/5 border border-white/10 p-3"
            onChange={(e)=> setAnswers((a:any)=>({...a, name:e.target.value}))}/>
          <input placeholder="Email" className="w-full rounded-xl bg-white/5 border border-white/10 p-3"
            onChange={(e)=> setAnswers((a:any)=>({...a, email:e.target.value}))}/>
          <input placeholder="Phone (optional)" className="w-full rounded-xl bg-white/5 border border-white/10 p-3"
            onChange={(e)=> setAnswers((a:any)=>({...a, phone:e.target.value}))}/>
          <div className="flex gap-2">
            <Button onClick={submitLead}>Submit</Button>
            <Button variant="outline" onClick={()=>setStep(2)}>Back</Button>
          </div>
          {status && <p className="text-sm text-white/70 mt-2">{status}</p>}
        </section>
      )}
    </main>
  );
}
