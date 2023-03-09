export const changeFavicon = (icon: string) => {
  let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.getElementsByTagName("head")[0].appendChild(link);
  }
  link.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='85'>${icon}</text></svg>`;
};

export const changeTabTitle = (title: string) => {
  let documentTitle = document.querySelector("title");
  if (documentTitle !== null) {
    documentTitle.innerHTML = title;
  }
};
