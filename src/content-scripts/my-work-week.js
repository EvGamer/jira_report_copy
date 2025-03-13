const log = (...args) => {
  console.log("jira-report-copy:", ...args);
  return args.length < 2 ? args[0] : args[1];
}
log("init")

const getNodeByName = (parent, name) => {
  return parent.querySelector(`[name="${name}"]`);
}

const getTextContentByName = (parent, name) => {
  return getNodeByName(parent, name)?.textContent;
}

const getReportLine = ({ date, id, duration, comment }) => {
  return `${formatTime(date)} ${id} ${comment} ${duration}`
}
const TIME_FORMAT = new Intl.DateTimeFormat("ru-RU", { timeStyle: "short" });

const formatTime = (date) => {
  return TIME_FORMAT.format(date);
}

const handleCopyButtonClick = (event) => {
  const container = event.target.closest('[name="calendarListViewDay"]');
  if (!container) return;
  const cardNodes = container.querySelectorAll('[name="tempoWorklogCard"]');
  const reportLines = [];
  for (const cardNode of cardNodes) {
    reportLines.push(getReportLine(({
      date: new Date(cardNode.dataset?.date),
      id: getTextContentByName(cardNode, "tempoCardIssueKey"),
      duration: getTextContentByName(cardNode, "tempoCardDuration"),
      comment: getTextContentByName(cardNode, "tempoCardComment"),
    })))
  }
  navigator.clipboard.writeText(reportLines.join("\n"));
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
