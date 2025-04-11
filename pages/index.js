import { useState } from "react";

export default function Home() {
  const [sermon, setSermon] = useState("");
  const [topic, setTopic] = useState("");
  const [verse, setVerse] = useState("");
  const [style, setStyle] = useState("expositivo");
  const [length, setLength] = useState("corto");

  const generateSermon = () => {
    // Lógica para generar el sermón
    setSermon(`Sermón basado en el tema: ${topic}, versículo: ${verse}, estilo: ${style}, longitud: ${length}`);
  };

  return (
    <div>
      <h1>Generador de Sermones - PredicaHoy</h1>
      <form>
        <label>Tema:</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Introduce el tema del sermón"
        />
        <label>Versículo Base:</label>
        <input
          type="text"
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
          placeholder="Introduce el versículo base"
        />
        <label>Estilo de Sermón:</label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >
          <option value="expositivo">Expositivo</option>
          <option value="temático">Temático</option>
          <option value="narrativo">Narrativo</option>
        </select>
        <label>Longitud:</label>
        <select
          value={length}
          onChange={(e) => setLength(e.target.value)}
        >
          <option value="corto">Corto</option>
          <option value="medio">Medio</option>
          <option value="largo">Largo</option>
        </select>
        <button type="button" onClick={generateSermon}>
          Generar Sermón
        </button>
      </form>

      {sermon && (
        <div>
          <h2>Sermón Generado:</h2>
          <p>{sermon}</p>
        </div>
      )}
    </div>
  );
}
