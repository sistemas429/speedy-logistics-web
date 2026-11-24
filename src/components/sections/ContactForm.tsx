"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/dictionaries";

type Status = "idle" | "sending" | "success" | "error";
type ErrorCode = "validation" | "rate_limited" | "not_configured" | "upstream" | "network";

const fieldClass =
  "w-full rounded-2xl border border-line bg-white px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20";

export function ContactForm({ form }: { form: Dictionary["contact"]["form"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const formElement = event.currentTarget;
    const data = Object.fromEntries(new FormData(formElement));

    setStatus("sending");
    setErrorCode(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: ErrorCode }
        | null;

      if (response.ok && result?.ok) {
        formElement.reset();
        setStatus("success");
        return;
      }
      setErrorCode(result && !result.ok ? result.error : "upstream");
      setStatus("error");
    } catch {
      setErrorCode("network");
      setStatus("error");
    }
  }

  const errorMessage =
    errorCode === "validation"
      ? form.errors.validation
      : errorCode === "rate_limited"
        ? form.errors.rateLimited
        : form.errors.generic;

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate={false}>
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
          {form.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          className={fieldClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
            {form.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={150}
            autoComplete="email"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink">
            {form.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={30}
            autoComplete="tel"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          {form.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          className={`${fieldClass} resize-y`}
        />
      </div>

      {/* Campo trampa (honeypot): invisible para personas, los bots suelen llenarlo. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-full bg-brand px-7 py-3 text-base font-medium text-white transition-colors hover:bg-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? form.sending : form.submit}
      </button>

      <p className="text-sm text-muted">{form.privacy}</p>

      <div aria-live="polite" role="status">
        {status === "success" ? (
          <p className="rounded-2xl bg-brand-soft px-4 py-3 text-sm font-medium text-brand">
            {form.success}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
