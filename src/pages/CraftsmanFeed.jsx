import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const requests = [
  {
    id: 1,
    title: "Fuite d'eau cuisine",
    category: "Plomberie",
    emoji: "🔧",
    city: "Casablanca Maarif",
    budgetMin: 300,
    budgetMax: 500,
    urgent: true,
    time: "Il y a 5 min",
  },
  {
    id: 2,
    title: "Repeindre appartement 80m²",
    category: "Peinture",
    emoji: "🎨",
    city: "Rabat Agdal",
    budgetMin: 2000,
    budgetMax: 3500,
    urgent: false,
    time: "Il y a 2h",
  },
  {
    id: 3,
    title: "Installer climatiseur",
    category: "Climatisation",
    emoji: "❄️",
    city: "Casablanca",
    budgetMin: 800,
    budgetMax: 1200,
    urgent: false,
    time: "Il y a 4h",
  },
];

export default function CraftsmanFeed() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [balance] = useState(450);
  const [modal, setModal] = useState(null);
  const [price, setPrice] = useState("");
  const [delay, setDelay] = useState("Aujourd'hui");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState([]);

  const commission = price ? Math.round(price * 0.13) : 0;

  const sendOffer = () => {
    setSent([...sent, modal.id]);
    setModal(null);
    setPrice("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-primary">TrustLink</span>
        <div className="flex items-center gap-3">
          <div
            onClick={() => navigate("/craftsman/wallet")}
            className="flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-green-100"
          >
            💰 {balance} MAD
          </div>
          <div className="relative cursor-pointer" onClick={() => navigate("/notifications")}>
  <span className="text-xl">🔔</span>
  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
</div>
          <div
            className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm cursor-pointer"
            onClick={logout}
          >
            {user?.name?.[0]}
          </div>
        </div>
      </nav>

      <div className="px-6 py-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Bonjour, {user?.name?.split(" ")[0]} 👋</h1>
          <p className="text-gray-500 text-sm mt-1">{requests.length} demandes disponibles près de vous</p>
        </div>

        {/* Requests */}
        <div className="space-y-4">
          {requests.map((r) => (
            <div key={r.id} className="bg-white rounded-xl border overflow-hidden hover:border-primary transition">
              {r.urgent && (
                <div className="bg-red-500 text-white text-xs font-bold px-4 py-1.5 flex items-center gap-1">
                  ⚡ URGENT — Intervention dans les 2h requise
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
                      {r.emoji}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{r.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{r.category} · {r.city}</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{r.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-gray-700">
                    Budget: <span className="text-primary">{r.budgetMin}–{r.budgetMax} MAD</span>
                  </div>
                  {sent.includes(r.id) ? (
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-xl font-medium">
                      ✓ Offre envoyée
                    </span>
                  ) : (
                    <button
                      onClick={() => setModal(r)}
                      className="bg-primary text-white text-sm px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
                    >
                      Faire une offre
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Offer Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end sm:items-center justify-center z-50 px-4 pb-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Faire une offre</h3>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="text-sm text-gray-500 mb-4 bg-gray-50 rounded-xl p-3">
              {modal.emoji} {modal.title} · {modal.city}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Votre prix (MAD)</label>
                <input
                  type="number"
                  placeholder="Ex: 450"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                />
                {price > 0 && (
                  <div className="mt-2 text-xs bg-orange-50 text-accent px-3 py-2 rounded-lg">
                    Commission TrustLink: <strong>{commission} MAD (13%)</strong> — déduite de votre solde
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Délai d'intervention</label>
                <select
                  value={delay}
                  onChange={(e) => setDelay(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                >
                  <option>Dans les 2h</option>
                  <option>Aujourd'hui</option>
                  <option>Demain</option>
                  <option>Cette semaine</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Message pour le client</label>
                <textarea
                  placeholder="Présentez votre approche..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <button
                onClick={sendOffer}
                disabled={!price || !message}
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Envoyer l'offre
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}