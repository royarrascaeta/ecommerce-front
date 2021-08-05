export function modal(){
  const $modal = document.querySelector(".modal");
  const $btnModal = document.querySelector("header a[href='#micarrito']");
  const $btnCloseModal = document.querySelector(".modal .close > *");

  document.addEventListener("click",e=>{
    if(e.target == $modal || e.target == $btnCloseModal){
      $modal.style.display = "none";
    }

    if(e.target == $btnModal){
      $modal.style.display = "flex";
    }
  })
}