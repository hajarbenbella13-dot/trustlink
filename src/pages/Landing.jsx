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
      <nav className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="text-2xl font-bold text-primary">TrustLink</span>
        </div>
        <div className="flex items-center gap-4">
          <span onClick={() => navigate("/pricing")} className="text-sm text-gray-600 hover:text-primary cursor-pointer font-medium">
            Tarifs
          </span>
          <button onClick={() => navigate("/login")} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary transition">
            Connexion
          </button>
          <button onClick={() => navigate("/register")} className="px-5 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-blue-700 transition">
            Inscription
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">

          {/* Left — 60% */}
          <div className="lg:col-span-3 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-primary">
              🇲🇦 Plateforme #1 des artisans au Maroc
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Trouvez un artisan de{" "}
              <span className="text-primary">confiance</span>{" "}
              au Maroc
            </h1>
            <p className="text-lg text-gray-500 max-w-lg leading-relaxed">
              Artisans vérifiés, notés et disponibles près de chez vous.
              Décrivez votre besoin et recevez des devis en quelques minutes.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate("/login")}
                className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold text-base hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
                Je cherche un artisan <span>→</span>
              </button>
              <button onClick={() => navigate("/register")}
                className="px-8 py-4 border-2 border-accent text-accent rounded-full font-bold text-base hover:bg-orange-50 transition">
                Je suis artisan
              </button>
            </div>
            <div className="flex flex-wrap gap-6 pt-2">
              {["Gratuit pour les clients", "Artisans vérifiés", "Réponse en 1h"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right — 40% */}
          <div className="lg:col-span-2 relative flex justify-center">
            <div className="relative w-full max-w-sm">

              {/* Card 1 */}
              <div className="relative z-30 bg-white rounded-xl shadow-lg border p-4 animate-float">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">H</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 text-sm">Hassan Benali</h3>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-primary whitespace-nowrap">Vérifié ✓</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">Plombier ⭐ 4.8</p>
                    <p className="text-xs text-gray-400">Casablanca</p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative z-20 -mt-4 ml-6 bg-white rounded-xl shadow-lg border p-4 animate-float-slow">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg">F</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 text-sm">Fatima Zahra</h3>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 whitespace-nowrap">Top 🏆</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">Peintre ⭐ 4.9</p>
                    <p className="text-xs text-gray-400">Rabat</p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative z-10 -mt-4 -ml-2 bg-white rounded-xl shadow-lg border p-4 animate-float-slower">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-lg">Y</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 text-sm">Youssef Alami</h3>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-primary whitespace-nowrap">Vérifié ✓</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">Électricien ⭐ 4.6</p>
                    <p className="text-xs text-gray-400">Tanger</p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 z-40 bg-white rounded-full shadow-lg border px-4 py-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">127 missions ce mois</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <div key={a.name} onClick={() => navigate("/artisan/1")} className="flex-1 bg-white rounded-xl border p-5 text-center shadow-sm hover:border-primary cursor-pointer transition">
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