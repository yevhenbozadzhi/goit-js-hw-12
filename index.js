import{a as L,S as w,i as d}from"./assets/vendor-CrlV4O_2.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const S="50383769-6461d4d81fbd57ed3efc96c78",v="https://pixabay.com/api/";async function q(n,o=1){try{return(await L.get(v,{params:{key:S,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}})).data.hits}catch(r){throw r}}const $=new w(".gallery a",{captionsData:"alt",captionDelay:250}),y=document.querySelector(".gallery");document.querySelector(".loader");function O(n){const o=n.map(({webformatURL:r,largeImageURL:a,tags:e,likes:t,views:s,comments:h,downloads:b})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${a}">
        <img class="gallery-image" src="${r}" alt="${e}" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${t}</p>
        <p><b>Views:</b> ${s}</p>
        <p><b>Comments:</b> ${h}</p>
        <p><b>Downloads:</b> ${b}</p>
      </div>
    </li>
  `).join("");y.insertAdjacentHTML("beforeend",o),$.refresh()}function E(){document.querySelector(".loader").style.display="block"}function P(){document.querySelector(".loader").style.display="none"}function f(){y.innerHTML=""}const m=document.querySelector(".form"),p=m.elements["search-text"],i=document.querySelector(".load-more");let l=1,u="",c=!1;async function g(n=!1){if(c)return;const o=u;if(o){c=!0,E(),i.style.display="none";try{const r=await q(o,l);if(r.length===0&&l===1){d.warning({title:"Oops!",message:"No images found. Try another word!",position:"topRight"}),f(),i.style.display="none";return}n&&f(),O(r),n||window.scrollBy({top:400,behavior:"smooth"}),r.length>=15?i.style.display="block":i.style.display="none"}catch(r){d.error({title:"Error",message:`Something went wrong: ${r.message}`,position:"topRight"})}finally{P(),c=!1}}}m.addEventListener("submit",n=>{n.preventDefault(),u=p.value.trim(),u&&(l=1,g(!0),p.value="")});i.addEventListener("click",()=>{l+=1,g(!1)});
//# sourceMappingURL=index.js.map
