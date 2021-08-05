export function modal(){
  const $modal = document.querySelector(".modal");
  const $btnModal = document.querySelector("header a[href='#micarrito']");
  const $btnModalFloat = document.querySelector(".carrito-float > *")
  const $btnCloseModal = document.querySelector(".modal .close > *");

  document.addEventListener("click",e=>{
    if(e.target == $modal || e.target == $btnCloseModal){
      $modal.style.display = "none";
    }

    if(e.target == $btnModal || e.target == $btnModalFloat){
      $modal.style.display = "flex";
    }
  })
}