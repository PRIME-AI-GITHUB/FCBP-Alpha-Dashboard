import React from "react";
import { TextContainer, Card, SkeletonDisplayText, SkeletonBodyText } from "@shopify/polaris";

export default function LoadingCard() {
	return (
		<Card sectioned>
			<TextContainer>
				<SkeletonDisplayText size="small" />
				<SkeletonBodyText />
			</TextContainer>
		</Card>
	);
}
