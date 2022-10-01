const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    //console.log(phones);
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';

    // Display 10 Phones Only || display all phones

    const showAll = document.getElementById('show-all');
    
    if(dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }

    
    // Phones data not founding warning
    const noFoundMessage = document.getElementById('no-found-message');
    if(phones.length === 0){
        noFoundMessage.classList.remove('d-none');
    }else {
        noFoundMessage.classList.add('d-none');
    }

    // Display Phones
    phones.forEach(phone => {
        const phonesDiv = document.createElement('div');
        phonesDiv.innerHTML = `
            <div class="col">
                <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>                  
                    <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
                </div>
                </div>
            </div> 
        `;
        phonesContainer.appendChild(phonesDiv);
    }); 
    // Stop Loader
    toggleSpinner(false);
}

//multiple search field call
const processSearch = (dataLimit) => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

//handle search button click
//search limitation data
document.getElementById('btn-search').addEventListener('click', function() {
    processSearch(10);
    
})

//input key enter key search event handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    //console.log(e.key);
    // Start Loader
    toggleSpinner(true);
    if (e.key === 'Enter') {
        
        processSearch(10);
    }
});

//loading implement
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none')
    }
}

// load all data after show all button click
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})


//load Phone Details for Modal

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

// display phone details in modal

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = phone.name;
    const modalImg = document.getElementById('modal-body');
    modalImg.innerHTML = '';
    const modalImgDiv = document.createElement('div');
    modalImgDiv.innerHTML = `
        <img src="${phone.image}" alt="">
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
        <p>GPS: ${phone.others ? phone.others.GPS : "No GPS Found"}</p>
        
    `;
    modalImg.appendChild(modalImgDiv);
     
}


//loadPhones('iphone');