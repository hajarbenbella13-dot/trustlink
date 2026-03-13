import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const demands = [
  {
    id: 1,
    title: "Réparer fuite salle de bain",
    category: "Plomberie",
    emoji: "🔧",
    offers: 4,
    status: "En attente",
    statusColor: "bg-gray-100 text-gray-600",
  },
  {
    id: 2,
    title: "Repeindre le salon",
    category: "Peinture",
    emoji: "🎨",
    offers: 2,
    status: "Offre acceptée",
    statusColor: "bg-blue-100 text-primary",
  },
  {
    id: 3,
    title: "Installer climatiseur",
    category: "Climatisation",
    emoji: "❄️",
    offers: 0,
    status: "Mission terminée",
    statusColor: "bg-green-100 text-green-700",
  },
];

export default function ClientHome() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-primary">TrustLink</span>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer" onClick={() => navigate("/notifications")}>
            <span className="text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">2</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm cursor-pointer" onClick={logout}>
            {user?.name?.[0]}
          </div>
        </div>
      </nav>

      <div className="px-6 py-6 max-w-2xl mx-auto">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Bonjour, {user?.name?.split(" ")[0]} 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Que cherchez-vous aujourd'hui ?</p>
        </div>

        {/* CTA Card */}
        <div className="bg-primary rounded-2xl p-6 text-white mb-8">
          <div className="text-lg font-semibold mb-1">Vous avez besoin d'un artisan ?</div>
          <div className="text-blue-200 text-sm mb-4">Postez votre demande et recevez des offres en moins d'1h</div>
          <button
            onClick={() => navigate("/client/requests/new")}
            className="bg-white text-primary px-6 py-2 rounded-xl font-semibold text-sm hover:bg-blue-50 transition"
          >
            Créer une demande →
          </button>
        </div>

        {/* Active demands */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Mes demandes actives</h2>
          <div className="space-y-3">
            {demands.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-xl border p-4 hover:border-primary cursor-pointer transition"
                onClick={() => d.status === "Offre acceptée" && navigate("/chat/1")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
                      {d.emoji}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{d.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{d.category}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${d.statusColor}`}>
                      {d.status}
                    </span>
                    {d.offers > 0 && (
                      <span className="text-xs bg-orange-100 text-accent px-2 py-1 rounded-full font-medium">
                        {d.offers} offres reçues
                      </span>
                    )}
                  </div>
                </div>

                {/* Chat button */}
                {d.status === "Offre acceptée" && (
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate("/chat/1"); }}
                    className="mt-3 w-full border border-primary text-primary text-xs py-2 rounded-xl font-medium hover:bg-blue-50 transition"
                  >
                    💬 Ouvrir le chat avec l'artisan
                  </button>
                )}

                {/* Review button */}
                {d.status === "Mission terminée" && (
                  <button
onClick={(e) => { e.stopPropagation(); navigate("/review/1"); }}                  >
                    ⭐ Donner mon avis
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 sm:hidden">
        <button className="flex flex-col items-center text-primary">
          <span className="text-xl">🏠</span>
          <span className="text-xs mt-1">Accueil</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <span className="text-xl">📋</span>
          <span className="text-xs mt-1">Demandes</span>
        </button>
        <button onClick={() => navigate("/chat/1")} className="flex flex-col items-center text-gray-400">
          <span className="text-xl">💬</span>
          <span className="text-xs mt-1">Messages</span>
        </button>
        <button onClick={logout} className="flex flex-col items-center text-gray-400">
          <span className="text-xl">👤</span>
          <span className="text-xs mt-1">Profil</span>
        </button>
      </div>
    </div>
  );
}