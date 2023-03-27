let items = [];
const LOCAL_STORAGE_ITEMS_KEY = "to-do-items";

const openDetails = function (name, description) {
  const newWindow = window.open("", "Window", "width=500, height=500");
  newWindow.document.write(`Name: ${name}, Description: ${description}`);
  const button = document.createElement("button");
  button.innerHTML = "Close";
  button.onclick = function () {
    newWindow.close();
  };
  newWindow.document.body.append(button);
};

const clickAdd = function () {
  const name = document.getElementById("name")?.value;
  const description = document.getElementById("description")?.value;

  if (!name || !description) {
    alert("No input for name or description");
    return;
  }

  items.push({
    name,
    description,
  });

  const localStorageItemsJSON = localStorage.getItem(LOCAL_STORAGE_ITEMS_KEY);
  let localStorageItems = [];
  if (localStorageItemsJSON) {
    localStorageItems = JSON.parse(localStorageItemsJSON);
  }
  localStorageItems.push({ name, description });
  localStorage.setItem(
    LOCAL_STORAGE_ITEMS_KEY,
    JSON.stringify(localStorageItems)
  );

  const item = document.createElement("div");
  item.innerHTML = name;
  item.className = "item";
  item.onclick = function () {
    openDetails(name, description);
  };

  const container = document.getElementById("items");
  if (container) {
    container.append(item);
  }

  const nameInput = document.getElementById("name");
  if (nameInput) nameInput.value = "";
  const descriptionInput = document.getElementById("description");
  if (descriptionInput) descriptionInput.value = "";
};

const clickRemove = function () {
  const container = document.getElementById("items");

  if (container) {
    items = [];
    localStorage.removeItem(LOCAL_STORAGE_ITEMS_KEY);

    const containerChildren = container.children;

    while (containerChildren.length > 1) {
      containerChildren[1].remove();
    }
  }
};

const addButton = document.getElementById("add");

if (addButton) {
  addButton.onclick = clickAdd;
}

const removeBtn = document.getElementById("remove-btn");

if (removeBtn) {
  removeBtn.onclick = clickRemove;
}

const loadItems = function () {
  const localStorageItemsJSON = localStorage.getItem(LOCAL_STORAGE_ITEMS_KEY);
  if (localStorageItemsJSON) {
    const localStorageItems = JSON.parse(localStorageItemsJSON);
    const container = document.getElementById("items");

    if (container) {
      for (let i = 0; i < localStorageItems.length; i++) {
        const item = document.createElement("div");
        item.innerHTML = localStorageItems[i]?.name;
        item.className = "item";
        item.onclick = function () {
          openDetails(
            localStorageItems[i]?.name,
            localStorageItems[i]?.description
          );
        };
        container.append(item);
      }
    }
  }
};

loadItems();
