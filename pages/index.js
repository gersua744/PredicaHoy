import { useState } from "react";

export default function Home() {
  // Estados para los campos del formulario
  const [sermon, setSermon] = useState("");
  const [topic, setTopic] = useState("");
  const [verse, setVerse] = useState("");
  const [style, setStyle] = useState("expositivo");
  const [length, setLength] = useState("corto");

  // Función para generar el sermón
  const generateSermon = () => {
    const intro = `Hoy vamos a hablar sobre el tema: ${topic}, basado en el versículo ${verse}.`;
    const body = `Este sermón se centrará en el estilo de sermón ${style}, con una longitud ${length}.`;
    const conclusion = `Concluimos con la reflexión sobre cómo aplicar este mensaje en nuestra vida diaria.`;
    
    setSermon(`${intro} ${body} ${conclusion}`);
  };

  // Función para copiar al portapapeles
  const copyToClipboard = () => {
    navigator.clipboard.writeText(sermon);
    alert("Sermón copiado al portapapeles");
  };

  // Función para descargar el sermón como PDF
  const downloadPDF = () => {
    const { jsPDF } = require("jspdf");
    const doc = new jsPDF();
    doc.text(sermon, 10, 10);
    doc.save("sermon.pdf");
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
          <button onClick={copyToClipboard}>Copiar al portapapeles</button>
          <button onClick={downloadPDF}>Descargar PDF</button>
        </div>
      )}
    </div>
  );
}
