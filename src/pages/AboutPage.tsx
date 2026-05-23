export function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-8">
      <h1 className="text-4xl font-semibold text-slate-900">About Abeiku Farms</h1>
      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#0B5D1E]">Company Story</h2>
        <p className="text-slate-600">
          Abeiku Farms was built to simplify how households and businesses buy quality farm produce. We source from reliable
          farmers, handle quality checks, and deliver directly to customers.
        </p>
      </section>
      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#0B5D1E]">Mission</h2>
        <p className="text-slate-600">To make fresh, affordable, and traceable farm produce accessible to every customer.</p>
      </section>
      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#0B5D1E]">Vision</h2>
        <p className="text-slate-600">To become West Africa's most trusted digital agricultural marketplace.</p>
      </section>
      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#0B5D1E]">Why Choose Abeiku Farms</h2>
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>Verified produce quality from trusted farms</li>
          <li>Secure payments and transparent order tracking</li>
          <li>Flexible delivery and pickup options</li>
          <li>Reliable customer support for households and businesses</li>
        </ul>
      </section>
    </main>
  );
}