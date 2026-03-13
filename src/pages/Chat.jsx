import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialMessages = [
  { id: 1, sender: "artisan", text: "Bonjour ! J'ai vu votre demande pour la fuite d'eau. Je suis disponible aujourd'hui.", time: "10:23" },
  { id: 2, sender: "client", text: "Bonjour Hassan ! Oui la fuite est sous l'évier de la cuisine.", time: "10:25" },
  { id: 3, sender: "artisan", text: "D'accord, pas de problème. Je peux passer cet après-midi vers 15h, ça vous convient ?", time: "10:26" },
  { id: 4, sender: "client", text: "Parfait, je serai là. C'est au 3ème étage.", time: "10:28" },
];

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [blocked, setBlocked] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const detectContact = (text) => {
    const patterns = [
      /0[567]\d{8}/,
      /\+212\d{9}/,
      /@[\w.]+\.\w+/,
      /wa\.me/i,
      /whatsapp/i,
    ];
    return patterns.some((p) => p.test(text));
  };

  const send = () => {
    if (!input.trim()) return;

    if (detectContact(input)) {
      setBlocked(true);
      setTimeout(() => setBlocked(false), 3000);
      return;
    }

    setMessages([...messages, {
      id: messages.length + 1,
      sender: "client",
      text: input,
      time: new Date().toLocaleTimeString("fr-MA", { hour: "2-digit", minute: "2-digit" }),
    }]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600">←</button>
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-primary">H</div>
        <div className="flex-1">
          <div className="font-semibold text-gray-900 text-sm">Hassan Benali</div>
          <div className="text-xs text-green-500">En ligne</div>
        </div>
        <button
          onClick={() => navigate("/artisan/1")}
          className="text-xs text-primary font-medium hover:underline"
        >
          Voir profil
        </button>
      </nav>

      {/* Mission info bar */}
      <div className="bg-blue-50 border-b border-blue-100 px-4 py-2 flex items-center justify-between">
        <div className="text-xs text-primary font-medium">🔧 Fuite cuisine Maarif · Offre acceptée: 450 MAD</div>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">✓ Commission payée</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {/* Date separator */}
        <div className="text-center text-xs text-gray-400 my-2">Aujourd'hui</div>

        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === "client" ? "justify-end" : "justify-start"}`}>
            {m.sender === "artisan" && (
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-primary mr-2 mt-1 flex-shrink-0">H</div>
            )}
            <div className={`max-w-xs rounded-2xl px-4 py-2.5 ${
              m.sender === "client"
                ? "bg-primary text-white rounded-tr-sm"
                : "bg-white border text-gray-900 rounded-tl-sm"
            }`}>
              <p className="text-sm">{m.text}</p>
              <p className={`text-xs mt-1 ${m.sender === "client" ? "text-blue-200" : "text-gray-400"}`}>{m.time}</p>
            </div>
          </div>
        ))}

        {/* Blocked warning */}
        {blocked && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 text-center">
            🚫 Message bloqué — coordonnées de contact détectées.
            <br />
            <span className="text-xs text-red-400">Le partage de contacts est autorisé car l'offre est acceptée, mais évitez les numéros bruts.</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t px-4 py-3 flex items-center gap-3 sticky bottom-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Écrivez un message..."
          className="flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-40"
        >
          ➤
        </button>
      </div>
    </div>
  );
}