const typeColor = {
    bug:'#26de81',
    dragon:'ffeaa7',
    electric:'#fed330',
    fairy:'#ff0069',
    fighting:'#30336b',
    fire:'#f0932b',
    flying:'#81ecec',
    grass:'#00b894',
    ground:'#efb549',
    ghost:'#7a55eea',
    ice:'#74b9ff',
    normal:'#95afc0',
    poison:'#6c5ce7',
    psychic:'#a29bfe',
    rock:'#2d3436',
    water:'#0190ff'
}
const poke_url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const button = document.getElementById("button");
const image_url =
  "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/";

const get_poke = () => {
  // generate a random number between 1 and 150
  let id = Math.floor(Math.random() * 150) + 1;
  // combine the pokeapi URL with the Pokémon ID
  const setup_url = poke_url + id;
  const setup_img_url = image_url + id + ".svg";
  fetchingdata(setup_url, setup_img_url, id); // Pass the ID to the fetchingdata function
};

button.addEventListener("click", get_poke);
window.addEventListener("load", get_poke);

function fetch_data(url) {
  return new Promise((resolve, reject) => {
    // Use fetch to make the HTTP request
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          // If the response is not ok, reject the promise with an error
          reject(
            new Error(
              `Failed to fetch data (${response.status} ${response.statusText})`
            )
          );
        }
        // Parse the response as JSON
        return response.json();
      })
      .then((data) => {
        // Resolve the promise with the data
        resolve(data);
      })
      .catch((error)=> {
        // Catch any errors and reject the promise
        reject(error);
      });
  });
}

async function fetchingdata(url, img_url, id) {
  try {
    const response = await fetch_data(url);
    generate_cards(response, img_url, id); // Pass the img_url and id to the generate_cards function
  } catch (error) {
    console.log("An error occurred while fetching data:", error);
  }
}

function generate_cards(data, img_src, id) {
  // get necessary data and assign it to variables
  const hp = data.stats[0].base_stat;
  const poke_name = data.name[0].toUpperCase() + data.name.slice(1);
  const stat_attack = data.stats[1].base_stat;
  const stat_defense = data.stats[2].base_stat;
  const stat_speed = data.stats[5].base_stat;

  // set themecolor based on pokemon type
  // access the typeColor-object
  const theme_color = typeColor[data.types[0].type.name];

  // Check if the image exists and if it doesn't, use the default image
  const img = new Image();
  img.src = img_src;
  img.onerror = function () {
    img.src = "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/1.svg"; // Default image
  };

  img.onload = function () {
    card.innerHTML = `
      <p class="hp">
        <span>HP</span>
        ${hp}
      </p>
      <img src="${img.src}" class="poke-image" alt="${poke_name}">
      <h2 class="poke-name">${poke_name}</h2>
      <div class="types"></div>
      <div class="stats">
        <div>
          <h3>${stat_attack}</h3>
          <p>Attack</p>
        </div>
        <div>
          <h3>${stat_defense}</h3>
          <p>Defense</p>
        </div>
        <div>
          <h3>${stat_speed}</h3>
          <p>Speed</p>
        </div>
      </div>
    `;

    append_types(data.types);
    style_card(theme_color);
  };
}


function append_types(types) {
  types.forEach((item) => {
    let span = document.createElement("span");
    span.textContent = item.type.name;
    document.querySelector(".types").appendChild(span);
  });
}


//change back-ground color
function style_card(color) {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #fff 36%)`;
    card.style.backgroundSize = '100%';
    
    // Set background color for the type spans
    card.querySelectorAll('.types span').forEach(typeSpan => {
      typeSpan.style.backgroundColor = color;
    });
  }
  