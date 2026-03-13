import { useState } from "react";

const HomeIcon = ({ active }) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
    <path
      d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
      stroke={active ? "#fff" : "#9a9890"}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const CalendarIcon = ({ active }) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
    <rect x="3" y="4" width="18" height="17" rx="2.5" stroke={active ? "#fff" : "#9a9890"} strokeWidth="1.6" />
    <path d="M3 9H21" stroke={active ? "#fff" : "#9a9890"} strokeWidth="1.6" />
    <path d="M8 2V5M16 2V5" stroke={active ? "#fff" : "#9a9890"} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="8.5" cy="13.5" r="1" fill={active ? "#fff" : "#9a9890"} />
    <circle cx="12" cy="13.5" r="1" fill={active ? "#fff" : "#9a9890"} />
    <circle cx="15.5" cy="13.5" r="1" fill={active ? "#fff" : "#9a9890"} />
    <circle cx="8.5" cy="17" r="1" fill={active ? "#fff" : "#9a9890"} />
    <circle cx="12" cy="17" r="1" fill={active ? "#fff" : "#9a9890"} />
  </svg>
);

const QuizIcon = ({ active }) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
    <circle cx="12" cy="12" r="9" stroke={active ? "#fff" : "#9a9890"} strokeWidth="1.6" />
    <path
      d="M9.5 9.5C9.5 8.12 10.62 7 12 7C13.38 7 14.5 8.12 14.5 9.5C14.5 10.88 12 12 12 13.5"
      stroke={active ? "#fff" : "#9a9890"}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="12" cy="16.5" r="0.8" fill={active ? "#fff" : "#9a9890"} />
  </svg>
);

const FamilleIcon = ({ active }) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
    <circle cx="8.5" cy="7" r="3" stroke={active ? "#fff" : "#9a9890"} strokeWidth="1.6" />
    <circle cx="15.5" cy="7" r="3" stroke={active ? "#fff" : "#9a9890"} strokeWidth="1.6" />
    <path d="M2 20C2 16.69 5.13 14 9 14" stroke={active ? "#fff" : "#9a9890"} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M22 20C22 16.69 18.87 14 15 14C11.13 14 8 16.69 8 20" stroke={active ? "#fff" : "#9a9890"} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const SettingsIcon = ({ active }) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
    <circle cx="12" cy="12" r="2.5" stroke={active ? "#fff" : "#9a9890"} strokeWidth="1.6" />
    <path
      d="M12 3V5M12 19V21M3 12H5M19 12H21M5.64 5.64L7.05 7.05M16.95 16.95L18.36 18.36M5.64 18.36L7.05 16.95M16.95 7.05L18.36 5.64"
      stroke={active ? "#fff" : "#9a9890"}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const navItems = [
  { id: "home",     label: "Accueil",    Icon: HomeIcon },
  { id: "calendar", label: "Calendrier", Icon: CalendarIcon },
  { id: "quiz",     label: "Quiz",       Icon: QuizIcon,    badge: 3 },
  { id: "famille",  label: "Famille",    Icon: FamilleIcon },
  { id: "settings", label: "Paramètres", Icon: SettingsIcon },
];

export default function FloatingBottomNav({ activeId: externalActiveId, onNavigate }) {
  const [internalActive, setInternalActive] = useState("home");
  const activeId = externalActiveId ?? internalActive;

  const handleClick = (id) => {
    setInternalActive(id);
    onNavigate?.(id);
  };

  return (
    <div style={styles.wrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes popIn {
          from { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }

        .fnav-btn:hover {
          background: rgba(120,115,105,0.09) !important;
        }

        .fnav-btn-active:hover {
          background: #2e6b4d !important;
          box-shadow: 0 4px 18px rgba(58, 125, 92, 0.30) !important;
        }
      `}</style>

      {/* Page preview */}
      <div style={styles.pagePreview}>↑ page content above</div>

      {/* Floating Nav */}
      <nav style={styles.nav}>
        {navItems.map(({ id, label, Icon, badge }) => {
          const active = activeId === id;
          return (
            <button
              key={id}
              onClick={() => handleClick(id)}
              title={label}
              className={active ? "fnav-btn fnav-btn-active" : "fnav-btn"}
              style={{
                ...styles.navItem,
                ...(active ? styles.navItemActive : {}),
              }}
            >
              <Icon active={active} />
              {active && <span style={styles.activeLabel}>{label}</span>}
              {badge && <span style={styles.badge}>{badge}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: "'DM Sans', sans-serif",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: "linear-gradient(160deg, #f5f2eb 0%, #e4e0d8 100%)",
    position: "relative",
  },
  pagePreview: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#b0ada5",
    fontSize: 13,
    letterSpacing: "0.04em",
  },
  nav: {
    position: "absolute",
    bottom: 28,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(255, 255, 255, 0.82)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: 40,
    padding: "8px 10px",
    boxShadow:
      "0 8px 32px rgba(100, 95, 85, 0.18), 0 1px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(200,196,188,0.5)",
    animation: "popIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both",
    whiteSpace: "nowrap",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    cursor: "pointer",
    border: "none",
    background: "transparent",
    borderRadius: 32,
    width: 48,
    height: 48,
    position: "relative",
    transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
    flexShrink: 0,
    padding: 0,
  },
  navItemActive: {
    background: "#3a7d5c",
    width: "auto",
    paddingLeft: 16,
    paddingRight: 18,
    boxShadow: "0 4px 14px rgba(58, 125, 92, 0.35)",
  },
  activeLabel: {
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    whiteSpace: "nowrap",
    letterSpacing: "0.01em",
  },
  badge: {
    position: "absolute",
    top: 7,
    right: 7,
    background: "#e8735a",
    color: "white",
    fontSize: 9,
    fontWeight: 700,
    width: 15,
    height: 15,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid white",
    lineHeight: 1,
  },
};
