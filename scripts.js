function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('active');
}

async function sendToGemini(prompt) {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDvgmqAeSAewYI21avRzVoRI8_7hPNyi_I', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });
  const result = await response.json();
  return result.candidates[0].content.parts[0].text;
}

async function sendWorkHardForm() {
  const formData = new FormData(document.getElementById('workhard-form'));
  const data = {};
  formData.forEach((value, key) => {
    if (!data[key]) data[key] = [];
    data[key].push(value);
  });

  const prompt = `Genera un plan de entrenamiento detallado sin repetir los datos proporcionados por el usuario. Datos: ${JSON.stringify(data)}.`;
  const result = await sendToGemini(prompt);
  document.getElementById('workhard-response').innerText = result;
}

async function sendGymForm() {
  const formData = new FormData(document.getElementById('gym-form'));
  const data = {};
  formData.forEach((value, key) => {
    if (!data[key]) data[key] = [];
    data[key].push(value);
  });

  const prompt = `Crea una rutina de gimnasio basada en los siguientes datos: ${JSON.stringify(data)}. Incluye repeticiones, series, tiempo de descanso y peso a cargar si aplica.`;
  const result = await sendToGemini(prompt);
  document.getElementById('gym-response').innerText = result;
}

async function sendHidratacionForm() {
  const formData = new FormData(document.getElementById('hidratacion-form'));
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  const prompt = `Calcula la cantidad de agua diaria en mililitros para una persona con estos datos: ${JSON.stringify(data)}. Solo muestra el resultado numérico.`;
  const result = await sendToGemini(prompt);
  document.getElementById('hidratacion-response').innerText = `${result} ml`;
}

async function sendAlimentacionForm() {
  const formData = new FormData(document.getElementById('alimentacion-form'));
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  const prompt = `Genera recomendaciones alimenticias claras y entendibles incluyendo calorías diarias, ajustes de calorías y macros (proteínas, carbohidratos, grasas) basadas en estos datos: ${JSON.stringify(data)}.`;
  const result = await sendToGemini(prompt);
  document.getElementById('alimentacion-response').innerText = result;
}

async function sendPrevencionForm() {
  const formData = new FormData(document.getElementById('prevencion-form'));
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  const prompt = `Proporciona instrucciones claras y detalladas para prevenir o recuperarse de lesiones basadas en estos datos: ${JSON.stringify(data)}. Incluye ejercicios específicos con descripciones claras.`;
  const result = await sendToGemini(prompt);
  document.getElementById('prevencion-response').innerText = result;
}

function submitZonaEstudioForm() {
  const formData = new FormData(document.getElementById('zona-de-estudio-form'));
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  const tableBody = document.querySelector('#zona-de-estudio-table tbody');
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${data['subido-por']}</td>
    <td><a href="${data['link']}" target="_blank">${data['link']}</a></td>
    <td>${data['seccion']}</td>
    <td>${data['posicion']}</td>
    <td>${data['concepto']}</td>
  `;
  tableBody.appendChild(newRow);
}
