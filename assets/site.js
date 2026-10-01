(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");
  toggle.hidden = false;
  document.documentElement.classList.add("js");
  const closeMenu = (restoreFocus = false) => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    if (restoreFocus) toggle.focus();
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggle.getAttribute("aria-expanded") === "true"
    )
      closeMenu(true);
  });
  matchMedia("(min-width: 801px)").addEventListener("change", () =>
    closeMenu(),
  );

  const dialog = document.querySelector(".image-dialog");
  const links = Array.from(document.querySelectorAll("[data-gallery]"));
  if (!dialog || !links.length || !dialog.showModal) return;
  let current = 0;
  let opener = null;
  const show = (index) => {
    current = (index + links.length) % links.length;
    document.querySelector("#dialog-image").src = links[current].href;
    document.querySelector("#dialog-image").alt =
      links[current].dataset.caption;
    document.querySelector("#image-caption").textContent =
      `${current + 1} / ${links.length} · ${links[current].dataset.caption}`;
  };
  links.forEach((link, index) =>
    link.addEventListener("click", (event) => {
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      )
        return;
      event.preventDefault();
      opener = link;
      show(index);
      dialog.showModal();
      document.body.classList.add("dialog-open");
    }),
  );
  dialog
    .querySelector("[data-previous]")
    .addEventListener("click", () => show(current - 1));
  dialog
    .querySelector("[data-next]")
    .addEventListener("click", () => show(current + 1));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(current - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      show(current + 1);
    }
  });
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    opener?.focus();
  });
})();
