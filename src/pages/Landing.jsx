import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, CheckCircle2, Star } from "lucide-react";


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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-white py-4 md:py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-blue-100">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl md:text-2xl font-bold text-primary tracking-tight">TrustLink</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <button onClick={scrollToTop} className="text-sm font-semibold text-gray-600 hover:text-primary transition">Accueil</button>
            <button onClick={() => scrollToSection("services")} className="text-sm font-semibold text-gray-600 hover:text-primary transition">Services</button>
            <button onClick={() => scrollToSection("artisans")} className="text-sm font-semibold text-gray-600 hover:text-primary transition">Artisans</button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="h-4 w-[1px] bg-gray-200 mx-1"></div>
            <button onClick={() => navigate("/login")} className="text-sm font-bold text-gray-700 hover:text-primary px-2 transition">Connexion</button>
            <button onClick={() => navigate("/register")} className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100">Inscription</button>
          </div>

          {/* Mobile Button */}
          <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute w-full bg-white border-b shadow-2xl transition-all duration-300 ${isMenuOpen ? "top-full opacity-100" : "top-[-400px] opacity-0 pointer-events-none"}`}>
          <div className="p-6 space-y-4 bg-white">
            <button onClick={scrollToTop} className="block w-full text-left py-2 font-bold text-gray-800 border-b border-gray-50">Accueil</button>
            <button onClick={() => scrollToSection("services")} className="block w-full text-left py-2 font-bold text-gray-800 border-b border-gray-50">Services</button>
            <button onClick={() => scrollToSection("artisans")} className="block w-full text-left py-2 font-bold text-gray-800 border-b border-gray-50">Artisans</button>
            <button onClick={() => navigate("/pricing")} className="block w-full text-left py-2 font-bold text-primary">Tarifs</button>
            <div className="flex flex-col gap-3 pt-4">
              <button onClick={() => navigate("/login")} className="w-full py-3 font-bold text-gray-700 border rounded-xl hover:bg-gray-50">Connexion</button>
              <button onClick={() => navigate("/register")} className="w-full py-3 font-bold text-white bg-primary rounded-xl shadow-lg">S'inscrire</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-20 md:h-24"></div>

      {/* HERO */}
      <section className="px-4 md:px-6 py-10 md:py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-center">

          <div className="lg:col-span-3 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs md:text-sm font-bold text-primary border border-blue-100">
              🇲🇦 Plateforme #1 au Maroc
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-tight">
              Trouvez un artisan de <span className="text-primary">confiance</span>
            </h1>
            <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Artisans vérifiés et notés. Recevez des devis en quelques minutes pour tous vos travaux de maison.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button onClick={() => navigate("/login")}
                className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-bold text-base hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
                Chercher un artisan →
              </button>
              <button onClick={() => navigate("/login")}
                className="w-full sm:w-auto px-8 py-4 border-2 border-accent text-accent rounded-full font-bold text-base hover:bg-orange-50 transition">
                Je suis artisan
              </button>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 pt-2 text-xs md:text-sm font-medium text-gray-500">
              <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-500" /> Gratuit</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-500" /> Vérifié</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-500" /> Rapide</div>
            </div>
          </div>

          {/* Floating cards */}
          <div className="lg:col-span-2 relative flex justify-center h-[350px] md:h-auto">
            <div className="relative w-full max-w-[280px] md:max-w-sm">
              <div className="relative z-30 bg-white rounded-2xl shadow-xl border p-4"
                style={{ animation: "float1 3s ease-in-out infinite" }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">H</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs">Hassan Benali</h3>
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-blue-50 text-primary border">Vérifié ✓</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">Plombier ⭐ 4.8 · Casablanca</p>
                  </div>
                </div>
              </div>
              <div className="relative z-20 -mt-4 ml-6 md:ml-10 bg-white rounded-2xl shadow-xl border p-4"
                style={{ animation: "float2 4s ease-in-out infinite" }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">F</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs">Fatima Zahra</h3>
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-bold">TOP 🏆</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">Peintre ⭐ 4.9 · Rabat</p>
                  </div>
                </div>
              </div>
              <div className="relative z-10 -mt-4 -ml-2 bg-white rounded-2xl shadow-xl border p-4"
                style={{ animation: "float3 5s ease-in-out infinite" }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">Y</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs">Youssef Alami</h3>
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-blue-50 text-primary border">Vérifié ✓</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">Électricien ⭐ 4.6 · Tanger</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 z-40 bg-white rounded-full shadow-lg border px-3 py-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-semibold text-gray-700 whitespace-nowrap">127 missions ce mois</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="bg-primary text-white py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
          <div><div className="text-2xl md:text-3xl font-bold">2 400+</div><div className="text-blue-100 text-xs md:text-sm">Artisans vérifiés</div></div>
          <div><div className="text-2xl md:text-3xl font-bold">15 000+</div><div className="text-blue-100 text-xs md:text-sm">Missions réussies</div></div>
          <div><div className="text-2xl md:text-3xl font-bold">4.8/5</div><div className="text-blue-100 text-xs md:text-sm">Note moyenne</div></div>
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="px-4 md:px-6 py-16 md:py-20 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-10 md:mb-12">Nos services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((c) => (
            <div key={c.name} onClick={() => navigate("/login")}
              className="flex flex-col items-center p-6 md:p-8 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-xl hover:border-primary cursor-pointer transition-all group text-center">
              <span className="text-3xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">{c.emoji}</span>
              <span className="text-xs md:text-sm font-bold text-gray-800">{c.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ARTISANS */}
      <section id="artisans" className="px-4 md:px-6 py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-10 md:mb-12">Artisans en vedette</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {artisans.map((a) => (
              <div key={a.name} onClick={() => navigate("/artisan/1")}
                className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 text-center shadow-sm hover:border-primary hover:shadow-md cursor-pointer transition">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-xl md:text-2xl font-bold text-primary mx-auto mb-4">{a.name[0]}</div>
                <div className="font-bold text-lg md:text-xl text-gray-900">{a.name}</div>
                <div className="text-xs md:text-sm text-gray-500 font-medium mb-3 md:mb-4">{a.job} · {a.city}</div>
                <div className="flex items-center justify-center gap-1 mb-4">
                  <Star size={14} fill="#FACC15" className="text-yellow-400" />
                  <span className="font-bold text-xs md:text-sm text-gray-900">{a.rating}/5</span>
                </div>
                <div className="flex justify-center gap-2">
                  {a.top && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-bold">🏆 Top Artisan</span>}
                  <span className="text-[10px] bg-blue-100 text-primary px-2 py-1 rounded-full font-bold">Vérifié ✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-gray-400 text-xs border-t">© 2026 TrustLink Maroc</footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float1 { 0%, 100% { transform: translateY(0px) rotate(-3deg); } 50% { transform: translateY(-10px) rotate(-3deg); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0px) rotate(2deg); } 50% { transform: translateY(-8px) rotate(2deg); } }
        @keyframes float3 { 0%, 100% { transform: translateY(0px) rotate(-1deg); } 50% { transform: translateY(-6px) rotate(-1deg); } }
      `}} />
    </div>
  );
}