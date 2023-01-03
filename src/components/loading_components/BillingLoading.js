import React from "react";
import { Stack, Card, Layout, SkeletonPage, SkeletonBodyText, SkeletonDisplayText, DisplayText, Subheading, Heading, List, TextContainer } from "@shopify/polaris";
import { ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Cell, Pie, Label } from "recharts";

export function BillingLoading({ retailer_details }) {
	return (
		<SkeletonPage primaryAction fullWidth>
			<Layout>
				<Layout.Section>
					<Card sectioned>
						<SkeletonBodyText />
					</Card>
					<Card sectioned>
						<TextContainer>
							<SkeletonDisplayText size="small" />
							<SkeletonBodyText />
						</TextContainer>
					</Card>
					<Card sectioned>
						<TextContainer>
							<SkeletonDisplayText size="small" />
							<SkeletonBodyText />
						</TextContainer>
					</Card>
				</Layout.Section>
				<Layout.Section secondary>
					<Card>
						<Card.Section>
							<TextContainer>
								<SkeletonDisplayText size="small" />
								<SkeletonBodyText lines={2} />
							</TextContainer>
						</Card.Section>
						<Card.Section>
							<SkeletonBodyText lines={1} />
						</Card.Section>
					</Card>
					<Card subdued>
						<Card.Section>
							<TextContainer>
								<SkeletonDisplayText size="small" />
								<SkeletonBodyText lines={2} />
							</TextContainer>
						</Card.Section>
						<Card.Section>
							<SkeletonBodyText lines={2} />
						</Card.Section>
					</Card>
				</Layout.Section>
			</Layout>
		</SkeletonPage>
	);
}
