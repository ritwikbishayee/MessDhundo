document.addEventListener("DOMContentLoaded", function () {
  const wishlistContainer = document.getElementById("wishlist-container");

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = `<p> Your wishlist is empty! </p>`;
  } else {
    wishlist.forEach((room) => {
      const roomCard = document.createElement("div");
      roomCard.classList.add("room-card");

      roomCard.innerHTML = `
            <div class="wishlist-image">
            <img src="${room.images[0]}" alt="Room Image" class="room-image">
            </div>
            <h3>${room.agency}</h3>
            <p><strong>Type:</strong>${room.type}</p>
            <p><strong>Rate:</strong>${room.rate}</p>
            <button class="view-btn" room-id="${room.id}">View</button>
            <button class="remove-btn" data-id="${room.id}">Remove</button>
            `;

      wishlistContainer.prepend(roomCard);
    });

    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const roomId = this.getAttribute("data-id");
        removeFromWishlist(roomId);
      });
    });
    const viewButtons = document.querySelectorAll(".view-btn");
    viewButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const rid = this.getAttribute("room-id");
        viewRoom(rid);
      });
    });
  }

  function removeFromWishlist(roomId) {
    const updateWishlist = wishlist.filter((room) => room.id !== roomId);
    localStorage.setItem("wishlist", JSON.stringify(updateWishlist));
    window.location.reload();
  }
  function viewRoom(roomID) {
    window.location.href = `room-details.html?id=${roomID}`;
  }
});
