import React from "react";
import { EmptyState, Card } from "@shopify/polaris";

export default function EmptyStateLoad({ title }) {
	return (
		<Card title={title} sectioned>
			<EmptyState secondaryAction={{ content: "Get Support", url: "https://www.primeai.co.uk/contactus.html" }} image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png" fullWidth={false} heading="You don't have enough data">
				<p>Don't worry, this is expected behaviour if you have just installed this app or your app is still loading. After this application has been used on your live site, you will begin to see data populated here.</p>
			</EmptyState>
		</Card>
	);
}
