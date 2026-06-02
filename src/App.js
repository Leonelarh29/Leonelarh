import { useState } from "react";

const INITIAL_EXPERIENCES = [
  {
    id: 1,
    city: "Pereira",
    title: "Mercado del Río",
    category: "food",
    rating: 5,
    date: "2025-03-15",
    note: "Beste bandeja paisa van mijn leven! Lokale markt, heel authentiek.",
    emoji: "🥘",
    photo: null,
  },
  {
    id: 2,
    city: "Medellín",
    title: "Comuna 13",
    category: "sight",
    rating: 5,
    date: "2025-03-17",
    note: "Ongelooflijke street art en de roltrappen zijn uniek in de wereld.",
    emoji: "🎨",
    photo: null,
  },
];

const CATEGORIES = [
  { id: "food", label: "Eten & Drinken", emoji: "🍽️", color: "#10B981" },
  { id: "sight", label: "Bezienswaardigheden", emoji: "⛪", color: "#F59E0B" },
  { id: "activity", label: "Activiteit", emoji: "🏄", color: "#3B82F6" },
  { id: "night", label: "Nachtleven", emoji: "🌙", color: "#8B5CF6" },
  { id: "tip", label: "Local Tip", emoji: "✨", color: "#EC4899" },
  { id: "nature", label: "Natuur", emoji: "🌿", color: "#059669" },
];

const COLOMBIA_CITIES = ["Pereira", "Medellín", "Bogotá", "Cartagena", "Cali", "Santa Marta", "Manizales", "Armenia"];

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange && onChange(star)}
          onMouseEnter={() => onChange && setHover(star)}
          onMouseLeave={() => onChange && setHover(0)}
          style={{
            fontSize: 24,
            cursor: onChange ? "pointer" : "default",
            color: star <= (hover || value) ? "#F59E0B" : "rgba(255,255,255,0.2)",
            transition: "color 0.1s",
          }}
        >★</span>
      ))}
    </div>
  );
}

function AddForm({ onAdd, onClose }) {
  const [form, setForm] = useState({
    city: "",
    title: "",
    category: "food",
    rating: 5,
    date: new Date().toISOString().split("T")[0],
    note: "",
    photo: null,
    customCity: "",
  });

  const cat = CATEGORIES.find((c) => c.id === form.category);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((f) => ({ ...f, photo: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const city = form.city === "__custom__" ? form.customCity : form.city;
    if (!city || !form.title) return alert("Vul stad en naam in!");
    onAdd({
      id: Date.now(),
      city,
      title: form.title,
      category: form.category,
      rating: form.rating,
      date: form.date,
      note: form.note,
      photo: form.photo,
      emoji: cat.emoji,
    });
    onClose();
  };

  const input = (placeholder, field, type = "text") => (
    <input
      type={type}
      placeholder={placeholder}
      value={form[field]}
      onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
      style={{
        width: "100%", padding: "10px 12px", borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(255,255,255,0.07)", color: "#f0ece0",
        fontSize: 14, fontFamily: "Georgia, serif", boxSizing: "border-box",
        outline: "none",
      }}
    />
  );

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
      zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center",
    }}>
      <div style={{
        background: "linear-gradient(160deg, #1a1740, #2d2b55)",
        borderRadius: "24px 24px 0 0",
        padding: "24px 20px 40px",
        width: "100%", maxWidth: 480,
        border: "1px solid rgba(255,255,255,0.1)",
        maxHeight: "90vh", overflowY: "auto",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 18, color: "#F59E0B" }}>🌺 Nieuwe Ervaring</h2>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%",
            width: 32, height: 32, color: "#f0ece0", cursor: "pointer", fontSize: 16,
          }}>✕</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Stad */}
          <div>
            <label style={{ fontSize: 11, color: "rgba(240,236,224,0.5)", letterSpacing: 1, textTransform: "uppercase" }}>Stad</label>
            <select
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              style={{
                width: "100%", padding: "10px 12px", borderRadius: 10, marginTop: 4,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.07)", color: "#f0ece0",
                fontSize: 14, fontFamily: "Georgia, serif", boxSizing: "border-box",
              }}
            >
              <option value="">Kies een stad...</option>
              {COLOMBIA_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              <option value="__custom__">Andere stad...</option>
            </select>
            {form.city === "__custom__" && (
              <div style={{ marginTop: 8 }}>
                {input("Typ je stad...", "customCity")}
              </div>
            )}
          </div>

          {/* Naam */}
          <div>
            <label style={{ fontSize: 11, color: "rgba(240,236,224,0.5)", letterSpacing: 1, textTransform: "uppercase" }}>Naam plek</label>
            <div style={{ marginTop: 4 }}>{input("bijv. Café de la Plaza...", "title")}</div>
          </div>

          {/* Categorie */}
          <div>
            <label style={{ fontSize: 11, color: "rgba(240,236,224,0.5)", letterSpacing: 1, textTransform: "uppercase" }}>Categorie</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
              {CATEGORIES.map((c) => (
                <button key={c.id} onClick={() => setForm((f) => ({ ...f, category: c.id }))} style={{
                  padding: "6px 12px", borderRadius: 20, border: "none", cursor: "pointer",
                  fontSize: 12, fontFamily: "Georgia, serif",
                  background: form.category === c.id ? c.color : "rgba(255,255,255,0.08)",
                  color: form.category === c.id ? "#fff" : "rgba(240,236,224,0.7)",
                  fontWeight: form.category === c.id ? "bold" : "normal",
                }}>
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Datum */}
          <div>
            <label style={{ fontSize: 11, color: "rgba(240,236,224,0.5)", letterSpacing: 1, textTransform: "uppercase" }}>Datum</label>
            <div style={{ marginTop: 4 }}>{input("", "date", "date")}</div>
          </div>

          {/* Beoordeling */}
          <div>
            <label style={{ fontSize: 11, color: "rgba(240,236,224,0.5)", letterSpacing: 1, textTransform: "uppercase" }}>Beoordeling</label>
            <div style={{ marginTop: 8 }}>
              <StarRating value={form.rating} onChange={(r) => setForm((f) => ({ ...f, rating: r }))} />
            </div>
          </div>

          {/* Notitie */}
          <div>
            <label style={{ fontSize: 11, color: "rgba(240,236,224,0.5)", letterSpacing: 1, textTransform: "uppercase" }}>Jouw ervaring</label>
            <textarea
              placeholder="Wat vond je ervan? Tips voor anderen?"
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
              rows={3}
              style={{
                width: "100%", padding: "10px 12px", borderRadius: 10, marginTop: 4,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.07)", color: "#f0ece0",
                fontSize: 14, fontFamily: "Georgia, serif", boxSizing: "border-box",
                resize: "none", outline: "none",
              }}
            />
          </div>

          {/* Foto */}
          <div>
            <label style={{ fontSize: 11, color: "rgba(240,236,224,0.5)", letterSpacing: 1, textTransform: "uppercase" }}>Foto</label>
            <label style={{
              display: "block", marginTop: 4, padding: "10px 12px", borderRadius: 10,
              border: "1px dashed rgba(255,255,255,0.2)", cursor: "pointer",
              background: "rgba(255,255,255,0.04)", textAlign: "center",
              color: "rgba(240,236,224,0.5)", fontSize: 13,
            }}>
              {form.photo ? "✅ Foto geselecteerd" : "📷 Klik om foto toe te voegen"}
              <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
            </label>
            {form.photo && (
              <img src={form.photo} alt="preview" style={{ width: "100%", borderRadius: 10, marginTop: 8, maxHeight: 150, objectFit: "cover" }} />
            )}
          </div>

          {/* Opslaan */}
          <button onClick={handleSubmit} style={{
            width: "100%", padding: "14px", borderRadius: 14, border: "none",
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            color: "#1a1a2e", fontSize: 16, fontWeight: "bold",
            fontFamily: "Georgia, serif", cursor: "pointer", marginTop: 8,
          }}>
            🌺 Ervaring Opslaan
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Chapolruta() {
  const [experiences, setExperiences] = useState(INITIAL_EXPERIENCES);
  const [showForm, setShowForm] = useState(false);
  const [filterCat, setFilterCat] = useState("all");
  const [filterCity, setFilterCity] = useState("all");
  const [selected, setSelected] = useState(null);

  const cities = ["all", ...new Set(experiences.map((e) => e.city))];
  const filtered = experiences
    .filter((e) => filterCat === "all" || e.category === filterCat)
    .filter((e) => filterCity === "all" || e.city === filterCity)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const addExperience = (exp) => setExperiences((prev) => [exp, ...prev]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      fontFamily: "'Georgia', serif",
      color: "#f0ece0",
      paddingBottom: 100,
    }}>
      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        padding: "20px 20px 16px",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#F59E0B", textTransform: "uppercase", marginBottom: 4 }}>
              Mijn Reisdagboek
            </div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: "normal" }}>🌺 Chapolruta</h1>
            <div style={{ fontSize: 12, color: "rgba(240,236,224,0.4)", marginTop: 2 }}>
              {experiences.length} ervaringen · {new Set(experiences.map(e => e.city)).size} steden
            </div>
          </div>
          <button onClick={() => setShowForm(true)} style={{
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            border: "none", borderRadius: 14, padding: "10px 16px",
            color: "#1a1a2e", fontWeight: "bold", fontSize: 13,
            fontFamily: "Georgia, serif", cursor: "pointer",
          }}>
            + Toevoegen
          </button>
        </div>

        {/* Filters */}
        <div style={{ marginTop: 14, display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
          <button onClick={() => setFilterCity("all")} style={{
            flexShrink: 0, padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer",
            fontSize: 11, fontFamily: "Georgia, serif",
            background: filterCity === "all" ? "#F59E0B" : "rgba(255,255,255,0.08)",
            color: filterCity === "all" ? "#1a1a2e" : "rgba(240,236,224,0.7)",
            fontWeight: filterCity === "all" ? "bold" : "normal",
          }}>🌍 Alle steden</button>
          {cities.filter(c => c !== "all").map((city) => (
            <button key={city} onClick={() => setFilterCity(city)} style={{
              flexShrink: 0, padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer",
              fontSize: 11, fontFamily: "Georgia, serif",
              background: filterCity === city ? "#F59E0B" : "rgba(255,255,255,0.08)",
              color: filterCity === city ? "#1a1a2e" : "rgba(240,236,224,0.7)",
              fontWeight: filterCity === city ? "bold" : "normal",
            }}>{city}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        {/* Categorie filter */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 16 }}>
          <button onClick={() => setFilterCat("all")} style={{
            flexShrink: 0, padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
            fontSize: 12, fontFamily: "Georgia, serif",
            background: filterCat === "all" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)",
            color: "#f0ece0",
          }}>Alles</button>
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setFilterCat(c.id)} style={{
              flexShrink: 0, padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
              fontSize: 12, fontFamily: "Georgia, serif",
              background: filterCat === c.id ? c.color : "rgba(255,255,255,0.06)",
              color: "#f0ece0",
            }}>{c.emoji}</button>
          ))}
        </div>

        {/* Ervaringen */}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(240,236,224,0.3)" }}>
            <div style={{ fontSize: 40 }}>🌺</div>
            <div style={{ marginTop: 12 }}>Nog geen ervaringen — voeg je eerste toe!</div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {filtered.map((exp) => {
            const cat = CATEGORIES.find((c) => c.id === exp.category);
            return (
              <div key={exp.id} onClick={() => setSelected(exp)} style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16, overflow: "hidden", cursor: "pointer",
                transition: "transform 0.2s",
              }}>
                {exp.photo ? (
                  <img src={exp.photo} alt={exp.title} style={{ width: "100%", height: 100, objectFit: "cover" }} />
                ) : (
                  <div style={{
                    height: 80, display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${cat.color}22`, fontSize: 32,
                  }}>{exp.emoji}</div>
                )}
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", marginBottom: 4 }}>{exp.title}</div>
                  <div style={{ fontSize: 11, color: "rgba(240,236,224,0.4)", marginBottom: 6 }}>📍 {exp.city}</div>
                  <StarRating value={exp.rating} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
          zIndex: 50, display: "flex", alignItems: "flex-end", justifyContent: "center",
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: "linear-gradient(160deg, #1a1740, #2d2b55)",
            borderRadius: "24px 24px 0 0",
            padding: "24px 20px 40px",
            width: "100%", maxWidth: 480,
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            {selected.photo && (
              <img src={selected.photo} alt={selected.title} style={{ width: "100%", borderRadius: 14, marginBottom: 16, maxHeight: 200, objectFit: "cover" }} />
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <h2 style={{ margin: 0, fontSize: 20 }}>{selected.emoji} {selected.title}</h2>
              <button onClick={() => setSelected(null)} style={{
                background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%",
                width: 32, height: 32, color: "#f0ece0", cursor: "pointer", fontSize: 16,
              }}>✕</button>
            </div>
            <div style={{ fontSize: 12, color: "rgba(240,236,224,0.4)", marginTop: 4 }}>📍 {selected.city} · 📅 {selected.date}</div>
            <div style={{ marginTop: 10 }}><StarRating value={selected.rating} /></div>
            {selected.note && (
              <p style={{ marginTop: 12, fontSize: 14, color: "rgba(240,236,224,0.7)", lineHeight: 1.6 }}>{selected.note}</p>
            )}
          </div>
        </div>
      )}

      {/* Formulier */}
      {showForm && <AddForm onAdd={addExperience} onClose={() => setShowForm(false)} />}

      {/* Toevoegen knop onderaan */}
      <div style={{ position: "fixed", bottom: 24, right: 20, zIndex: 20 }}>
        <button onClick={() => setShowForm(true)} style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "linear-gradient(135deg, #F59E0B, #D97706)",
          border: "none", fontSize: 24, cursor: "pointer",
          boxShadow: "0 4px 20px rgba(245,158,11,0.4)",
        }}>+</button>
      </div>
    </div>
  );
}