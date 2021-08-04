export function mobileMenu(){
  const $mobileMenuNav = document.querySelector(".mobilemenu nav");
  const $mobileMenuBtn = document.querySelector(".mobilemenu .boton-menu i");


  document.addEventListener("click",(e)=>{
    if(e.target == $mobileMenuBtn){
      $mobileMenuNav.classList.toggle("active");
      $mobileMenuBtn.classList.toggle("rotate");
      $mobileMenuBtn.classList.toggle("fa-times");
    }
  })
}