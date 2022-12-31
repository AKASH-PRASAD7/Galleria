console.log("Running...");

const btnclose = document.querySelector(".close");
const close = document.querySelector(".add1");
const modal = document.querySelector(".popup");
const btn_crt = document.getElementById("btn_crt");
const taskcontainer = document.querySelector(".task_conatainer");
const image_input = document.getElementById("image_input");
const image_title = document.getElementById("title");
const image_type = document.getElementById("type");
const image_desc = document.getElementById("desc");
const tasks = document.querySelector(".tasks");
const create_task = document.getElementById("task_create");

//for showing create modal
btn_crt.addEventListener("click", () => {
  modal.style.display = "block";
});

const closePopup = () => {
  modal.style.display = "none";
  image_input.value = "";
  image_title.value = "";
  image_type.value = "";
  image_desc.value = "";
};
//for closing modal
close.addEventListener("click", closePopup);
btnclose.addEventListener("click", closePopup);

//Creating element
const createElement = ({ input }) => {
  const task = document.createElement("div");
  task.classList.add("task_item");
  const id = `${Date.now()}`;
  task.innerHTML = `
    <div id=${id} class="card">
        <div class="img">
            ${input.url && `<img src="${input.url}" alt="Image">`}
        </div>
    
        <h2>${input.title}</h2>
        <h2>${input.type}</h2>
        <p>${input.desc}</p>


    </div>  
  `;
  tasks.appendChild(task);
  console.log("task entered");
};

create_task.addEventListener("click", () => {
  console.log("create task clicked");
  const input = {
    url: document.querySelector(".url").value,
    title: document.getElementById("title").value,
    type: document.getElementById("type").value,
    desc: document.getElementById("desc").value,
  };
  createElement({ input });
  closePopup();
});

// const createtask = ({ id, title, desc, type, url }) => {
//   const date = new Date(parseInt(id));
//   return `
//       <div id=${id} class="card">
//           <div class="img">
//               ${url && `<img src="${url}" alt="Image">`}
//           </div>
//           <h2>Created on ${date.toDateString()}</h2>
//           <h2>${title}</h2>
//           <h2>${type}</h2>
//           <p>${desc}</p>

//       </div>
//       `;
// };

// const addtask = (event) => {
//   const id = `${Date.now()}`;
//   const input = {
//     url: document.querySelector(".url").value,
//     title: document.getElementById("title").value,
//     type: document.getElementById("type").value,
//     desc: document.getElementById("desc").value,
//   };
// };
