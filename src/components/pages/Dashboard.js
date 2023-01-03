import React from "react";
import UsageChart from "../Analytics_uses";
import AnalyticsUsageSession from "../AnalyticsUsageSession";
import AnalyticsUsageSessionOne from "../AnalyticsUsageSessionOne";
import AnalyticsUsageSessionFour from "../AnalyticsUsageSessionFour";
import AnalyticsUsageSessionThirity from "../AnalyticsUsageSessionThirity";
import AnalyticsUsageSessionAll from "../AnalyticsUsageSessionAll";
import { Stack } from "@shopify/polaris";
import EventsTable from "../analytics_components/EventsTable";

export default function Dashboard({ retailer_details }) {
	return (
		<div>
			<Stack distribution="fillEvenly" spacing="tight">
				<AnalyticsUsageSessionOne retailer_details={retailer_details} />
				<AnalyticsUsageSession retailer_details={retailer_details} />
			</Stack>
			<br></br>
			<Stack distribution="fillEvenly" spacing="tight">
				<AnalyticsUsageSessionFour retailer_details={retailer_details} />
				<AnalyticsUsageSessionThirity retailer_details={retailer_details} />
			</Stack>
			<br></br>
			<Stack distribution="fillEvenly" spacing="tight">
				<AnalyticsUsageSessionAll retailer_details={retailer_details} />
			</Stack>
		</div>
	);
}
