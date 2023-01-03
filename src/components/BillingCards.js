import React, { useState } from "react";
import { Stack, Card, Layout, TextStyle, ResourceList, Thumbnail, DisplayText, Subheading, Heading, List, TextContainer } from "@shopify/polaris";
import { ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Cell, Pie, Label } from "recharts";
import { BillingLoading } from "./loading_components/BillingLoading";

export function BillingCards({ retailer_details, billing_plans }) {
	let [loading, set_loading] = useState(false);

	// Our async handlers for getting our plans.
	// Here we will set the loading state of the page to true.
	const select_new_plan = get_paid_plan(set_loading);
	const select_free_plan = get_free_plan(set_loading);

	// Assuming the page is in a loading state
	if (loading) {
		return <BillingLoading></BillingLoading>;
	}

	return (
		<Layout>
			<Layout.Section oneThird>
				<Card
					title="Free"
					actions={
						billing_plans.current_billing_plan.id !== 0
							? [
									{
										content: "Select this plan",
										onAction: () => select_free_plan(0, retailer_details, billing_plans),
									},
							  ]
							: null
					}
				>
					<Card.Section>
						<DisplayText variation="bold">Free</DisplayText>
					</Card.Section>
					<Card.Section title="Plan Details">
						<ResourceList
							resourceName={{
								singular: "product",
								plural: "products",
							}}
							items={[
								{
									id: 0,
									impressions: "1,000",
									domains: "1",
									products: "5,000",
								},
							]}
							renderItem={(item) => {
								const { id, impressions, domains, products } = item;
								return (
									<ResourceList.Item id={id} accessibilityLabel={`View details for ${impressions}`}>
										<List type="bullet">
											<List.Item> {impressions} Impressions / Month</List.Item>
											<List.Item> {products} Products </List.Item>
											<List.Item> {domains} Domain </List.Item>
										</List>
									</ResourceList.Item>
								);
							}}
						/>
					</Card.Section>
				</Card>
			</Layout.Section>
			<Layout.Section oneThird>
				<Card
					title="Standard"
					actions={
						billing_plans.current_billing_plan.id !== 1
							? [
									{
										content: "Select this plan",
										onAction: () => select_new_plan(1, retailer_details),
									},
							  ]
							: null
					}
				>
					<Card.Section>
						<DisplayText variation="bold">$49 / Month</DisplayText>
					</Card.Section>
					<Card.Section title="Plan Details">
						<ResourceList
							resourceName={{
								singular: "product",
								plural: "products",
							}}
							items={[
								{
									id: 1,
									impressions: "20,000",
									domains: "1",
									products: "Unlimited",
								},
							]}
							renderItem={(item) => {
								const { id, impressions, domains, products } = item;
								return (
									<ResourceList.Item id={id} accessibilityLabel={`View details for ${impressions}`}>
										<List type="bullet">
											<List.Item> {impressions} Impressions / Month</List.Item>
											<List.Item> {products} Products </List.Item>
											<List.Item> {domains} Domain </List.Item>
										</List>
									</ResourceList.Item>
								);
							}}
						/>
					</Card.Section>
				</Card>
			</Layout.Section>
			<Layout.Section oneThird>
				<Card
					title="Growth"
					actions={
						billing_plans.current_billing_plan.id !== 2
							? [
									{
										content: "Select this plan",
										onAction: () => select_new_plan(2, retailer_details),
									},
							  ]
							: null
					}
				>
					<Card.Section>
						<DisplayText variation="bold">$99 / Month</DisplayText>
					</Card.Section>
					<Card.Section title="Plan Details">
						<ResourceList
							resourceName={{
								singular: "product",
								plural: "products",
							}}
							items={[
								{
									id: 2,
									impressions: "100,000",
									domains: "2",
									products: "Unlimited",
								},
							]}
							renderItem={(item) => {
								const { id, impressions, domains, products } = item;
								return (
									<ResourceList.Item id={id} accessibilityLabel={`View details for ${impressions}`}>
										<List type="bullet">
											<List.Item> {impressions} Impressions / Month</List.Item>
											<List.Item> {products} Products </List.Item>
											<List.Item> {domains} Domain </List.Item>
										</List>
										<br></br>
										<TextStyle variation="subdued">Additional Domain at $25 each per month</TextStyle>
									</ResourceList.Item>
								);
							}}
						/>
					</Card.Section>
				</Card>
			</Layout.Section>
			<Layout.Section oneThird>
				<Card
					title="Pro"
					actions={
						billing_plans.current_billing_plan.id !== 3
							? [
									{
										content: "Select this plan",
										onAction: () => select_new_plan(3, retailer_details),
									},
							  ]
							: null
					}
				>
					<Card.Section>
						<DisplayText variation="bold">$449 / Month</DisplayText>
					</Card.Section>
					<Card.Section title="Plan Details">
						<ResourceList
							resourceName={{
								singular: "product",
								plural: "products",
							}}
							items={[
								{
									id: 3,
									impressions: "1,000,000 ",
									domains: "Unlimited",
									products: "Unlimited",
								},
							]}
							renderItem={(item) => {
								const { id, impressions, domains, products } = item;
								return (
									<ResourceList.Item id={id} accessibilityLabel={`View details for ${impressions}`}>
										<List type="bullet">
											<List.Item> {impressions} Impressions / Month</List.Item>
											<List.Item> {products} Products </List.Item>
											<List.Item> {domains} Domain </List.Item>
										</List>
										<br></br>
										<TextStyle variation="subdued">If you expect more than {impressions} impressions then contact us for more. </TextStyle>
									</ResourceList.Item>
								);
							}}
						/>
					</Card.Section>
				</Card>
			</Layout.Section>
		</Layout>
	);
}
function get_free_plan(set_loading) {
	return async (plan_id, retailer_details, billing_plans) => {
		set_loading(true);
		const search_params = new URLSearchParams(window.location.search);
		let charge_id = billing_plans.charge_id;
		let response = await fetch(`https://www.primeai.co.uk/DORSIA/project/shopify/admin_rest_apis/get_shopify_plan_free_link.php?${search_params}&charge_id=${charge_id}`, {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			redirect: "follow",
			referrerPolicy: "strict-origin-when-cross-origin",
			body: JSON.stringify({ plan_id, retailer_details }),
		});

		try {
			window.top.location.replace(`https://${retailer_details.shop}/admin/apps/dorsia/`);
		} catch (error) {
			console.log(error);
			window.top.location.replace(`https://${retailer_details.shop}/admin/apps/dorsia/`);
		}
	};
}

function get_paid_plan(set_loading) {
	return async (plan_id, retailer_details) => {
		set_loading(true);
		const search_params = new URLSearchParams(window.location.search);
		let response = await fetch(`https://www.primeai.co.uk/DORSIA/project/shopify/admin_rest_apis/get_shopify_plan_link.php?${search_params}`, {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			redirect: "follow",
			referrerPolicy: "strict-origin-when-cross-origin",
			body: JSON.stringify({ plan_id, retailer_details }),
		});

		try {
			let resp = await response.json();
			let redirect_uri = resp.response.message;
			// console.log(redirect_uri);
			// Redirect page from Shopify.
			window.top.location.replace(redirect_uri);
		} catch (error) {
			console.log(error);
		}
	};
}
