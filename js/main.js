document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelector('.cards');
    const agenda = JSON.parse(localStorage.getItem('agenda')) || [];

    document.getElementById('btn-reservar').addEventListener('click', () => {
        showReservationForm();
    });

    document.getElementById('btn-consultar').addEventListener('click', () => {
        showConsultForm();
    });

    function showReservationForm() {
        cards.innerHTML = `
            <h3>Crear Reserva</h3>
            <form id="reservation-form">
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" class="form-control" id="nombre" required>
                </div>
                <div class="form-group">
                    <label for="apellido">Apellido</label>
                    <input type="text" class="form-control" id="apellido" required>
                </div>
                <div class="form-group">
                    <label for="fecha">Fecha</label>
                    <input type="date" class="form-control" id="fecha" required>
                </div>
                <div class="form-group">
                    <label for="hora">Hora</label>
                    <input type="time" class="form-control" id="hora" required>
                </div>
                <button type="submit" class="reserve-button btn btn-light btn-lg">Guardar Reserva</button>
                <button type="button" class="reserve-button btn btn-light btn-lg" id="btn-atras">Atrás</button>
            </form>
        `;

        document.getElementById('reservation-form').addEventListener('submit', saveReservation);
        document.getElementById('btn-atras').addEventListener('click', showMainButtons);
    }

    function showConsultForm() {
        cards.innerHTML = `
            <h3>Consultar Reserva</h3>
            <form id="consult-form">
                <div class="form-group">
                    <label for="consult-nombre">Nombre</label>
                    <input type="text" class="form-control" id="consult-nombre" required>
                </div>
                <div class="form-group">
                    <label for="consult-apellido">Apellido</label>
                    <input type="text" class="form-control" id="consult-apellido" required>
                </div>
                <button type="submit" class="reserve-button btn btn-light btn-lg">Consultar</button>
                <button type="button" class="reserve-button btn btn-light btn-lg" id="btn-atras">Atrás</button>
            </form>
            <div id="consult-result"></div>
        `;

        document.getElementById('consult-form').addEventListener('submit', consultReservation);
        document.getElementById('btn-atras').addEventListener('click', showMainButtons);
    }

    function showMainButtons() {
        cards.innerHTML = `
            <h3>¿Qué estás esperando?</h3>
            <div class="reserve-btn-grid">
                <button type="button" class="reserve-button btn btn-light btn-lg" id="btn-reservar">Reservar</button>
                <button type="button" class="reserve-button btn btn-light btn-lg" id="btn-consultar">Consultar reserva</button>
            </div>
        `;

        document.getElementById('btn-reservar').addEventListener('click', showReservationForm);
        document.getElementById('btn-consultar').addEventListener('click', showConsultForm);
    }

    function saveReservation(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;

        const newReservation = { nombre, apellido, fecha, hora };

        agenda.push(newReservation);
        localStorage.setItem('agenda', JSON.stringify(agenda));

        showModal('Reserva guardada con éxito!');
        showMainButtons();
    }

    function consultReservation(event) {
        event.preventDefault();

        const nombre = document.getElementById('consult-nombre').value;
        const apellido = document.getElementById('consult-apellido').value;

        const userReservations = agenda.filter(reservation => reservation.nombre === nombre && reservation.apellido === apellido);

        const resultDiv = document.getElementById('consult-result');
        resultDiv.innerHTML = '';

        if (userReservations.length > 0) {
            userReservations.forEach((reservation, index) => {
                const reservationDiv = document.createElement('div');
                reservationDiv.innerHTML = `
                    <p>${reservation.fecha} a las ${reservation.hora}</p>
                    <button type="button" class="btn btn-danger" data-index="${index}">Cancelar</button>
                `;
                resultDiv.appendChild(reservationDiv);
                reservationDiv.querySelector('button').addEventListener('click', () => cancelReservation(reservation));
            });
        } else {
            resultDiv.innerHTML = '<p>No se encontraron reservas.</p>';
        }
    }

    function cancelReservation(reservationToCancel) {
        const index = agenda.findIndex(reservation => reservation.nombre === reservationToCancel.nombre && reservation.apellido === reservationToCancel.apellido && reservation.fecha === reservationToCancel.fecha && reservation.hora === reservationToCancel.hora);
        if (index > -1) {
            agenda.splice(index, 1);
            localStorage.setItem('agenda', JSON.stringify(agenda));
            showModal('Reserva cancelada con éxito!');
            showMainButtons();
        }
    }

    function showModal(message) {
        const modalBody = document.getElementById('modal-body');
        modalBody.textContent = message;
        $('#myModal').modal('show');
    }

    showMainButtons();
});
