import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMore,
  hideLoadMore,
} from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const input = form.elements['search-text'];
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let query = '';
let totalPage = 0;
let per_page = 15;
// let isLoading = false;

async function searchImages(reset = false) {
  // if (isLoading) return; 
  if (!query) return;

  // isLoading = true;
  try {
    showLoader();
    const images = await getImagesByQuery(query, currentPage);
    hideLoader();
    if (images.total === 0) {
      iziToast.warning({
        title: 'Oops!',
        message: 'No images found. Try another word!',
        position: 'topRight',
      });
      clearGallery();
      return;
    }

    if (reset) {
      clearGallery();
    }
    createGallery(images.hits);


    
    const totalPage = images.total / per_page;
    if (totalPage > currentPage) {
      showLoadMore();
    }
    if (totalPage <= currentPage) {
      hideLoadMore();
      iziToast.info({
        title: 'Oops!',
        message: 'We are sorry, but you have reached the end of search results.',
        position: 'topRight',
      });
      currentPage = 1;
    }

 
    



    
if (!reset) {
  window.scrollBy({
    top: 400,  
    behavior: 'smooth'
  });
}


    // if (images.total >= 15) {
    //   loadMoreBtn.style.display = 'block'; 
    // } else {
    //   loadMoreBtn.style.display = 'none';
    // }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Something went wrong: ${error.message}`,
      position: 'topRight',
    });
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  query = input.value.trim();
  if (!query) return;
  searchImages(true);
  input.value = '';
});

loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  searchImages(false);
});

