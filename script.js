const input = document.querySelector(".search-input");
const form = document.querySelector("form");
const imageContainer = document.querySelector(".image-container");
const loadBtn = document.querySelector(".loadBtn");

const acessKey = "LnT6vfAseEtCYxbVqss15o_hpqBslw15unZmVgvJp1w";

let page = 1 ;

// Function to fetch images using unsplash API
const  fetchImages = async (text,pageNo) => {

    try{

    if(pageNo===1){
        imageContainer.innerHTML=""; 
    }

    const url = `https://api.unsplash.com/search/photos?query=${text}&per_page=28&page=${pageNo}&client_id=${acessKey}`; // very important term 

    const response = await fetch(url); 
    const data = await response.json();


    if(data.results && data.results.length > 0){

        data.results.forEach(photo=>{

        // creating image-div 
        const imageElement = document.createElement("div");
        imageElement.classList.add("image-div");
        
        imageElement.innerHTML =`<img src="${photo.urls.regular}"/>`;

        // creating overlay element // 
        const overlayElement = document.createElement('div');
        overlayElement.classList.add("overlay-element");

        // creating overlay text 
        const overlayText = document.createElement('h3');
        overlayText.innerText = `${photo.alt_description}`;

        overlayElement.appendChild(overlayText);

        imageElement.appendChild(overlayElement);
        imageContainer.appendChild(imageElement);

     
    });

    if(data.total_pages === pageNo){
        loadBtn.style.display = "none";
    }else{
        loadBtn.style.display = "block";
    }


    }

    else{
        imageContainer.innerHTML = `<h2>No image found</h2>`;
        if(loadBtn.style.display === "block"){
            loadBtn.style.display = "none";
        }

    }
   
}
catch(error){
    imageContainer.innerHTML = `<h2>Failed to fetch Please try again </h2>`
  } 


}




// Adding event listener 
form.addEventListener("submit",(e)=>{ 
    e.preventDefault(); // stops the form to automatically submit
    const inputText = input.value.trim();
    if(inputText !=""){
        page = 1;
        fetchImages(inputText,page);
    }
    else{
        imageContainer.innerHTML = `<h2>Please Enter a Search Query</h2>`;
        if(loadBtn.style.display === "block"){
            loadBtn.style.display = "none";
        }
    }
});

// Adding function for load more btn 
loadBtn.addEventListener('click',()=>{
    fetchImages(input.value.trim(),++page);
});