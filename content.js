console.log("Content script loaded.");
window.addEventListener("load", function() {
    console.log("DOM loaded.");
    setInterval(function() {
        console.log("Setting elements.");
        var elements = document.querySelectorAll("[id^='shipped-ship-']");
        if (elements.length === 0) {
            return;
        }
        const doubloons = []
        const projects = []
        const times = []
        const gringles = document.querySelectorAll(".gringle");
        if (gringles.length > 0) {
            return;
        }
        elements.forEach(function(element) {
            const time = element.querySelector(".bg-gray-50").querySelector("span").innerText.split(" hr")[0];
            console.log(time);
            const doubs = element.querySelector(".bg-green-50").querySelector("span").innerText.split(" Doubloon")[0];
            console.log(doubs);
            const timeFloat = parseFloat(time);
            times.push(timeFloat);
            const doubsInt = parseInt(doubs);
            doubloons.push(doubsInt);
            const doubsPerHour = doubsInt / timeFloat;
            const percentage = (doubsPerHour / 25) * 100;
            let fraction = Math.round(percentage / 10);
            if (fraction > 10) {
                fraction = 10;
            }
            const containDiv = element.querySelector(".items-start .gap-2");
            const newSpan = document.createElement("span");
            newSpan.className = "inline-flex items-center gap-1 rounded-full px-2 border text-sm leading-none text-gray-600 bg-gray-50 border-gray-500/10 gringle";
            newSpan.innerHTML = `<img class="iconbadge" src="https://lh3.googleusercontent.com/RhhITLSfPbbqI4rbdtyhTWKsCglCYptrVeKBT0ONGrqUqawj5eMWen2-t-8w_WTSLcyl4kXXB1nUZOvzvNc0uR02Mg=s32" style="width:15px;"><span class='inline-block py-1'>` + fraction + `/10</span>`;
            containDiv.appendChild(newSpan);

            const index = Array.prototype.indexOf.call(elements, element);
            const name = element.querySelector(".text-xl.font-semibold").innerText;
            projects.push({
                title: name,
                doubloons: doubsInt,
                rating: fraction,
                time: timeFloat
            })
            console.log(projects);
        });
        const head = document.querySelector(" div > div.mt-6 > div.w-full.relative > div");
        console.log(head);
        const totalDoubs = doubloons.reduce((a, b) => a + b, 0);
        const totalTime = times.reduce((a, b) => a + b, 0);
        const totalDoubsPerHour = totalDoubs / totalTime;
        const span = document.createElement("span");
        span.className = "font-heading text-xl mb-6 text-center relative w-fit mx-auto";
        span.style.color = "white";
        span.style.marginTop = "5px";
        span.style.textAlign = "center";
        span.style.justifyContent = "center";
        span.style.display = "flex";
        span.style.width = "100%";
        span.innerHTML = "<br>Average: " + totalDoubsPerHour.toFixed(2) + " Doubloons per hour<br>Average Rating: " + (totalDoubsPerHour / 25 * 10).toFixed(0) + "/10";
        if (document.body.innerHTML.includes("Average:")) return;
        head.appendChild(span);
        const h2 = head.querySelectorAll("div")[0];
        head.insertBefore(span, h2);
        browser.storage.local.set({
            doubloonsPerHour: totalDoubsPerHour,
            projects: projects
        });
    }, 1300);
    setInterval(function() {
        var elements = document.querySelectorAll("[id^='item_']");
        if (elements.length === 0) {
            return;
        }
        var e = document.querySelector("e");
        if (e) {
            return;
        }
        browser.storage.local.get("doubloonsPerHour").then((result) => {
            const doubloonsPerHour = result.doubloonsPerHour;
            console.log(doubloonsPerHour);
            elements.forEach(function(element) {
                const price = element.querySelector(".text-green-500.font-semibold.flex.items-center").innerText.split(" ")[0];
                console.log(price);
                const priceInt = parseInt(price);
                const hours = priceInt / doubloonsPerHour;
                const span = element.querySelector(".text-xs.text-gray-600");
                span.innerHTML = "(" + hours.toFixed(2) + " hrs)";
                const buttons = element.querySelectorAll("button:disabled");
                console.log(buttons);
                if (buttons.length === 0 || buttons[0].innerHTML.includes("soon")) {
                    return;
                }
                let curdubs = document.querySelector("body > main > div.rounded-lg.bg-card.text-card-foreground.shadow-sm.bg-blend-color-burn.w-full.max-w-4xl.flex.flex-col.mx-auto.mt-20.overflow-x-hidden.mb-14 > div > div > div.inline-flex.items-center.justify-center.rounded-md.bg-muted.p-1.text-muted-foreground.bg-blend-color-burn.mx-2.my-2.relative.h-16 > div > div:nth-child(1) > div > div > span").innerText.split(" ")[0];
                curdubs = parseInt(curdubs);
                for (let i = 0; i < buttons.length; i++) {
                    let diff = priceInt - curdubs;
                    let time = diff / doubloonsPerHour;
                    let button = buttons[i];
                    button.innerHTML = "" + time.toFixed(0) + " hrs away";
                }
            });
        });
    }, 1300);

    if (window.location.href.includes('shipyard')) {
        console.log("Shipyard page detected.");
        const button = document.createElement("button");
        button.classList.add("shipyard-benjs-button");
        button.onclick = function() {

        }
        button.innerHTML = `
            <img class="boticon" src=\"https://www.svgrepo.com/show/310389/bot.svg\" style=\"width: 160%; height: 60%;\">
            <img class="iconbadge" src="https://lh3.googleusercontent.com/RhhITLSfPbbqI4rbdtyhTWKsCglCYptrVeKBT0ONGrqUqawj5eMWen2-t-8w_WTSLcyl4kXXB1nUZOvzvNc0uR02Mg=s32" style="width: 25%; height: 25%; position: absolute; top: 2.7em; right: 1em; border-radius: 50%;">
        `;
        const spann = document.createElement("span")
        spann.innerHTML = "Generate Ideas (unofficial)"
        button.appendChild(spann);

        document.body.appendChild(button);

        const butstyle = document.createElement("style");
        butstyle.innerHTML = `
        .shipyard-benjs-button {
            width: 5em;
            height: 5em;
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 3000;
            background-color: white;
            border: 1px solid black;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);

        }
        
        .shipyard-benjs-button:hover {
            background-color: #f0f0f0;
            transform: translateY(-5px);
            box-shadow: 0 0 25px rgba(0, 0, 0, 0.4);
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
        `
        document.head.appendChild(butstyle);
    }
});