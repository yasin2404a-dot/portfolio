const root=document.documentElement;
const themeToggle=document.getElementById("themeToggle");
const menuToggle=document.getElementById("menuToggle");
const nav=document.getElementById("nav");

const saved=localStorage.getItem("portfolio-theme");
if(saved==="dark"){root.dataset.theme="dark";themeToggle.textContent="☀️";}

themeToggle.addEventListener("click",()=>{
  const dark=root.dataset.theme==="dark";
  if(dark){delete root.dataset.theme;themeToggle.textContent="🌙";localStorage.setItem("portfolio-theme","light");}
  else{root.dataset.theme="dark";themeToggle.textContent="☀️";localStorage.setItem("portfolio-theme","dark");}
});

menuToggle.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("show");});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const sections=[...document.querySelectorAll("main section")];
const links=[...document.querySelectorAll(".nav a")];
window.addEventListener("scroll",()=>{
  const scrollTop=window.scrollY;
  const docHeight=document.documentElement.scrollHeight-window.innerHeight;
  document.querySelector(".scroll-progress").style.width=(scrollTop/docHeight*100)+"%";
  let current="home";
  sections.forEach(section=>{if(scrollTop>=section.offsetTop-180)current=section.id;});
  links.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+current));
});
