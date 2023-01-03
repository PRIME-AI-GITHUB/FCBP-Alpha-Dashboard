import React from "react";
import { Card, TextContainer } from "@shopify/polaris";

export default function BillingStats({ percentage_used, billing_plans }) {
	return (
		<Card title="Billing Statistics" sectioned subdued={true}>
			<TextContainer>
				<p>
					Your Find Clothes By Picture widget has been seen <b>{billing_plans.impressions}</b> times.{" "}
				</p>
				<p>
					{" "}
					Your current plan allows for a maximum of <b>{billing_plans.max_impressions}</b> views.{" "}
				</p>
				<p>
					Which mean's you have <b>{billing_plans.max_impressions - billing_plans.impressions}</b> amount of views left.{" "}
				</p>{" "}
				<p>
					{" "}
					Meaning you've used <b>{percentage_used}%</b> of your current billing plan.
				</p>
			</TextContainer>
		</Card>
	);
}
