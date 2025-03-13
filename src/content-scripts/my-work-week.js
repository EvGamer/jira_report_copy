const log = (...args) => {
  console.log("jira-report-copy:", ...args);
  return args.length < 2 ? args[0] : args[1];
}
log("init")

const handleCopyButtonClick = () => {
  log("clicked");
}

const COPY_BUTTON_CLASS = "report_copy_button"

const createCopyButton = () => {
  const button = document.createElement("div");
  button.textContent = "Копировать отчёт";
  button.className = COPY_BUTTON_CLASS;
  button.addEventListener("click", handleCopyButtonClick);
  return button;
}


const attachCopyButton = (node) => {
  node.prepend(createCopyButton())
}

const mountCopyButton = (node) => {
  attachCopyButton(node);
}

const LIST_VIEW_DAY_SELECTOR = '[data-testid="listViewDay"]';


setTimeout(() => {
  const listViewDayNodes = document.querySelectorAll(LIST_VIEW_DAY_SELECTOR);
  for (const node of listViewDayNodes) {
    mountCopyButton(node);
  }
}, 500);
