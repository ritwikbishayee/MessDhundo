// search.js
fetch("data/rooms.json")
  .then((response) => response.json())
  .then((data) => {
    // Populate room cards based on filters
    const searchBtn = document.getElementById("search-btn");
    searchBtn.addEventListener("click", function () {
      const location = document.getElementById("location").value.toLowerCase();
      const roomType = document.getElementById("room-type").value;
      // const beds = parseInt(document.getElementById("beds").value, 10);
      const roomsize = document.getElementById("room-size").value;
      if (location !== "" && roomType !== "" && roomsize !== "") {
        const filteredRooms = data.rooms.filter((room) => {
          return (
            (location === "" ||
              room.location.toLowerCase().includes(location)) &&
            (roomType === "" || room.type === roomType) &&
            (roomsize === "" || room.bhk === roomsize)
          );
        });

        displayRooms(filteredRooms);
      } else {
        confirm("All fields are Mandatory");
      }
    });
  });

function displayRooms(rooms) {
  const roomList = document.getElementById("room-list");
  const seeMoreBtn = document.getElementById("see-more-btn");
  let displayedRooms = 0; // Counter of displayed rooms
  const roomsPerPage = 6; // Number of rooms to show initially and on each click
  roomList.style = "display: grid";
  roomList.innerHTML = "";

  function renderRoomCards(startIndex, endIndex) {
    const roomsToRender = rooms.slice(startIndex, endIndex);
    roomsToRender.forEach((room) => {
      const roomCard = document.createElement("div");
      roomCard.classList.add("room-card");
      roomCard.innerHTML = `
              <div class="image">
              <img src="${room.images[0]}" alt="Room Image">
              </div>
              <div style="padding: 1rem;">
              <h3>${room.type}</h3>
              <p>Rate: ${room.rate}</p>
              <div class="location-detail">
              <div class="location-action">
              <p><img src="/images/icons8-location-50.png" alt="">${room.location}</p>
              <button onclick="viewRoomDetails('${room.id}')">View Details</button>
              </div>
              <div class="detail">
              <ul>
              <li><img src="/images/icons8-bed-50.png" alt=""> ${room.beds}</li>
              <li><img src="/images/icons8-bath-50.png" alt="">${room.bathrooms}</li>
              <li><img src="/images/icons8-car-50.png" alt="">2 parking</li>
              </ul>
              </div>
              </div>
              </div>
          `;
      roomList.appendChild(roomCard);
      seeMoreBtn.style = "display: block";
    });
  }
  // load initial batch of rooms
  renderRoomCards(0, roomsPerPage);
  displayedRooms = roomsPerPage;

  // Handle "See more..." button click
  seeMoreBtn.addEventListener("click", function () {
    const remainingRooms = rooms.length - displayedRooms;

    if (remainingRooms > 0) {
      const nextBatch = Math.min(roomsPerPage, remainingRooms);
      renderRoomCards(displayedRooms, displayedRooms + nextBatch);
      displayedRooms += nextBatch;

      if (displayedRooms >= rooms.length) {
        seeMoreBtn.style.display = "none";
      }
    }
  });
}

function viewRoomDetails(roomId) {
  window.location.href = `room-details.html?id=${roomId}`;
}
