//Slider
export function slider(sliderContainer, autoPlay){
  const $sliderContainer = document.querySelector(sliderContainer);
  const $slides = $sliderContainer.querySelector(".slides");
  const $flechaIzq = $sliderContainer.querySelector(".flecha-izq > *");
  const $flechaDer = $sliderContainer.querySelector(".flecha-der > *");
  
  //Aparecer y desaparecer flechas
  $flechaIzq.style.display = "none";
 
  if($slides.querySelectorAll("div").length === 1){
    $flechaDer.style.display = "none"
  }
  
  $slides.addEventListener("scroll", (e)=>{
    e.target.scrollLeft + e.target.clientWidth >= e.target.scrollWidth - 15
      ? $flechaDer.style.display = "none"
      : $flechaDer.style.display = "block"
    
    e.target.scrollLeft === 0
      ? $flechaIzq.style.display = "none"
      : $flechaIzq.style.display = "block"
  })
  
  //Click flechas
  $sliderContainer.addEventListener("click", (e)=>{
    if(e.target === $flechaIzq){
      moveRight();
      clearInterval(repeat);
    }
    
    if(e.target === $flechaDer){
      moveLeft();
      clearInterval(repeat);
    }
  })

  //Autoplay
  if(autoPlay){
    var repeat = setInterval(() => {
      if($slides.scrollLeft + $slides.clientWidth >= $slides.scrollWidth - 15){
        $slides.scrollTo({
          left: 100,
          behavior: 'smooth'
        })
      }else{
        moveLeft();
      }
    }, 8000);
  }

  //Funciones movimiento
  function moveLeft(){
    $slides.scrollBy({ 
        left: 100,
        behavior: 'smooth' 
      });
  }

  function moveRight(){
    $slides.scrollBy({ 
        left: -100,
        behavior: 'smooth' 
      });
  }
}