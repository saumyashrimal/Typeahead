import "./styles.css";
import { fetchFruits, debounce } from "./utils";

const inputBox = document.getElementById("input-box");
const suggestionBox = document.querySelector("#suggestion-wrapper");

const resetState = () => {
  suggestionBox.classList.remove("suggestion-visible");
};

const renderDropdownItems = (list) => {
  const dropdown = document.createDocumentFragment();
  list.forEach((item) => {
    let el = document.createElement("div");
    el.innerHTML = item;
    el.classList.add("dropdown-item");
    dropdown.appendChild(el);
  });
  suggestionBox.innerHTML = "";
  suggestionBox.appendChild(dropdown);
};

const handleSearch = async (query) => {
  console.log("query = ", query);
  let controller = new AbortController();
  let signal = controller.signal;
  let result = await fetchFruits(query, signal);
  controller.abort();
  if (result.length) {
    renderDropdownItems(result);
  } else {
    resetState();
  }
};

const handleInput = (e) => {
  const query = e.target.value;
  if (query) {
    suggestionBox.classList.add("suggestion-visible");
    handleSearch(query);
  } else {
    console.log("inside else of handleInput");
    resetState();
  }
};

(() => {
  inputBox.addEventListener("input", debounce(handleInput, 300));
})();
