import { useState } from "react";

const NAV_ITEMS = [
  { id: "accueil", label: "Accueil", icon: "🏠" },
  { id: "calendrier", label: "Calendrier", icon: "📅" },
  { id: "quiz", label: "Quiz", icon: "🧠" },
  { id: "famille", label: "Famille", icon: "👨‍👩‍👧" },
  { id: "parametres", label: "Paramètres", icon: "⚙️" },
];

function Toggle({ value, onChange, color = "#7BA7BC" }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 52,
        height: 30,
        borderRadius: 15,
        background: value
          ? `linear-gradient(135deg, ${color}, ${color}CC)`
          : "#E2EAF0",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.3s",
        boxShadow: value
          ? `0 3px 12px ${color}55`
          : "inset 0 1px 3px rgba(0,0,0,0.1)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          left: value ? 25 : 3,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
          transition: "left 0.25s cubic-bezier(0.34,1.4,0.64,1)",
        }}
      />
    </div>
  );
}

function Slider({ value, onChange, min = 1, max = 5, color = "#7BA7BC" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
      <span style={{ fontSize: 16 }}>🔇</span>
      <div
        style={{
          flex: 1,
          position: "relative",
          height: 6,
          borderRadius: 3,
          background: "#E2EAF0",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${((value - min) / (max - min)) * 100}%`,
            borderRadius: 3,
            background: `linear-gradient(90deg, ${color}, ${color}CC)`,
            transition: "width 0.15s",
            boxShadow: `0 1px 6px ${color}55`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
            margin: 0,
          }}
        />
      </div>
      <span style={{ fontSize: 16 }}>🔊</span>
    </div>
  );
}

function SettingRow({
  icon,
  label,
  sublabel,
  children,
  color = "#7BA7BC",
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "16px 20px",
        cursor: onClick ? "pointer" : "default",
        transition: "background 0.15s",
        borderRadius: 0,
      }}
      onMouseEnter={(e) => {
        if (onClick) e.currentTarget.style.background = "#F8FAFC";
      }}
      onMouseLeave={(e) => {
        if (onClick) e.currentTarget.style.background = "transparent";
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 13,
          flexShrink: 0,
          background: color + "18",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#2D3748" }}>
          {label}
        </div>
        {sublabel && (
          <div style={{ fontSize: 12, color: "#9AABBF", marginTop: 2 }}>
            {sublabel}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "#F0F4F8", margin: "0 20px" }} />;
}

function SectionCard({ title, icon, color, children }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 24,
        boxShadow: "0 4px 20px rgba(80,80,100,0.08)",
        border: "1.5px solid #F0F0F0",
        overflow: "hidden",
        animation: "slideUp 0.35s ease both",
      }}
    >
      {/* Section header */}
      <div
        style={{
          padding: "14px 20px 12px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderBottom: "1.5px solid #F5F5F5",
          background: color + "0A",
        }}
      >
        <span style={{ fontSize: 16 }}>{icon}</span>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: color,
          }}
        >
          {title}
        </div>
      </div>
      {children}
    </div>
  );
}

function TextSizePreview({ size }) {
  const sizes = { 1: 13, 2: 15, 3: 17, 4: 20, 5: 23 };
  return (
    <div
      style={{
        fontSize: sizes[size],
        fontFamily: "'Playfair Display', serif",
        color: "#2D3748",
        fontWeight: 600,
        transition: "font-size 0.2s",
      }}
    >
      Aa
    </div>
  );
}

export default function Parametres() {
  const [active, setActive] = useState("parametres");

  // Settings state
  const [volume, setVolume] = useState(3);
  const [textSize, setTextSize] = useState(3);
  const [notifications, setNotifications] = useState(true);
  const [voiceRead, setVoiceRead] = useState(true);
  const [vibration, setVibration] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [reminderTime, setReminderTime] = useState(30);
  const [showConfirm, setShowConfirm] = useState(null);

  const reminderLabels = {
    15: "15 min",
    30: "30 min",
    60: "1 heure",
    120: "2 heures",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        @keyframes slideUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes popIn   { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }

        .page { min-height:100vh; background:#F5F0E8; display:flex; flex-direction:column; position:relative; overflow:hidden; }
        .bg-deco { position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden; }
        .bc { position:absolute; border-radius:50%; }
        .bc1 { width:500px; height:500px; top:-160px; right:-100px; background:radial-gradient(circle,rgba(180,210,195,.22),transparent 70%); }
        .bc2 { width:350px; height:350px; bottom:80px; left:-80px; background:radial-gradient(circle,rgba(195,175,215,.16),transparent 70%); }

        .scroll { position:relative; z-index:1; flex:1; overflow-y:auto; padding:0 20px 110px; max-width:680px; margin:0 auto; width:100%; scrollbar-width:none; }
        .scroll::-webkit-scrollbar { display:none; }

        .sections { display:flex; flex-direction:column; gap:14px; }

        .profile-card {
          background: white; border-radius: 24px;
          box-shadow: 0 4px 20px rgba(80,80,100,0.08);
          border: 1.5px solid #F0F0F0;
          padding: 24px 20px;
          display: flex; align-items: center; gap: 16;
          animation: slideUp 0.3s ease;
        }

        .reminder-chips { display:flex; gap:8px; flex-wrap:wrap; }
        .chip {
          padding: 7px 16px; border-radius: 100px; border: none;
          font-size: 13px; font-weight: 600; cursor: pointer;
          transition: all 0.18s;
        }

        .bottom-nav { position:fixed; bottom:0; left:0; right:0; background:white; border-top:1px solid #EDF0F5; display:flex; box-shadow:0 -4px 24px rgba(80,80,100,0.08); z-index:100; }
        .nav-item { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:12px 8px 16px; cursor:pointer; position:relative; border:none; background:transparent; gap:4px; }
        .nav-item.active::before { content:''; position:absolute; top:0; left:20%; right:20%; height:3px; background:linear-gradient(90deg,#7BA7BC,#9DBFA3); border-radius:0 0 4px 4px; }
        .nav-icon { font-size:22px; }
        .nav-label { font-size:11px; font-weight:500; color:#B0BEC5; }
        .nav-item.active .nav-label { color:#5D8FAE; font-weight:700; }

        .confirm-overlay {
          position:fixed; inset:0; z-index:300;
          background:rgba(40,50,60,0.45); backdrop-filter:blur(4px);
          display:flex; align-items:center; justify-content:center; padding:24px;
          animation: fadeIn 0.2s ease;
        }
        .confirm-box {
          background:white; border-radius:24px; padding:28px 24px 24px;
          max-width:320px; width:100%; text-align:center;
          box-shadow:0 24px 64px rgba(0,0,0,0.2);
          animation: popIn 0.3s cubic-bezier(0.34,1.4,0.64,1);
          display:flex; flex-direction:column; gap:16px;
        }
      `}</style>

      <div className="page">
        <div className="bg-deco">
          <div className="bc bc1" />
          <div className="bc bc2" />
        </div>

        <div className="scroll">
          {/* Header */}
          <div style={{ padding: "32px 0 20px", textAlign: "center" }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                color: "#9DBFA3",
                marginBottom: 6,
              }}
            >
              ⚙️ Réglages
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 32,
                fontWeight: 700,
                color: "#2D3748",
              }}
            >
              Paramètres
            </div>
          </div>

          <div className="sections">
            {/* Profile */}
            <div className="profile-card" style={{ gap: 16 }}>
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: "linear-gradient(135deg, #7BA7BC, #5D8FAE)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  color: "white",
                  boxShadow: "0 6px 20px rgba(123,167,188,0.4)",
                  border: "3px solid white",
                }}
              >
                J
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#2D3748",
                  }}
                >
                  Jean Martin
                </div>
                <div style={{ fontSize: 13, color: "#9AABBF", marginTop: 2 }}>
                  Compte géré par Sophie · 07 23 45 67 89
                </div>
              </div>
              <div
                style={{
                  background: "#EEF5FF",
                  border: "1.5px solid #C8DEFA",
                  borderRadius: 12,
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#6A96C8",
                }}
              >
                Modifier
              </div>
            </div>

            {/* Sound */}
            <SectionCard title="Son & Voix" icon="🔊" color="#7BA7BC">
              <SettingRow
                icon="🔊"
                label="Volume"
                sublabel="Niveau sonore de l'application"
                color="#7BA7BC"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    width: 160,
                  }}
                >
                  <Slider value={volume} onChange={setVolume} color="#7BA7BC" />
                </div>
              </SettingRow>
              <Divider />
              <SettingRow
                icon="🗣️"
                label="Lecture à voix haute"
                sublabel="Lit le contenu de l'écran automatiquement"
                color="#7BA7BC"
              >
                <Toggle
                  value={voiceRead}
                  onChange={setVoiceRead}
                  color="#7BA7BC"
                />
              </SettingRow>
            </SectionCard>

            {/* Display */}
            <SectionCard title="Affichage" icon="🔤" color="#9DBFA3">
              <SettingRow
                icon="🔤"
                label="Taille du texte"
                sublabel="Ajustez selon votre confort"
                color="#9DBFA3"
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <TextSizePreview size={textSize} />
                  <div style={{ display: "flex", gap: 6 }}>
                    {[1, 2, 3, 4, 5].map((v) => (
                      <button
                        key={v}
                        onClick={() => setTextSize(v)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          border: "none",
                          cursor: "pointer",
                          background: textSize === v ? "#9DBFA3" : "#EEF5EF",
                          boxShadow:
                            textSize === v
                              ? "0 2px 8px rgba(157,191,163,0.5)"
                              : "none",
                          transition: "all 0.18s",
                          fontSize: 10,
                          fontWeight: 700,
                          color: textSize === v ? "white" : "#9DBFA3",
                        }}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              </SettingRow>
              <Divider />
              <SettingRow
                icon="🌙"
                label="Mode nuit"
                sublabel="Réduit la luminosité le soir"
                color="#9DBFA3"
              >
                <Toggle
                  value={nightMode}
                  onChange={setNightMode}
                  color="#9DBFA3"
                />
              </SettingRow>
            </SectionCard>

            {/* Notifications */}
            <SectionCard title="Notifications" icon="🔔" color="#C4A882">
              <SettingRow
                icon="🔔"
                label="Rappels de rendez-vous"
                sublabel="Recevez une alerte avant chaque événement"
                color="#C4A882"
              >
                <Toggle
                  value={notifications}
                  onChange={setNotifications}
                  color="#C4A882"
                />
              </SettingRow>
              {notifications && (
                <>
                  <Divider />
                  <div style={{ padding: "14px 20px" }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#2D3748",
                        marginBottom: 10,
                      }}
                    >
                      Rappeler moi…
                    </div>
                    <div className="reminder-chips">
                      {[15, 30, 60, 120].map((v) => (
                        <button
                          key={v}
                          className="chip"
                          onClick={() => setReminderTime(v)}
                          style={{
                            background:
                              reminderTime === v
                                ? "linear-gradient(135deg, #C4A882, #B08A62)"
                                : "#FBF7F0",
                            color: reminderTime === v ? "white" : "#C4A882",
                            border: `1.5px solid ${reminderTime === v ? "transparent" : "#DDD0B8"}`,
                            boxShadow:
                              reminderTime === v
                                ? "0 3px 12px rgba(196,168,130,0.4)"
                                : "none",
                          }}
                        >
                          {reminderLabels[v]} avant
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <Divider />
              <SettingRow
                icon="📳"
                label="Vibration"
                sublabel="Vibre lors des rappels"
                color="#C4A882"
              >
                <Toggle
                  value={vibration}
                  onChange={setVibration}
                  color="#C4A882"
                />
              </SettingRow>
            </SectionCard>

            {/* Help */}
            <SectionCard title="Aide & Assistance" icon="💬" color="#B39BC8">
              <SettingRow
                icon="📞"
                label="Appeler Sophie"
                sublabel="Votre fille gère l'application"
                color="#B39BC8"
                onClick={() => {}}
              >
                <div style={{ fontSize: 18, color: "#B39BC8" }}>›</div>
              </SettingRow>
              <Divider />
              <SettingRow
                icon="📖"
                label="Guide d'utilisation"
                sublabel="Apprendre à utiliser l'application"
                color="#B39BC8"
                onClick={() => {}}
              >
                <div style={{ fontSize: 18, color: "#B39BC8" }}>›</div>
              </SettingRow>
              <Divider />
              <SettingRow
                icon="💬"
                label="Envoyer un retour"
                sublabel="Dire ce qui fonctionne bien ou moins bien"
                color="#B39BC8"
                onClick={() => {}}
              >
                <div style={{ fontSize: 18, color: "#B39BC8" }}>›</div>
              </SettingRow>
            </SectionCard>

            {/* Danger zone */}
            <div
              style={{
                background: "white",
                borderRadius: 24,
                boxShadow: "0 4px 20px rgba(80,80,100,0.08)",
                border: "1.5px solid #FCE8E4",
                overflow: "hidden",
                animation: "slideUp 0.35s ease both",
              }}
            >
              <SettingRow
                icon="🔴"
                label="Déconnexion"
                sublabel="Votre fille devra vous reconnecter"
                color="#E07070"
                onClick={() => setShowConfirm("logout")}
              >
                <div style={{ fontSize: 18, color: "#E07070" }}>›</div>
              </SettingRow>
            </div>

            {/* Version */}
            <div
              style={{
                textAlign: "center",
                padding: "8px 0 4px",
                color: "#C0CDD8",
                fontSize: 12,
              }}
            >
              Version 2.1.0 · Conçu avec ❤️ pour Jean
            </div>
          </div>
        </div>

        {/* Confirm modal */}
        {showConfirm && (
          <div className="confirm-overlay" onClick={() => setShowConfirm(null)}>
            <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
              <div style={{ fontSize: 44 }}>👋</div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#2D3748",
                }}
              >
                Se déconnecter ?
              </div>
              <div style={{ fontSize: 14, color: "#7A8E9A", lineHeight: 1.5 }}>
                Sophie devra vous aider à vous reconnecter si vous le souhaitez.
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setShowConfirm(null)}
                  style={{
                    flex: 1,
                    padding: "14px",
                    borderRadius: 14,
                    border: "1.5px solid #E2EAF0",
                    background: "white",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#7A8E9A",
                    cursor: "pointer",
                  }}
                >
                  Annuler
                </button>
                <button
                  onClick={() => setShowConfirm(null)}
                  style={{
                    flex: 1,
                    padding: "14px",
                    borderRadius: 14,
                    border: "none",
                    background: "linear-gradient(135deg, #E07070, #C05050)",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "white",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(224,112,112,0.4)",
                  }}
                >
                  Déconnecter
                </button>
              </div>
            </div>
          </div>
        )}

        <nav className="bottom-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${active === item.id ? "active" : ""}`}
              onClick={() => setActive(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
