import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = packageJson.version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

const manifest = defineManifest(async () => ({
  manifest_version: 3,
  name: packageJson.displayName ?? packageJson.name,
  version: `${major}.${minor}.${patch}.${label}`,
  description: packageJson.description,
  options_page: "src/pages/options/index.html",
  background: { service_worker: "src/pages/background/index.ts" },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icons/34x34.png",
  },
  chrome_url_overrides: {
    newtab: "src/pages/newtab/index.html",
  },
  icons: {
    "128": "icons/128x128.png",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.ts"],
      css: ["assets/css/contentStyle.chunk.css"],
    },
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: ["assets/js/*.js", "assets/css/*.css", "assets/img/*"],
      matches: ["*://*/*"],
    },
  ],
}));

// export default defineManifest(async (env) => ({
//   manifest_version: 3,
//   name: "mv3-solid-template",
//   // up to four numbers separated by dots
//   version: `${major}.${minor}.${patch}.${label}`,
//   // semver is OK in "version_name"
//   version_name: version,
//   action: { default_popup: "index.html" },
//   content_scripts: [
//     {
//       js: ["./src/contents/index.tsx"],
//       matches: ["https://www.google.com/*"],
//     },
//   ],
//   background: {
//     service_worker: "src/background.ts",
//   },
//   permissions: ["identity", "tabs", "storage"],
//   key: process.env.VITE_MV3_KEY,
//   oauth2: {
//     client_id: process.env.VITE_OAUTH2_CLIENT_ID ?? "",
//     scopes: [
//       "https://www.googleapis.com/auth/userinfo.email",
//       "https://www.googleapis.com/auth/userinfo.profile",
//     ],
//   },
// }));

export default manifest;