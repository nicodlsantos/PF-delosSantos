
const agenda = JSON.parse(localStorage.getItem('agenda')) || [];

function mostrarAgendas() {
    let agendasHTML = '';
    agenda.forEach(agendado => {
        agendasHTML += `
            <div class="agenda-item">
                <p>Fecha: ${agendado.fecha}, Hora: ${agendado.hora}, Nombre: ${agendado.nombre}, Apellido: ${agendado.apellido}</p>
                <button class="borrar-agenda-btn">Borrar</button>
            </div>
        `;
    });

    let containerAgendas = document.querySelector('.container-agendas');
    containerAgendas.innerHTML = agendasHTML;

    // Agrega event listener a cada botón de borrar agenda y actualiza localStorage
    let botonesBorrar = document.querySelectorAll('.borrar-agenda-btn');
    botonesBorrar.forEach(boton => {
        boton.addEventListener('click', function() {
            let index = Array.from(botonesBorrar).indexOf(boton);

            agenda.splice(index, 1);

            localStorage.setItem('agenda', JSON.stringify(agenda));

            mostrarAgendas();
        });
    });
}

// Función para agregar una nueva agenda
document.getElementById("crear-agenda-btn").addEventListener("click", function() {
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;

    let nuevaAgenda = {
        fecha: fecha,
        hora: hora,
        nombre: nombre,
        apellido: apellido
    };

    agenda.push(nuevaAgenda);

    localStorage.setItem('agenda', JSON.stringify(agenda));

    mostrarAgendas();
});

mostrarAgendas();
