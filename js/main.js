
// const searchPokemon = async(name) => {
//     const response = fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
//     const pokemon = await response.json();
//     console.log(pokemon);
// }

const url = `https://pokeapi.co/api/v2/pokemon/`;

const inputField = document.querySelector('#word_input');
const imageDiv = document.querySelector('#image_div');
const pokId = document.querySelector('#pok_id');
const pokName = document.querySelector('#pok_name');
const pokType = document.querySelector('#pok_type');
const pokAbilityName = document.querySelector('#pok_ability_name');
const pokBaseExperience = document.querySelector('#pok_base_experience');
const pokOrder = document.querySelector('#pok_order');
const pokAbility = document.querySelector('#pok_ability');
// const pokHabitat = document.querySelector('#pok_habitat');
const pokFlavor = document.querySelector('#pok_flavor');

const searchPokemon = () => {
    const pokemonName = inputField.value;
    const endpoint = `${url}${pokemonName}`;

    fetch(endpoint, { cache: 'no-cache' }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('La solicitud ha fallado.');

    }, networkError => {
        console.log(networkError.message);

    }).then(jsonResponse => {
        renderResponse(jsonResponse);
    })
}

// Funcion que limpia el contenedor antes de agregar nuevo contenido
const showResults = (event) => {
    event.preventDefault();
    while (responseField.firstChild) {
        responseField.removeChild(responseField.firstChild);
    }
    searchPokemon();
};

// Agregando el event handler al boton de Buscar
inputField.addEventListener('change', searchPokemon);


// Funcion para fetch el ability

const getAbility = (ability) => {
    const endpoint = `https://pokeapi.co/api/v2/ability/${ability}/`;

    let temp = 'Esto';

    fetch(endpoint, { cache: 'no-cache' }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('La solicitud ha fallado.');

    }, networkError => {
        console.log(networkError.message);

    }).then(jsonResponse => {
        renderAbility(jsonResponse);
        // console.log(jsonResponse);
        // temp = jsonResponse.effect_entries[1].short_effect;
        temp = jsonResponse;
    })

    return temp;
}

const renderAbility = (res) => {
    pokAbility.textContent = res.effect_entries[1].short_effect;
    console.log(res);
}

// Funcion para fetch la especie

const getSpecies = (url) => {
    const endpoint = url;

    fetch(endpoint, { cache: 'no-cache' }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('La solicitud ha fallado.');

    }, networkError => {
        console.log(networkError.message);

    }).then(jsonResponse => {
        renderSpecies(jsonResponse);
        // console.log(jsonResponse);
        // temp = jsonResponse.effect_entries[1].short_effect;
    })
}

const renderSpecies = (res) => {
    // pokHabitat.textContent = res.habitat.name;
    pokFlavor.textContent = res.flavor_text_entries[0].flavor_text;
    console.log(res);
}

let images = [];

const renderImage = (img1, img2) => {
    images = [img1, img2];
    let index = 0;

    imageDiv.innerHTML = `<img src=${images[index]}>`

    setInterval(() => {
        if (index === 0) {
            index++;
        } else if (index === 1) {
            index = 0
        }
        imageDiv.innerHTML = `<img src=${images[index]}>`;  
    },4000);
    
}



// Funcion que le da formato a la respuesta para agregarla al HTML
const renderResponse = (res) => {

    console.log(res);
    pokId.textContent = res.id;
    pokName.textContent = res.name;
    pokType.textContent = res.types[0].type.name;
    pokAbilityName.textContent = res.abilities[0].ability.name;
    pokBaseExperience.textContent = res.base_experience;
    pokOrder.textContent = res.order;
    getAbility(res.abilities[0].ability.name);
    getSpecies(res.species.url);
    renderImage(res.sprites.front_default, res.sprites.back_default);

    // console.log(getAbility(res.abilities[0].ability.name));
    // pokAbility.textContent = getAbility(res.abilities[0].ability.name);


    // let definitionList = [];

    // for (let i = 0; i < Math.min(res.length, 5); i++) {
    //     for (let j = 0; j < Math.min(res[i].meanings.length, 5); j++) {
    //         for (let k = 0; k < Math.min(res[i].meanings[j].definitions.length, 3); k++) {
    //             definitionList.push(`<li>(${res[i].meanings[j].partOfSpeech}) ${res[i].meanings[j].definitions[k].definition}</li>`);
    //         }
    //     }
    // }
    
    // definitionList = definitionList.join("");



    // imageDiv.innerHTML = `<img src=${res.sprites.front_default}>`;
    
    return;
    
}