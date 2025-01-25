document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("id");
  const slidesContainer = document.querySelector(".slides");
  const thumbnailsContainer = document.querySelector(".thumbnails");
  const addToWishlistButton = document.getElementById("wishlist-btn");

  let currentIndex = 0;
  let images = [];

  // Fetch room details from JSON
  fetch("data/rooms.json")
    .then((response) => response.json())
    .then((data) => {
      const room = data.rooms.find((r) => r.id === roomId);
      if (room) {
        images = room.images; // Store images
        loadRoomDetails(room);
        createCarousel(images);
        autoSlide();
        addToWishlistButton.addEventListener("click", () => {
          addToWishlist(room);
        });

        // Add Call functionality
        document.getElementById("call-btn").setAttribute("data-phn", room.phn);
        document.getElementById("call-btn").addEventListener("click", () => {
          window.location.href = `tel:${room.phn}`;
        });
      }
    });

  function loadRoomDetails(room) {
    document.getElementById("agency-name").textContent = room.agency;
    document.getElementById("star-rating").textContent = room.rating;
    document.getElementById("room-type").textContent = room.type;
    document.getElementById("room-rate").textContent = room.rate;
    document.getElementById("beds-count").textContent = room.beds;
    document.getElementById("bathroom-count").textContent = room.bathrooms;
    document.getElementById("description").textContent = room.description;
    document.getElementById("map-location").src = room.mapUrl;
    document
      .getElementById("wishlist-btn")
      .setAttribute("data-number", room.id);
  }

  function createCarousel(images) {
    images.forEach((imgSrc, index) => {
      // Add slides
      const slide = document.createElement("div");
      slide.classList.add("slide");
      slide.style.backgroundImage = `url('${imgSrc}')`;
      slidesContainer.appendChild(slide);

      // Add thumbnails
      const thumbnail = document.createElement("img");
      thumbnail.src = imgSrc;
      thumbnailsContainer.appendChild(thumbnail);
      // console.log(index);
      thumbnail.addEventListener("click", () => goToSlide(index));
      thumbnail.classList.add(index === 0 ? "active" : "normal");
    });
  }

  function autoSlide() {
    setInterval(() => {
      nextSlide();
    }, 3500); // Auto-slide every 3 seconds
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    // console.log(currentIndex);
    updateCarousel();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function updateCarousel() {
    const slideWidth = slidesContainer.clientWidth;
    slidesContainer.style.transform = `translateX(-${
      currentIndex * slideWidth
    }px)`;

    // Update active thumbnail
    const thumbnails = document.querySelectorAll(".thumbnails img");
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle("active", index === currentIndex);
    });
  }

  // add to wishlist
  function addToWishlist(room) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!wishlist.some((item) => item.id === room.id)) {
      wishlist.push(room);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Room added to wishlist!");
    } else {
      alert("This room is already in your wishlist!");
    }
  }
});

// Add Whatsapp functionality
document.getElementById("whatsapp-share").addEventListener("click", () => {
  const shareUrl = `https://wa.me/?text=Check%20out%20this%20room!%20${window.location.href}`;
  window.open(shareUrl, "_blank");
});

const chatbtn = document.getElementById("chat-btn");
const chatContainer = document.getElementById("chat-container");
const closeChat = document.getElementById("close-chat");
const chatbox = document.getElementById("chat-box");
const questionBtns = document.querySelectorAll(".question-btn");

// Open Chat
chatbtn.addEventListener("click", () => {
  chatContainer.style = "display: flex;";
  chatbtn.disabled = true;
});

//Close Chat
closeChat.addEventListener("click", () => {
  chatContainer.style = "display: none;";
  chatbtn.disabled = false;
});

questionBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const userMessage = button.textContent;
    const botReply = button.getAttribute("data-reply");

    // Add User Message
    const userDiv = document.createElement("div");
    userDiv.className = "chat-message user-message";
    userDiv.textContent = userMessage;
    chatbox.appendChild(userDiv);

    // Add Bot Message
    const botDiv = document.createElement("div");
    botDiv.className = "chat-message bot-message";
    botDiv.textContent = botReply;
    const botReplyTime = setInterval(() => {
      chatbox.appendChild(botDiv);
      chatbox.scrollTo(0, chatbox.scrollHeight);
      clearInterval(botReplyTime);
    }, 1000);

    //Scroll to bottom
    chatbox.scrollTop = chatbox.scrollHeight;
  });
});
