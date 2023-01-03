import React, { useState, useEffect } from "react";
import { Stack } from "@shopify/polaris";
import { BillingLoading } from "../loading_components/BillingLoading";
import PercentageBillingLeft from "../analytics_components/PercentageBillingLeft";
import BillingStats from "../analytics_components/BillingStats";
import { BillingCards } from "../BillingCards";

export default function Dashboard({ retailer_details }) {
	let [loading_billing_plans, set_loading_billing_plans] = useState(true);
	let [billing_plans, set_billing_plans] = useState([]);

	// fetching the billing plans, show a loading screen in the meanwhile
	useEffect(() => {
		const get_billing_data = get_my_billing_data(retailer_details, set_billing_plans, set_loading_billing_plans);
		get_billing_data().catch(console.error);
	}, [retailer_details]);

	// Percentage of billing left, used for the analytics
	let percentage_used = (billing_plans.impressions / billing_plans.max_impressions) * 100;
	let percentage_left = 100 - percentage_used;
	let display_value = percentage_left.toFixed(2) + "%";

	// If the billing plans are still loading, show a loading screen
	if (loading_billing_plans) {
		return <BillingLoading></BillingLoading>;
	}

	// So we have now the billing plans, show the entire page.
	return (
		<div>
			<BillingCards retailer_details={retailer_details} billing_plans={billing_plans} />
			<br></br>
			<Stack distribution="fillEvenly" spacing="tight">
				<BillingStats percentage_used={percentage_used} billing_plans={billing_plans} />
				<PercentageBillingLeft
					data={[
						{ id: "1", name: "L1", value: percentage_left },
						{ id: "2", name: "L2", value: percentage_used },
					]}
					display_value={display_value}
				/>
			</Stack>
			<br></br>
			<br></br>
			<br></br>
		</div>
	);
}

function get_my_billing_data(retailer_details, set_billing_plans, set_loading_billing_plans) {
	return async () => {
		const search_params = new URLSearchParams(window.location.search);
		let response = await fetch(`https://www.primeai.co.uk/DORSIA/project/shopify/admin_rest_apis/get_billing_plans.php?${search_params}`, {
			method: "POST",
			body: JSON.stringify({ retailer_details }),
		});

		try {
			let resp = await response.json();
			set_billing_plans(resp.response.response_object);
			set_loading_billing_plans(false);
		} catch (error) {
			set_loading_billing_plans(false);
			console.log(error);
		}
	};
}
