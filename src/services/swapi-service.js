class SwapiService {
  _apiBase = "https://swapi.co/api";
  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, recieved ${res.status}`);
    }
    const body = await res.json();
    return body;
  }
  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    return res.results;
  }
  getPerson(id) {
    const res = this.getResource(`/people/${id}`);
    return res;
  }
  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results;
  }
  getPlanet(id) {
    const res = this.getResource(`/planets/${id}`);
    return res;
  }
  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results;
  }
  getStarship(id) {
    const res = this.getResource(`/starships/${id}`);
    return res;
  }
}

const swapi = new SwapiService();
swapi.getAllPeople().then(people => {
  people.forEach(person => {
    console.log("All people", person.name);
  });
});
swapi.getPerson(5).then(person => {
  console.log("Person", person.name);
});
swapi.getAllPlanets().then(planets => {
  planets.forEach(planet => {
    console.log("All planets", planet.name);
  });
});
swapi.getPlanet(5).then(planet => {
  console.log("Planet", planet.name);
});
swapi.getAllStarships().then(starships => {
  starships.forEach(starship => {
    console.log("All starships", starship.name);
  });
});
swapi.getStarship(5).then(starship => {
  console.log("Starship", starship.name);
});

/*
    Using async/await 
*/
// const getResource = async url => {
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw new Error(`Could not fetch ${url}, recieved ${res.status}`);
//   }
//   const body = await res.json();
//   return body;
// };
// getResource("https://swapi.co/api/people/1")
//   .then(body => {
//     console.log(body);
//   })
//   .catch(err => {
//     console.error("Could not fetch", err);
//   });

/*
    Using Fetch API 
*/
// fetch("https://swapi.co/api/people/1")
//   .then(responce => {
//     return responce.json();
//   })
//   .then(data => {
//     console.log(data);
//   });
