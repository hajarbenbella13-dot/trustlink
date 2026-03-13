import { useState } from "react";
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

const cities = ["Casablanca", "Rabat", "Marrakech", "Fès", "Tanger"];

export default function NewRequest() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", category: "", description: "",
    city: "", neighborhood: "",
    budgetMin: "", budgetMax: "",
    urgent: false,
  });

  const set = (k, v) => setForm({ ...form, [k]: v });
  const valid = form.title && form.category && form.description.length >= 50 && form.city;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b px-6 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600">←</button>
        <span className="text-lg font-bold text-gray-900">Nouvelle demande</span>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        {/* Urgent toggle */}
        <div className={`rounded-2xl border-2 p-4 flex items-center justify-between cursor-pointer transition ${form.urgent ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
          onClick={() => set("urgent", !form.urgent)}>
          <div>
            <div className="font-semibold text-gray-900">⚡ Mission urgente</div>
            <div className="text-xs text-gray-500 mt-0.5">Intervention dans les 2h — tarif majoré de 20%</div>
          </div>
          <div className={`w-12 h-6 rounded-full transition-colors ${form.urgent ? "bg-red-500" : "bg-gray-200"}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow mt-0.5 transition-transform ${form.urgent ? "translate-x-6" : "translate-x-0.5"}`} />
          </div>
        </div>

        {form.urgent && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-700">
            ⚠️ Les missions urgentes ont un tarif majoré de 20%. Les artisans disponibles seront notifiés immédiatement.
          </div>
        )}

        {/* Title */}
        <div className="bg-white rounded-2xl border p-5 space-y-4">
          <h3 className="font-bold text-gray-900">Décrivez votre besoin</h3>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Titre de la demande</label>
            <input
              placeholder="Ex: Réparer fuite sous évier cuisine"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              maxLength={80}
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
            <div className="text-xs text-gray-400 text-right mt-1">{form.title.length}/80</div>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Catégorie</label>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((c) => (
                <div
                  key={c.name}
                  onClick={() => set("category", c.name)}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 cursor-pointer transition text-center ${
                    form.category === c.name ? "border-primary bg-blue-50" : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <span className="text-2xl">{c.emoji}</span>
                  <span className="text-xs mt-1 text-gray-700">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Description détaillée</label>
            <textarea
              placeholder="Décrivez le problème, l'état actuel, vos attentes... (min 50 caractères)"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
            />
            <div className={`text-xs text-right mt-1 ${form.description.length < 50 ? "text-red-400" : "text-green-500"}`}>
              {form.description.length}/50 min
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl border p-5 space-y-4">
          <h3 className="font-bold text-gray-900">Localisation</h3>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Ville</label>
            <select
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
            >
              <option value="">Choisir une ville</option>
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Quartier</label>
            <input
              placeholder="Ex: Maarif, Agdal, Hay Riad..."
              value={form.neighborhood}
              onChange={(e) => set("neighborhood", e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Budget */}
        <div className="bg-white rounded-2xl border p-5 space-y-4">
          <h3 className="font-bold text-gray-900">Budget indicatif <span className="text-gray-400 font-normal text-sm">(optionnel)</span></h3>
          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 block mb-1">Minimum (MAD)</label>
              <input
                type="number"
                placeholder="Ex: 200"
                value={form.budgetMin}
                onChange={(e) => set("budgetMin", e.target.value)}
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div className="text-gray-400 mt-5">—</div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 block mb-1">Maximum (MAD)</label>
              <input
                type="number"
                placeholder="Ex: 500"
                value={form.budgetMax}
                onChange={(e) => set("budgetMax", e.target.value)}
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          disabled={!valid}
          onClick={() => navigate("/client/home")}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-base hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Publier ma demande →
        </button>

        <p className="text-xs text-center text-gray-400 pb-6">
          Votre demande sera visible par les artisans vérifiés dans votre ville
        </p>
      </div>
    </div>
  );
}
