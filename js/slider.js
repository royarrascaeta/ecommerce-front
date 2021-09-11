//Slider
export function slider(sliderContainer){
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
    e.target.scrollLeft >= e.target.clientWidth - 15
      ? $flechaDer.style.display = "none"
      : $flechaDer.style.display = "block"
    
    e.target.scrollLeft === 0
      ? $flechaIzq.style.display = "none"
      : $flechaIzq.style.display = "block"
  })
  
  //Click flechas
  $sliderContainer.addEventListener("click", (e)=>{
    if(e.target === $flechaIzq){
      $slides.scrollBy({ 
        left: -100,
        behavior: 'smooth' 
      });
    }
  
    if(e.target === $flechaDer){
      $slides.scrollBy({ 
        left: 100,
        behavior: 'smooth' 
      });
    }
  })
}