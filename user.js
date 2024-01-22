var currPage = 1;
function getQueryParameter(name) {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

async function getRepos(url) {
  const response = await fetch(url + "/repos");
  const data = await response.json();
  const paginationLimit = 10;
  const pageCount = Math.ceil(data.length / paginationLimit);
  if (pageCount > 100) {
    pageCount = 100;
  }
  const footer = document.querySelector("#userfooter");
  for (let i = 1; i <= pageCount; i++) {
    let newpage = document.createElement("a");
    newpage.classList.add("pagei");
    newpage.setAttribute("id", "page" + i);
    newpage.addEventListener("click", function () {
      fillUser(data, i);
    });
    newpage.innerHTML = `${i}`;
    footer.appendChild(newpage);
  }
  fillUser(data, 1);
}
var param1 = getQueryParameter("param1");
var param2 = getQueryParameter("param2");
var param3 = getQueryParameter("param3");
var param4 = getQueryParameter("param4");
var param5 = getQueryParameter("param5");
var param6 = getQueryParameter("param6");

const headerhtml = `
     <div class="imgheader">
          <img
            src=${param1}
            alt="default.png"
            id="pic"
          />
        </div>
        <div class="contheader">
          <div><h3 class="repoh">${param2}</h3></div>
          <div><span>Bio:</span><span>${param3}</span></div>
          <div>
            <span><img src="location.svg" alt="" /></span><span>${param4}</span>
          </div>
          <div>
            <span>Twitter:</span><span>${param5}</span>
          </div>
        </div>
    `;

const fillUser = (data, num) => {
  let cardContainer = document.querySelector("#cardBox");
  let pagebutton = document.getElementById("page" + currPage);
  pagebutton.classList.remove("active");
  let pagebutton1 = document.getElementById("page" + num);
  currPage = num;
  pagebutton1.classList.add("active");
  cardContainer.innerHTML = "";
  let start = num * 10 - 10;
  let end = num * 10;
  while (start < end) {
    let topics = data[start].topics;
    console.log(topics);
    var newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = `
    <div class="userinfo">
      <h2 class="repoh">${data[start].name}</h2>
      <p>${data[start].description}</p>
    </div>
    <div id="topic"></div> 
   `;
    cardContainer.appendChild(newCard);
    if (topics.length > 0) {
      let topicCont = document.createElement("div");
      topicCont.classList.add("topic-container");
      typeof topics;
      let end = Math.min(topics.length, 30);
      for (let i = 0; i < end; i++) {
        let topicele = document.createElement("div");
        topicele.classList.add("space");
        topicele.innerHTML = `<span class="badge bg-primary">${topics[i]}</span>`;
        topicCont.appendChild(topicele);
      }
      newCard.appendChild(topicCont);
    }

    start += 1;
  }
};

const header = document.querySelector("#headerid");
header.innerHTML = headerhtml;
getRepos(param6);
