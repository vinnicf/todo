(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{w:()=>m});class t{constructor(e){this.name=e,this.id=(new Date).getTime()}}let n=JSON.parse(localStorage.getItem("projects"))||[];function o(){const e=document.querySelector(".sidebar-projects");e.innerHTML="",n.forEach((t=>{const n=document.createElement("div");n.classList.add("sidebar-item"),n.innerHTML=`\n      <i class="fas fa-folder"></i>\n      <p data-project-id="${t.id}">${t.name}</p>\n      <i class="fas fa-times delete-project"></i>`,e.appendChild(n)}))}function c(e="Home"){const t=document.getElementById("projectTitle");t&&(t.textContent=e)}let d=null;const l=document.getElementById("editTaskModal"),s=l.querySelector(".close"),i=l.querySelector("#saveEdit"),a=l.querySelector("#cancelEdit"),r=l.querySelector("#newTaskTitle");s.onclick=function(){l.style.display="none"},window.onclick=function(e){e.target===l&&(l.style.display="none")};class u{constructor(e,t=null){this.title=e,this.projectId=t,this.id=(new Date).getTime()}}let m=JSON.parse(localStorage.getItem("tasks"))||[],p=null;const y=(e=null)=>{const t=document.getElementById("taskList");t.innerHTML="",(e?m.filter((t=>t.projectId==e)):m).forEach((e=>{const n=document.createElement("li");n.textContent=e.title,n.setAttribute("data-id",e.id),t.appendChild(n)}))};document.addEventListener("DOMContentLoaded",(function(){document.querySelector(".add-task-button").addEventListener("click",(function(){this.style.display="none",console.log("Button clicked"),document.querySelector(".add-task-section").style.display="block"})),document.getElementById("addButton").addEventListener("click",(function(){const e=document.getElementById("taskInput"),t=e.value;t&&(function(e,t=null){const n=new u(e,t);m.push(n),localStorage.setItem("tasks",JSON.stringify(m)),p?y(p):y()}(t,p),y(p),e.value=""),document.querySelector(".add-task-section").style.display="none",document.querySelector(".add-task-button").style.display="block"})),document.getElementById("cancelButton").addEventListener("click",(function(){document.querySelector(".add-task-section").style.display="none",document.querySelector(".add-task-button").style.display="block"}))})),document.querySelector(".home-btn").addEventListener("click",(function(e){c("Home"),p=null,y()})),document.querySelector(".sidebar").addEventListener("click",(function(e){const t=e.target.getAttribute("data-project-id");t&&(c(n.find((e=>e.id==t)).name),p=t,y(t))})),d=function(e,t){const n=m.find((t=>t.id===e));n&&(n.title=t,localStorage.setItem("tasks",JSON.stringify(m)),y())},document.addEventListener("DOMContentLoaded",(()=>{c(),y(),o(),document.querySelector(".add-project").addEventListener("click",(function(){this.style.display="none";const e=document.createElement("input");e.type="text",e.placeholder="Enter project name",e.id="new-project-name",e.classList.add("project-input");const c=document.createElement("button");c.innerHTML="Save",c.classList.add("save-project");const d=document.createElement("button");d.innerHTML="Cancel",d.classList.add("cancel-project");const l=document.querySelector(".sidebar");l.appendChild(e),l.appendChild(c),l.appendChild(d),c.addEventListener("click",(()=>{const l=e.value;l&&(function(e){const o=new t(e);n.push(o),localStorage.setItem("projects",JSON.stringify(n))}(l),o(),e.remove(),c.remove(),d.remove(),document.querySelector(".add-project").style.display="flex")})),d.addEventListener("click",(()=>{e.remove(),c.remove(),d.remove(),document.querySelector(".add-project").style.display="flex"}))})),document.querySelector(".sidebar-projects").addEventListener("click",(function(e){e.target.classList.contains("delete-project")&&function(e){if(0===m.filter((t=>t.projectId==e)).length){const t=n.findIndex((t=>t.id===e));t>-1&&(n.splice(t,1),localStorage.setItem("projects",JSON.stringify(n)),o())}else alert("Cannot delete a project that has tasks.")}(parseInt(e.target.previousElementSibling.getAttribute("data-project-id"),10))}))})),document.getElementById("taskList").addEventListener("click",(function(e){const t=parseInt(e.target.getAttribute("data-id"),10),n=e.target.textContent;t&&function(e,t){r.value=t,l.style.display="block",i.onclick=function(){const t=r.value;""!==t.trim()&&(d(e,t),l.style.display="none")},a.onclick=function(){l.style.display="none"}}(t,n)}))})();