import { FormEvent, useState } from "react";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setMessage(`Password reset link has been sent to ${email}.`);
  };

  return (
    <main className="mx-auto grid min-h-[70vh] max-w-4xl place-items-center px-4 py-10">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold">Forgot Password</h1>
        <p className="mt-2 text-sm text-slate-600">Enter your email and we will send a reset link.</p>
        <input
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3"
        />
        <button className="mt-4 w-full rounded-full bg-[#0B5D1E] py-3 text-white">Send Reset Link</button>
        {message && <p className="mt-3 text-sm text-emerald-700">{message}</p>}
      </form>
    </main>
  );
}