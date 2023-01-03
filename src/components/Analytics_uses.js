import React, { PureComponent } from "react";
import { ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { EmptyState, Card, TextStyle, Heading, Caption, DisplayText, Icon, TextContainer, Stack, Tooltip as ShopTools, ButtonGroup, Button } from "@shopify/polaris";
import { CircleInformationMajor } from "@shopify/polaris-icons";
import LoadingCard from "./loading_components/LoadingCard";

function AnalyticsTitle() {
	return (
		<TextContainer>
			<Stack alignment="center">
				<Heading size="small">App Purchase Statistics </Heading>{" "}
				<ShopTools content="App Purchase Statistics Graph tells you the number of Purchases made using the app and purchases made without the app. We define an app purchase as a user clicking on a recommend item through the app and then buying it. ">
					<Icon source={CircleInformationMajor} color="base" />
				</ShopTools>
			</Stack>
		</TextContainer>
	);
}

export default class UsageChart extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			usage_data: null,
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
	}

	async get_usage_data() {
		let response = await fetch(`https://www.primeai.co.uk/DORSIA/project/shopify/admin_rest_apis/get_sales_data.php?shop=dorsiabc`, {
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
		const formatter = (value) => `£${value}`;

		return (
			<Card title={<AnalyticsTitle></AnalyticsTitle>} sectioned actions={[{ content: get_percentage_of_purchases(this.state) }]}>

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
								<XAxis dataKey="today" scale="point" dy={10} />
								<YAxis tickFormatter={formatter} />
								<Tooltip />
								<Legend />
								<Line animationDuration={3000} type="monotone" dataKey="Non_App_Buys" fill="#8884d8" stroke="#8884d8" strokeDasharray="5 5" strokeWidth="2" name="Non-App Related Purchases" />
								<Line animationDuration={2000} type="monotone" dataKey="App_Buys" stroke="#16a29f" strokeWidth="3" name="App Related Purchases" />
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
				<Stack distribution="trailing">
        
          </Stack>
			</Card>
		);
	}
}

function isWhatPercentOf(numA, numB) {
	return (numA / numB) * 100;
}

function get_percentage_of_purchases(state) {
	// Sum of all non App Purchases
	let sum_of_non_app_purchases = 0;
	let sum_of_all_app_purchases = 0;
	if (state.usage_data) {
		state.usage_data.forEach((element) => {
			console.log(element);
			sum_of_non_app_purchases += element.Non_App_Buys ? parseFloat(element.Non_App_Buys) : 0;
			sum_of_all_app_purchases += element.App_Buys ? parseFloat(element.App_Buys) : 0;
		});
	}

	// Sum of all App Purchase
	let percentage_of_purchases = isWhatPercentOf(sum_of_all_app_purchases, sum_of_non_app_purchases + sum_of_all_app_purchases).toFixed(2);

	if (percentage_of_purchases !== "NaN") {
		return (
			<div>
				<DisplayText size="small">
					<TextStyle variation="positive">{percentage_of_purchases}%</TextStyle>
				</DisplayText>{" "}
				<Caption>
					{" "}
					<TextStyle variation="subdued">Are App Related Purchases</TextStyle>
				</Caption>{" "}
			</div>
		);
	}
}
