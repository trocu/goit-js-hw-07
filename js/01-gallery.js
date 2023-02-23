import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryDiv = document.querySelector(".gallery");
const galleryMarkup = galleryItems
  .map(
    image =>
      `<div class="gallery__item"><a class="gallery__link" href="${image.original}"><img class="gallery__image" src="${image.preview}" data-source="${image.original}" alt="${image.description}"></a></div>`
  )
  .join("");

galleryDiv.insertAdjacentHTML("afterbegin", galleryMarkup);

galleryDiv.addEventListener("click", showModal);
function showModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(
    `
  <img src="${event.target.dataset.source}" width="800" height="600">
  `,
    {
      onClose: instance => {
        galleryDiv.removeEventListener("keydown", keydownListener);
      },
    }
  );
  instance.show();

  const keydownListener = function (event) {
    if (event.code === "Escape") {
      instance.close();
    }
  };
  galleryDiv.addEventListener("keydown", keydownListener);
}

// galleryDiv.addEventListener("keydown", event => {
//   if (event.code === "Escape") {
//     instance.close();
//   }
// });
