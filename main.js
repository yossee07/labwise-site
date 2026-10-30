// Labwise landing page
// Edit these links in one place. Leave a value empty ("") to show a "coming soon" note instead.
const LINKS = {
  caseStudy: "",   // Behance case study URL, when it's live
  behance: "",     // Behance profile URL
  prototype: "https://www.figma.com/proto/plmRXzH01snEgpTgKuavSi/Labwise?page-id=27%3A2&node-id=113-5550&starting-point-node-id=113%3A5550&scaling=scale-down&content-scaling=fixed",
  portfolio: "https://yosseedesignerportfolio.framer.website",
  x: "https://x.com/yosseedesign"
};

document.documentElement.classList.add("js");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Toast
const toastEl = document.querySelector("[data-toast]");
let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
}

// Links
document.querySelectorAll("[data-link]").forEach((a) => {
  const url = LINKS[a.dataset.link];
  if (url) {
    a.href = url;
  } else {
    a.removeAttribute("target");
    a.addEventListener("click", (e) => {
      e.preventDefault();
      toast(a.dataset.link === "caseStudy" ? "The case study goes live soon." : "Coming soon.");
    });
  }
});

// Store buttons: links go live at launch
document.querySelectorAll("[data-soon]").forEach((a) => {
  a.setAttribute("aria-describedby", "store-note");
  a.addEventListener("click", (e) => {
    e.preventDefault();
    toast(`Labwise isn’t on ${a.dataset.soon} yet. Links go live at launch.`);
  });
});
const note = document.createElement("span");
note.id = "store-note";
note.className = "sr-only";
note.textContent = "Coming soon. Store links go live at launch.";
document.body.appendChild(note);

// Mobile menu
const menuBtn = document.querySelector("[data-menu]");
const nav = document.querySelector(".nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.querySelector(".sr-only").textContent = open ? "Close menu" : "Open menu";
  menuBtn.querySelector("use").setAttribute("href", open ? "#i-close" : "#i-menu");
});
nav.querySelectorAll(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => {
    if (nav.classList.contains("open")) menuBtn.click();
  })
);

// Rotating subject word
const word = document.querySelector("[data-rotator]");
const subjects = [
  { t: "science", bg: "#FFB224", fg: "#0D1020", sh: "#6B4600" },
  { t: "chemistry", bg: "#FF6A3D", fg: "#0D1020", sh: "#3A1E16" },
  { t: "physics", bg: "#2F8CFF", fg: "#0D1020", sh: "#122A4D" },
  { t: "biology", bg: "#1FAE68", fg: "#0D1020", sh: "#0F3322" },
  { t: "engineering", bg: "#8B5CF6", fg: "#FFFFFF", sh: "#261847" }
];
if (word && !reduceMotion) {
  let i = 0;
  setInterval(() => {
    i = (i + 1) % subjects.length;
    word.classList.add("swap");
    setTimeout(() => {
      const s = subjects[i];
      word.textContent = s.t;
      word.style.background = s.bg;
      word.style.color = s.fg;
      word.style.boxShadow = `0 6px 0 ${s.sh}`;
      word.classList.remove("swap");
    }, 250);
  }, 2400);
}

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const sibs = [...en.target.parentElement.children].filter((c) => c.classList.contains("reveal"));
          const idx = Math.max(0, sibs.indexOf(en.target));
          en.target.style.transitionDelay = `${Math.min(idx, 5) * 70}ms`;
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("in"));
}

// FAQ accordion
document.querySelectorAll("[data-accordion] .acc-item").forEach((item) => {
  const btn = item.querySelector("button");
  const panel = item.querySelector(".acc-panel");
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    item.classList.toggle("open", !open);
    panel.hidden = open;
  });
});

// Simple / Scientific toggle in the AI tile
const answers = {
  Simple: "More resistance in the circuit means less current reaches the bulb.",
  Scientific: "V = IR. With the same voltage, a higher resistance means a smaller current, so less energy reaches the bulb each second."
};
document.querySelectorAll(".toggle").forEach((g) => {
  const p = g.parentElement.querySelector("p");
  g.querySelectorAll("button").forEach((b) =>
    b.addEventListener("click", () => {
      g.querySelectorAll("button").forEach((x) => {
        x.classList.toggle("on", x === b);
        x.setAttribute("aria-pressed", String(x === b));
      });
      p.textContent = answers[b.textContent.trim()];
    })
  );
});
