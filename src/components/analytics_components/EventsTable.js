import React, { useCallback, useState, useEffect } from "react";
import { Button, SkeletonBodyText, Popover, ActionList, Modal, DataTable, Stack, Tooltip, Card, Select } from "@shopify/polaris";
import EventDatePicker from "./events_table_components/EventDatePicker";
import EmptyStateLoad from "../loading_components/EmptyStateLoad";
import jsPDF from "jspdf";
import "jspdf-autotable";

function EventsTable({ retailer_details }) {
	const [rowData, setRowData] = useState(null);
	const [selectedDevice, setselectedDevice] = useState("Desktop");
	const [selected_date, set_selected_date] = useState(formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) + " to " + formatDate(new Date(Date.now())));
	const [active, setActive] = useState(false);
	const search_button = Search_Button(selectedDevice, setselectedDevice, selected_date, set_selected_date);
	const toggleActive = useCallback(() => setActive((active) => !active), []);

	useEffect(() => {
		let isMounted = true; // note mutable flag

		setRowData(null); // Empty Loading State
		getRowData(retailer_details.shop, selectedDevice, selected_date).then((data) => {
			if (isMounted) setRowData(data); // add conditional check
		});
		return () => {
			isMounted = false;
		}; // cleanup toggles value, if unmounted
	}, [selectedDevice, retailer_details.shop, selected_date]); // adjust dependencies to your needs

	if (rowData && rowData.length > 0) {
		return (
			<Card title="Events Table" sectioned actions={[{ content: search_button }, { content: export_buttons() }]}>
				<DataTable showTotalsInFooter footerContent={`Showing ${rowData.length} of ${rowData.length} results`} columnContentTypes={["text", "text", "text", "text", "text"]} headings={dataTableHeadings()} rows={rowData} />
			</Card>
		);
	} else {
		// So are they in a loading state or do they not have data?

		return rowData || rowData?.length === 0 ? <EmptyStateLoad title="Events Table" /> : LoadingState(search_button, export_buttons);
	}

	function export_buttons() {
		const export_button_html = export_button(toggleActive);
		const export_current_table_proxy = () => export_current_table(retailer_details.shop, selectedDevice, selected_date);
		const exportPDF = export_table_to_pdf(selected_date, selectedDevice, retailer_details);
		return (
			<Popover active={active} activator={export_button_html} autofocusTarget="first-node" onClose={toggleActive}>
				<ActionList
					actionRole="menuitem"
					items={[
						{
							content: "Export as PDF",
							onAction: exportPDF,
						},
						{
							content: "Export as CSV",
							onAction: export_current_table_proxy,
						},
					]}
				/>
			</Popover>
		);
	}
}

function dataTableHeadings() {
	return [
		<Tooltip content="This is the day's in which you specified in the Date Range Picker. This is done on a daily basis." active={false} preferredPosition="above">
			<p className="shopify-underline">Date</p>
		</Tooltip>,
		<Tooltip content="This is the number of views a PDP page gets. The way we define a page view, is whenever a user visits a PDP page, we register that as a view." active={false} preferredPosition="above">
			<p className="shopify-underline">Page Views</p>
		</Tooltip>,
		<Tooltip content="A unique visitor is a user. A unique visitor is register based on the first time they enter a PDP page for that day. This let's you know how many unique people use your site" active={false} preferredPosition="above">
			<p className="shopify-underline">Unique Visitor</p>
		</Tooltip>,
		<Tooltip content="An App click is defined as a user clicking on a suggested image within the Product Recommendation container. This let's you know how many people are using this app" active={false} preferredPosition="above">
			<p className="shopify-underline">App Clicks</p>
		</Tooltip>,
		<Tooltip content="Item's Shown refers to the amount of items that was suggested to a user. This let's you know how many suggested items your users are seeing through this app." active={false} preferredPosition="above">
			<p className="shopify-underline">Item's Shown</p>
		</Tooltip>,
		<Tooltip content="Every time a user clicks on a suggestion within the Product Recommendation container, we make a note of the item the user clicked on. If we see this item at the checkout soon after, we mark this as the item being purchased due to this app." active={false} preferredPosition="above">
			<p className="shopify-underline">Purchases using App</p>
		</Tooltip>,
		<Tooltip content="This is similar to the Purchases using App, although the key difference here is that a user does not need to of bought what they clicked on. What this tells you is how many checkouts have occurred where a user has used this app." active={false} preferredPosition="above">
			<p className="shopify-underline">App Related Buys</p>
		</Tooltip>,
		<Tooltip content="CVR Overall refers to the percentage of unique users who will make a purchase when they enter your site" active={false} preferredPosition="above">
			<p className="shopify-underline">CVR Overall</p>
		</Tooltip>,
		<Tooltip
			content="CVR 1 Refers to the percentage of unique users who will had made a checkout using this app, this does not mean they made a checkout due to this app. Only that they clicked on a suggested item. What this tells you is the percentage of people who made checkouts using this app at least once."
			active={false}
			preferredPosition="above"
		>
			<p className="shopify-underline">CVR 1</p>
		</Tooltip>,
		<Tooltip content="CVR 2 Refers to the percentage of unique users who will had made a checkout with a item the app suggested and the user clicked on. This tells you the percentage of checkouts made on your store that acquired a product because of this app." active={false} preferredPosition="above">
			<p className="shopify-underline">CVR 2</p>
		</Tooltip>,
	];
}

function export_button(toggleActive) {
	return (
		<Button onClick={toggleActive} disclosure>
			Export Options
		</Button>
	);
}

function export_table_to_pdf(selected_date, selectedDevice, retailer_details) {
	return async () => {
		const unit = "pt";
		const size = "A4"; // Use A1, A2, A3 or A4
		const orientation = "landscape"; // portrait or landscape

		const marginLeft = 15;
		const doc = new jsPDF(orientation, unit, size);

		doc.setFontSize(16);

		const title = `${selected_date} - ${selectedDevice} - Events Export`;

		const data = await getRowData(retailer_details.shop, selectedDevice, selected_date);
		console.log(data);
		doc.text(title, marginLeft, 20);
		doc.autoTable({
			head: [["Date", "Page Views", "Unique Visitor", "App Clicks", "Item's Shown", "Purchases using App", "App Related Buys", "CVR Overall", "CVR 1", "CVR 2"]],
			body: data,
		});
		doc.save(`${selected_date} - ${selectedDevice} - Events Export.pdf`);
	};
}

function LoadingState(search_button, export_buttons) {
	return (
		<Card title="Events Table" sectioned actions={[{ content: search_button }, { content: export_buttons() }]}>
			<SkeletonBodyText />
			<SkeletonBodyText />
			<SkeletonBodyText />
		</Card>
	);
}

async function export_current_table(shop_name, device, date) {
	let data = await getRowData(shop_name, device, date);
	var lineArray = [];
	lineArray.push("data:text/csv;charset=utf-8,Date,Page Views,Unique Visitor,App Clicks,Item's Shown,Purchases using App,App Related Buys,CVR Overall,CVR 1,CVR 2");
	data.forEach(function (infoArray, index) {
		var line = infoArray.join(",");
		lineArray.push(index == 0 ? line : line);
	});
	var csvContent = lineArray.join("\n");
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", `${date} - ${device} - Events Export.csv`);
	document.body.appendChild(link); // Required for FF
	link.click(); // This will download the data file named "my_data.csv".
}

async function getRowData(shop_name, device, date) {
	date = date.split("to");
	let start = date[0].replaceAll("/", "-");
	let end = date[1].replaceAll("/", "-");
	console.log(date);
	let response = await fetch(`https://www.primeai.co.uk/DORSIA/project/shopify/admin_rest_apis/get_events_table.php?shop=${shop_name}`, {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "strict-origin-when-cross-origin",
		body: JSON.stringify({ device, start, end }),
	});
	let resp = await response.json();
	let usage_data = await JSON.parse(resp.response.message);

	// Convert each index within the array that is an object to an array
	let usage_data_array = [];
	usage_data.forEach((item) => {
		usage_data_array.push(Object.values(item));
	});
	// console.log(usage_data_array)
	return usage_data_array.reverse();
}

function Search_Button(device, device_setter, date, date_setter) {
	const handleSelectChange = useCallback((value) => device_setter(value), []);

	const Modal = ModalDatePicker(date, date_setter);

	// Modal Button
	return (
		<Stack>
			<Select
				label="Device:"
				labelInline
				options={[
					{ label: "Desktop", value: "desktop" },
					{ label: "Tablet", value: "tablet" },
					{ label: "Mobile", value: "mobile" },
					{ label: "All Device", value: "all" },
				]}
				onChange={handleSelectChange}
				value={device}
			/>
			{Modal}
		</Stack>
	);
}

function ModalDatePicker(date, date_setter) {
	const [active, setActive] = useState(false);

	const sendDataToParent = (index) => {
		// the callback. Use a better name
		let date_string = formatDate(index.start) + " to " + formatDate(index.end);
		date_setter(date_string);
	};

	const handleChange = useCallback(() => setActive(!active), [active]);

	const activator = <Button onClick={handleChange}>{date}</Button>;

	return (
		<Modal
			activator={activator}
			open={active}
			onClose={handleChange}
			title="Select a date range"
			primaryAction={{
				content: "Close",
				onAction: handleChange,
			}}
		>
			<Modal.Section>
				<EventDatePicker style={{ position: "absolute" }} sendDataToParent={sendDataToParent} />
			</Modal.Section>
		</Modal>
	);
}

function formatDate(date) {
	return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join("/");
	function padTo2Digits(num) {
		return num.toString().padStart(2, "0");
	}
}

export default EventsTable;
