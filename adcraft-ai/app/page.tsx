export default function Landing() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* HERO */}
      <section className="text-center py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold leading-tight">
          Create high-converting ads with AI in seconds
        </h2>

        <p className="text-gray-500 mt-6 text-lg">
          Generate product ads, visuals, and copy for e-commerce brands instantly.
          No design skills required.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/dashboard"
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Launch Dashboard
          </a>

          <a
            href="/"
            className="border px-6 py-3 rounded-xl"
          >
            View Demo
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid grid-cols-3 gap-6 max-w-5xl mx-auto px-6 py-12">
        {[
          {
            title: "AI Ad Copy",
            desc: "Generate high-converting headlines and descriptions",
          },
          {
            title: "Image Generation",
            desc: "Create studio-quality product visuals instantly",
          },
          {
            title: "Multi Variations",
            desc: "Get 3+ ad variations for every product",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="font-bold mb-2">{f.title}</h3>
            <p className="text-sm text-gray-500">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* PRICING */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Pricing</h2>

        <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              name: "Starter",
              price: "Free",
              features: ["5 ads / day", "Basic images", "Watermark"],
            },
            {
              name: "Pro",
              price: "$19/mo",
              features: ["Unlimited ads", "HD images", "No watermark"],
            },
            {
              name: "Agency",
              price: "$49/mo",
              features: ["Client mode", "Bulk generation", "API access"],
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className="border rounded-xl p-6 bg-white hover:scale-105 transition"
            >
              <h3 className="font-bold text-xl">{plan.name}</h3>
              <p className="text-2xl my-4">{plan.price}</p>

              <ul className="text-sm text-gray-500 space-y-2">
                {plan.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>

              <button className="mt-6 bg-black text-white px-4 py-2 rounded w-full">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-black text-white">
        <h2 className="text-3xl font-bold">
          Start creating ads in seconds
        </h2>

        <p className="text-gray-300 mt-4">
          Join thousands of ecommerce brands using AI
        </p>

        <a
          href="/dashboard"
          className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-xl"
        >
          Open Dashboard
        </a>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-400 py-10">
        © {new Date().getFullYear()} AdCraft AI
      </footer>

    </main>
  );
}