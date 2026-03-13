import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Landmark, Receipt, Sparkles } from "lucide-react";

const transactions = [
  { date: "12 Mars 2026", desc: "Commission — Fuite cuisine", amount: -65, type: "commission" },
  { date: "10 Mars 2026", desc: "Rechargement carte", amount: +500, type: "credit" },
  { date: "08 Mars 2026", desc: "Commission — Peinture salon", amount: -130, type: "commission" },
  { date: "01 Mars 2026", desc: "Abonnement Pro", amount: -200, type: "subscription" },
];

const plans = [
  { name: "Free", price: 0, commission: 15, color: "border-gray-200", textColor: "text-gray-600", icon: "🆓" },
  { name: "Pro", price: 200, commission: 10, color: "border-blue-600", textColor: "text-blue-600", icon: "⚡", current: true },
  { name: "Elite", price: 400, commission: 7, color: "border-yellow-400", textColor: "text-yellow-600", icon: "⭐" },
];

export default function Wallet() {
  const navigate = useNavigate();
  const [balance] = useState(405);
  const [rechargeAmount, setRechargeAmount] = useState(null);
  const [showRecharge, setShowRecharge] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Navbar Responsive */}
      <nav className="bg-white border-b px-4 py-4 flex items-center gap-3 sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="p-1 text-gray-400 hover:text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <span className="text-lg font-black text-gray-900">Mon portefeuille</span>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        {/* Balance card - Design plus moderne */}
        <div className={`rounded-3xl p-6 text-white shadow-lg ${
          balance < 100 ? "bg-red-500" : balance < 200 ? "bg-orange-500" : "bg-blue-600"
        }`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs opacity-80 font-bold uppercase tracking-wider">Solde disponible</p>
              <h2 className="text-4xl md:text-5xl font-black mt-1">{balance} <span className="text-xl md:text-2xl font-medium">MAD</span></h2>
            </div>
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
               <Receipt size={24} />
            </div>
          </div>
          
          <p className="text-xs opacity-90 font-medium leading-relaxed">
            {balance < 200 ? "⚠️ Solde critique — rechargez pour rester visible." : "✓ Votre solde est prêt pour de nouvelles missions."}
          </p>
          
          <button
            onClick={() => setShowRecharge(!showRecharge)}
            className="mt-6 w-full bg-white text-blue-600 py-3 rounded-2xl font-black text-sm hover:bg-blue-50 transition active:scale-95"
          >
            Recharger maintenant
          </button>
        </div>

        {/* Recharge section - Grid adaptée */}
        {showRecharge && (
          <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm space-y-6">
            <div>
              <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-blue-600" /> Montant à recharger
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[100, 200, 500, 1000].map((a) => (
                  <button
                    key={a}
                    onClick={() => setRechargeAmount(a)}
                    className={`py-4 rounded-2xl text-sm font-bold border-2 transition-all ${
                      rechargeAmount === a ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-50 text-gray-600 hover:border-blue-200"
                    }`}
                  >
                    {a} MAD
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-black text-gray-900 mb-4">Mode de paiement</h3>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-4 border-2 border-gray-50 rounded-2xl p-4 hover:border-blue-600 cursor-pointer transition group">
                  <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition"><CreditCard size={20} className="text-blue-600" /></div>
                  <span className="text-sm font-bold text-gray-700">Carte Bancaire (CMI)</span>
                </div>
                <div className="flex items-center gap-4 border-2 border-gray-50 rounded-2xl p-4 hover:border-blue-600 cursor-pointer transition group">
                  <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-blue-100 transition"><Landmark size={20} className="text-gray-600 group-hover:text-blue-600" /></div>
                  <span className="text-sm font-bold text-gray-700">Virement Bancaire</span>
                </div>
              </div>
            </div>

            <button
              disabled={!rechargeAmount}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition active:scale-95 disabled:opacity-30 shadow-lg shadow-blue-100"
            >
              Confirmer {rechargeAmount ? `${rechargeAmount} MAD` : ""}
            </button>
          </div>
        )}

        {/* Subscription status - Mobile optimized */}
        <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-black text-gray-900 mb-4">Mon forfait</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border-2 p-4 flex items-center md:flex-col justify-between md:justify-center gap-3 transition-all ${
                  plan.current ? plan.color + " bg-blue-50/50" : "border-gray-50 opacity-60"
                }`}
              >
                <div className="flex items-center md:flex-col gap-3">
                  <span className="text-2xl">{plan.icon}</span>
                  <div className="text-left md:text-center">
                    <div className={`font-black text-sm ${plan.current ? plan.textColor : "text-gray-500"}`}>{plan.name}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Comm. {plan.commission}%</div>
                  </div>
                </div>
                {plan.current && <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">Actif</span>}
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/pricing")}
            className="mt-4 w-full py-3 rounded-xl text-xs font-black text-blue-600 bg-blue-50 hover:bg-blue-100 transition uppercase tracking-wider"
          >
            Changer de forfait
          </button>
        </div>

        {/* Transactions - Plus d'espace */}
        <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-black text-gray-900 mb-4">Historique</h3>
          <div className="divide-y divide-gray-50">
            {transactions.map((t, i) => (
              <div key={i} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                    t.type === "credit" ? "bg-green-50 text-green-600" :
                    t.type === "subscription" ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"
                  }`}>
                    {t.type === "credit" ? "+" : t.type === "subscription" ? "📋" : "💼"}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 leading-tight">{t.desc}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">{t.date}</div>
                  </div>
                </div>
                <div className={`font-black text-sm whitespace-nowrap ${t.amount > 0 ? "text-green-600" : "text-red-500"}`}>
                  {t.amount > 0 ? "+" : ""}{t.amount} <span className="text-[10px]">MAD</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}