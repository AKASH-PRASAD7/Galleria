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
const searchicon = document.getElementById("searchicon");

const card = document.querySelector(".card");

//Stores data
let data_arr = [];

const deleteall = () => {
  localStorage.clear();
  data_arr.length = 0;
  tasks.innerHTML = "";
};

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

const update_confirm = (event) => {
  //for changing tick to cross
  event.target.removeAttribute("class");
  event.target.removeAttribute("onclick");
  event.target.setAttribute("class", "fa fa-pencil");
  event.target.setAttribute("id", "update");

  //getting updaated data
  let maindiv = event.target.parentElement.parentElement;
  let id_div = maindiv.id;
  let newtitle = maindiv.children[2].children[1].innerHTML;
  let newtype = maindiv.children[2].children[3].innerHTML;
  let newdesc = maindiv.children[2].children[5].innerHTML;

  // for making input non-updatable and removing addting outline
  maindiv.children[2].children[1].setAttribute("contenteditable", false);
  maindiv.children[2].children[1].removeAttribute("class");
  maindiv.children[2].children[3].setAttribute("contenteditable", false);
  maindiv.children[2].children[3].removeAttribute("class");
  maindiv.children[2].children[5].setAttribute("contenteditable", false);
  maindiv.children[2].children[5].removeAttribute("class");

  //finding element and updating
  let newdata_arr = data_arr.map((each) => {
    if (each.task_id == id_div) {
      each.title = newtitle;
      each.type = newtype;
      each.desc = newdesc;
      return each;
    } else {
      return each;
    }
  });

  // updating localStorage
  data_arr = newdata_arr;
  localStorage.setItem("input_data", JSON.stringify(data_arr));
  loadTasks();
  event.target.setAttribute("onclick", "update_task(event)");
};

// for updating
const update_task = (event) => {
  //for changing cross to tick
  event.target.removeAttribute("class");
  event.target.removeAttribute("onclick");
  event.target.setAttribute("class", "fa fa-check");
  event.target.setAttribute("id", "update_tick");

  // for making input updatable and addting outline
  let maindiv = event.target.parentElement.parentElement;
  maindiv.children[2].children[1].setAttribute("contenteditable", true);
  maindiv.children[2].children[1].setAttribute("class", "outline");
  maindiv.children[2].children[3].setAttribute("contenteditable", true);
  maindiv.children[2].children[3].setAttribute("class", "outline");
  maindiv.children[2].children[5].setAttribute("contenteditable", true);
  maindiv.children[2].children[5].setAttribute("class", "outline");
  event.target.setAttribute("onclick", "update_confirm(event)");
};

//For deleteing tasks
const delete1 = (element) => {
  data_arr = data_arr.filter((each) => each.task_id != element);
  localStorage.setItem("input_data", JSON.stringify(data_arr));
  loadTasks();
  if (data_arr.length == 0) {
    deleteall();
  }
};

//Creating element
const createElement = (input) => {
  const task = document.createElement("div");
  task.classList.add("task_item");

  task.innerHTML = `
    <div id=${input.task_id} class="card">
        <div class="top">
        <i id="update" onclick="update_task(event)"  class="fa fa-pencil"></i>
        <i id="delete1"  onclick="delete1(${
          input.task_id
        })" class="fa fa-trash"></i>
       </div>
        <div class="img">
            ${
              input.url
                ? `<img class="main_image" src="${input.url}" alt="Image">`
                : `<img class="main_image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC7CAMAAACjH4DlAAAAXVBMVEUpMTRnjLEiJiNcfJxrkbgkKSgoLzEmLS5EWWxXdpM0QkxAVGUuOT9kiKslKytSbohPaYJggqM+UF8wO0I6SldIX3Q2RE9LY3oyP0crNDk+UWFWdJA7S1lPaH9jhacMRR/OAAADlElEQVR4nO3c7XKqMBSFYSi4CSCB8CGkKvd/mUfAVoNgHUiPdbuef51aprwDAQLiOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP6NAbiySAT17jVYIZFNloUVZ1cjg2Wu1WJypxLUqUVn87LVaiLbKtxuj46vti+4wwvKmMUjEs9drkaBSv1HDdVX1isOHPA45fIuGHLV89rot8DH8861oIksa0Q6BP569bgucc3gbsmbjMchhb5HIYeCWo9/kly+SVQ4K9GlU3RXLT7M55dBNlXbXHfu6WrqBMMpBTfx1zq6KhT3Y5CAdeZcLmHa37LqDTY5tap5o74sli2ScY8nmwSVHUI0uw/wqWtCDTY56PPNRl/M5Zs9NuOSQ2aiGG4r5s4/oc2ZXYpMjHefw5ictxN7NDpM93jAH6dM6t+nklPn75aAy7H+fTu0vXHLcHFnmdgfKz2Nu0k4cetjkEKMavmimclBwmW0Ob2cGuOSgnWfmULvJv9nGV58pb3YnLjkcKcxpdTG5bezMZDeXemxyUCSSy5mYX01tHAGZI0ySCGn2YJPDISevPZWctF74OTmM5sfxbSpVlcYn+OQ4BZFadNM/x6aYOsaSbt0bbWh8lFMOx9GlOPkstlMf11O3MBOVX/fgleN0HD2ZPt8o5+5uX4+nzHLMIhnP1EhUeVnAu+TQ4Z1HH7LvJTDNMdpf6HNiFL0S7s5/wDMHRdr4udjfreG2mR56sMxBjrfPrzYQEd6v0e0vh/4AwzGHLivfVeXXBhLE9/eUgddfADPMQU3abQ3ZefvQdDMVMqmfHmGYQ59nkVXe/USifuwBsrR74odhju9L/bS7Exf8PG4wzkEkLvcms1LK+NFHLVnmOJinW573aA2OOUgezEmg5PEHT/nloObeqfi75SA5e9X6hjkoEt699X2vHNtov+p5fV45qBHrvr3AKseqUZRfDpmt/WYLrxyPXachB3IgB3Ighwk5DMhhMHOsPO/weeXIkpUyTjkcvV2pvw/BJoez9kuS/UL45LACOQwMcqhSB5boUr1wjuEQmWQitkRk55n3V8zx9UoCi+8kGJanjq/4SgLK10wV3+HlL/k+k039Ozlqi4Pz/xQcbh6cXS05Hl7xZSYdKoTVl5n0w4dY+p3kv6DIhVX5ou/f/hlEtk46Bmve7wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj/wCGXEuzlUGJPAAAAABJRU5ErkJggg==" alt="Image">`
            }
        </div>
        <div class="data">
        <p>TITLE</p>
        <h2 >${input.title}</h2>
        <p>TYPE</p>
        <h2 >${input.type}</h2>
        <p>DESCRIPTION</p>
        <textarea rows="4" cols="50">${input.desc}</textarea>
        </div>


    </div>  
  `;
  tasks.appendChild(task);
};

const loadTasks = () => {
  const localStorage_data = JSON.parse(localStorage.input_data);
  data_arr.length = 0;
  data_arr.push(...localStorage_data);
  tasks.innerHTML = "";
  data_arr.forEach((element) => {
    createElement(element);
  });
};

create_task.addEventListener("click", () => {
  const id = `${Date.now()}`;
  let input = {
    task_id: id,
    url: document.querySelector(".url").value,
    title: document.getElementById("title").value,
    type: document.getElementById("type").value,
    desc: document.getElementById("desc").value,
  };

  data_arr.push(input);
  localStorage.setItem("input_data", JSON.stringify(data_arr));
  loadTasks();

  closePopup();
});

//function to clear search input and change icon
const clearfunc = (element, bool) => {
  if (bool) {
    element.children[0].innerHTML = "search";
    let maindiv1 = element.parentElement;
    maindiv1.children[0].value = "";
    loadTasks();
  } else {
    let maindiv = element.parentElement.parentElement;
    maindiv.children[0].value = "";
    element.innerHTML = "search";
    loadTasks();
  }
};

//searching code
const search = (search_data) => {
  //changing search icon
  let maindiv = search_data.parentElement;
  maindiv.children[1].children[0].innerHTML = "backspace";
  maindiv.children[1].children[0].setAttribute("onclick", "clearfunc(this)");
  maindiv.children[1].setAttribute("onclick", "clearfunc(this,true)");

  //searching
  let copydata = data_arr.filter((each) => {
    if (each.title.toLowerCase().includes(search_data.value.toLowerCase())) {
      return each;
    }
  });
  if (search_data.value == "") {
    maindiv.children[1].children[0].innerHTML = "search";
  }
  if (copydata) {
    tasks.innerHTML = "";
    copydata.forEach((each) => createElement(each));
  }
};
