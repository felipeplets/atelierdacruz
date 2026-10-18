(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
  var box = document.querySelector(".lightbox");
  var image = box.querySelector(".lightbox-image");
  var current = 0;
  var lastFocus = null;

  function show(index) {
    current = (index + links.length) % links.length;
    var link = links[current];
    image.src = link.getAttribute("href");
    image.alt = link.querySelector("img").alt;
  }

  function open(index) {
    lastFocus = document.activeElement;
    show(index);
    box.hidden = false;
    document.body.classList.add("lightbox-open");
    box.querySelector(".lightbox-close").focus();
  }

  function close() {
    box.hidden = true;
    image.removeAttribute("src");
    document.body.classList.remove("lightbox-open");
    if (lastFocus) lastFocus.focus();
  }

  links.forEach(function (link, index) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      open(index);
    });
  });

  box.querySelector(".lightbox-close").addEventListener("click", close);
  box.querySelector(".lightbox-prev").addEventListener("click", function () { show(current - 1); });
  box.querySelector(".lightbox-next").addEventListener("click", function () { show(current + 1); });

  box.addEventListener("click", function (event) {
    if (event.target === box) close();
  });

  document.addEventListener("keydown", function (event) {
    if (box.hidden) return;
    if (event.key === "Escape") close();
    else if (event.key === "ArrowLeft") show(current - 1);
    else if (event.key === "ArrowRight") show(current + 1);
  });
})();
