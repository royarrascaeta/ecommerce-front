export function mobileMenu(){
  const $menu = document.querySelector(".menu");
  const $mobileMenuBtn = document.querySelector(".boton-menu i");


  document.addEventListener("click",(e)=>{
    if(e.target == $mobileMenuBtn){
      console.log("CLick en boton")

      $menu.classList.toggle("active");
      $mobileMenuBtn.classList.toggle("rotate");
      $mobileMenuBtn.classList.toggle("fa-times");
    }
  })
}