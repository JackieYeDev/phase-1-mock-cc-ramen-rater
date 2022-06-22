// write your code here
const ramenMenu = document.querySelector('#ramen-menu');
const detailImage = document.querySelector('.detail-image');
const detailName = document.querySelector('.name');
const detailRestaurant = document.querySelector('.restaurant');
const detailRating = document.querySelector('#rating-display');
const detailComment = document.querySelector('#comment-display');
const newRamenForm = document.querySelector('#new-ramen');
const updateRamenForm = document.querySelector('#edit-ramen');
const deleteRamenForm = document.querySelector('#delete-ramen');
const url = "http://localhost:3000/ramens/";

const defaultRamen = {
    "name": "Insert Name Here",
    "restaurant": "Insert Restaurant Here",
    "image": "./assets/image-placeholder.jpg",
    "rating": "Insert rating here",
    "comment": "Insert comment here"
}

let currentRamenID = 1;

document.addEventListener('DOMContentLoaded', () => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            [...data].forEach((ramen) => renderMenuPicture(ramen))
            renderFeatureRamen(data[0]);
        })
        .catch((err) => console.error(err));
    
    newRamenForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const newRamen = {
            "name": data.get('name'),
            "restaurant": data.get('restaurant'),
            "image": data.get('image'),
            "rating": data.get('rating'),
            "comment": data.get('new-comment')
        }
        renderMenuPicture(newRamen);
        fetch(url, POSTConfiguration(newRamen))
            .then(console.log("Successfully added new ramen!"))
            .catch(err => console.error(err));
        
    });
    updateRamenForm.addEventListener('submit', (event)=> {
        event.preventDefault();
        const data = new FormData(event.target);
        const updatedRamenData = {
            "rating": data.get('rating'),
            "comment": data.get('new-comment')
        };
        fetch(url+`${currentRamenID}`, PATCHConfiguration(updatedRamenData))
            .then(response => response.json())
            .then(data => {
                renderMenuPicture(data);
                renderFeatureRamen(data);
            })
            .catch(err => console.error(err))
    });

    deleteRamenForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(url+`${currentRamenID}`)
        fetch(url+`${currentRamenID}`, DELETEConfiguration())
            .then(() => {
                const removeMenuRamen = document.getElementById(`${currentRamenID}`)
                removeMenuRamen.remove();
                renderFeatureRamen(defaultRamen)
            })
            .catch(err => console.error(err))
    })
    
})

const POSTConfiguration = (data) => {
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(data)
    }
}

const PATCHConfiguration = (data) => {
    return {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(data)
    }
}

const DELETEConfiguration = () => {
    return {
        method: "DELETE"
    }
}

const renderMenuPicture = function (ramen) {
    const img = document.createElement('img');
    img.src = `${ramen.image}`;
    img.id = ramen.id;
    img.addEventListener('click', (event) => {
        event.preventDefault;
        renderFeatureRamen(ramen)
    })
    ramenMenu.appendChild(img);   
}

const renderFeatureRamen = (ramen) => {
    detailImage.src = ramen.image;
    detailName.innerText = ramen.name;
    detailRestaurant.innerText = ramen.restaurant;
    detailRating.innerText = ramen.rating;
    detailComment.innerText = ramen.comment;
    currentRamenID = ramen.id;
}