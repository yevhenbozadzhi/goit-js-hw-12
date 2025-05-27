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
const per_page = 15;

async function searchImages(reset = false) {
  if (!query) return;

  try {
    showLoader();

    if (reset) {
      currentPage = 1; 
    }

    const images = await getImagesByQuery(query, currentPage);
    hideLoader();

    if (images.total === 0 || images.hits.length === 0) {
      iziToast.warning({
        title: 'Oops!',
        message: 'No images found. Try another word!',
        position: 'topRight',
      });
      clearGallery();
      hideLoadMore(); 
      return;
    }

    if (reset) {
      clearGallery();
    }

    createGallery(images.hits);

    totalPage = Math.ceil(images.totalHits / per_page); 

    if (currentPage < totalPage) {
      showLoadMore();
    } else {
      hideLoadMore();
      iziToast.info({
        title: 'Oops!',
        message: 'We are sorry, but you have reached the end of search results.',
        position: 'topRight',
      });
    }

    if (!reset) {
      const { height } = document
        .querySelector('.gallery')
        .lastElementChild.getBoundingClientRect();

      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    hideLoader();
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
