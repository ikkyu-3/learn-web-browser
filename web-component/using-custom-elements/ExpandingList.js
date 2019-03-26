class ExpandingList extends HTMLUListElement {
  constructor() {
    super();

    window.onload = () => {
      this.setAttribute("class", "ExpandingList");
      for (let i = 0; i < 4; i += 1) {
        const li = document.createElement("li");
        li.textContent = i;
        this.appendChild(li);
      }
    };
  }
}

customElements.define("expanding-list", ExpandingList, { extends: "ul" });
