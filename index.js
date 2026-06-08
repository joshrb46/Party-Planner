// === State ===
let events = [];
let selectedEvent;

const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2604";
const API = BASE + COHORT;

//try: fetch all events from API + "/events"
//parse the response as JSON
//store result data in events
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

//try: fetch a single event from API +"/events/" + id
//parse the response as JSON
//store result data in selectedEvents
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
// === Components ===

//create a list item element
//If even is the currently selected event:
//mark list item as "selected"
//set list item content to a link showing event.name
//ON click: call getEvent(event.id)
//return list item
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

//create an unordered list element
//For each even in events: create an EventListItem
//place all list items into the unordered list
//return unordered list
function EventList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("events");

  const $events = events.map(EventListItem);
  $ul.replaceChildren(...$events);
  return $ul;
}

//If no event is selected: return text
// "Please select a party to learn more."
//create a section element with: -heading showing event name and id
//date (trimmed to YYYY-MM-DD), location, description
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

//get the #app element
//set its content to: an <h1> heading "Part Planner"
//a main area with two sections: "Upcoming Parties"
//with placeholder for EventList
//"Party Details" with placeholder for EventDetails
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
