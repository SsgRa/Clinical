numberOfBuildings = 2;
person_size = 15;
person_speed = 0.1;
spreadRange = 5;

let persons = [];
let buildings = [];
let data;

let day = 0;
time_speed = 5; // 3 seconds = 1 day

function preload() {
  // Get RKI data from API
  const api_url = "https://api.corona-zahlen.org/germany";
  data = loadJSON(api_url);
}

function setup() {
  createCanvas(500, 500);
  // for plot
  options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  config = {
    type: "line",
    data: plot,
    options: options,
  };
  chart = new Chart(document.getElementById("plot"), config);

  // get input elements
  transmissionrate_span = document.getElementById("transmissionrate_span");
  population_span = document.getElementById("population_span");
  slider_pop = document.getElementById("population");
  slider_r = document.getElementById("transmissionRate");
  start_button = document.getElementById("start_button");

  startSketch();
  console.log(data);

  for (let i = 0; i < numberOfBuildings; i++) {
    buildings[i] = new Building();
    //console.log(buildings[0].y);
  }
}

function startSketch() {
  (day = 0), (population = slider_pop.value);
  transmissionRate = slider_r.value;

  // make healthy population
  for (let i = 0; i < population - 1; i++) {
    persons[i] = new Person(
      i,
      random(width),
      random(height),
      person_size,
      spreadRange,
      "unexposed"
    );
  }

  // make patient 0
  persons[population - 1] = new Person(
    population,
    random(width),
    random(height),
    person_size,
    spreadRange,
    "positive"
  );

  print(day);
  print(population);
  print(transmissionRate);

  chart.data.datasets[0].data = [];
  chart.data.labels = [];
  chart.update();
}

function draw() {
  population_span.textContent = slider_pop.value;
  transmissionrate_span.textContent = slider_r.value;

  //SImulation from here
  background(225);

  // 3 seconds = 1 day
  if (frameCount % (60 * time_speed) == 0) {
    day++;
    positive_count = persons.filter((item) => item.stat == "positive").length;
    immune_count = persons.filter((item) => item.stat == "immune").length;
    addData(chart, day, positive_count, immune_count);
  }
  textSize(16);
  fill(233, 0, 0);
  text(day, 16, height - 16);

  // Update the population of persons
  for (let i = 0; i < population; i++) {
    persons[i].show();
    for (let j = 0; j < numberOfBuildings; j++) {
      buildings_pos = createVector(buildings[j].x, buildings[j].y);
      distance = dist(
        persons[i].position.x,
        persons[i].position.y,
        buildings_pos.x,
        buildings_pos.y
      );
      if (distance < 50) {
        persons[i].move(buildings_pos);
      } else {
        persons[i].move_randomly();
      }
      // update health every day
      if (frameCount % (60 * time_speed) == 0) {
        persons[i].update_force(0.0);
        persons[i].updateHealth();
        //persons[i].move_randomly();
      } 
    }
  }

  // check each person colliding with each other person
  for (let i = 0; i < population; i++) {
    for (let j = 0; j < population; j++) {
      if (
        j != i &&
        collideCircleCircleVector(
          persons[i].position,
          persons[i].spread,
          persons[j].position,
          persons[j].spread
        )
      ) {
        // if collision infect with some rate
        if (random() < transmissionRate - 1) {
          if (persons[i].stat == "positive" || persons[j].stat == "positive") {
            persons[i].stat = "positive";
            persons[j].stat = "positive";
          }
        }
      }
    }
  }
  for (let k = 0; k < numberOfBuildings; k++) {
    buildings[k].show();
    //console.log(createVector(buildings[k].x, buildings[k].y))
  }
  //console.log(createVector(buildings[1].x, buildings[1].y))
  //console.log(persons[1].position)
}
