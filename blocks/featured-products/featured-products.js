function createStarContainer() {
    // Create the container for the stars
    const starContainer = document.createElement('div');
    starContainer.classList.add('star-container');

    // Create 5 stars and append them to the star container
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        starContainer.append(star);  // Append each star to the container
    }

    const ratingCount = document.createElement('div');
    ratingCount.innerText = "(0)";
    ratingCount.classList.add('ratingCount');
    starContainer.append(ratingCount);

    // Select all divs within the carousel class
    const carouselDivs = document.querySelectorAll('.carousel > div');

    // Iterate through each div and insert the star container
    carouselDivs.forEach(div => {
        // Find the 3rd and 4th p tags
        const pTags = div.querySelectorAll('p');
        if (pTags.length >= 4) {
            // Insert the star container between the 3rd and 4th p tag
            pTags[2].parentNode.insertBefore(starContainer.cloneNode(true), pTags[3]);
        }
    });
}

// Call the function to execute the code
createStarContainer();

// Create a new div to contain the selected divs
const newContainer = document.createElement('div');
newContainer.classList.add('carousel-container');

// Select all divs within the carousel class
const carouselDivs = document.querySelectorAll('.carousel > div');

// Append all divs from the second one to the new container
for (let i = 1; i < carouselDivs.length; i++) {
    newContainer.appendChild(carouselDivs[i]);
}

// Append the new container to the carousel
document.querySelector('.carousel').appendChild(newContainer);

// ...existing code..
// 



// Iterate through each div
carouselDivs.forEach(div => {
    // Select all button containers within the current div
    const buttonContainers = div.querySelectorAll('.button-container');

    // Check if there is a second button container
    if (buttonContainers.length > 1) {
        // Add a new class to the second button container
        buttonContainers[1].classList.add('add-to-bag-cta');
        buttonContainers[1].classList.remove('button-container');

        // Remove the button class from the a tag inside the div with add-to-bag-cta class
        const aTag = buttonContainers[1].querySelector('a.button');
        if (aTag) {
            aTag.classList.remove('button');
        }
    }
});

let slideIndex = 0;

function moveSlide(step) {
  const slides = document.querySelectorAll('.carousel-container > div');
  const newSlideIndex = slideIndex + step;

  if (newSlideIndex < 0 || newSlideIndex >= slides.length) {
    return; // Prevent looping
  }

  slideIndex = newSlideIndex;
  updateCarousel();
}

function updateCarousel() {
  const slides = document.querySelectorAll('.carousel-container > div');
  const slideWidth = slides[0].clientWidth;
  slides.forEach(slide => {
    slide.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
  });
}

// Create navigation buttons
const prevButton = document.createElement('button');
prevButton.innerHTML = '&#9664;'; // Left arrow
prevButton.classList.add('carousel-nav-button1');
prevButton.addEventListener('click', () => moveSlide(-1));

const nextButton = document.createElement('button');
nextButton.innerHTML = '&#9654;'; // Right arrow
nextButton.classList.add('carousel-nav-button1');
nextButton.addEventListener('click', () => moveSlide(1));

// Add buttons to the DOM
const carouselContainer = document.querySelector('.carousel');
carouselContainer.appendChild(prevButton);
carouselContainer.appendChild(nextButton);
