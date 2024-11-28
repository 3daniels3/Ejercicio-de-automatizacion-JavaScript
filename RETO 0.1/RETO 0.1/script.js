// Datos ficticios de los productores con producción aleatoria para los años 2013-2023
const productores = [
    { id: 1, nombre: 'Juan Pérez', produccion: [150, 160, randomProduction(170, 190), randomProduction(180, 220), randomProduction(190, 250), randomProduction(200, 230), randomProduction(210, 250), randomProduction(220, 260), randomProduction(230, 270), randomProduction(240, 280), randomProduction(250, 290)] },
    { id: 2, nombre: 'María Gómez', produccion: [100, 110, randomProduction(120, 130), randomProduction(130, 150), randomProduction(140, 160), randomProduction(150, 180), randomProduction(160, 190), randomProduction(170, 200), randomProduction(180, 210), randomProduction(190, 220), randomProduction(200, 230)] },
    { id: 3, nombre: 'Carlos Rodríguez', produccion: [90, 95, randomProduction(100, 120), randomProduction(110, 130), randomProduction(120, 140), randomProduction(130, 150), randomProduction(140, 160), randomProduction(150, 170), randomProduction(160, 180), randomProduction(170, 190), randomProduction(180, 200)] },
    { id: 4, nombre: 'Ana López', produccion: [200, 210, randomProduction(220, 240), randomProduction(230, 250), randomProduction(240, 270), randomProduction(250, 280), randomProduction(260, 300), randomProduction(270, 320), randomProduction(280, 340), randomProduction(290, 350), randomProduction(300, 370)] },
    { id: 5, nombre: 'Luis Martínez', produccion: [120, 125, randomProduction(130, 150), randomProduction(140, 160), randomProduction(150, 180), randomProduction(160, 190), randomProduction(170, 200), randomProduction(180, 210), randomProduction(190, 220), randomProduction(200, 230), randomProduction(210, 240)] },
    { id: 6, nombre: 'Carmen Ruiz', produccion: [110, 115, randomProduction(120, 140), randomProduction(130, 150), randomProduction(140, 160), randomProduction(150, 170), randomProduction(160, 180), randomProduction(170, 190), randomProduction(180, 200), randomProduction(190, 210), randomProduction(200, 220)] },
    { id: 7, nombre: 'Pedro Díaz', produccion: [130, 140, randomProduction(150, 170), randomProduction(160, 180), randomProduction(170, 190), randomProduction(180, 200), randomProduction(190, 220), randomProduction(200, 230), randomProduction(210, 240), randomProduction(220, 250), randomProduction(230, 270)] },
    { id: 8, nombre: 'Isabel Fernández', produccion: [80, 85, randomProduction(90, 110), randomProduction(100, 120), randomProduction(110, 130), randomProduction(120, 140), randomProduction(130, 150), randomProduction(140, 160), randomProduction(150, 170), randomProduction(160, 180), randomProduction(170, 190)] },
    { id: 9, nombre: 'Andrés Hernández', produccion: [170, 180, randomProduction(190, 210), randomProduction(200, 220), randomProduction(210, 230), randomProduction(220, 240), randomProduction(230, 250), randomProduction(240, 260), randomProduction(250, 270), randomProduction(260, 280), randomProduction(270, 300)] },
    { id: 10, nombre: 'Laura González', produccion: [140, 150, randomProduction(160, 180), randomProduction(170, 190), randomProduction(180, 200), randomProduction(190, 210), randomProduction(200, 220), randomProduction(210, 230), randomProduction(220, 240), randomProduction(230, 250), randomProduction(240, 260)] }
];

// Función para generar producción aleatoria dentro de un rango
function randomProduction(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para calcular el costo de producción
function calcularCostoPorProducto(produccion) {
    const costoBase = 50; // Costo base por tonelada
    return produccion * costoBase;
}

// Llenar la tabla con los datos de los productores
const productoresData = document.getElementById('productoresData');
const productorIdSelect = document.getElementById('productorId');

function cargarDatos() {
    productores.forEach(productor => {
        const row = document.createElement('tr');
        let filaHtml = `
            <td>${productor.id}</td>
            <td>${productor.nombre}</td>`;

        // Agregar producción y costo de producción
        productor.produccion.forEach((prod, index) => {
            const costo = calcularCostoPorProducto(prod);
            filaHtml += `
                <td>${prod}</td>
                <td>$${costo}</td>
            `;
        });

        row.innerHTML = filaHtml;
        productoresData.appendChild(row);

        // Llenar el select de productores
        const option = document.createElement('option');
        option.value = productor.id;
        option.textContent = productor.nombre;
        productorIdSelect.appendChild(option);
    });
}

// Generar la predicción de producción para un año futuro
function generarPrediccion() {
    const productorId = parseInt(document.getElementById('productorId').value);
    const añoSeleccionado = parseInt(document.getElementById('year').value);

    const productor = productores.find(p => p.id === productorId);
    if (!productor) {
        alert('Por favor selecciona un productor válido.');
        return;
    }

    const producciones = productor.produccion;
    const produccionUltimoAño = producciones[producciones.length - 1];

    // Lógica simple de predicción: aumento del 5% anual
    const crecimientoPorcentaje = 0.05;
    const prediccion = produccionUltimoAño * Math.pow(1 + crecimientoPorcentaje, añoSeleccionado - 2023);

    const prediccionText = document.getElementById('predictionText');
    prediccionText.textContent = `La predicción de producción para el año ${añoSeleccionado} es de: ${Math.round(prediccion)} toneladas.;`

    // Calcular el costo de producción para el año seleccionado
    const costo = calcularCostoPorProducto(prediccion);
    const prediccionCostText = document.getElementById('predictionCostText');
    prediccionCostText.textContent = `El costo estimado de producción para el año ${añoSeleccionado} es de: $${costo} USD.`;

    // Mostrar el resultado
    const prediccionResult = document.getElementById('prediccionResult');
    prediccionResult.classList.remove('hidden');
}

// Cargar los datos al cargar la página
window.onload = cargarDatos;