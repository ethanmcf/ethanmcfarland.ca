import { useEffect, useState } from "react";
import TerminalTextarea from "./TerminalTextarea";
import { sendContactEmail } from "../../actions/send-email";

type Step = "email" | "message" | "review" | "sending" | "sent" | "error";

const BAR_WIDTH = 24;
const TICK_INTERVAL_MS = 110;
const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactMeTab() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!submitting) return;
    const timeout = setTimeout(
      () => setTick((prev) => prev + 1),
      TICK_INTERVAL_MS,
    );
    return () => clearTimeout(timeout);
  }, [submitting, tick]);

  function resetForm() {
    setEmail("");
    setMessage("");
    setDraft("");
    setEmailError("");
    setSendError("");
    setStep("email");
  }

  async function trySend() {
    if (submitting) return;
    setSubmitting(true);
    setSendError("");
    setTick(0);
    setStep("sending");

    try {
      await sendContactEmail({ email, message });
      setStep("sent");
    } catch (err) {
      const reason = err instanceof Error ? err.message : "";
      setSendError(
        reason === "rate_limited"
          ? "You've sent too many messages. Please try again in an hour."
          : "There was an issue sending your message. Please try again in a bit.",
      );
      setStep("error");
    } finally {
      setSubmitting(false);
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (step === "email") {
      const trimmed = draft.trim();
      if (!trimmed) return;
      if (!EMAIL_PATTERN.test(trimmed)) {
        setEmailError("That doesn't look like a valid email");
        return;
      }
      setEmailError("");
      setEmail(trimmed);
      setDraft("");
      setStep("message");
    } else if (step === "message") {
      if (!draft.trim()) return;
      setMessage(draft.trim());
      setDraft("");
      setStep("review");
    } else if (step === "review") {
      trySend();
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-terminal-muted">
        # type your email and press enter, then type your message and press
        enter to send
      </p>

      <AnsweredPrompt
        label="Your email"
        value={email}
        show={step !== "email"}
      />
      {step === "email" && (
        <QuestionInput
          value={draft}
          onChange={(value) => {
            setDraft(value);
            if (emailError) setEmailError("");
          }}
          onSubmit={handleSubmit}
          placeholder="you@example.com"
          inputMode="email"
          error={emailError}
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
          placeholder="Say hi, ask a question, whatever's on your mind"
        />
      )}

      {step === "review" && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <button
            type="submit"
            autoFocus
            className="w-fit cursor-pointer text-accent outline-none hover:underline"
          >
            [Enter] Send message →
          </button>
        </form>
      )}

      {step === "sending" && (
        <p className="text-text">
          <span className="whitespace-pre">
            {SPINNER_FRAMES[tick % SPINNER_FRAMES.length]} [
            {"█".repeat(tick % BAR_WIDTH)}
            {"░".repeat(BAR_WIDTH - (tick % BAR_WIDTH))}]
          </span>{" "}
          sending message…
        </p>
      )}

      {step === "sent" && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            resetForm();
          }}
          className="flex flex-col gap-1"
        >
          <p className="text-terminal-arrow">✓ Got it — thanks, {email}.</p>
          <button
            type="submit"
            autoFocus
            className="w-fit cursor-pointer text-accent outline-none hover:underline"
          >
            [Enter] Send another message →
          </button>
        </form>
      )}

      {step === "error" && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setStep("review");
          }}
          className="flex flex-col gap-1"
        >
          <p className="text-error">✕ {sendError}</p>
          <button
            type="submit"
            autoFocus
            className="w-fit cursor-pointer text-accent outline-none hover:underline"
          >
            [Enter] Try again →
          </button>
        </form>
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
    <p className="flex items-start gap-1.5">
      <span className="shrink-0 text-terminal-arrow">✓</span>
      <span className="shrink-0 text-text">{label}:</span>
      <span className="min-w-0 flex-1 break-words text-terminal-muted">
        {value}
      </span>
    </p>
  );
}

function QuestionInput({
  value,
  onChange,
  onSubmit,
  placeholder,
  inputMode,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  placeholder: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  error?: string;
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-1">
      <div className="flex items-start gap-1.5">
        <span className="text-accent">?</span>
        <TerminalTextarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          inputMode={inputMode}
          className="flex-1"
        />
      </div>
      {error && (
        <p className="pl-4 text-base text-error md:text-[12px]">{error}</p>
      )}
    </form>
  );
}
