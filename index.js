// === State ===
let events = [];
let selectedEvent;

const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2604";
const API = BASE + COHORT;

async function getEvents() {
  try {
    const response = await fetch(API + "/events");
    const result = await response.json();
    events = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

async function getEvent(id) {
  try {
    const response = await fetch(API + "/events/" + id);
    const result = await response.json();
    selectedEvent = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

function EventListItem(event) {
  const $li = document.createElement("li");

  if (event.id === selectedEvent?.id) {
    $li.classList.add("selected");
  }

  $li.innerHTML = `
    <a href="#selected">${event.name}</a>
    `;
  $li.addEventListener("click", () => getEvent(event.id));
  return $li;
}

function EventList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("events");

  const $events = events.map(EventListItem);
  $ul.replaceChildren(...$events);
  return $ul;
}

function EventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  }
  const $event = document.createElement("section");
  $event.innerHTML = `
    <h3>${selectedEvent.name} #${selectedEvent.id}</h3>
    <time datetime="${selectedEvent.date}">
        ${selectedEvent.date.slice(0, 10)}
    </time>
    <address>${selectedEvent.location}</address>
    <p>${selectedEvent.description}</p>
    `;
  return $event;
}

//=== Render ===

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
        <h1>Party Planner</h1>
        <main>
            <section>
                <h2>Upcoming Parties</h2>
                <EventList></EventList>
            </section>
            <section id="selected">
                <h2>Party Details</h2>
                <SelectedEvent></SelectedEvent>
            </section>
        </main>
    `;
  $app.querySelector("EventList").replaceWith(EventList());
  $app.querySelector("SelectedEvent").replaceWith(EventDetails());
}

async function init() {
  await getEvents();
  render();
}

init();
