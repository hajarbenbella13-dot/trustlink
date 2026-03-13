import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: 0,
    commission: 15,
    color: "border-gray-200",
    badge: null,
    features: [
      "Max 20 offres / mois",
      "Commission 15% par offre acceptée",
      "Profil standard",
      "Placement standard dans les résultats",
      "Solde minimum: 300 MAD",
    ],
    cta: "Commencer gratuitement",
    ctaStyle: "border border-primary text-primary hover:bg-blue-50",
  },
  {
    name: "Pro",
    price: 200,
    commission: 10,
    color: "border-primary",
    badge: "Le plus populaire",
    features: [
      "Offres illimitées",
      "Commission 10% par offre acceptée",
      "Badge 'Pro' sur le profil",
      "Priorité dans les résultats de recherche",
      "Solde minimum: 200 MAD",
    ],
    cta: "Passer en Pro",
    ctaStyle: "bg-primary text-white hover:bg-blue-700",
  },
  {
    name: "Elite",
    price: 400,
    commission: 7,
    color: "border-yellow-400",
    badge: "Meilleur retour",
    features: [
      "Offres illimitées",
      "Commission 7% par offre acceptée",
      "Badge 'Elite ⭐' sur le profil",
      "Featured placement (top des résultats)",
      "Support dédié 24h/24",
      "Analytics — stats de votre profil",
      "Solde minimum: 100 MAD",
    ],
    cta: "Passer en Elite",
    ctaStyle: "bg-yellow-400 text-yellow-900 hover:bg-yellow-500",
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <span onClick={() => navigate("/")} className="text-xl font-bold text-primary cursor-pointer">TrustLink</span>
        <button onClick={() => navigate("/login")} className="text-sm text-primary font-medium hover:underline">
          Connexion →
        </button>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Choisissez votre abonnement
          </h1>
          <p className="text-gray-500 text-lg">
            Plus vous investissez, moins vous payez de commission
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl border-2 ${plan.color} p-6 relative flex flex-col`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap ${
                  plan.name === "Pro" ? "bg-primary text-white" : "bg-yellow-400 text-yellow-900"
                }`}>
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {plan.name === "Free" && "🆓"}
                  {plan.name === "Pro" && "⚡"}
                  {plan.name === "Elite" && "⭐"}
                  {" "}{plan.name}
                </div>
                <div className="text-4xl font-bold text-gray-900 mt-3">
                  {plan.price === 0 ? "Gratuit" : `${plan.price} MAD`}
                </div>
                {plan.price > 0 && <div className="text-gray-400 text-sm">/ mois</div>}
                <div className={`mt-2 text-sm font-semibold ${
                  plan.commission === 15 ? "text-red-500" :
                  plan.commission === 10 ? "text-primary" : "text-green-600"
                }`}>
                  Commission: {plan.commission}%
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => navigate("/register")}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition ${plan.ctaStyle}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Commission example */}
        <div className="mt-12 bg-white rounded-2xl border p-6">
          <h2 className="font-bold text-gray-900 text-lg mb-4 text-center">
            Exemple concret — Mission de 1 000 MAD
          </h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            {plans.map((plan) => {
              const commission = Math.round(1000 * plan.commission / 100);
              const gain = 1000 - commission - plan.price;
              return (
                <div key={plan.name} className={`rounded-xl p-4 border-2 ${plan.color}`}>
                  <div className="font-bold text-gray-900 mb-3">{plan.name}</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Mission</span>
                      <span className="font-medium">1 000 MAD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Abonnement</span>
                      <span className="text-red-500">-{plan.price} MAD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Commission</span>
                      <span className="text-red-500">-{commission} MAD</span>
                    </div>
                    <div className="border-t pt-1 flex justify-between font-bold">
                      <span>Vous gagnez</span>
                      <span className={gain > 800 ? "text-green-600" : gain > 700 ? "text-primary" : "text-gray-700"}>
                        {gain} MAD
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">
            * Le paiement de la mission reste direct entre client et artisan (cash, virement, mobile money)
          </p>
        </div>
      </div>
    </div>
  );
}