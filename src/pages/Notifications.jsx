import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const clientNotifications = [
  {
    id: 1,
    type: "offer",
    icon: "💼",
    title: "Nouvelle offre reçue",
    desc: "Hassan Benali vous a fait une offre de 450 MAD pour 'Fuite cuisine Maarif'",
    time: "Il y a 5 min",
    unread: true,
  },
  {
    id: 2,
    type: "offer",
    icon: "💼",
    title: "Nouvelle offre reçue",
    desc: "Youssef Alami vous a fait une offre de 380 MAD pour 'Fuite cuisine Maarif'",
    time: "Il y a 20 min",
    unread: true,
  },
  {
    id: 3,
    type: "chat",
    icon: "💬",
    title: "Nouveau message",
    desc: "Hassan Benali: 'Bonjour ! Je suis disponible cet après-midi vers 15h'",
    time: "Il y a 1h",
    unread: false,
  },
  {
    id: 4,
    type: "mission",
    icon: "✅",
    title: "Mission terminée",
    desc: "Votre mission 'Repeindre le salon' est terminée. Donnez votre avis !",
    time: "Hier",
    unread: false,
  },
];

const artisanNotifications = [
  {
    id: 1,
    type: "urgent",
    icon: "⚡",
    title: "Mission urgente près de vous",
    desc: "Fuite d'eau cuisine · Casablanca Maarif · Budget: 300-500 MAD",
    time: "Il y a 5 min",
    unread: true,
  },
  {
    id: 2,
    type: "offer",
    icon: "🎉",
    title: "Offre acceptée !",
    desc: "Nadia Chraibi a accepté votre offre de 450 MAD. Commission de 58 MAD déduite. Chat débloqué !",
    time: "Il y a 30 min",
    unread: true,
  },
  {
    id: 3,
    type: "chat",
    icon: "💬",
    title: "Nouveau message",
    desc: "Nadia Chraibi: 'C'est au 3ème étage, appartement 12'",
    time: "Il y a 1h",
    unread: false,
  },
  {
    id: 4,
    type: "wallet",
    icon: "💰",
    title: "Solde bas",
    desc: "Votre solde est de 120 MAD. Rechargez pour continuer à faire des offres.",
    time: "Il y a 2h",
    unread: false,
  },
  {
    id: 5,
    type: "mission",
    icon: "⭐",
    title: "Nouvel avis reçu",
    desc: "Nadia Chraibi vous a donné 5/5 étoiles. 'Parfait, intervention rapide !'",
    time: "Hier",
    unread: false,
  },
];

const typeColor = {
  offer: "bg-blue-50 border-blue-100",
  chat: "bg-green-50 border-green-100",
  mission: "bg-purple-50 border-purple-100",
  urgent: "bg-red-50 border-red-100",
  wallet: "bg-orange-50 border-orange-100",
};

export default function Notifications() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const notifications = user?.role === "artisan" ? artisanNotifications : clientNotifications;
  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleClick = (n) => {
    if (n.type === "chat") navigate("/chat/1");
    else if (n.type === "wallet") navigate("/craftsman/wallet");
    else if (user?.role === "artisan") navigate("/craftsman/feed");
    else navigate("/client/home");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b px-6 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600">←</button>
        <span className="text-lg font-bold text-gray-900">Notifications</span>
        {unreadCount > 0 && (
          <span className="ml-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>
        )}
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => handleClick(n)}
            className={`rounded-2xl border p-4 flex items-start gap-3 cursor-pointer transition hover:shadow-sm ${n.unread ? typeColor[n.type] : "bg-white border-gray-100"}`}
          >
            <div className="text-2xl flex-shrink-0">{n.icon}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className={`text-sm font-semibold ${n.unread ? "text-gray-900" : "text-gray-600"}`}>
                  {n.title}
                  {n.unread && <span className="ml-2 w-2 h-2 bg-primary rounded-full inline-block" />}
                </div>
                <span className="text-xs text-gray-400">{n.time}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{n.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}