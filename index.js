import{a as h,S as b,i as c}from"./assets/vendor-CrlV4O_2.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const L="50383769-6461d4d81fbd57ed3efc96c78",w="https://pixabay.com/api/";async function S(r,t=1){try{return(await h.get(w,{params:{key:L,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})).data}catch(n){throw n}}const q=new b(".gallery a",{captionsData:"alt",captionDelay:250}),p=document.querySelector(".gallery");document.querySelector(".loader");function v(r){const t=r.map(({webformatURL:n,largeImageURL:i,tags:e,likes:o,views:a,comments:y,downloads:g})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${i}">
        <img class="gallery-image" src="${n}" alt="${e}" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${o}</p>
        <p><b>Views:</b> ${a}</p>
        <p><b>Comments:</b> ${y}</p>
        <p><b>Downloads:</b> ${g}</p>
      </div>
    </li>
  `).join("");p.insertAdjacentHTML("beforeend",t),q.refresh()}function O(){document.querySelector(".loader").style.display="block"}function $(){document.querySelector(".loader").style.display="none"}function u(){p.innerHTML=""}function P(){document.querySelector(".load-more").style.display="block"}function E(){document.querySelector(".load-more").style.display="none"}const f=document.querySelector(".form"),d=f.elements["search-text"],M=document.querySelector(".load-more");let s=1,l="",x=15;async function m(r=!1){if(l)try{O();const t=await S(l,s);if($(),t.total===0){c.warning({title:"Oops!",message:"No images found. Try another word!",position:"topRight"}),u();return}r&&u(),v(t.hits);const n=t.total/x;n>s&&P(),n<=s&&(E(),c.info({title:"Oops!",message:"We are sorry, but you have reached the end of search results.",position:"topRight"}),s=1),r||window.scrollBy({top:400,behavior:"smooth"})}catch(t){c.error({title:"Error",message:`Something went wrong: ${t.message}`,position:"topRight"})}}f.addEventListener("submit",r=>{r.preventDefault(),l=d.value.trim(),l&&(m(!0),d.value="")});M.addEventListener("click",()=>{s+=1,m(!1)});
//# sourceMappingURL=index.js.map
