import { FormEvent, useState } from "react";

export function ContactPage() {
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <h1 className="text-4xl font-semibold text-slate-900">Contact Abeiku Farms</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-slate-200 p-6">
          <input required placeholder="Your name" className="w-full rounded-xl border border-slate-300 px-4 py-3" />
          <input required type="email" placeholder="Email" className="w-full rounded-xl border border-slate-300 px-4 py-3" />
          <textarea required placeholder="Message" className="h-32 w-full rounded-xl border border-slate-300 px-4 py-3" />
          <button className="rounded-full bg-[#0B5D1E] px-6 py-3 text-white">Send Message</button>
          {sent && <p className="text-sm text-emerald-700">Message sent successfully.</p>}
        </form>

        <div className="space-y-4">
          <a
            href="https://wa.me/233240001122"
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-full bg-[#0B5D1E] px-6 py-3 font-semibold text-white"
          >
            Chat on WhatsApp
          </a>
          <p className="text-slate-700">Phone: +233 550873047 / +233 508180698</p>
          <p className="text-slate-700">Email: support@abeikufarms.com</p>
          <iframe
            title="Abeiku farms map"
            src="https://www.google.com/maps?q=Accra%20Ghana&output=embed"
            className="h-72 w-full rounded-2xl border border-slate-200"
            loading="lazy"
          />
        </div>
      </div>
    </main>
  );
}
