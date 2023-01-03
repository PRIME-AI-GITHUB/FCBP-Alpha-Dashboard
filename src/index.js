import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@shopify/polaris/build/esm/styles.css";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
