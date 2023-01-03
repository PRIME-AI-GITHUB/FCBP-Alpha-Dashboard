import React, { PureComponent, useCallback, useState } from "react";
import { ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { EmptyState, Card, TextStyle, Heading, Caption, DisplayText, Icon, TextContainer, Stack, Tooltip as ShopTools, Button, ButtonGroup } from "@shopify/polaris";
import { CircleInformationMajor } from "@shopify/polaris-icons";
import LoadingCard from "./loading_components/LoadingCard";
// import EventDatePicker from "./analytics_components/events_table_components/EventDatePicker";

function AnalyticsTitle({last}) {

	console.log(last);

	if (last){
		return (
			<TextContainer>
				<Stack alignment="center">
					<Heading size="small">App Usage Statistics (2 Days Before) </Heading>{" "}
					<ShopTools content="What this graph tells you is how many users are using the app. Page views indicates everytime a page has loaded (Not unique visitors) and Picture clicks is the amount of times a picture has been clicked after a result.  ">
						<Icon source={CircleInformationMajor} color="base" />
					</ShopTools>
				</Stack>
			</TextContainer>
		);
	}

	return (
		<TextContainer>
			<Stack alignment="center">
				<Heading size="small">App Usage Statistics (2 Days) </Heading>{" "}
				<ShopTools content="What this graph tells you is how many users are using the app. Page views indicates everytime a page has loaded (Not unique visitors) and Picture clicks is the amount of times a picture has been clicked after a result.  ">
					<Icon source={CircleInformationMajor} color="base" />
				</ShopTools>
			</Stack>
		</TextContainer>
	);
}

export default class AnalyticsUsageSessionFour extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			usage_data: null,
			usage_data_other: null,
			shop: props.retailer_details.shop,
		};
	}

	componentDidMount() {
		this.renderMyData();
	}

	renderMyData() {
		this.get_usage_data()
			.then((responseJson) => {
				this.setState({ usage_data: responseJson });
			})
			.catch((error) => {
				console.error(error);
			});


		this.get_usage_data_other()
			.then((responseJson) => {
				this.setState({ usage_data_other: responseJson });
			})
			.catch((error) => {
				console.error(error);
			});
	}

	async get_usage_data_other() {
		const date = new Date();

		let year = date.getFullYear();
		// 👇️ getMonth returns integer from 0(January) to 11(December)
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let now = [year, month, day].join("-");


		const sevenDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
		month = sevenDaysAgo.getMonth() + 1;
		day = sevenDaysAgo.getDate();
		year = sevenDaysAgo.getFullYear();
		let ago = [year, month, day].join("-");


		const AsevenDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
		month = AsevenDaysAgo.getMonth() + 1;
		day = AsevenDaysAgo.getDate();
		year = AsevenDaysAgo.getFullYear();
		let Aago = [year, month, day].join("-");

		let response = await fetch(`https://www.primeai.co.uk/DORSIA/project/shopify/admin_rest_apis/get_session_usage.php?shop=dorsiabc&start=${Aago}&end=${ago}`, {
			method: "GET", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "same-origin", // include, *same-origin, omit
			redirect: "follow", // manual, *follow, error
			referrerPolicy: "strict-origin-when-cross-origin",
			// body: JSON.stringify(api_object),
		});

		try {
			let resp = await response.json();
			let usage_data = await JSON.parse(resp.response.message);
			console.log('AHHHHHHHHHHHHHHHHHHH')
			console.log(usage_data);
			return usage_data;
		} catch (error) {
			return false;
		}
	}

	async get_usage_data() {
		const date = new Date();

		let year = date.getFullYear();
		// 👇️ getMonth returns integer from 0(January) to 11(December)
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let now = [year, month, day].join("-");

		console.log(now); // 👉️ 2022-10-25

		const sevenDaysAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
		month = sevenDaysAgo.getMonth() + 1;
		day = sevenDaysAgo.getDate();
		let ago = [year, month, day].join("-");
		console.log(ago); // 👉️ 2022-10-25

		let response = await fetch(`https://www.primeai.co.uk/DORSIA/project/shopify/admin_rest_apis/get_session_usage.php?shop=dorsiabc&start=${ago}&end=${now}`, {
			method: "GET", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "same-origin", // include, *same-origin, omit
			redirect: "follow", // manual, *follow, error
			referrerPolicy: "strict-origin-when-cross-origin",
			// body: JSON.stringify(api_object),
		});

		try {
			let resp = await response.json();
			let usage_data = await JSON.parse(resp.response.message);
			console.log(usage_data);
			return usage_data;
		} catch (error) {
			return false;
		}
	}

	render() {
		const formatter = (value) => `${value}`;
		return (
			<Card title={<AnalyticsTitle last={false} ></AnalyticsTitle>} sectioned actions={[{ content: u_week_users(this.state) }, { content: week_users(this.state) }, { content: week_clicks(this.state) }, { content: uploads_week_users(this.state) }]}>
				<Card.Section title={<AnalyticsTitle last={true} ></AnalyticsTitle>} actions={[{ content: Au_week_users(this.state) }, { content: Aweek_users(this.state) }, { content: Aweek_clicks(this.state) }, { content: Auploads_week_users(this.state) }]}>
				</Card.Section>

				{this.state.usage_data != null && this.state.usage_data.length > 0 ? (
					<div style={{ width: "100%", height: 300 }}>
						<ResponsiveContainer>
							<ComposedChart
								data={this.state.usage_data}
								margin={{
									top: 20,
									right: 20,
									bottom: 20,
									left: 20,
								}}
							>
								<CartesianGrid stroke="#e5e8ec" strokeWidth="2" />
								<XAxis dataKey="Date" scale="point" dy={10} />
								<YAxis tickFormatter={formatter} />
								<Tooltip />
								<Legend />
								<Line strokeWidth="3" animationDuration={4000} type="monotone" dataKey="App Uploads" stackId="1" fill="#8884d8" stroke="#8884d8" name="App Uploads" />
								<Line strokeWidth="3" animationDuration={3000} type="monotone" dataKey="App Clicks" stackId="1" stroke="#eb5c46" name="Result Clicks" />

								<Line strokeWidth="3" animationDuration={2000} type="monotone" dataKey="Unique Visitors Views" stackId="1" stroke="#1176cf" name="Unique Visitors Views" />
								<Line strokeWidth="3" animationDuration={1500} type="monotone" dataKey="Page Views" stackId="1" stroke="#16a29f" name="Page Views" />
							</ComposedChart>
						</ResponsiveContainer>
					</div>
				) : this.state.usage_data?.length === 0 || this.state.usage_data === false ? (
					<EmptyState secondaryAction={{ content: "Get Support", url: "https://www.primeai.co.uk/contactus.html" }} image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png" fullWidth={false} heading="You don't have enough data">
						<p>Don't worry, this is expected behaviour if you have just installed this app or your app is still loading. After this application has been used on your live site, you will begin to see data populated here.</p>
					</EmptyState>
				) : (
					<LoadingCard />
				)}
			</Card>
		);
	}
}

function isWhatPercentOf(numA, numB) {
	return (numA / numB) * 100;
}

function Aweek_users(state) {
	// Sum of all non App Purchases
	let sum_of_app_use = 0;
	let sum_of_visitor = 0;
	if (state.usage_data_other) {
		state.usage_data_other.forEach((element) => {
			sum_of_app_use += element["Page Views"] ? parseFloat(element["Page Views"]) : 0;
			sum_of_visitor += element["App Clicks"] ? parseFloat(element["App Clicks"]) : 0;
		});
	}

	// Sum of all App Purchase
	let percentage_of_purchases = sum_of_app_use;

	if (percentage_of_purchases !== "NaN") {
		return (
			<div>
				<DisplayText size="small">
					<TextStyle variation="positive">{percentage_of_purchases}</TextStyle>
				</DisplayText>{" "}
				<Caption>
					{" "}
					<TextStyle variation="subdued">Views</TextStyle>
				</Caption>{" "}
			</div>
		);
	}
}

function week_users(state) {
	// Sum of all non App Purchases
	let sum_of_app_use = 0;
	let sum_of_visitor = 0;
	if (state.usage_data) {
		state.usage_data.forEach((element) => {
			sum_of_app_use += element["Page Views"] ? parseFloat(element["Page Views"]) : 0;
			sum_of_visitor += element["App Clicks"] ? parseFloat(element["App Clicks"]) : 0;
		});
	}

	// Sum of all App Purchase
	let percentage_of_purchases = sum_of_app_use;

	if (percentage_of_purchases !== "NaN") {
		return (
			<div>
				<DisplayText size="small">
					<TextStyle variation="positive">{percentage_of_purchases}</TextStyle>
				</DisplayText>{" "}
				<Caption>
					{" "}
					<TextStyle variation="subdued">Views</TextStyle>
				</Caption>{" "}
			</div>
		);
	}
}

function Auploads_week_users(state) {
	// Sum of all non App Purchases
	let sum_of_app_use = 0;
	let sum_of_visitor = 0;
	if (state.usage_data_other) {
		state.usage_data_other.forEach((element) => {
			sum_of_app_use += element["Unique Visitors Views"] ? parseFloat(element["Unique Visitors Views"]) : 0;
			sum_of_visitor += element["App Uploads"] ? parseFloat(element["App Uploads"]) : 0;
		});
	}

	// Sum of all App Purchase
	let percentage_of_purchases = sum_of_visitor;

	if (percentage_of_purchases !== "NaN") {
		return (
			<div>
				<DisplayText size="small">
					<TextStyle variation="positive">{percentage_of_purchases}</TextStyle>
				</DisplayText>{" "}
				<Caption>
					{" "}
					<TextStyle variation="subdued">Uploads</TextStyle>
				</Caption>{" "}
			</div>
		);
	}
}

function uploads_week_users(state) {
	// Sum of all non App Purchases
	let sum_of_app_use = 0;
	let sum_of_visitor = 0;
	if (state.usage_data) {
		state.usage_data.forEach((element) => {
			sum_of_app_use += element["Unique Visitors Views"] ? parseFloat(element["Unique Visitors Views"]) : 0;
			sum_of_visitor += element["App Uploads"] ? parseFloat(element["App Uploads"]) : 0;
		});
	}

	// Sum of all App Purchase
	let percentage_of_purchases = sum_of_visitor;

	if (percentage_of_purchases !== "NaN") {
		return (
			<div>
				<DisplayText size="small">
					<TextStyle variation="positive">{percentage_of_purchases}</TextStyle>
				</DisplayText>{" "}
				<Caption>
					{" "}
					<TextStyle variation="subdued">Uploads</TextStyle>
				</Caption>{" "}
			</div>
		);
	}
}

function u_week_users(state) {
	// Sum of all non App Purchases
	let sum_of_app_use = 0;
	let sum_of_visitor = 0;
	if (state.usage_data) {
		state.usage_data.forEach((element) => {
			sum_of_app_use += element["Unique Visitors Views"] ? parseFloat(element["Unique Visitors Views"]) : 0;
			sum_of_visitor += element["App Clicks"] ? parseFloat(element["App Clicks"]) : 0;
		});
	}

	// Sum of all App Purchase
	let percentage_of_purchases = sum_of_app_use;

	if (percentage_of_purchases !== "NaN") {
		return (
			<div>
				<DisplayText size="small">
					<TextStyle variation="positive">{percentage_of_purchases}</TextStyle>
				</DisplayText>{" "}
				<Caption>
					{" "}
					<TextStyle variation="subdued">Unique Views</TextStyle>
				</Caption>{" "}
			</div>
		);
	}
}

function Au_week_users(state) {
	// Sum of all non App Purchases
	let sum_of_app_use = 0;
	let sum_of_visitor = 0;
	if (state.usage_data_other) {
		state.usage_data_other.forEach((element) => {
			sum_of_app_use += element["Unique Visitors Views"] ? parseFloat(element["Unique Visitors Views"]) : 0;
			sum_of_visitor += element["App Clicks"] ? parseFloat(element["App Clicks"]) : 0;
		});
	}

	// Sum of all App Purchase
	let percentage_of_purchases = sum_of_app_use;

	if (percentage_of_purchases !== "NaN") {
		return (
			<div>
				<DisplayText size="small">
					<TextStyle variation="positive">{percentage_of_purchases}</TextStyle>
				</DisplayText>{" "}
				<Caption>
					{" "}
					<TextStyle variation="subdued">Unique Views</TextStyle>
				</Caption>{" "}
			</div>
		);
	}
}

function Aweek_clicks(state) {
	// Sum of all non App Purchases
	let sum_of_app_use = 0;
	let sum_of_visitor = 0;
	if (state.usage_data_other) {
		state.usage_data_other.forEach((element) => {
			sum_of_app_use += element["Page Views"] ? parseFloat(element["Page Views"]) : 0;
			sum_of_visitor += element["App Clicks"] ? parseFloat(element["App Clicks"]) : 0;
		});
	}

	// Sum of all App Purchase
	let percentage_of_purchases = sum_of_visitor;

	if (percentage_of_purchases !== "NaN") {
		return (
			<div>
				<DisplayText size="small">
					<TextStyle variation="positive">{percentage_of_purchases}</TextStyle>
				</DisplayText>{" "}
				<Caption>
					{" "}
					<TextStyle variation="subdued">Clicks</TextStyle>
				</Caption>{" "}
			</div>
		);
	}
}

function week_clicks(state) {
	// Sum of all non App Purchases
	let sum_of_app_use = 0;
	let sum_of_visitor = 0;
	if (state.usage_data) {
		state.usage_data.forEach((element) => {
			sum_of_app_use += element["Page Views"] ? parseFloat(element["Page Views"]) : 0;
			sum_of_visitor += element["App Clicks"] ? parseFloat(element["App Clicks"]) : 0;
		});
	}

	// Sum of all App Purchase
	let percentage_of_purchases = sum_of_visitor;

	if (percentage_of_purchases !== "NaN") {
		return (
			<div>
				<DisplayText size="small">
					<TextStyle variation="positive">{percentage_of_purchases}</TextStyle>
				</DisplayText>{" "}
				<Caption>
					{" "}
					<TextStyle variation="subdued">Clicks</TextStyle>
				</Caption>{" "}
			</div>
		);
	}
}

// function percentage_of_use(state) {
// 	// Sum of all non App Purchases
// 	let sum_of_app_use = 0;
// 	let sum_of_visitor = 0;
// 	if (state.usage_data) {
// 		state.usage_data.forEach((element) => {
// 			sum_of_app_use += element["Page Views"] ? parseFloat(element["Page Views"]) : 0;
// 			sum_of_visitor += element["App Clicks"] ? parseFloat(element["App Clicks"]) : 0;
// 		});
// 	}

// 	// Sum of all App Purchase
// 	let percentage_of_purchases = isWhatPercentOf(sum_of_visitor, sum_of_app_use).toFixed(2);

// 	if (percentage_of_purchases !== "NaN") {
// 		return (
// 			<div>
// 				<DisplayText size="small">
// 					<TextStyle variation="positive">{percentage_of_purchases}%</TextStyle>
// 				</DisplayText>{" "}
// 				<Caption>
// 					{" "}
// 					<TextStyle variation="subdued">CTR</TextStyle>
// 				</Caption>{" "}

// 			</div>
// 		);
// 	}
// }
