const gallery = document.getElementById('gallery');

fetch('https://randomuser.me/api/?results=12&nat=us')
	.then(res => res.json())
	.then(data => employeeData = data.results)
	.then(generateEmployees)


function generateEmployees(data) {
	const employees = employeeData.map(employee => `
			<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${employee.picture.thumbnail}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="card-text">${employee.email}</p>
                    <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                </div>
            </div>
		`

	).join('');
	gallery.insertAdjacentHTML('beforeend', employees);
}

function generateModal(data) {
	const regex = /(\d{4})[-](\d{2})[-](\d{2})/
	const employeeModals = employeeData.map(employee => `
		 <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${employee.picture.medium}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="modal-text">${employee.email}</p>
                    <p class="modal-text cap">${employee.location.city}</p>
                    <hr>
                    <p class="modal-text">(555) 555-5555</p>
                    <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                    <p class="modal-text">Birthday: ${employee.dob.date.slice(0, 10).replace(regex, '$2/$3/$1')}</p>
                </div>
            </div>

            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
		`
	).join('');

	gallery.insertAdjacentHTML('beforeend', employeeModals);
}

gallery.addEventListener('click', () => {

	generateModal(employeeData);
})


