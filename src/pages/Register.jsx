import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const cities = ["Casablanca", "Rabat", "Marrakech", "Fès", "Tanger"];
const categories = ["Plomberie", "Électricité", "Peinture", "Carrelage", "Menuiserie", "Climatisation", "Serrurerie", "Maçonnerie"];

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [tab, setTab] = useState(params.get("role") === "artisan" ? "artisan" : "client");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", phone: "", city: "", password: "",
    job: "", experience: "", description: "",
    otp: ""
  });

  const set = (k, v) => setForm({ ...form, [k]: v });
  const totalSteps = tab === "client" ? 2 : 4;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border p-8 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-6">
          <span className="text-3xl font-bold text-primary">TrustLink</span>
        </div>

        {/* Tabs */}
        {step === 1 && (
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button onClick={() => setTab("client")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${tab === "client" ? "bg-white text-primary shadow-sm" : "text-gray-500"}`}>
              👤 Je suis client
            </button>
            <button onClick={() => setTab("artisan")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${tab === "artisan" ? "bg-white text-primary shadow-sm" : "text-gray-500"}`}>
              🔧 Je suis artisan
            </button>
          </div>
        )}

        {/* Progress bar */}
        <div className="flex gap-2 mb-6">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition ${i < step ? "bg-primary" : "bg-gray-200"}`} />
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-bold text-gray-900 text-lg">Informations de base</h2>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Nom complet</label>
              <input placeholder="Ex: Hassan Benali" value={form.name} onChange={(e) => set("name", e.target.value)}
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Téléphone</label>
              <input placeholder="06XXXXXXXX" value={form.phone} onChange={(e) => set("phone", e.target.value)}
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Ville</label>
              <select value={form.city} onChange={(e) => set("city", e.target.value)}
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary">
                <option value="">Choisir une ville</option>
                {cities.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Mot de passe</label>
              <input type="password" placeholder="••••••••" value={form.password} onChange={(e) => set("password", e.target.value)}
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" />
            </div>
            {tab === "artisan" && (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Métier</label>
                  <select value={form.job} onChange={(e) => set("job", e.target.value)}
                    className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary">
                    <option value="">Choisir un métier</option>
                    {categories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Années d'expérience</label>
                  <input type="number" placeholder="Ex: 5" value={form.experience} onChange={(e) => set("experience", e.target.value)}
                    className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                </div>
              </>
            )}
            <button onClick={() => setStep(2)} disabled={!form.name || !form.phone || !form.city || !form.password}
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-40">
              Continuer →
            </button>
          </div>
        )}

        {/* STEP 2 — OTP client */}
        {step === 2 && tab === "client" && (
          <div className="space-y-4">
            <h2 className="font-bold text-gray-900 text-lg">Vérification téléphone</h2>
            <p className="text-sm text-gray-500">Code envoyé au <strong>{form.phone}</strong></p>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Code OTP (6 chiffres)</label>
              <input placeholder="XXXXXX" maxLength={6} value={form.otp} onChange={(e) => set("otp", e.target.value)}
                className="w-full border rounded-xl px-4 py-3 text-sm text-center tracking-widest font-mono focus:outline-none focus:border-primary" />
              <p className="text-xs text-gray-400 mt-1 text-center">Pour la démo, n'importe quel code fonctionne</p>
            </div>
            <button onClick={() => navigate("/client/home")} disabled={form.otp.length < 4}
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-40">
              Confirmer et créer mon compte
            </button>
            <button onClick={() => setStep(1)} className="w-full text-gray-400 text-sm hover:text-gray-600">← Retour</button>
          </div>
        )}

        {/* STEP 2 — Portfolio artisan */}
        {step === 2 && tab === "artisan" && (
          <div className="space-y-4">
            <h2 className="font-bold text-gray-900 text-lg">Portfolio de travaux</h2>
            <p className="text-sm text-gray-500">Uploadez des photos de vos réalisations (min 3)</p>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
              <div className="text-4xl mb-2">📸</div>
              <p className="text-sm text-gray-500">Glissez vos photos ici</p>
              <p className="text-xs text-gray-400 mt-1">JPEG, PNG — max 15MB</p>
              <button className="mt-3 text-sm text-primary font-medium hover:underline">Ou choisir depuis l'appareil</button>
            </div>
            <div className="space-y-2">
              {["Pose carrelage salle de bain, 2024", "Réparation fuite cuisine, 2024"].map((t, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg">🖼️</div>
                  <span className="text-sm text-gray-700 flex-1">{t}</span>
                  <span className="text-green-500 text-sm">✓</span>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(3)} className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              Continuer →
            </button>
            <button onClick={() => setStep(1)} className="w-full text-gray-400 text-sm hover:text-gray-600">← Retour</button>
          </div>
        )}

        {/* STEP 3 — Recommandations */}
        {step === 3 && tab === "artisan" && (
          <div className="space-y-4">
            <h2 className="font-bold text-gray-900 text-lg">Recommandations</h2>
            <p className="text-sm text-gray-500">2 personnes qui peuvent confirmer votre travail</p>
            {[1, 2].map((n) => (
              <div key={n} className="border rounded-xl p-4 space-y-3">
                <div className="text-sm font-medium text-gray-700">Référence {n}</div>
                <input placeholder="Nom complet" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
                <input placeholder="Téléphone" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
                <select className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary">
                  <option>Client</option>
                  <option>Voisin</option>
                  <option>Propriétaire</option>
                  <option>Autre</option>
                </select>
              </div>
            ))}
            <button onClick={() => setStep(4)} className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              Continuer →
            </button>
            <button onClick={() => setStep(2)} className="w-full text-gray-400 text-sm hover:text-gray-600">← Retour</button>
          </div>
        )}

        {/* STEP 4 — Confirmation */}
        {step === 4 && tab === "artisan" && (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto">✅</div>
            <h2 className="font-bold text-gray-900 text-xl">Dossier soumis !</h2>
            <p className="text-gray-500 text-sm">Votre dossier est en cours de vérification par l'équipe TrustLink</p>
            <div className="bg-blue-50 rounded-xl p-4 text-sm text-left space-y-2">
              <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Informations personnelles</div>
              <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Portfolio uploadé</div>
              <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Recommandations soumises</div>
              <div className="flex items-center gap-2"><span className="text-yellow-500">⏳</span> Vérification en cours — 24 à 72h</div>
            </div>
            <p className="text-xs text-gray-400">Vous serez notifié par SMS dès l'approbation</p>
            <button onClick={() => navigate("/craftsman/feed")}
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              Accéder à mon espace →
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="text-center mt-4 text-sm text-gray-500">
            Déjà un compte ?{" "}
            <span onClick={() => navigate("/login")} className="text-primary font-medium cursor-pointer hover:underline">
              Se connecter
            </span>
          </div>
        )}
      </div>
    </div>
  );
}