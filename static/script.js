// document.addEventListener("DOMContentLoaded", function () {
//   const listingsData = [
//     {
//       id: 1,
//       title: "Epic Designs",
//       rating: 4.5,
//       description:
//         "Passionate team of 4 designers working out of Bangalore with an experience of 4 years.",
//       projects: 57,
//       years: 8,
//       price: "$$",
//       contacts: ["+91 - 984532853", "+91 - 984532854"],
//       shortlisted: false,
//     },
//     {
//       id: 2,
//       title: "Creative Solutions",
//       rating: 3.7,
//       description:
//         "Innovative design agency with 10+ years of experience in branding and UI/UX.",
//       projects: 120,
//       years: 10,
//       price: "$$$",
//       contacts: ["+91 - 987654321", "+91 - 987654322"],
//       shortlisted: false,
//     },
//     {
//       id: 3,
//       title: "Pixel Perfect",
//       rating: 5,
//       description:
//         "Specialists in responsive web design and mobile applications.",
//       projects: 89,
//       years: 6,
//       price: "$$",
//       contacts: ["+91 - 876543210"],
//       shortlisted: false,
//     },
//     {
//       id: 4,
//       title: "Design Hub",
//       rating: 2.3,
//       description: "Young and energetic team focused on modern design trends.",
//       projects: 42,
//       years: 3,
//       price: "$",
//       contacts: ["+91 - 765432109"],
//       shortlisted: false,
//     },
//   ];

//   // DOM elements
//   const listingsContainer = document.getElementById("listingsContainer");
//   const shortlistedFilter = document.getElementById("shortlisted");
//   let showOnlyShortlisted = false;
//   let listings = [...listingsData];

//   // Fetch listings from backend API
//   async function fetchListings() {
//     try {
//       const response = await fetch("http://localhost:5000/api/listings");
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return await response.json();
//     } catch (error) {
//       console.error("Error fetching listings:", error);
//       // Fallback to empty array if API fails
//       return [];
//     }
//   } // Fetch listings from backend API
//   async function fetchListings() {
//     try {
//       const response = await fetch("http://localhost:5000/api/listings");
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return await response.json();
//     } catch (error) {
//       console.error("Error fetching listings:", error);
//       // Fallback to empty array if API fails
//       return [];
//     }
//   }

//   // Initialize app
//   async function init() {
//     listings = await fetchListings();
//     renderListings();
//   }

//   // Render all listings
//   function renderListings() {
//     listingsContainer.innerHTML = "";

//     const listingsToRender = showOnlyShortlisted
//       ? listings.filter((listing) => listing.shortlisted)
//       : listings;

//     listingsToRender.forEach((listing) => {
//       const listingCard = document.createElement("div");
//       listingCard.className = `listing-card ${
//         listing.shortlisted ? "shortlisted" : ""
//       }`;
//       listingCard.dataset.id = listing.id;

//       listingCard.innerHTML = `
//         <div class="listing-left">
//           <h2 class="listing-title">${listing.title}</h2>
//           <div class="stars-container" title="${listing.rating.toFixed(
//             1
//           )} out of 5 stars">
//             <div class="stars-background">★★★★★</div>
//             <div class="stars-overlay" style="width: ${
//               (listing.rating / 5) * 100
//             }%">★★★★★</div>
//           </div>
//           <p class="listing-desc">${listing.description}</p>
//           <div class="listing-stats">
//             <div class="stat">
//               <div class="stat-number">${listing.projects}</div>
//               <div class="stat-label">Projects</div>
//             </div>
//             <div class="stat">
//               <div class="stat-number">${listing.years}</div>
//               <div class="stat-label">Years</div>
//             </div>
//             <div class="stat">
//               <div class="stat-number">${listing.price}</div>
//               <div class="stat-label">Price</div>
//             </div>
//           </div>
//           <div class="listing-contact">
//             ${listing.contacts
//               .map((contact) => `<div>${contact}</div>`)
//               .join("")}
//           </div>
//         </div>
//         <div class="listing-actions">
//           <div class="action-item">
//             <img src="assets/details-icon.png" alt="Details" />
//             <span>Details</span>
//           </div>
//           <div class="action-item">
//             <img src="assets/hide-icon.png" alt="Hide" />
//             <span>Hide</span>
//           </div>
//           <div class="action-item shortlist-btn" data-id="${listing.id}">
//             <img src="${
//               listing.shortlisted
//                 ? "assets/shortlist-filled-icon.png"
//                 : "assets/shortlist-icon.png"
//             }" alt="Shortlist" />
//             <span>Shortlist</span>
//           </div>
//           <div class="action-item">
//             <img src="assets/report-icon.png" alt="Report" />
//             <span>Report</span>
//           </div>
//         </div>
//       `;

//       listingsContainer.appendChild(listingCard);
//     });

//     document.querySelectorAll(".shortlist-btn").forEach((btn) => {
//       btn.addEventListener("click", function () {
//         const id = parseInt(this.dataset.id);
//         toggleShortlist(id);
//       });
//     });
//   }

//   function toggleShortlist(id) {
//     const listingIndex = listings.findIndex((listing) => listing.id === id);
//     if (listingIndex !== -1) {
//       listings[listingIndex].shortlisted = !listings[listingIndex].shortlisted;
//       renderListings();
//     }
//   }

//   shortlistedFilter.addEventListener("click", function (e) {
//     e.preventDefault();
//     showOnlyShortlisted = !showOnlyShortlisted;

//     this.classList.toggle("active");

//     const icon = this.querySelector("img");
//     icon.src = showOnlyShortlisted
//       ? "assets/shortlisted-icon.png"
//       : "assets/shortlisted-icon.png";

//     renderListings();
//   });

//   renderListings();
// });

document.addEventListener("DOMContentLoaded", function () {
  const listingsContainer = document.getElementById("listingsContainer");
  const shortlistedFilter = document.getElementById("shortlisted");
  let showOnlyShortlisted = false;
  let listings = [];

  async function fetchListings() {
    try {
      const response = await fetch("http://localhost:5000/api/listings");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching listings:", error);
      return [];
    }
  }

  async function toggleShortlistAPI(id) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/listings/${id}/toggle_shortlist`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update shortlist status");
      }
      return await response.json();
    } catch (error) {
      console.error("Error toggling shortlist:", error);
      return null;
    }
  }

  async function init() {
    listings = await fetchListings();
    renderListings();
  }

  function renderListings() {
    listingsContainer.innerHTML = "";

    const listingsToRender = showOnlyShortlisted
      ? listings.filter((listing) => listing.shortlisted)
      : listings;

    if (listingsToRender.length === 0) {
      listingsContainer.innerHTML = `
        <div class="no-listings">
          ${
            showOnlyShortlisted
              ? "No shortlisted listings found"
              : "No listings available"
          }
        </div>
      `;
      return;
    }

    listingsToRender.forEach((listing) => {
      const listingCard = document.createElement("div");
      listingCard.className = `listing-card ${
        listing.shortlisted ? "shortlisted" : ""
      }`;
      listingCard.dataset.id = listing.id;

      listingCard.innerHTML = `
        <div class="listing-left">
          <h2 class="listing-title">${listing.title}</h2>
          <div class="stars-container" title="${listing.rating.toFixed(
            1
          )} out of 5 stars">
            <div class="stars-background">★★★★★</div>
            <div class="stars-overlay" style="width: ${
              (listing.rating / 5) * 100
            }%">★★★★★</div>
          </div>
          <p class="listing-desc">${listing.description}</p>
          <div class="listing-stats">
            <div class="stat">
              <div class="stat-number">${listing.projects}</div>
              <div class="stat-label">Projects</div>
            </div>
            <div class="stat">
              <div class="stat-number">${listing.years}</div>
              <div class="stat-label">Years</div>
            </div>
            <div class="stat">
              <div class="stat-number">${listing.price}</div>
              <div class="stat-label">Price</div>
            </div>
          </div>
          <div class="listing-contact">
            ${listing.contacts
              .map((contact) => `<div>${contact}</div>`)
              .join("")}
          </div>
        </div>
        <div class="listing-actions">
          <div class="action-item">
            <img src="/static/assets/details-icon.png" alt="Details" />
            <span>Details</span>
          </div>
          <div class="action-item">
            <img src="/static/assets/hide-icon.png" alt="Hide" />
            <span>Hide</span>
          </div>
          <div class="action-item shortlist-btn" data-id="${listing.id}">
            <img src="${
              listing.shortlisted
                ? "/static/assets/shortlist-filled-icon.png"
                : "/static/assets/shortlist-icon.png"
            }" alt="Shortlist" />
            <span>${listing.shortlisted ? "Shortlisted" : "Shortlist"}</span>
          </div>
          <div class="action-item">
            <img src="/static/assets/report-icon.png" alt="Report" />
            <span>Report</span>
          </div>
        </div>
      `;

      listingsContainer.appendChild(listingCard);
    });

    // Add event listeners to all shortlist buttons
    document.querySelectorAll(".shortlist-btn").forEach((btn) => {
      btn.addEventListener("click", async function (e) {
        e.preventDefault();
        const id = parseInt(this.dataset.id);
        const updatedListing = await toggleShortlistAPI(id);

        if (updatedListing) {
          // Update the local listings array
          const listingIndex = listings.findIndex((l) => l.id === id);
          if (listingIndex !== -1) {
            listings[listingIndex] = updatedListing;
          }

          // Update the UI without full re-render
          const card = this.closest(".listing-card");
          const img = this.querySelector("img");
          const text = this.querySelector("span");

          // Toggle classes and content
          card.classList.toggle("shortlisted");
          card.classList.add("shortlisted-animation");

          img.src = updatedListing.shortlisted
            ? "/static/assets/shortlist-filled-icon.png"
            : "/static/assets/shortlist-icon.png";

          text.textContent = updatedListing.shortlisted
            ? "Shortlisted"
            : "Shortlist";

          // Remove animation class after it completes
          setTimeout(() => {
            card.classList.remove("shortlisted-animation");
          }, 300);

          // If in shortlisted-only view and item was un-shortlisted, remove it
          if (showOnlyShortlisted && !updatedListing.shortlisted) {
            card.remove();
          }
        }
      });
    });
  }

  shortlistedFilter.addEventListener("click", function (e) {
    e.preventDefault();
    showOnlyShortlisted = !showOnlyShortlisted;
    this.classList.toggle("active");
    renderListings();
  });

  init();
});
