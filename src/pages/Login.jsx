import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (login(phone, password)) {
      const user = phone === "0661234567" ? "client" : "artisan";
      navigate(user === "client" ? "/client/home" : "/craftsman/feed");
    } else {
      setError("Numéro ou mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border p-8 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-3xl font-bold text-primary">TrustLink</span>
          <p className="text-gray-500 mt-1 text-sm">Connectez-vous à votre compte</p>
        </div>

        {/* Demo credentials */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 text-sm">
          <div className="font-semibold text-primary mb-2">Comptes de démonstration</div>
          <div className="text-gray-600 space-y-1">
            <div>👤 Client: <span className="font-mono font-medium">0661234567</span> / <span className="font-mono font-medium">demo123</span></div>
            <div>🔧 Artisan: <span className="font-mono font-medium">0679876543</span> / <span className="font-mono font-medium">demo123</span></div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Numéro de téléphone</label>
            <input
              type="tel"
              placeholder="06XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <button
            onClick={handleLogin}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </div>

        <div className="text-center mt-4 text-sm text-gray-500">
          Pas encore de compte ?{" "}
          <span onClick={() => navigate("/register?role=artisan")} className="text-primary font-medium cursor-pointer hover:underline">
  S'inscrire 
</span>
          {" · "}
          <span onClick={() => navigate("/")} className="text-gray-400 cursor-pointer hover:underline">
            Accueil
          </span>
        </div>
      </div>
    </div>
  );
}