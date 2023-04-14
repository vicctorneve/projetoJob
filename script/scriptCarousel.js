const carouselContainer = document.querySelector('.carousel-container');
let carouselItems = document.querySelectorAll('.containerDay');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
let currentPosition = 0;

const previous = () =>{
   if (currentPosition > 0) {
      currentPosition--;
   } else{
      currentPosition = carouselItems.length - 3
   }
   updateCarouselPosition();
}

const next = () =>{
   if (currentPosition < carouselItems.length - 3) {
      currentPosition++;
   } else{
      currentPosition = 0
   }
   updateCarouselPosition();
}


function updateCarouselPosition() {
   carouselItems = document.querySelectorAll('.containerDay');

   const newPosition = currentPosition * -110;
   carouselItems.forEach(item => {
      item.classList.remove('active');
      item.style.transform = `translateX(${newPosition}%)`;
   });
   carouselItems[currentPosition].classList.add('active');
}