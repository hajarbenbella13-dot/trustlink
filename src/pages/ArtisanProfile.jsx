import { useState } from "react";
import { useNavigate } from "react-router-dom";

const artisan = {
  name: "Hassan Benali",
  job: "Plombier",
  city: "Casablanca",
  rating: 4.8,
  reviewCount: 127,
  experience: 8,
  description: "Plombier professionnel avec 8 ans d'expérience. Spécialisé en installation, réparation et dépannage urgent. Disponible 7j/7.",
  top: true,
  verified: true,
  portfolio: [
    { title: "Salle de bain complète, Maarif 2024", emoji: "🚿" },
    { title: "Réparation fuite cuisine, Agdal 2024", emoji: "🔧" },
    { title: "Installation chauffe-eau, Hay Riad 2023", emoji: "♨️" },
  ],
  recommendations: [
    { name: "Karim Alaoui", relation: "Client", text: "Excellent travail, très propre et ponctuel.", verified: true },
    { name: "Sara Bennani", relation: "Propriétaire", text: "Je recommande vivement Hassan, sérieux et professionnel.", verified: true },
  ],
  reviews: [
    { name: "Nadia C.", rating: 5, comment: "Parfait ! Intervention rapide et travail soigné.", date: "Mars 2025" },
    { name: "Mehdi B.", rating: 5, comment: "Très professionnel, prix raisonnable.", date: "Fév 2025" },
    { name: "Leila M.", rating: 4, comment: "Bon travail, légèrement en retard mais résultat top.", date: "Jan 2025" },
  ],
};

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}>★</span>
      ))}
    </div>
  );
}

export default function ArtisanProfile() {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b px-6 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600">← Retour</button>
        <span className="text-xl font-bold text-primary ml-auto">TrustLink</span>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        {/* Profile card */}
        <div className="bg-white rounded-2xl border p-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl font-bold text-primary flex-shrink-0">
              {artisan.name[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-gray-900">{artisan.name}</h1>
                {artisan.verified && (
                  <span className="text-xs bg-blue-100 text-primary px-2 py-0.5 rounded-full font-medium">Vérifié ✓</span>
                )}
                {artisan.top && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">🏆 Top Artisan</span>
                )}
              </div>
              <div className="text-gray-500 text-sm mt-1">{artisan.job} · {artisan.city}</div>
              <div className="flex items-center gap-2 mt-2">
                <Stars rating={artisan.rating} />
                <span className="font-bold text-sm">{artisan.rating}/5</span>
                <span className="text-gray-400 text-sm">({artisan.reviewCount} avis)</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">{artisan.experience} ans d'expérience</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4 leading-relaxed">{artisan.description}</p>

          {/* Contact button */}
          <button
            onClick={() => setShowContact(!showContact)}
            className="mt-4 w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            {showContact ? "📞 06 XX XX XX XX" : "Contacter Hassan"}
          </button>
          {showContact && (
            <div className="mt-2 text-xs text-center text-gray-400">
              Contact disponible après acceptation d'une offre
            </div>
          )}
        </div>

        {/* Portfolio */}
        <div className="bg-white rounded-2xl border p-6">
          <h2 className="font-bold text-gray-900 mb-4">Portfolio</h2>
          <div className="space-y-3">
            {artisan.portfolio.map((p, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                <span className="text-2xl">{p.emoji}</span>
                <span className="text-sm text-gray-700">{p.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl border p-6">
          <h2 className="font-bold text-gray-900 mb-4">Recommandations</h2>
          <div className="space-y-3">
            {artisan.recommendations.map((r, i) => (
              <div key={i} className="border rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium text-sm text-gray-900">{r.name}</div>
                  {r.verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Vérifié ✓</span>}
                </div>
                <div className="text-xs text-gray-400 mb-2">{r.relation}</div>
                <p className="text-sm text-gray-600">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl border p-6">
          <h2 className="font-bold text-gray-900 mb-1">Avis clients</h2>
          <div className="flex items-center gap-2 mb-4">
            <Stars rating={artisan.rating} />
            <span className="font-bold">{artisan.rating}/5</span>
            <span className="text-gray-400 text-sm">· {artisan.reviewCount} avis</span>
          </div>
          <div className="space-y-3">
            {artisan.reviews.map((r, i) => (
              <div key={i} className="border-b last:border-0 pb-3 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium text-sm text-gray-900">{r.name}</div>
                  <span className="text-xs text-gray-400">{r.date}</span>
                </div>
                <Stars rating={r.rating} />
                <p className="text-sm text-gray-600 mt-1">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}