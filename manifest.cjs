const generateManifest = (seed, files, entries) => {
  return {
    manifest_version: 3,
    name: "Jira report copy",
    version: "1.0.0",
    author: "EvGamer",

    description: "Allows copy day's tasks from jira schedule, as a text reports to clipboard",
    icons: {
      24: "icons/icon_24.png"
    },

    content_scripts: [
      {
        matches: ["https://*/secure/Tempo.jspa"],
        js: ["my-work-week.bundle.js"],
        css: ["my-work-week.css"]
      }
    ],
    host_permissions: [
      "<all_urls>"
    ],
    permissions: [
      "activeTab",
      "clipboardWrite"
    ]
  }
}

module.exports = generateManifest;