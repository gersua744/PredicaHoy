let modoClaro = false;

async function generarPredica() {
  const tema = document.getElementById("tema").value;
  if (!tema) {
    alert("Por favor, escribe un tema");
    return;
  }

  const apiKey = "TU_API_KEY_AQUÍ";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Escribe una prédica cristiana sobre: ${tema}` }],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const mensaje = data.choices?.[0]?.message?.content || "No se pudo generar la prédica.";
  document.getElementById("resultado").textContent = mensaje;
}

function copiar() {
  const resultado = document.getElementById("resultado").textContent;
  navigator.clipboard.writeText(resultado);
  alert("¡Prédica copiada al portapapeles!");
}

function descargar() {
  const texto = document.getElementById("resultado").textContent;
  const blob = new Blob([texto], { type: "text/plain" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = "predica.txt";
  enlace.click();
}

function cambiarTema() {
  document.body.classList.toggle("light-mode");
  modoClaro = !modoClaro;
}
