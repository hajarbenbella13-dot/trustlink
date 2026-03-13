import { useNavigate } from "react-router-dom";

const categories = [
  { emoji: "🔧", name: "Plomberie" },
  { emoji: "⚡", name: "Électricité" },
  { emoji: "🎨", name: "Peinture" },
  { emoji: "🪟", name: "Carrelage" },
  { emoji: "🚪", name: "Menuiserie" },
  { emoji: "❄️", name: "Climatisation" },
  { emoji: "🔐", name: "Serrurerie" },
  { emoji: "🧱", name: "Maçonnerie" },
];

const artisans = [
  { name: "Hassan Benali", job: "Plombier", city: "Casablanca", rating: 4.8, top: false },
  { name: "Youssef Alami", job: "Électricien", city: "Rabat", rating: 4.6, top: false },
  { name: "Fatima Zahra Idrissi", job: "Peintre", city: "Casablanca", rating: 4.9, top: true },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b">
        <span className="text-2xl font-bold text-primary">TrustLink</span>
        <div className="flex gap-3">
          <button onClick={() => navigate("/login")} className="px-4 py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-blue-50">
            Connexion
          </button>
          <button onClick={() => navigate("/register")} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            Inscription
          </button>
          <span onClick={() => navigate("/pricing")} className="text-sm text-gray-600 hover:text-primary cursor-pointer">
  Tarifs
</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-50 to-white px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Trouvez un artisan de confiance<br />
          <span className="text-primary">au Maroc</span>
        </h1>
        <p className="text-gray-500 mb-8 text-lg">Artisans vérifiés, notés et disponibles près de chez vous</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate("/login")} className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-blue-700">
            Je cherche un artisan
          </button>
          <button onClick={() => navigate("/login")} className="px-8 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-blue-50">
            Je suis artisan
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-primary text-white px-6 py-6">
        <div className="flex flex-wrap justify-center gap-8 text-center">
          <div><div className="text-2xl font-bold">2 400+</div><div className="text-blue-200 text-sm">Artisans vérifiés</div></div>
          <div><div className="text-2xl font-bold">15 000+</div><div className="text-blue-200 text-sm">Missions réalisées</div></div>
          <div><div className="text-2xl font-bold">4.8/5</div><div className="text-blue-200 text-sm">Note moyenne</div></div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 py-12">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Nos services</h2>
        <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
          {categories.map((c) => (
            <div key={c.name} onClick={() => navigate("/login")} className="flex flex-col items-center p-4 rounded-xl border hover:border-primary hover:bg-blue-50 cursor-pointer transition">
              <span className="text-3xl mb-2">{c.emoji}</span>
              <span className="text-xs text-center text-gray-700 font-medium">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured artisans */}
      <div className="px-6 py-8 bg-gray-50">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Artisans en vedette</h2>
        <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
          {artisans.map((a) => (
            <div key={a.name} className="flex-1 bg-white rounded-xl border p-5 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-3">
                {a.name[0]}
              </div>
              <div className="font-semibold text-gray-900">{a.name}</div>
              <div className="text-sm text-gray-500">{a.job} · {a.city}</div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <span className="text-yellow-400">⭐</span>
                <span className="font-bold text-sm">{a.rating}/5</span>
              </div>
              {a.top && <span className="mt-2 inline-block text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">🏆 Top Artisan</span>}
              <div className="mt-2 text-xs bg-blue-100 text-primary px-2 py-1 rounded-full inline-block">Vérifié ✓</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}