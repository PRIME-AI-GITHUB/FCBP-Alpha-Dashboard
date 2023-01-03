import React from "react";
import { Card } from "@shopify/polaris";
import { ResponsiveContainer, PieChart, Cell, Pie, Label } from "recharts";

export default function PercentageBillingLeft({ data, display_value }) {
	return (
		<Card title="App Views Remaining" sectioned subdued={true}>
			<div
				style={{
					width: "100%",
					height: 200,
				}}
			>
				<ResponsiveContainer>
					<PieChart>
						<Pie data={data} fill="#16a29f" stroke="#8884d8" dataKey="value" innerRadius="80%" outerRadius="100%" name="Non-App Related Purchases" startAngle={90} endAngle={-270} paddingAngle={0} blendStroke label>
							<Label value={display_value} position="centerBottom" className="label-top" fontSize="1.6rem" />
							<Label value="Views Remaining" position="centerTop" className="label" dy={10} />
							<Cell key="test" fill="#cccccc" />
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</div>
		</Card>
	);
}
