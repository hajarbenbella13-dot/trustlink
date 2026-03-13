import { useState } from "react";
import { useNavigate } from "react-router-dom";

const transactions = [
  { date: "12 Mars 2026", desc: "Commission — Fuite cuisine Maarif", amount: -65, type: "commission" },
  { date: "10 Mars 2026", desc: "Rechargement carte bancaire", amount: +500, type: "credit" },
  { date: "08 Mars 2026", desc: "Commission — Peinture salon Agdal", amount: -130, type: "commission" },
  { date: "05 Mars 2026", desc: "Rechargement Inwi Money", amount: +300, type: "credit" },
  { date: "01 Mars 2026", desc: "Abonnement Pro — Mars 2026", amount: -200, type: "subscription" },
];

const plans = [
  { name: "Free", price: 0, commission: 15, color: "border-gray-200", textColor: "text-gray-600" },
  { name: "Pro", price: 200, commission: 10, color: "border-primary", textColor: "text-primary", current: true },
  { name: "Elite", price: 400, commission: 7, color: "border-yellow-400", textColor: "text-yellow-600" },
];

export default function Wallet() {
  const navigate = useNavigate();
  const [balance] = useState(405);
  const [rechargeAmount, setRechargeAmount] = useState(null);
  const [showRecharge, setShowRecharge] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b px-6 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600">←</button>
        <span className="text-xl font-bold text-primary">Mon portefeuille</span>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        {/* Balance card */}
        <div className={`rounded-2xl p-6 text-white ${balance < 100 ? "bg-red-500" : balance < 200 ? "bg-orange-400" : "bg-primary"}`}>
          <div className="text-sm opacity-80 mb-1">Solde disponible</div>
          <div className="text-5xl font-bold mb-1">{balance} <span className="text-2xl">MAD</span></div>
          <div className="text-sm opacity-70">
            {balance < 200 ? "⚠️ Solde bas — rechargez pour continuer à faire des offres" : "✓ Solde suffisant pour faire des offres"}
          </div>
          <button
            onClick={() => setShowRecharge(!showRecharge)}
            className="mt-4 bg-white text-primary px-6 py-2 rounded-xl font-semibold text-sm hover:bg-blue-50 transition"
          >
            Recharger mon solde
          </button>
        </div>

        {/* Recharge section */}
        {showRecharge && (
          <div className="bg-white rounded-2xl border p-6">
            <h3 className="font-bold text-gray-900 mb-4">Choisir un montant</h3>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[100, 200, 500, 1000].map((a) => (
                <button
                  key={a}
                  onClick={() => setRechargeAmount(a)}
                  className={`py-3 rounded-xl text-sm font-semibold border-2 transition ${
                    rechargeAmount === a ? "border-primary bg-blue-50 text-primary" : "border-gray-200 text-gray-700 hover:border-primary"
                  }`}
                >
                  {a} MAD
                </button>
              ))}
            </div>
            <h3 className="font-bold text-gray-900 mb-3">Méthode de paiement</h3>
            <div className="space-y-2 mb-4">
              {[
                { icon: "💳", name: "Carte bancaire (CMI)" },
                { icon: "📱", name: "Inwi Money" },
                { icon: "🟠", name: "Orange Money" },
                { icon: "🏦", name: "Virement bancaire" },
              ].map((m) => (
                <div key={m.name} className="flex items-center gap-3 border rounded-xl p-3 hover:border-primary cursor-pointer transition">
                  <span className="text-xl">{m.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{m.name}</span>
                </div>
              ))}
            </div>
            <button
              disabled={!rechargeAmount}
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-40"
            >
              Recharger {rechargeAmount ? `${rechargeAmount} MAD` : ""}
            </button>
          </div>
        )}

        {/* Current plan */}
        <div className="bg-white rounded-2xl border p-6">
          <h3 className="font-bold text-gray-900 mb-4">Mon abonnement</h3>
          <div className="grid grid-cols-3 gap-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border-2 p-3 text-center ${plan.current ? plan.color + " bg-blue-50" : "border-gray-100"}`}
              >
                <div className={`font-bold text-sm ${plan.current ? plan.textColor : "text-gray-400"}`}>
                  {plan.name === "Free" && "🆓"}
                  {plan.name === "Pro" && "⚡"}
                  {plan.name === "Elite" && "⭐"}
                  {" "}{plan.name}
                  {plan.current && <span className="block text-xs mt-0.5">Actuel</span>}
                </div>
                <div className={`text-xs mt-1 ${plan.current ? plan.textColor : "text-gray-300"}`}>
                  Commission {plan.commission}%
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/pricing")}
            className="mt-4 w-full border border-primary text-primary py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-50 transition"
          >
            Changer d'abonnement →
          </button>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-2xl border p-6">
          <h3 className="font-bold text-gray-900 mb-4">Historique des transactions</h3>
          <div className="space-y-3">
            {transactions.map((t, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    t.type === "credit" ? "bg-green-100" :
                    t.type === "subscription" ? "bg-blue-100" : "bg-orange-100"
                  }`}>
                    {t.type === "credit" ? "+" : t.type === "subscription" ? "📋" : "💼"}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{t.desc}</div>
                    <div className="text-xs text-gray-400">{t.date}</div>
                  </div>
                </div>
                <span className={`font-bold text-sm ${t.amount > 0 ? "text-green-600" : "text-red-500"}`}>
                  {t.amount > 0 ? "+" : ""}{t.amount} MAD
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}