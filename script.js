
// activate airtable object
var Airtable = require("airtable");

var base = new Airtable({ apiKey: "keyDd4ipeCQWl3r7x" }).base(
  "app8mVXPpMc3jUhsk"
);
let contextContainer = document.createElement("div");
contextContainer.classList.add("context-container");


base("Table 1")
  .select({
    // maxRecords: 10,
    // view: "Grid view",
  })
  .eachPage(function page(records, fetchNextPage) {
    records.forEach(function (record) {
      // pull my airtable data
      // each record will have its own div
      let airtableItem = document.createElement("div");
      // add some data specific meta to my new divs for filtering
      airtableItem.classList.add("airtable-item");
      airtableItem.setAttribute("data-mood", record.fields.Mood);

      // create a img tag for my album art
      let albumCover = document.createElement("img");
      albumCover.src = record.fields.AlbumCover[0].url;
      albumCover.classList.add("airtable-image");
      // create a span for my artist name
      let songtitle = document.createElement("h2");
      songtitle.innerHTML = record.fields.SongTitle;

      let songDate = document.createElement("h3");
      songDate.innerHTML = record.fields.Date;

      let songGenre = document.createElement("h4");
      songGenre.innerHTML = record.fields.Genre;

      // appending to div holding each airtable record
      airtableItem.append(albumCover);
      airtableItem.append(songtitle);
        airtableItem.append(songDate);
          airtableItem.append(songGenre);
      // append div to body
      contextContainer.append(airtableItem);
      document.body.append(contextContainer);
      // document.body.append(airtableItem);
    });
  });

// set up a event listener for my empowering button
// listen for user clicker, once it is clicker, serach for divs with data-mood, empowering

// get our button using css ID
// assign a event listener to my button to listen for click
let empoweringFilterBtn = document.getElementById("Empowering");
empoweringFilterBtn.addEventListener("click", function(event){ShowHideFilter(event)});

let romanticFilterBtn = document.getElementById("Romantic");
romanticFilterBtn.addEventListener("click", function(event){ShowHideFilter(event)});

let energeticFilterBtn = document.getElementById("Energetic");
energeticFilterBtn.addEventListener("click", function(event){ShowHideFilter(event)});

let showAllBtn = document.getElementById("ShowAll");
showAllBtn.addEventListener("click", function(event){ShowAll(event)});

function ShowHideFilter(e) {
  console.log("function is working");
  console.log(e.target.id)
  let listofAirtableItems = document.querySelectorAll("div.airtable-item");
  listofAirtableItems.forEach(function SearchFilter(item) {
    item.classList.remove("filter-hide");
    // if div matches the id of the button, show div, otherwise, hide
    if (item.dataset.mood == e.target.id) {
      item.classList.add("filter-show");
    } else {
      item.classList.add("filter-hide");
    }
  });

}

function ShowAll(e) {
  let listofAirtableItems = document.querySelectorAll("div.airtable-item");
  listofAirtableItems.forEach( function ShowAllRecords(item){
    item.classList.remove("filter-hide");
    item.classList.add("filter-show");
  })
}
