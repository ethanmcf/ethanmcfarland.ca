import { useState } from "react";

type Step = "email" | "message" | "review" | "sent";

export default function ContactMeTab() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (step === "email") {
      if (!draft.trim()) return;
      setEmail(draft.trim());
      setDraft("");
      setStep("message");
    } else if (step === "message") {
      if (!draft.trim()) return;
      setMessage(draft.trim());
      setDraft("");
      setStep("review");
    } else if (step === "review") {
      setStep("sent");
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-terminal-muted">
        # answer the prompts below to send me a message
      </p>

      <AnsweredPrompt label="Your email" value={email} show={step !== "email"} />
      {step === "email" && (
        <QuestionInput
          value={draft}
          onChange={setDraft}
          onSubmit={handleSubmit}
          placeholder="you@example.com"
          type="email"
        />
      )}

      {step !== "email" && (
        <AnsweredPrompt
          label="Your message"
          value={message}
          show={step !== "message"}
        />
      )}
      {step === "message" && (
        <QuestionInput
          value={draft}
          onChange={setDraft}
          onSubmit={handleSubmit}
          placeholder="What's on your mind?"
        />
      )}

      {step === "review" && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <p className="text-terminal-muted">
            # this demo doesn't send anything yet — press enter to continue
          </p>
          <button
            type="submit"
            className="w-fit cursor-pointer text-terminal-arrow hover:underline"
          >
            [Enter] Send message →
          </button>
        </form>
      )}

      {step === "sent" && (
        <p className="text-terminal-arrow">
          ✓ Got it — thanks, {email}. (UI demo only, not wired up to send yet)
        </p>
      )}
    </div>
  );
}

function AnsweredPrompt({
  label,
  value,
  show,
}: {
  label: string;
  value: string;
  show: boolean;
}) {
  if (!show) return null;
  return (
    <p className="flex items-center gap-1.5">
      <span className="text-terminal-arrow">✓</span>
      <span className="text-text">{label}:</span>
      <span className="text-terminal-muted">{value}</span>
    </p>
  );
}

function QuestionInput({
  value,
  onChange,
  onSubmit,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <form onSubmit={onSubmit} className="flex items-center gap-1.5">
      <span className="text-accent">?</span>
      <input
        autoFocus
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        className="flex-1 bg-transparent font-mono text-[13px] text-text outline-none placeholder:text-terminal-muted"
      />
    </form>
  );
}
