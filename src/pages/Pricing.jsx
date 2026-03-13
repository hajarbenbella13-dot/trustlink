import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowLeft } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: 0,
    commission: 15,
    color: "border-gray-200",
    badge: null,
    icon: "🆓",
    features: [
      "Max 20 offres / mois",
      "Commission 15% par offre",
      "Profil standard",
      "Placement standard",
      "Solde min: 300 MAD",
    ],
    cta: "Commencer gratuitement",
    ctaStyle: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
  },
  {
    name: "Pro",
    price: 200,
    commission: 10,
    color: "border-blue-600",
    badge: "Le plus populaire",
    icon: "⚡",
    features: [
      "Offres illimitées",
      "Commission 10% par offre",
      "Badge 'Pro' sur le profil",
      "Priorité dans les résultats",
      "Solde min: 200 MAD",
    ],
    cta: "Passer en Pro",
    ctaStyle: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100",
  },
  {
    name: "Elite",
    price: 400,
    commission: 7,
    color: "border-yellow-400",
    badge: "Meilleur retour",
    icon: "⭐",
    features: [
      "Offres illimitées",
      "Commission 7% par offre",
      "Badge 'Elite ⭐'",
      "Top des résultats",
      "Support dédié 24h/24",
      "Analytics complets",
      "Solde min: 100 MAD",
    ],
    cta: "Passer en Elite",
    ctaStyle: "bg-yellow-400 text-yellow-900 hover:bg-yellow-500 shadow-lg shadow-yellow-100",
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Navbar Responsive */}
      <nav className="bg-white border-b px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
           <ArrowLeft size={20} className="md:hidden text-gray-600" />
           <span className="text-xl font-bold text-blue-600">TrustLink</span>
        </div>
        <button onClick={() => navigate("/login")} className="text-sm text-blue-600 font-bold hover:underline">
          Connexion
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            Boostez votre <span className="text-blue-600">activité</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Plus vous investissez dans votre visibilité, moins vous payez de commission sur vos travaux.
          </p>
        </div>

        {/* Grille des Plans : 1 colonne sur mobile, 3 sur Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-3xl border-2 ${plan.color} p-6 md:p-8 relative flex flex-col transition-transform hover:scale-[1.02] shadow-sm`}
            >
              {plan.badge && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap ${
                  plan.name === "Pro" ? "bg-blue-600 text-white" : "bg-yellow-400 text-yellow-900"
                }`}>
                  {plan.badge}
                </div>
              )}

              <div className="text-center mb-8">
                <div className="text-4xl mb-2">{plan.icon}</div>
                <h3 className="text-2xl font-black text-gray-900">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mt-4">
                  <span className="text-4xl font-black text-gray-900">
                    {plan.price === 0 ? "0" : plan.price}
                  </span>
                  <span className="text-gray-500 font-bold text-lg">MAD{plan.price > 0 && "/mois"}</span>
                </div>
                <div className={`mt-4 inline-block px-3 py-1 rounded-lg text-sm font-bold ${
                  plan.commission === 15 ? "bg-red-50 text-red-600" :
                  plan.commission === 10 ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
                }`}>
                  Commission : {plan.commission}%
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm md:text-base text-gray-600 font-medium">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/register")}
                className={`w-full py-4 rounded-2xl font-black text-base transition-all active:scale-95 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Exemple Concret : Adapté pour Mobile */}
        <div className="mt-16 bg-white rounded-3xl border border-gray-100 p-6 md:p-10 shadow-sm">
          <h2 className="font-black text-gray-900 text-xl md:text-2xl mb-8 text-center">
            Combien allez-vous gagner ?
          </h2>
          <p className="text-center text-gray-500 mb-8 text-sm md:text-base">
            Exemple pour une mission de <strong>1 000 MAD</strong>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {plans.map((plan) => {
              const commission = Math.round(1000 * plan.commission / 100);
              const gain = 1000 - commission;
              return (
                <div key={plan.name} className={`rounded-2xl p-5 border-2 ${plan.color} bg-gray-50/30`}>
                  <div className="font-black text-gray-900 text-lg mb-4 flex items-center justify-between">
                    {plan.name}
                    <span className="text-xs font-bold text-gray-400">Total</span>
                  </div>
                  <div className="space-y-3 text-sm font-medium">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Commission ({plan.commission}%)</span>
                      <span className="text-red-500">-{commission} MAD</span>
                    </div>
                    <div className="border-t border-dashed pt-3 flex justify-between font-black text-base">
                      <span>Gain net</span>
                      <span className="text-green-600">{gain} MAD</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] md:text-xs text-gray-400 text-center mt-8 italic leading-relaxed">
            * Note : TrustLink ne prélève la commission que lorsque vous encaissez votre argent. Le paiement se fait directement entre vous et le client.
          </p>
        </div>
      </div>
    </div>
  );
}