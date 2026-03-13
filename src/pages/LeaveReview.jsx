import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LeaveReview() {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState({ quality: 0, punctuality: 0, communication: 0, cleanliness: 0 });
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const criteria = [
    { key: "quality", label: "Qualité du travail", icon: "🔨", weight: "40%" },
    { key: "punctuality", label: "Ponctualité", icon: "⏰", weight: "25%" },
    { key: "communication", label: "Communication", icon: "💬", weight: "20%" },
    { key: "cleanliness", label: "Propreté du chantier", icon: "🧹", weight: "15%" },
  ];

  const setRating = (key, value) => setRatings({ ...ratings, [key]: value });

  const average = Object.values(ratings).every(r => r > 0)
    ? (ratings.quality * 0.4 + ratings.punctuality * 0.25 + ratings.communication * 0.2 + ratings.cleanliness * 0.15).toFixed(1)
    : null;

  const allFilled = Object.values(ratings).every(r => r > 0) && comment.length >= 10;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border p-8 text-center max-w-sm w-full">
          <div className="text-6xl mb-4">⭐</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Merci !</h2>
          <p className="text-gray-500 text-sm mb-2">Votre avis a été publié.</p>
          {average && (
            <div className="bg-blue-50 rounded-xl p-3 mb-6">
              <div className="text-3xl font-bold text-primary">{average}/5</div>
              <div className="text-xs text-gray-500 mt-1">Note donnée à Hassan</div>
            </div>
          )}
          <button
  onClick={() => navigate("/client/home", { replace: true })}
  className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
>
  Retour à l'accueil
</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b px-6 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600">←</button>
        <span className="text-lg font-bold text-gray-900">Donner mon avis</span>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        {/* Artisan card */}
        <div className="bg-white rounded-2xl border p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl font-bold text-primary">H</div>
          <div>
            <div className="font-bold text-gray-900">Hassan Benali</div>
            <div className="text-sm text-gray-500">Plombier · Fuite cuisine Maarif</div>
            <div className="text-xs text-green-600 mt-1">✓ Mission terminée</div>
          </div>
        </div>

        {/* Rating criteria */}
        <div className="bg-white rounded-2xl border p-5 space-y-5">
          <h3 className="font-bold text-gray-900">Notez votre expérience</h3>
          {criteria.map((c) => (
            <div key={c.key}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-700">
                  {c.icon} {c.label}
                </div>
                <span className="text-xs text-gray-400">{c.weight}</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(c.key, star)}
                    className={`text-3xl transition hover:scale-110 ${star <= ratings[c.key] ? "opacity-100" : "opacity-20"}`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Average preview */}
        {average && (
          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4 text-center">
            <div className="text-sm text-gray-500 mb-1">Note globale</div>
            <div className="text-4xl font-bold text-primary">{average}<span className="text-xl">/5</span></div>
          </div>
        )}

        {/* Comment */}
        <div className="bg-white rounded-2xl border p-5">
          <h3 className="font-bold text-gray-900 mb-3">Votre commentaire</h3>
          <textarea
            placeholder="Décrivez votre expérience avec Hassan... (min 10 caractères)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
          />
          <div className={`text-xs text-right mt-1 ${comment.length < 10 ? "text-red-400" : "text-green-500"}`}>
            {comment.length}/10 min
          </div>
        </div>

        {/* Submit */}
        <button
          disabled={!allFilled}
          onClick={() => setSubmitted(true)}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Publier mon avis ⭐
        </button>

        <p className="text-xs text-center text-gray-400 pb-6">
          Votre avis aide la communauté TrustLink à choisir les meilleurs artisans
        </p>
      </div>
    </div>
  );
}