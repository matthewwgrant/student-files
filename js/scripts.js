const gallery = document.getElementById('gallery');

fetch('https://randomuser.me/api/?results=12')
	.then(res => res.json())
	.then(data => data.results)
	.then(generateEmployees)


function generateEmployees(data) {
	const employees = data.map(employee => `
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

	);
	gallery.insertAdjacentHTML('beforeend', employees);
}