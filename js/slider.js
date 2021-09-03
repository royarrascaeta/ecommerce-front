//Slider
export function slider(){
  const $productGallery = document.querySelector(".product-gallery"),
  $carrouselContainer = document.querySelector(".carrousel-container");
  const $flechaIzq = $productGallery.querySelector(".flecha-izq > *");
  const $flechaDer = $productGallery.querySelector(".flecha-der > *");
  
  //Aparecer y desaparecer flechas
  $flechaIzq.style.display = "none";
 
  if($carrouselContainer.querySelectorAll("div").length === 1){
    $flechaDer.style.display = "none"
  }
  
  $carrouselContainer.addEventListener("scroll", (e)=>{
    e.target.scrollLeft >= e.target.clientWidth - 15
      ? $flechaDer.style.display = "none"
      : $flechaDer.style.display = "block"
    
    e.target.scrollLeft === 0
      ? $flechaIzq.style.display = "none"
      : $flechaIzq.style.display = "block"
  })
  
  //Click flechas
  $productGallery.addEventListener("click", (e)=>{
    if(e.target === $flechaIzq){
      $carrouselContainer.scrollBy({ 
        left: -100,
        behavior: 'smooth' 
      });
    }
  
    if(e.target === $flechaDer){
      $carrouselContainer.scrollBy({ 
        left: 100,
        behavior: 'smooth' 
      });
    }
  })
}