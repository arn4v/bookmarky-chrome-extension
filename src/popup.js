"use strict";
import App from "./popup/App.svelte";
import "./tailwind.css";

const app = new App({
  target: document.getElementById("app"),
});
