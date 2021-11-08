const gallery = document.getElementById('gallery');
const closeBtn = document.querySelector('#modal-close-btn');
const url = 'https://randomuser.me/api/?results=12&nat=us';
let employeeData = [];
let employeeCards = [];
let modals = [];


// Calls to API to generate info on 12 employees
fetch(url)
	.then(res => res.json())
	.then(data => {
		const employees = data;
		employeeData.push(employees);
		generateEmployees(employees);
		generateModal(employees);
		})
	.catch(error => console.log('Something seems to have gone wrong: ', error))

/*
	Function to genetate cards with employee information and push into array
*/

function generateEmployees(data) {

	const employeeInfo = employeeData[0].results;

	for ( let i = 0; i < employeeInfo.length; i++ ) {
		let employee = `
			<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${employeeInfo[i].picture.thumbnail}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${employeeInfo[i].name.first} ${employeeInfo[i].name.last}</h3>
                    <p class="card-text">${employeeInfo[i].email}</p>
                    <p class="card-text cap">${employeeInfo[i].location.city}, ${employeeInfo[i].location.state}</p>
                </div>
            </div>
		`

		employeeCards.push(employee);

		gallery.insertAdjacentHTML('beforeend', employee);
	}



	
}

/*
	Function genetate modals and push into array
*/

function generateModal(data) {
	const employeeInfo = employeeData[0].results;
	const regex = /(\d{4})[-](\d{2})[-](\d{2})/;
	
	for ( let i = 0; i < employeeInfo.length; i++) {
		let employeeModal = `
			 <div class="modal-container">
	            <div class="modal">
	                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
	                <div class="modal-info-container">
	                    <img class="modal-img" src="${employeeInfo[i].picture.medium}" alt="profile picture">
	                    <h3 id="name" class="modal-name cap">${employeeInfo[i].name.first} ${employeeInfo[i].name.last}</h3>
	                    <p class="modal-text">${employeeInfo[i].email}</p>
	                    <p class="modal-text cap">${employeeInfo[i].location.city}</p>
	                    <hr>
	                    <p class="modal-text">${employeeInfo[i].cell}</p>
	                    <p class="modal-text">${employeeInfo[i].location.street.number} ${employeeInfo[i].location.street.name}, ${employeeInfo[i].location.city}, ${employeeInfo[i].location.state} ${employeeInfo[i].location.postcode}</p>
	                    <p class="modal-text">Birthday: ${employeeInfo[i].dob.date.slice(0, 10).replace(regex, '$2/$3/$1')}</p>
	                </div>
	            </div>

	            <div class="modal-btn-container">
	                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
	                <button type="button" id="modal-next" class="modal-next btn">Next</button>
	            </div>
	         </div>
			`

		modals.push(employeeModal);
	}
}



/*
	Event listener that displays modal of employee who's card was selected
*/
gallery.addEventListener('click', (e) => {
	const cards = document.querySelectorAll('.card');

	if ( e.target.className === 'card' || e.target.className === 'card-img-container' || e.target.className === 'card-img' || e.target.className === 'card-info-container' || e.target.className === 'card-name' || e.target.className === 'card-text' || e.target.className === 'card-name cap' || e.target.className === 'card-text cap') {
		let index = 0;
		for ( let i = 0; i < cards.length; i++ ) {
			if (e.composedPath().includes(cards[i])) {
				index = i;
			}
		}
		gallery.insertAdjacentHTML('beforeend', modals[index]);

	}

	
});


/*
	Event listener that closes open modal
*/
document.addEventListener('click', (e) => {
	const button = document.querySelector('.modal-close-btn');
	const modalContainer = document.querySelector('.modal-container');
	const strong = document.querySelector('strong');

	if ( e.target === button || e.target == modalContainer || e.target === strong ) {
		document.querySelector('.modal-container').remove();
	}
	
});






