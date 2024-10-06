// Create load catagories

// *functions
function convertSeconds(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours} hr ${minutes} min ago`;
}
// *functions
const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

const loadDetails = async (videoId) => {
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);
};

const displayDetails = (video) => {
  const detailContainer = document.getElementById("modal-content");
  document.getElementById("showModalData").click();
  console.log(detailContainer);
  detailContainer.innerHTML = `
  <img src=${video.thumbnail} alt="" />

  <p class="py-2"> ${video.description}</p>
  `;
};

const displayCategories = (catagories) => {
  const categoryContainer = document.getElementById("category-container");
  catagories.forEach((item) => {
    // console.log(item);
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn" >
        ${item.category}
      </button>
    `;
    categoryContainer.append(buttonContainer);
  });
};

// *loading vedios
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = ``;

  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="min-h-[300px] flex flex-col justify-center items-center gap-5">
    <img src="./assets/icons.png" alt="" />
    <p class="max-w-[433px] font-bold text-3xl text-center">Oops!! Sorry, There is no content here </p>
    </div>
    
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    // console.log(videos);
    const videoCard = document.createElement("div");
    videoCard.classList = "card card-compact";
    videoCard.innerHTML = `
     <figure class="h-[200px] relative">
     <img class="h-full w-full object-cover"
      src=${video.thumbnail}
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0
          ? ""
          : `<span class="absolute right-2 bottom-2 bg-black rounded p-1 text-white text-xs">
            ${convertSeconds(video.others.posted_date)}
          </span>`
      }
   
     </figure >
     <div class="px-0 py-2 flex gap-3">
       <div> 
          <img class="w-10 h-10 rounded-full object-cover" src=${
            video.authors[0].profile_picture
          } alt="" />
       </div>
       
       <div> 
         <h2 class="font-bold text-base"> ${video.title}  </h2>
         <div class="flex gap-2 items-center">
           <p class="text-sm text-gray-400">${video.authors[0].profile_name}</p>
        ${
          video.authors[0].verified == true
            ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="" /> `
            : ""
        } 


           
         </div>
          <button onclick="loadDetails('${
            video.video_id
          }')" class="btn btn-sm btn-error my-1" >details </button>

       </div>    
  </div>`;
    videoContainer.append(videoCard);
  });
};

// calling functions
loadCatagories();
loadVideos();
