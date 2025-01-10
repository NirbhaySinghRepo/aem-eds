// eslint-disable-next-line import/no-unresolved
import { toClassName } from "../../scripts/aem.js";

export default async function decorate(block) {
  // build tablist
  const tablist = document.createElement("div");
  tablist.className = "tabs-list";
  tablist.setAttribute("role", "tablist");

  // decorate tabs and tabpanels
  const tabs = [...block.children].map((child) => child.firstElementChild);
  tabs.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    // decorate tabpanel
    const tabpanel = block.children[i];
    tabpanel.className = "tabs-panel";
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute("aria-hidden", !!i);
    tabpanel.setAttribute("aria-labelledby", `tab-${id}`);
    tabpanel.setAttribute("role", "tabpanel");

    // build tab button
    const button = document.createElement("button");
    button.className = "tabs-tab";
    button.id = `tab-${id}`;
    button.innerHTML = tab.innerHTML;
    button.setAttribute("aria-controls", `tabpanel-${id}`);
    button.setAttribute("aria-selected", !i);
    button.setAttribute("role", "tab");
    button.setAttribute("type", "button");
    button.addEventListener("click", () => {
      block.querySelectorAll("[role=tabpanel]").forEach((panel) => {
        panel.setAttribute("aria-hidden", true);
      });
      tablist.querySelectorAll("button").forEach((btn) => {
        btn.setAttribute("aria-selected", false);
      });
      tabpanel.setAttribute("aria-hidden", false);
      button.setAttribute("aria-selected", true);
    });
    tablist.append(button);
    tab.remove();
  });

  // Add internal CSS styles for the "Add More" button
  const style = document.createElement("style");
  style.innerHTML = `
    .add-more-button {
      margin-top: 20px;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .add-more-button:hover {
      background-color: #0056b3;
    }
  `;
  document.head.appendChild(style); // Append the style to the head of the document

  // Check if the block is a container before adding the "Add More" button
  if (block.classList.contains("container")) {
    // Create the "Add More" button
    const addButton = document.createElement("button");
    addButton.id = "addButton";
    addButton.innerText = "Add More USP/USP Value Pair";
    addButton.className = "add-more-button";

    // Append the "Add More" button to the block (container component)
    block.appendChild(addButton);

    // Add event listener for the "Add More" button to add more USP/USP Value containers
    addButton.addEventListener("click", function () {
      // Find the first .uspEntry container (the template for USP and USP Value fields)
      const container = document.querySelector(".uspEntry");

      // Check if the container exists before attempting to clone it
      if (container) {
        // Clone the first container and append it to the form (uspForm)
        const newContainer = container.cloneNode(true);

        // Append the cloned container to the uspForm container
        document.getElementById("uspForm").appendChild(newContainer);
      }
    });
  }

  // Prepend tablist to the block
  block.prepend(tablist);

  // Dynamically create USP and USP Value container based on JSON structure
  createUspContainer(block);
}

/**
 * Creates the USP container dynamically based on the tab configuration in the JSON.
 */
function createUspContainer(block) {
  const uspContainer = document.createElement("div");
  uspContainer.className = "usp-container";

  // Create USP fields dynamically based on the JSON fields definition
  const uspFieldContainer = document.createElement("div");
  uspFieldContainer.className = "uspEntry";

  const uspLabel = document.createElement("label");
  uspLabel.innerText = "USP 1";
  const uspInput = document.createElement("input");
  uspInput.type = "text";
  uspInput.placeholder = "Enter USP 1";

  const uspValueLabel = document.createElement("label");
  uspValueLabel.innerText = "USP Value 1";
  const uspValueInput = document.createElement("input");
  uspValueInput.type = "text";
  uspValueInput.placeholder = "Enter USP Value 1";

  // Append USP fields to the container
  uspFieldContainer.appendChild(uspLabel);
  uspFieldContainer.appendChild(uspInput);
  uspFieldContainer.appendChild(uspValueLabel);
  uspFieldContainer.appendChild(uspValueInput);

  // Append the USP container to the block
  uspContainer.appendChild(uspFieldContainer);

  // Append the USP container to the block
  block.appendChild(uspContainer);
}
