/**
 * Created by PRIME AI.
 * @author Samuel Hinchliffe <samuel@primeai.co.uk, sam.hinchliffe.work@gmail.com>
 * @see    [Linkedin] {@link https://www.linkedin.com/in/samuel-hinchliffe-2bb5801a5/}
 *
 * @summary This is the main entry point for the UI
 *
 * Created at: 08/04/2022
 * @see       [PRIME-AI GITHUB] {@link https://github.com/PRIME-AI-GITHUB}
 * @see       [Website]         {@link https://www.primeai.co.uk/}
 * @copyright 2018-2022 PRIME AI LTD
 */

import "./css/App.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page } from "@shopify/polaris";
import Dashboard from "./components/pages/Dashboard";
import React, { useCallback, useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";

function App() {
	const retailer_details = get_retailer_details();
	const search_params = new URLSearchParams(window.location.search);
	const navigate = useNavigate();
	const location = useLocation();
            
	return (
		<div className="App">
			<AppProvider i18n={enTranslations}>
				<Page
					fullWidth
					
					title={get_page_name(location)}
					compactTitle={true}
					subtitle="Find Clothes by Pictures"
					titleHidden={false}
				>
					<Dashboard retailer_details={retailer_details} />
				</Page>
				<br></br>
				<br></br>
				<br></br>
			</AppProvider>
		</div>
	);
}

/* -------------------------------- Functions ------------------------------- */

function get_page_name(location) {
	return "Dashboard - Beta";
}

function get_retailer_details() {
	// Extract Store name from URL
	// console.log(window.top.location.search)
	console.log(window.location.search);

	const urlParams = new URLSearchParams(window.location.search);
	const shop = urlParams.get("store_name");
	const new_install = urlParams.get("new_install");
	return { shop, new_install };
}

export default App;
