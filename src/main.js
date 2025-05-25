import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const input = form.elements['search-text'];
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let isLoading = false;

async function searchImages(reset = false) {
  if (isLoading) return; 
  const query = currentQuery;

  if (!query) return;

  isLoading = true;
  showLoader();
  loadMoreBtn.style.display = 'none';

  try {
    const images = await getImagesByQuery(query, currentPage);

    if (images.length === 0 && currentPage === 1) {
      iziToast.warning({
        title: 'Oops!',
        message: 'No images found. Try another word!',
        position: 'topRight',
      });
      clearGallery();
      loadMoreBtn.style.display = 'none';
      return;
    }

    if (reset) {
      clearGallery();
    }
    createGallery(images);
    
if (!reset) {
  window.scrollBy({
    top: 400,  
    behavior: 'smooth'
  });
}


    if (images.length >= 15) {
      loadMoreBtn.style.display = 'block'; 
    } else {
      loadMoreBtn.style.display = 'none';
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Something went wrong: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    isLoading = false;
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  currentQuery = input.value.trim();
  if (!currentQuery) return;
  currentPage = 1;
  searchImages(true);
  input.value = '';
});

loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  searchImages(false);
});

