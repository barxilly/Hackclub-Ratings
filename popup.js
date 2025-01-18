console.log("popup.js");
import "./bp.js";

const sir = document.getElementById("sir");
const sirV = document.getElementById("sir-v");

sirV.addEventListener("click", () => {
  sir.click();
});

sir.addEventListener("change", () => {
  browser.storage.local.set({
    showItemRatings: sir.checked,
  });
});

const bott = document.getElementById("bot");
const botV = document.getElementById("bot-v");

botV.addEventListener("click", () => {
  bott.click();
});

bott.addEventListener("change", () => {
  browser.storage.local.set({
    bot: bott.checked,
  });
});

const infoc = document.getElementById("info");
const infoV = document.getElementById("info-v");

infoV.addEventListener("click", () => {
  infoc.click();
});

infoc.addEventListener("change", () => {
  browser.storage.local.set({
    info: infoc.checked,
  });
});

const iw = document.getElementById("iw");
const iwV = document.getElementById("iw-v");

iwV.addEventListener("click", () => {
  iw.click();
});

iw.addEventListener("change", () => {
  browser.storage.local.set({
    itemWorth: iw.checked,
  });
});

const away = document.getElementById("away");
const awayV = document.getElementById("away-v");

awayV.addEventListener("click", () => {
  away.click();
});

away.addEventListener("change", () => {
  browser.storage.local.set({
    hoursAway: away.checked,
  });
});

const styl = document.getElementById("styl");
const stylV = document.getElementById("styl-v");

stylV.addEventListener("click", () => {
  styl.click();
});

styl.addEventListener("change", () => {
  browser.storage.local.set({
    style: styl.checked,
  });
});

const mini = document.getElementById("mini");
const miniV = document.getElementById("mini-v");

miniV.addEventListener("click", () => {
  mini.click();
});

mini.addEventListener("change", () => {
  browser.storage.local.set({
    minimalist: mini.checked,
  });
});

browser.storage.local.get("showItemRatings").then(({ showItemRatings }) => {
  sir.checked = showItemRatings;
});

browser.storage.local.get("bot").then(({ bot }) => {
  bott.checked = bot;
});

browser.storage.local.get("info").then(({ info }) => {
  infoc.checked = info;
});

browser.storage.local.get("itemWorth").then(({ itemWorth }) => {
  iw.checked = itemWorth;
});

browser.storage.local.get("hoursAway").then(({ hoursAway }) => {
  away.checked = hoursAway;
});

browser.storage.local.get("style").then(({ style }) => {
  styl.checked = style;
});

browser.storage.local.get("minimalist").then(({ minimalist }) => {
  mini.checked = minimalist;
});

document.getElementById("sir-s").onclick = () => {
  sirV.click();
};

document.getElementById("bot-s").onclick = () => {
  botV.click();
};

document.getElementById("info-s").onclick = () => {
  infoV.click();
};

document.getElementById("iw-s").onclick = () => {
  iwV.click();
};

document.getElementById("away-s").onclick = () => {
  awayV.click();
};

document.getElementById("styl-s").onclick = () => {
  stylV.click();
};

document.getElementById("mini-s").onclick = () => {
  miniV.click();
};

console.log(await browser.storage.local.get());

const icon = document.getElementById("icon");
icon.addEventListener("change", () => {
  if (icon.value === "") return;
  browser.storage.local.set({
    doubIcon: icon.value,
  });
});
browser.storage.local.get("doubIcon").then(({ doubIcon }) => {
  icon.value = doubIcon || "";
});

const font = document.getElementById("font");
font.addEventListener("change", () => {
  if (font.value === "") return;
  let f = font.value;
  if (font.value.includes("github.com"))
    f = font.value
      .replace("github.com", "raw.githubusercontent.com")
      .replace("blob/", "")
      .replace("raw/", "");
  console.log(f);
  browser.storage.local.set({
    customFont: f,
  });
});

browser.storage.local.get("customFont").then(({ customFont }) => {
  font.value = customFont || "";
});

browser.storage.local.get("projects").then(({ projects }) => {
  projects.forEach((p) => {
    const div = document.createElement("div");
    div.className = "project";
    div.innerHTML = `
            <p>${p.title}</p>
            <p>${p.doubloons}</p>
            <img src="${p.image}" alt="${p.title}" width="100" height="100">
        `;
    document.getElementById("projects").appendChild(div);
  });
});
