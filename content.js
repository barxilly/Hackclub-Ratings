console.log("Extension loaded");

async function starty() {
  if ((await browser.storage.local.get("loadeds")).loadeds) {
    console.log("Extension has been loaded before");
  } else {
    // Set bot and item ratings to true
    await browser.storage.local.set({
      bot: true,
      showItemRatings: true,
      info: true,
      itemWorth: true,
      hoursAway: true,
      style: true,
      doubIcon: "",
      customFont: "",
      minimalist: false,
    });

    // Create overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "3050";
    document.body.appendChild(overlay);
    // Create "form"
    const form = document.createElement("div");
    form.style.position = "fixed";
    form.style.top = "50%";
    form.style.left = "50%";
    form.style.transform = "translate(-50%, -50%)";
    form.style.backgroundColor = "white";
    form.style.padding = "2em";
    form.style.borderRadius = "1em";
    form.style.zIndex = "3100";
    form.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.3)";
    form.style.display = "flex";
    form.style.width = "33em";
    form.style.height = "30em";
    form.style.overflow = "auto";
    form.style.flexDirection = "column";
    form.id = "shipyard-benjs-form";
    document.body.appendChild(form);
    overlay.onclick = function () {
      overlay.remove();
      form.remove();
    };
    // Close button
    const close = document.createElement("button");
    close.innerHTML = "X";
    close.style.position = "absolute";
    close.style.top = "1em";
    close.style.right = "1em";
    close.style.backgroundColor = "white";
    close.style.border = "none";
    close.style.borderRadius = "50%";
    close.style.width = "2em";
    close.style.height = "2em";
    close.style.cursor = "pointer";
    close.onclick = function () {
      overlay.remove();
      form.remove();
    };
    form.appendChild(close);
    // Title
    const title = document.createElement("h1");
    title.style.textAlign = "center";
    title.style.width = "100%";
    title.style.fontSize = "2em";
    title.style.userSelect = "none";
    title.innerHTML = "Thanks for installing!";
    form.appendChild(title);
    // Text
    const t1 = document.createElement("p");
    t1.innerHTML = `Thanks for installing my extension! I hope you enjoy. There are a few features that I've included here.`;
    form.appendChild(t1);
    const t2 = document.createElement("p");
    t2.innerHTML = `On the Shipyard page:`;
    form.appendChild(t2);
    const t3 = document.createElement("p");
    t3.innerHTML = `&nbsp;&nbsp;- You can click the bot icon in the bottom left to generate ideas for projects.`;
    form.appendChild(t3);
    const t4 = document.createElement("p");
    t4.innerHTML = `&nbsp;&nbsp;- You can see your average ratings and doubloons per hour at the top of the page.`;
    form.appendChild(t4);
    const t5 = document.createElement("p");
    t5.innerHTML = `&nbsp;&nbsp;- You can see how each project was rated.`;
    form.appendChild(t5);
    const t6 = document.createElement("p");
    t6.innerHTML = `In the shop:`;
    form.appendChild(t6);
    const t7 = document.createElement("p");
    t7.innerHTML = `&nbsp;&nbsp;- You can see how many hours it will take to get a certain item.`;
    form.appendChild(t7);
    const t8 = document.createElement("p");
    t8.innerHTML = `&nbsp;&nbsp;- You can see how many hours away you are from getting a certain item.`;
    form.appendChild(t8);
    const t9 = document.createElement("p");
    t9.innerHTML = `I hope you enjoy the extension! Any issues or feedback, ping me @Barxilly on the Slack.`;
    form.appendChild(t9);
    const t10 = document.createElement("p");
    t10.innerHTML = `If you need to disable/change some features, see the popup.`;
    form.appendChild(t10);

    const ts = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10];
    ts.forEach((t) => {
      t.style.marginTop = "1em";
      t.style.marginBottom = "0em";
      t.style.userSelect = "none";
    });

    await browser.storage.local.set({
      loadeds: true,
    });
  }
}

starty();

async function mini() {
  console.log((await browser.storage.local.get("minimalist")).minimalist);
  if ((await browser.storage.local.get("minimalist")).minimalist === true) {
    const ministyle = document.createElement("style");
    ministyle.innerHTML = `
div.inset-0 {
background-image: none !important;
background-color: #224;
}

* {
border-radius: 0 !important;
}

div.text-center.text-white > div.relative.w-full.px-6.py-4 > svg {
display:none;
}

div.text-center.text-white > div.relative.w-full.px-6.py-4 {
background-color: #335;
}

.enchanted {
font-family: var(--font-main) !important; 
}

div.absolute.flex.items-center.justify-between.top-0.left-0.right-0.h-14.px-2.m-0.sm\:m-2.bg-transparent.z-30.text-white > div:nth-child(1) > a > img {
display:none;
}
`;
    if ((await browser.storage.local.get("customFont")).customFont == "") {
      ministyle.innerHTML += `
body {
--font-main: 'Helvetica', 'Segoe UI', sans-serif !important;
}`;
    }
    document.head.appendChild(ministyle);

    document.querySelector("div > div > a > img").outerHTML = "High Seas";
  }
  if ((await browser.storage.local.get("customFont")).customFont != "") {
    const fontstyle = document.createElement("style");
    fontstyle.innerHTML = `
body {
--font-main: 'custo' !important;
}

@font-face {
font-family: 'custo';
src: url('${(await browser.storage.local.get("customFont")).customFont}') format('truetype');
}
`;
    document.head.appendChild(fontstyle);
  }
}
mini();

// Shipyard
setInterval(async function () {
  var elements = document.querySelectorAll("[id^='shipped-ship-']");
  if (elements.length === 0) {
    return;
  }
  const doubloons = [];
  const projects = [];
  const times = [];
  const gringles = document.querySelectorAll(".gringle");
  if (gringles.length > 0 || elements.length === 0) {
    return;
  }
  elements.forEach(async function (element) {
    const time = element
      .querySelector("div > div.flex-grow > div > span:nth-child(1)")
      .querySelector("span")
      .innerText.split(" hr")[0];
    const doubs = element
      .querySelector("div > div.flex-grow > div > span:nth-child(2)")
      .querySelector("span")
      .innerText.split(" Doubloon")[0];
    const name = element.querySelector(".text-xl.font-semibold").innerText;
    console.log(time, doubs);
    if (doubs.includes("Pending") || doubs.includes("other")) {
      /*let potentialMax = (time * 25).toFixed(0);
                                  console.log((await browser.storage.local.get("blessing")).blessing)
                                  console.log((await browser.storage.local.get("curse")).curse)
                                  if ((await browser.storage.local.get("blessing")).blessing) {
                                  potentialMax *= 1.2
                                  } else if ((await browser.storage.local.get("curse")).curse) {
                                  potentialMax *= 0.5
                                  }
                                  console.log(element);
                                  const staged = document.querySelectorAll("[id^='staged-ship-']");
                                  let theone;
                                  staged.forEach(function(stage) {
                                  if (stage.innerHTML.includes(name)) {
                                  theone = stage;
                                  }
                                  })
                                  const butty = theone.querySelector("#ship-ship");
                                  butty.innerHTML = `<img class="iconbadge" src="https://github.com/barxilly/Hackclub-Ratings/blob/main/site/hcrt.png?raw=true" style="width:20px; margin-right: 5px;">Max Reward: ${potentialMax} Doubloons`;
                                  theone.innerHTML = theone.innerHTML.replace("Pending", time + " hrs");*/
      return;
    }
    const timeFloat = parseFloat(time);
    times.push(timeFloat);
    const doubsInt = parseInt(doubs);
    doubloons.push(doubsInt);
    const doubsPerHour = doubsInt / timeFloat;
    const percentage = (doubsPerHour / 25) * 100;
    let fraction = Math.round(percentage / 10);
    // Fraction is a score out of 10
    if (fraction > 10) {
      fraction = 10;
    }

    const containDiv = element.querySelector(".items-start .gap-2");
    const doubsPerSpan = document.createElement("span");
    doubsPerSpan.className =
      "inline-flex items-center gap-1 rounded-full px-2 border text-sm leading-none text-gray-600 bg-gray-50 border-gray-500/10 gringle";
    doubsPerSpan.innerHTML = `<img alt='doubloons' loading='lazy' width='16' height='20' decoding='async' data-nimg='1' src='/_next/static/media/doubloon.fd63888b.svg' style='color: transparent; height: auto;'><span class='inline-block py-1'>${doubsPerHour.toFixed(2)} / hr</span>`;
    const newSpan = document.createElement("span");
    newSpan.className =
      "inline-flex items-center gap-1 rounded-full px-2 border text-sm leading-none text-gray-600 bg-green-350 border-gray-500/10 gringle";
    if (fraction < 4) newSpan.style.backgroundColor = "rgba(255, 50, 50, 0.5)";
    if (fraction >= 4 && fraction < 7)
      newSpan.style.backgroundColor = "rgba(245, 235, 121, 0.5)";
    if (fraction >= 7) newSpan.style.backgroundColor = "rgba(50, 255, 50, 0.5)";
    newSpan.innerHTML =
      `<img class="iconbadge" src="https://github.com/barxilly/Hackclub-Ratings/blob/main/site/hcrt.png?raw=true" style="width:20px;"><span class='inline-block py-1'>` +
      fraction +
      `/10 Rating</span>`;
    if (
      (await browser.storage.local.get("showItemRatings")) &&
      (await browser.storage.local.get("showItemRatings")).showItemRatings
    ) {
      containDiv.appendChild(doubsPerSpan);
      containDiv.appendChild(newSpan);
    } else if (!(await browser.storage.local.get("showItemRatings"))) {
      browser.storage.local.set({
        showItemRatings: true,
      });
    }
    const index = Array.prototype.indexOf.call(elements, element);
    projects.push({
      title: name,
      doubloons: doubsInt,
      rating: fraction,
      time: timeFloat,
      image: element.querySelector(".rounded.w-full.absolute").src,
      doubsPerHour: doubsPerHour,
    });
  });
  const head = document.querySelector(
    " div > div.mt-6 > div.w-full.relative > div",
  );
  const totalDoubs = doubloons.reduce((a, b) => a + b, 0);
  const totalTime = times.reduce((a, b) => a + b, 0);
  const totalDoubsPerHour = totalDoubs / totalTime;
  const totalTimeHours = Math.floor(totalTime);
  // Get shop items
  let mostExpensive = {
    title: "Nothing",
    price: 0,
    hours: 0,
  };
  const shopItems = await browser.storage.local.get("items");
  if (shopItems.items) {
    if (shopItems.items.length > 0) {
      const items = shopItems.items;
      const filteredItems = items.filter((item) => item.price <= totalDoubs);
      mostExpensive = filteredItems.reduce((prev, current) =>
        prev.price > current.price ? prev : current,
      );
    }
  }
  const box = document.createElement("div");
  box.style.backgroundColor = "lightblue";
  box.style.border = "2px solid #33a";
  box.style.borderRadius = "10px";
  box.style.padding = "10px";
  box.style.textAlign = "center";
  box.style.color = "black";
  box.style.userSelect = "none";
  box.innerHTML =
    `
Total:<br>
<span id='' class='inline-flex items-center gap-1 rounded-full px-2 border text-sm leading-none text-gray-600 bg-gray-50 border-gray-500/10 false ' data-sentry-component='Pill' data-sentry-source-file='pill.tsx' style='vertical-align: middle;'>
<img alt='doubloons' loading='lazy' width='16' height='20' decoding='async' data-nimg='1' src='/_next/static/media/doubloon.fd63888b.svg' style='color: transparent; height: auto;'>
<span class='inline-block py-1'>` +
    totalDoubs +
    ` Doubloons</span>
</span>
<span id='' class='inline-flex items-center gap-1 rounded-full px-2 border text-sm leading-none text-gray-600 bg-gray-50 border-gray-500/10 false ' data-sentry-component='Pill' data-sentry-source-file='pill.tsx' style='vertical-align: middle;'>
<img alt='projects' loading='lazy' width='16' height='20' decoding='async' data-nimg='1' src='https://images.emojiterra.com/google/android-12l/512px/26f5.png' style='color: transparent; height: auto;'>
<span class='inline-block py-1'>` +
    elements.length +
    ` Ships</span>
</span>
<span id='' class='inline-flex items-center gap-1 rounded-full px-2 border text-sm leading-none text-gray-600 bg-gray-50 border-gray-500/10 false ' data-sentry-component='Pill' data-sentry-source-file='pill.tsx' style='vertical-align: middle;'>
<svg fill-rule='evenodd' clip-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='1.414' xmlns='http://www.w3.org/2000/svg' aria-label='clock' viewBox='0 0 32 32' preserveAspectRatio='xMidYMid meet' fill='currentColor' width='20' height='20' style='display: inline-block; vertical-align: middle;'><g><path fill-rule='evenodd' clip-rule='evenodd' d='M26 16c0 5.523-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6s10 4.477 10 10zm2 0c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12z'></path><path d='M15.64 17a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1z'></path><path d='M21.702 19.502a1 1 0 0 1-1.366.366l-5.196-3a1 1 0 0 1 1-1.732l5.196 3a1 1 0 0 1 .366 1.366z'></path></g></svg>
<span class='inline-block py-1'>` +
    totalTimeHours +
    ` Hours</span>
</span><br><br>
${
  shopItems.items
    ? `In total you could have bought a:<br>
<div id='couldve' style="justify-content:center;margin-left:30%;padding-bottom:0 !important;transform:translateX(15%) scale(0.95);  width:30%;padding-left:30%; display:flex;flex-direction:column;align-items:center; padding: 1em; background-color: #ededed; border-radius: 10px; border: 2px #ccc solid; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);">
<img src="${mostExpensive?.image}" style="width: 7em;height: 6em; border-radius: 10px;">
<div style="padding: 1em;">
<h3 class='text-xl'>${mostExpensive?.title}</h3>
<span id='' class='inline-flex items-center gap-1 rounded-full px-2 border text-sm leading-none text-gray-600 bg-gray-50 border-gray-500/10 false ' data-sentry-component='Pill' data-sentry-source-file='pill.tsx' style='vertical-align: middle;'>
<img alt='doubloons' loading='lazy' width='16' height='20' decoding='async' data-nimg='1' src='/_next/static/media/doubloon.fd63888b.svg' style='color: transparent; height: auto;'>
<span class='inline-block py-1'>` +
      mostExpensive.price +
      ` Doubloons</span>
</span>
<span id='' class='inline-flex items-center gap-1 rounded-full px-2 border text-sm leading-none text-gray-600 bg-gray-50 border-gray-500/10 false ' data-sentry-component='Pill' data-sentry-source-file='pill.tsx' style='vertical-align: middle;'>
<svg fill-rule='evenodd' clip-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='1.414' xmlns='http://www.w3.org/2000/svg' aria-label='clock' viewBox='0 0 32 32' preserveAspectRatio='xMidYMid meet' fill='currentColor' width='20' height='20' style='display: inline-block; vertical-align: middle;'><g><path fill-rule='evenodd' clip-rule='evenodd' d='M26 16c0 5.523-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6s10 4.477 10 10zm2 0c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12z'></path><path d='M15.64 17a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1z'></path><path d='M21.702 19.502a1 1 0 0 1-1.366.366l-5.196-3a1 1 0 0 1 1-1.732l5.196 3a1 1 0 0 1 .366 1.366z'></path></g></svg>
<span class='inline-block py-1'>` +
      (mostExpensive.hours || 0).toFixed(0) +
      ` Hours</span>
</span>
</div>
</div>`
    : "(Head over to the shop to load more stats)"
}<br>
Average:<br>
<span class='inline-flex items-center gap-1 rounded-full px-2 border text-sm leading-none text-gray-600 bg-gray-50 border-gray-500/10 false ' data-sentry-component='Pill' data-sentry-source-file='pill.tsx' style='vertical-align: middle;'>
<img alt='doubloons' loading='lazy' width='16' height='20' decoding='async' data-nimg='1' src='/_next/static/media/doubloon.fd63888b.svg' style='color: transparent; height: auto;'>
<span class='inline-block py-1'>` +
    totalDoubsPerHour.toFixed(2) +
    ` Doubloons / Hour</span>
</span>
<span class='inline-flex items-center gap-1 rounded-full px-2 border text-sm leading-none text-gray-600 bg-gray-50 border-gray-500/10 false ' data-sentry-component='Pill' data-sentry-source-file='pill.tsx' style='vertical-align: middle;'>
<img alt='doubloons' loading='lazy' width='16' height='20' decoding='async' data-nimg='1' src='/_next/static/media/doubloon.fd63888b.svg' style='color: transparent; height: auto;'>
<span class='inline-block py-1'>` +
    (totalDoubs / elements.length).toFixed(2) +
    ` Doubloons / Project</span>
</span>
<span class='inline-flex items-center gap-1 rounded-full px-2 border text-sm leading-none text-gray-600 bg-gray-50 border-gray-500/10 false ' data-sentry-component='Pill' data-sentry-source-file='pill.tsx' style='vertical-align: middle;'>
<svg fill-rule='evenodd' clip-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='1.414' xmlns='http://www.w3.org/2000/svg' aria-label='clock' viewBox='0 0 32 32' preserveAspectRatio='xMidYMid meet' fill='currentColor' width='20' height='20' style='display: inline-block; vertical-align: middle;'><g><path fill-rule='evenodd' clip-rule='evenodd' d='M26 16c0 5.523-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6s10 4.477 10 10zm2 0c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12z'></path><path d='M15.64 17a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1z'></path><path d='M21.702 19.502a1 1 0 0 1-1.366.366l-5.196-3a1 1 0 0 1 1-1.732l5.196 3a1 1 0 0 1 .366 1.366z'></path></g></svg>
<span class='inline-block py-1'>` +
    (totalTimeHours / elements.length).toFixed(1) +
    ` Hours / Project</span>
</span>
<span class='inline-flex items-center gap-1 rounded-full px-2 border text-sm leading-none text-gray-600 bg-green-350 border-gray-500/10 false boxrate' style='background-color: rgba(245, 235, 121, 0.5); vertical-align: middle;'>
<img class='iconbadge' src='https://github.com/barxilly/Hackclub-Ratings/blob/main/site/hcrt.png?raw=true' style='width:20px;'>
<span class='inline-block py-1'>` +
    ((totalDoubsPerHour / 25) * 10).toFixed(1) +
    `/10 Rating</span>
</span>`;
  const r = ((totalDoubsPerHour / 25) * 10).toFixed(0);
  if (document.body.innerHTML.includes("Average:")) return;
  if (
    (await browser.storage.local.get("info")) &&
    (await browser.storage.local.get("info")).info
  ) {
    const h2 = head.querySelector("h2.text-blue-500");
    head.insertBefore(box, h2);
    document.querySelector(".boxrate").style.backgroundColor =
      r < 4
        ? "rgba(255, 50, 50, 0.5)"
        : r < 7
          ? "rgba(245, 235, 121, 0.5)"
          : "rgba(50, 255, 50, 0.5)";

    // Add FA script to head
    const script = document.createElement("script");
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    h2.style.position = "relative";

    // Create sort button
    const sort = document.createElement("button");
    sort.innerHTML =
      "<img style='width:1em; vertical-align:middle; margin-top:0.15em;' src='https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/sort-result-icon.png' /> <div style='font-size:0.8em;font-family:var(--font-main);margin-left:0.2em;'>Sort</div>";
    sort.style.position = "absolute";
    sort.style.right = "1.3em";
    sort.id = "sortButton";
    sort.style.width = "3.4em";
    sort.style.border = "1px solid #7a7";
    sort.style.borderRadius = "10px";
    sort.style.color = "#000";
    sort.style.padding = "5px";
    sort.style.backgroundColor = "rgb(209 235 218)";
    sort.style.display = "flex";
    sort.style.zIndex = "1000";
    sort.style.transform = "translateY(-80%)";
    sort.style.alignContent = "center";

    h2.appendChild(sort);
    function sorty() {
      console.log("Sorting");
      if (document.getElementById("sortOptions")) {
        console.log("Removing");
        console.log(document.getElementById("sortOptions"));
        document.getElementById("sortOptions").outerHTML = "";
        return;
      }

      // Show sort options
      const sortOptions = document.createElement("div");
      sortOptions.id = "sortOptions";
      sortOptions.style.position = "absolute";
      sortOptions.style.top = "130%";
      sortOptions.style.right = "3.5%";
      sortOptions.style.backgroundColor = "white";
      sortOptions.style.border = "1px solid #ccc";
      sortOptions.style.borderRadius = "10px";
      sortOptions.style.padding = "0.5em";
      sortOptions.style.zIndex = "1000";
      sortOptions.style.fontFamily = "var(--font-main)";
      sortOptions.style.fontSize = "0.8em";
      sortOptions.style.userSelect = "none";
      sortOptions.style.cursor = "pointer";
      const pt = document.createElement("p");
      pt.innerHTML =
        "Sorting removes functionality of projects<br> and is for visual purposes only.";
      pt.style.fontFamily = "var(--font-main)";
      pt.style.fontSize = "0.6em";
      pt.style.color = "#555";
      pt.style.textAlign = "center";
      pt.style.marginTop = "0.5em";
      pt.style.lineHeight = "1.3";

      sortOptions.appendChild(pt);

      function sortProjects(criteria) {
        const sortedProjects = projects.sort(
          (a, b) => b[criteria] - a[criteria],
        );
        let ch = [];
        for (let i = 0; i < sortedProjects.length; i++) {
          let elget;
          for (let j = 0; j < elements.length; j++) {
            if (
              elements[j].querySelector(".text-xl.font-semibold").innerText ===
              sortedProjects[i].title
            ) {
              elget = elements[j];
              break;
            }
          }
          ch.push(elget);
        }

        // Hide the original list
        document.querySelector("div.space-y-4.mt-8").style.display = "none";
        if (document.querySelector("div.space-y-4.mt-8.sorted-list")) {
          document.querySelector("div.space-y-4.mt-8.sorted-list").remove();
        }

        // Create a new container for the sorted list
        let newContainer = document.createElement("div");
        newContainer.className = "space-y-4 mt-8 sorted-list";
        newContainer.id = "sorted-list";
        let newInner =
          document
            .querySelector("div.space-y-4.mt-8")
            .innerHTML.split("</div></h2>")[0] + "</div></h2>";
        console.log(document.querySelectorAll("div.space-y-4.mt-8"));
        ch.forEach((el, i) => {
          newInner += el.outerHTML;
        });
        newContainer.innerHTML = newInner.replace(
          "shipped-ship",
          "sorted-ship",
        );
        while (newContainer.innerHTML.includes("shipped-ship")) {
          newContainer.innerHTML = newContainer.innerHTML.replace(
            "shipped-ship",
            "sorted-ship",
          );
        }

        // Check if the newContainer contains elements with duplicate IDs, if so remove the first one
        let ids = [];
        newContainer.querySelectorAll("[id^='sorted-ship-']").forEach((el) => {
          console.log(el);
          if (ids.includes(el.id)) {
            const bloops = newContainer.getElementsByClassName("bloop");
            console.log(bloops);
            for (let i = 0; i < bloops.length; i++) {
              if (bloops[i].id === el.id) {
                bloops[i].remove();
              }
            }
          } else {
            el.classList.add("bloop");
            ids.push(el.id);
            console.log(ids);
          }
        });

        newContainer
          .querySelectorAll("button.bg-blend-color-burn")
          .forEach((el) => el.remove());

        // Append the new container to the parent element
        document
          .querySelector("div.space-y-4.mt-8")
          .parentElement.appendChild(newContainer);

        // Remove the sort options
        document.querySelectorAll("#sortOptions").forEach((el) => el.remove());

        document
          .querySelectorAll("#sortButton")
          .forEach((el) => (el.onclick = sorty));
      }

      const sortOption1 = document.createElement("div");
      sortOption1.innerHTML = "Sort by Rating";
      sortOption1.style.padding = "0.2em";
      sortOption1.onclick = function () {
        sortProjects("rating");
      };

      const sortOption2 = document.createElement("div");
      sortOption2.innerHTML = "Sort by Doubloons";
      sortOption2.style.padding = "0.2em";
      sortOption2.onclick = function () {
        sortProjects("doubloons");
      };

      const sortOption3 = document.createElement("div");
      sortOption3.innerHTML = "Sort by Time";
      sortOption3.style.padding = "0.2em";
      sortOption3.onclick = function () {
        sortProjects("time");
      };

      const sortOption4 = document.createElement("div");
      sortOption4.innerHTML = "Sort by Doubloons per Hour";
      sortOption4.style.padding = "0.2em";
      sortOption4.onclick = function () {
        sortProjects("doubsPerHour");
      };

      sortOptions.appendChild(sortOption1);
      sortOptions.appendChild(sortOption2);
      sortOptions.appendChild(sortOption3);
      sortOptions.appendChild(sortOption4);

      this.parentElement.appendChild(sortOptions);
    }
    sort.onclick = sorty;
  }
  browser.storage.local.set({
    doubloonsPerHour: totalDoubsPerHour,
    projects: projects,
  });
  if ((await browser.storage.local.get("doubIcon")).doubIcon != "") {
    if (
      !document.body.innerHTML.includes(
        (await browser.storage.local.get("doubIcon")).doubIcon,
      )
    ) {
      document.body.innerHTML = document.body.innerHTML.replace(
        /(\/_next\/static\/media\/doubloon\.[a-zA-Z0-9]{8}\.svg)|(doubloon\.svg)/g,
        (await browser.storage.local.get("doubIcon")).doubIcon,
      );
    }
  }
  Array.from(document.querySelectorAll("*")).find(
    (el) => el.innerHTML.trim() === "Shop",
  ).onclick = function () {
    window.location.href = "/shop";
  };
  Array.from(document.querySelectorAll("*")).find(
    (el) => el.innerHTML.trim() === "Wonderdome",
  ).onclick = function () {
    window.location.href = "/wonderdome";
  };
}, 1500);

// Wonderdome
setInterval(function () {
  if (window.location.href.includes("wonderdome")) {
    /*const l = document.querySelector("#voting-project-left");
        const limage = l.querySelector(".relative.h-48.w-full");
        const ltitle = l.querySelector(".text-indigo-600");
        const lrepolink = l.querySelector("#repository-link");
        const lrepo = lrepolink.querySelector("span");
        const ldemolink = l.querySelector("#live-demo-link");
        const ldemo = ldemolink.querySelector("span");
        const lreadme = l.querySelector("#readme-button");
        const lslacklink = l.querySelector("span.bg-purple-50").parentElement;
        const lslack = lslacklink.querySelector("span");
        const lupdate = l.querySelector(".mt-4") || '';
        const lvote = l.querySelector("#vote-button");
        const lflag = l.querySelector("button.bg-red-100");
        lrepo.querySelector("svg").remove();
        ldemo.querySelector("svg").remove();
        lreadme.querySelector("svg").remove();
        lslack.style.padding = "0";
        lslack.style.paddingLeft = "0.25em";
        const newl = `
        <div class="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl" data-sentry-component="ProjectCard" data-sentry-source-file="project-card.tsx">
        <div style="margin:1em; margin-bottom: 0.3em; border-radius: 10px; border: 2px #ccc solid; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);">
        ${limage.outerHTML}
        </div>
        <div class="p-6" style="padding-bottom: 0em;">
        ${ltitle.outerHTML.replace("<p", "<br><p")}
        </div>
        <div class="flex flex-wrap gap-2" style="margin: 1em;">
        <a href="${lrepolink.href}">
        ${lrepo.outerHTML}
        </a>
        ${lreadme.outerHTML}
        <a href="${ldemolink.href}">
        ${ldemo.outerHTML}
        </a>
        <a href="${lslacklink.href}">
        ${lslack.outerHTML.replace("Chat on Slack","")}
        </a>
        ${lupdate.outerHTML}
        </div>
        </div>
        `
        l.innerHTML = newl;
        const r = document.querySelector("#voting-project-right");*/

    //document.querySelectorAll(".relative.h-48.w-full").forEach(function(element) {
    const all = document.querySelectorAll(".relative.h-48.w-full");
    for (let i = 0; i < all.length; i++) {
      const element = all[i];
      /*element.style.height = "90%";
            element.style.width = "90%";
            element.style.borderRadius = "10px";
            element.style.border = "2px #ccc solid";
            element.style.overflow = "hidden";*/
      if (!element.parentElement.outerHTML.includes("bigbutt"))
        element.outerHTML = `<div class="bigbutt" style="margin:1em; margin-bottom: 0.3em; border-radius: 10px; border: 2px #ccc solid; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);">${element.outerHTML}</div>`;
    }

    if (!document.querySelector(" div > div > header > div > span > span"))
      return;
    if (
      document
        .querySelector(" div > div > header > div > span > span")
        .innerHTML.includes("blessing")
    ) {
      browser.storage.local.set({
        blessing: true,
      });
      console.log("blessing");
    } else if (
      document
        .querySelector(" div > div > header > div > span > span")
        .innerHTML.includes("curse")
    ) {
      browser.storage.local.set({
        curse: true,
      });
      console.log("curse");
    }
  }
}, 100);

// Shop
setInterval(async function () {
  var elements = document.querySelectorAll("[id^='item_']");
  if (elements.length === 0) {
    return;
  }
  var e = document.querySelector("e");
  if (e) {
    return;
  }
  const result = await browser.storage.local.get("doubloonsPerHour");
  const doubloonsPerHour = result.doubloonsPerHour;
  const items = [];
  await Promise.all(
    Array.from(elements).map(async function (element) {
      const price = element
        .querySelector(".text-green-500.font-semibold.flex.items-center")
        .innerText.split(" ")[0];
      const name =
        element.getElementsByClassName("tracking-tight")[0].innerText;
      const priceInt = parseInt(price);
      const hours = priceInt / doubloonsPerHour;
      const span = element.querySelector(".text-xs.text-gray-600");
      if (
        span &&
        (await browser.storage.local.get("itemWorth")) &&
        (await browser.storage.local.get("itemWorth")).itemWorth
      ) {
        span.innerHTML =
          `<div style="display:flex;flex-direction:row;"><img class="iconbadge" src="https://github.com/barxilly/Hackclub-Ratings/blob/main/site/hcrt.png?raw=true" style="width:15px;height:15px;margin-right:2px;">(` +
          hours.toFixed(2) +
          ` hrs worth)</div>`;
      }
      const buttons = element.querySelectorAll("button:disabled");
      if (
        buttons.length === 0 ||
        buttons[0].innerHTML.includes("soon") ||
        buttons[0].innerHTML.includes("stock")
      ) {
        return;
      }
      let curdubs = document
        .querySelector(".right-px.top-2.absolute.text-green-400 span.mr-2")
        .innerText.split(" ")[0];
      curdubs = parseInt(curdubs);
      for (let i = 0; i < buttons.length; i++) {
        let diff = priceInt - curdubs;
        let time = diff / doubloonsPerHour;
        let button = buttons[i];
        if (
          (await browser.storage.local.get("hoursAway")) &&
          (await browser.storage.local.get("hoursAway")).hoursAway
        ) {
          button.innerHTML =
            `<img class="iconbadge" src="https://github.com/barxilly/Hackclub-Ratings/blob/main/site/hcrt.png?raw=true" style="width:20px; margin-right: 5px;">` +
            time.toFixed(0) +
            ` hrs away`;
        }
      }
      console.log({
        title: name,
        price: priceInt,
        hours: hours,
        image: element.querySelector("img.w-full").src,
      });
      items.push({
        title: name,
        price: priceInt,
        hours: hours,
        image: element.querySelector("img.w-full").src,
      });
    }),
  );
  console.log(items);
  browser.storage.local.set({
    items: items,
  });
}, 1300);

// AI
setInterval(async function () {
  const doubloonImages = document.querySelectorAll("img[alt='doubloons']");
  for (let i = 0; i < doubloonImages.length; i++) {
    const doubloonImage = doubloonImages[i];
    doubloonImage.style.aspectRatio = "1/1 !important";
    doubloonImage.style.height = "auto";
  }
  const doubText = document.querySelector(".items-center div p.text-sm");
  let doubloonsUntil = parseInt(
    doubText.innerText.split("doubloons")[0].trim(),
  );
  const doubloonsPerHour = (await browser.storage.local.get("doubloonsPerHour"))
    .doubloonsPerHour;
  const timeUntil = doubloonsUntil / doubloonsPerHour;
  console.log(
    doubText.innerHTML.replace(
      "doubloons",
      "Doubloons (" + timeUntil.toFixed(2) + " hours)",
    ),
  );
  if (
    !doubText.innerHTML
      .replace("doubloons", "Doubloons (" + timeUntil.toFixed(2) + " hours)")
      .includes("NaN")
  )
    doubText.innerHTML = doubText.innerHTML.replace(
      "doubloons",
      "Doubloons (" + timeUntil.toFixed(2) + " hours)",
    );
  const buttont = document.querySelector(".shipyard-benjs-button");
  if (!(await browser.storage.local.get("bot"))) {
    browser.storage.local.set({
      bot: true,
    });
  }
  if (
    window.location.href.includes("shipyard") &&
    !buttont &&
    (await browser.storage.local.get("bot")).bot
  ) {
    const button = document.createElement("button");
    button.classList.add("shipyard-benjs-button");
    button.onclick = async function () {
      function typewriterType(text, speed, element) {
        let i = 0;
        let interval = setInterval(() => {
          if (i === text.length) {
            clearInterval(interval);
            return;
          }
          element.innerHTML += text[i];
          i++;
        }, speed);
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, text.length * speed);
        });
      }
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      overlay.style.zIndex = "3050";
      document.body.appendChild(overlay);
      const form = document.createElement("div");
      form.style.position = "fixed";
      form.style.top = "50%";
      form.style.left = "50%";
      form.style.transform = "translate(-50%, -50%)";
      form.style.backgroundColor = "white";
      form.style.padding = "2em";
      form.style.borderRadius = "1em";
      form.style.zIndex = "3100";
      form.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.3)";
      form.style.display = "flex";
      form.style.width = "33em";
      form.style.height = "30em";
      form.style.overflow = "auto";
      form.style.flexDirection = "column";
      form.id = "shipyard-benjs-form";
      document.body.appendChild(form);
      overlay.onclick = function () {
        overlay.remove();
        form.remove();
      };
      const close = document.createElement("button");
      close.innerHTML = "Close";
      close.style.position = "absolute";
      close.style.top = "1em";
      close.style.right = "1em";
      close.innerHTML = "X";
      close.style.backgroundColor = "white";
      close.style.border = "none";
      close.style.borderRadius = "50%";
      close.style.width = "2em";
      close.style.height = "2em";
      close.style.cursor = "pointer";
      close.onclick = function () {
        overlay.remove();
        form.remove();
      };
      form.appendChild(close);
      const title = document.createElement("h1");
      title.style.textAlign = "center";
      title.style.width = "100%";
      title.style.fontSize = "2em";
      title.style.userSelect = "none";
      form.appendChild(title);
      const t1 = document.createElement("p");
      t1.style.marginTop = "1em";
      t1.style.marginBottom = "1em";
      t1.style.userSelect = "none";
      form.appendChild(t1);
      const s1 = document.createElement("sup");
      s1.style.fontSize = "0.8em";
      s1.style.color = "gray";
      s1.style.marginTop = "0.2em";
      s1.style.userSelect = "none";
      form.appendChild(s1);
      const keyin = document.createElement("input");
      keyin.style.width = "100%";
      keyin.style.height = "2.5em";
      keyin.style.marginTop = "1em";
      keyin.style.marginBottom = "0.3em";
      keyin.style.border = "1px solid black";
      keyin.style.borderRadius = "0.5em";
      keyin.style.padding = "0.5em";
      keyin.style.display = "none";
      keyin.type = "password";
      form.appendChild(keyin);
      const ketinerr = document.createElement("p");
      ketinerr.style.color = "red";
      ketinerr.style.display = "none";
      ketinerr.style.marginTop = "0.3em";
      ketinerr.style.marginBottom = "0.3em";
      ketinerr.style.userSelect = "none";
      form.appendChild(ketinerr);
      const keybut = document.createElement("button");
      keybut.classList.add("shipyard-benjs-keybut");
      keybut.style.width = "100%";
      keybut.style.height = "2.5em";
      keybut.style.marginTop = "0.5em";
      keybut.style.marginBottom = "1em";
      keybut.style.border = "1px solid black";
      keybut.style.borderRadius = "0.5em";
      keybut.style.padding = "0.5em";
      keybut.style.lineHeight = "1";
      keybut.style.backgroundColor = "white";
      keybut.style.cursor = "pointer";
      keybut.style.display = "none";
      keybut.innerHTML = "Submit";
      form.appendChild(keybut);
      keybut.onclick = async function () {
        keybut.innerHTML = `
<img src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif" style="width: 1.5em; height: 1.5em; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
`;
        keybut.disabled = true;
        keybut.style.justifyContent = "center";
        const key = keyin.value;
        const response = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `token ${key}`,
          },
        });
        if (response.status !== 200) {
          ketinerr.innerHTML = "Invalid key";
          ketinerr.style.display = "block";
          keybut.innerHTML = "Submit";
          keybut.disabled = false;
          return;
        }
        const urlai = "https://models.inference.ai.azure.com/chat/completions";
        const modelName = "gpt-4o-mini";
        const responseai = await axios.post(
          urlai,
          {
            messages: [
              {
                role: "system",
                content: "Say hi",
              },
              {
                role: "user",
                content: "hi",
              },
            ],
            temperature: 0.5,
            max_tokens: 1024,
            top_p: 1,
            model: modelName,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${key}`,
            },
          },
        );
        console.log(responseai);
        if (responseai.status !== 200) {
          ketinerr.innerHTML = "You don't have models access";
          ketinerr.style.display = "block";
          keybut.innerHTML = "Submit";
          keybut.disabled = false;
          return;
        }
        keybut.innerHTML = "Success!";
        browser.storage.local.set({
          key: key,
        });
        setTimeout(() => {
          overlay.remove();
          form.remove();
          button.click();
        }, 500);
      };
      await typewriterType("Generate Ideas (GPT-4o)", 1, title);
      const keytest = (await browser.storage.local.get("key")).key;
      console.log(keytest);
      if (!keytest || keytest.length < 9) {
        await typewriterType(
          "First things first, I'll need your GitHub API Key",
          30,
          t1,
        );
        await typewriterType(
          "You'll need GitHub Models Access too. (I'll save this key for later)",
          30,
          s1,
        );
        keyin.style.display = "block";
      } else {
        await typewriterType(
          "You're all set! Click the button to generate ideas",
          30,
          t1,
        );
        keybut.innerHTML = "Generate";
        keybut.onclick = async function () {
          keybut.style.position = "relative";
          keybut.innerHTML = `
<img src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif" style="width: 1.5em; height: 1.5em; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
`;
          keybut.disabled = true;
          keybut.style.justifyContent = "center";
          const projects = await browser.storage.local.get("projects");
          const system = `You are going to be given some projects, how many doubloons they earned, how well they rated, and how long they took to make.
Generate new ideas based on what works well.

Give your answer in the format:
<idea name>: <description of idea>. Work on it for <hours>. I predict it will get a <num>/10 rating.
Give around 10 ideas. Make sure they are new, and not just repeated from the list or updated versions of projects.
`;
          let prompt = "";
          for (let i = 0; i < projects.projects.length; i++) {
            const project = projects.projects[i];
            prompt += `Project ${i + 1}: ${project.title}\nDoubloons: ${project.doubloons}\nRating: ${project.rating}/10\nTime: ${project.time} hours\n\n`;
          }
          const urlai =
            "https://models.inference.ai.azure.com/chat/completions";
          const modelName = "gpt-4o-mini";
          const key = (await browser.storage.local.get("key")).key;
          console.log(key);
          const responseai = await axios.post(
            urlai,
            {
              messages: [
                {
                  role: "system",
                  content: system,
                },
                {
                  role: "user",
                  content: prompt,
                },
              ],
              temperature: 0.5,
              max_tokens: 1024,
              top_p: 1,
              model: modelName,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${key}`,
              },
            },
          );
          console.log(responseai.data.choices[0]);
          keybut.display = "none";
          keybut.style.opacity = 0;
          t1.innerText = "";
          const response = responseai.data.choices[0].message.content;
          let html = response.replace(/\n/g, "<br>");
          html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
          t1.innerHTML = html;
        };
      }
      keybut.style.display = "block";
    };
    button.innerHTML = `
<img class="boticon" src=\"https://www.svgrepo.com/show/310389/bot.svg\" style=\"width: 160%; height: 60%;\">
<img class="iconbadge" src="https://lh3.googleusercontent.com/RhhITLSfPbbqI4rbdtyhTWKsCglCYptrVeKBT0ONGrqUqawj5eMWen2-t-8w_WTSLcyl4kXXB1nUZOvzvNc0uR02Mg=s32" style="width: 25%; height: 25%; position: absolute; top: 2.7em; right: 1em; border-radius: 50%;">
`;
    const spann = document.createElement("span");
    spann.innerHTML = "Generate Ideas (unofficial)";
    button.appendChild(spann);
    document.body.appendChild(button);
    const butstyle = document.createElement("style");
    butstyle.innerHTML = `
.shipyard-benjs-button {
bottom: 20px;
left: 20px;
border: 2px solid red;
}

.shipyard-benjs-button, div.fixed.bottom-3.right-3.cursor-pointer {
width: 5em;
height: 5em;
position: fixed;
z-index: 3000;
background-color: white;
border-radius: 50%;
cursor: pointer;
transition: all 0.2s ease-in-out;
}

.shipyard-benjs-button:hover, div.fixed.bottom-3.right-3.cursor-pointer:hover {
background-color: #f0f0f0;
transform: translateY(-5px);
}

.shipyard-benjs-button * {
transform: rotate(0deg);
transition: all 0.2s ease-in-out;
}
.shipyard-benjs-button:hover *:not(span) {
animation: spin 1s linear infinite;
}
@keyframes spin {
0% {
transform: rotate(0deg);
}
100% {
transform: rotate(360deg);
}
} 
.shipyard-benjs-button span {
display: none;
position: absolute;
top: -5em;
right: 0;
background-color: #f0f0f0;
padding: 0.5em;
border-radius: 0.5em;
box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
z-index: 2000;
font-size: 0.8em;
}
.shipyard-benjs-button:hover span {
display: block;
}
.shipyard-benjs-keybut {
transition: all 0.2s ease-in-out;
}
.shipyard-benjs-keybut:hover {
background-color: #f0f0f0;
transform: translateY(-2px);
box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
.shipyard-benjs-keybut:disabled {
cursor: not-allowed;
background-color: #eeeeee !important;
box-shadow: 0;
}
.shipyard-benjs-keybut:disabled:hover {
transform: none;
box-shadow: 0;
}
/* Scrollbar */
#shipyard-benjs-form::-webkit-scrollbar {
border-radius: 0.3em;
width: 1em;
}
#shipyard-benjs-form::-webkit-scrollbar-thumb {
background-color: #888;
border-radius: 0.3em;
}
#shipyard-benjs-form::-webkit-scrollbar-thumb:hover {
background-color: #555;
}
`;
    document.head.appendChild(butstyle);
    const genistyle = document.createElement("style");
    genistyle.innerHTML = `
div > div.mt-6 > button {
background-color: #007bff;
color: #fff;
font-family:var(--main-font);
font-size: 1.25rem !important;
}

div > div.mt-6 > button:hover {
background-color: #0056b3;
color: #fff;
transition: all 0.3s ease-in-out;
animation: gi 0.3s ease-in-out;
}

@keyframes gi {
0% {
transform: scale(1);
box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
border-color: #0056b3;
background-color: #0056b3;
}   

100% {
transform: scale(0.95);
box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
border-color: #0056b3;
background-color: #0056b3;
color: #fff;
}  
}

body {
overflow-x: hidden;
}

[id^='shipped-ship-'] > div {
transform: scale(0.97);
transition: all 0.1s ease-in-out;
}

[id^='shipped-ship-'] > div:hover{
transform: scale(1);
box-shadow: 0 0 10px #fff !important;
}
#couldve:hover {
transform: scale(1) translateX(15%) !important;
box-shadow: 0 0 20px #333 !important;
}
`;
    if ((await browser.storage.local.get("style")).style) {
      document.head.appendChild(genistyle);
    }
    if (buttont) {
      buttont.remove();
    }
  }
}, 100);
