import React from "react";
import { List, Layout, Card, TextStyle, VideoThumbnail, MediaCard, Link } from "@shopify/polaris";

export default function Dashboard({ retailer_details }) {
	return (
		<Layout>
			{/* <Layout.Section oneHalf>
				<MediaCard
					portrait
					title="Find Clothes By Picture Video Guide"
					primaryAction={{
						content: "Open in YouTube",
						onAction: () => {},
					}}
					description={`In this video we will walk you through the installation process of the Find Clothes By Picture widget. We go step by step through the process of installing the widget on your shop.`}
					popoverActions={[{ content: "PRIME AI Support", url: "https://www.primeai.co.uk/contactus.html" }]}
				>
					<VideoThumbnail videoLength={80} thumbnailUrl="https://www.primeai.co.uk/DORSIA/project/dorsia-ui/src/img/Thumb.png" />
				</MediaCard>
			</Layout.Section> */}
			<Layout.Section oneHalf>
				<Card title="Installation Guide">
					<Card.Section>
						<TextStyle>Below you will find a step by step guide on how to install the Find Clothes By Pictures Widget on your Store. </TextStyle>
						<br></br>
						<br></br>
						<TextStyle>
							<b>NOTE: </b>Your product's must be processed by PRIME AI's Artificial Intelligence before your widget will show. Otherwise you will be greeted by{" "}
							<Link external={true} url={`https://www.primeai.co.uk/DORSIA/project/dorsia-ui/src/img/how2_7.png`}>
								this screen
							</Link>
							. Please wait up to 24 hours for your feed to be processed. We will email you once it's done.
						</TextStyle>
					</Card.Section>

					<Card.Section title="Step by Step Guide">
						<List type="number">
							<List.Item>
								Navigate to your{" "}
								<Link external={true} url={`https://${retailer_details.shop}/admin/themes`}>
									Theme
								</Link>{" "}
								(The one you want the widget on)
							</List.Item>
							<List.Item>
								Click on the{" "}
								<Link external={true} url={`https://www.primeai.co.uk/DORSIA/project/dorsia-ui/src/img/how2_1.png`}>
									Customize Button
								</Link>{" "}
								for the theme you want to add the widget too
							</List.Item>
							<List.Item>
								Navigate to the{" "}
								<Link external={true} url={`https://www.primeai.co.uk/DORSIA/project/dorsia-ui/src/img/how2_2.png`}>
									Products Template
								</Link>{" "}
								page{" "}
							</List.Item>
							<List.Item>
								You should now be on your{" "}
								<Link external={true} url={`https://www.primeai.co.uk/DORSIA/project/dorsia-ui/src/img/how2_3.png`}>
									Products Page
								</Link>
							</List.Item>
							<List.Item>
								On the left bar click on the location (Block) where you wish to{" "}
								<Link external={true} url={`https://www.primeai.co.uk/DORSIA/project/dorsia-ui/src/img/how2_4.png`}>
									place your widget{" "}
								</Link>
							</List.Item>
							<List.Item>
								Click on 'Add block'. Under the 'APPS' section you will find{" "}
								<Link external={true} url={`https://www.primeai.co.uk/DORSIA/project/dorsia-ui/src/img/how2_5.png`}>
									'FCBP - Carousel'
								</Link>
								. Click on this.
							</List.Item>
							<List.Item>
								Your widget should now be added into that{" "}
								<Link external={true} url={`https://www.primeai.co.uk/DORSIA/project/dorsia-ui/src/img/how2_6.png`}>
									location
								</Link>
								.
							</List.Item>
							<List.Item>
								If you wish to hide your container behind a button, you can do so by clicking on the 'Display Container Button' setting.
							</List.Item>
							<List.Item>
								If you see a{" "}
								<Link external={true} url={`https://www.primeai.co.uk/DORSIA/project/dorsia-ui/src/img/how2_7.png`}>
									'Processing In-Progress'
								</Link>{" "}
								screen, it mean's we haven't processed all of your images just yet. This could take up to 24 hours, but don't worry, we will email you once it's done.{" "}
							</List.Item>
						</List>
					</Card.Section>
				</Card>
			</Layout.Section>
			<Layout.Section oneHalf>
				<Card title="Customisation Guide">
					<Card.Section>
						<TextStyle>Customizing your Find Clothes by Pictures Widget enhances the experience for your users. It allows you to design the widget yourself, to create a widget that fit's perfectly for your stores theme. </TextStyle>
						<br></br>
						<br></br>
						<TextStyle>
							If you don't come across a customisation feature that you wanted, please feel free to{" "}
							<Link external={true} url={`https://www.primeai.co.uk/contactus.html`}>
								reach out and request it{" "}
							</Link>
							.{" "}
						</TextStyle>
					</Card.Section>

					<Card.Section title="Step by Step Guide">
						<List type="number">
							<List.Item>
								Navigate to your{" "}
								<Link external={true} url={`https://${retailer_details.shop}/admin/themes`}>
									Theme
								</Link>{" "}
								(The one you with the widget)
							</List.Item>
							<List.Item>
								Locate your{" "}
								<Link external={true} url={`https://www.primeai.co.uk/DORSIA/project/dorsia-ui/src/img/how2_6.png`}>
									Widget
								</Link>{" "}
								and click on it.
							</List.Item>
							<List.Item>
								On the left bar you should be greeted with a list{" "}
								<Link external={true} url={`https://www.primeai.co.uk/DORSIA/project/dorsia-ui/src/img/how2_8.png`}>
									customisation options
								</Link>
							</List.Item>
							<List.Item>
								Customize to your{" "}
								<Link external={true} url={`https://www.primeai.co.uk/DORSIA/project/dorsia-ui/src/img/how2_9.png`}>
									heart's desire.
								</Link>{" "}
								Sometimes it takes a few seconds to update the page.
							</List.Item>
						</List>
					</Card.Section>
				</Card>
			</Layout.Section>
			<Layout.Section oneHalf>
				<Card title="Frequently Asked Questions">
					<Card.Section>
						<TextStyle>Below you will find a collection of Frequently Asked Questions.</TextStyle>
						<br></br>
						<br></br>
						<TextStyle>
							If we didn't answer your question here, please feel free to{" "}
							<Link external={true} url={`https://www.primeai.co.uk/contactus.html`}>
								reach out and ask{" "}
							</Link>
							.{" "}
						</TextStyle>
					</Card.Section>

					<Card.Section title="Frequently Asked Questions">
						<List>
							<List.Item>
								<b>Q:</b> 'Why does my widget not show up on my store?'
								<List>
									<List.Item>
										<b>A:</b> <TextStyle variation="subdued">If you have installed the App in the last 24 hours, it's because we're still processing your images. Please check back in 24 hours and your widget should be working</TextStyle>
									</List.Item>
								</List>
							</List.Item>
							<List.Item>
								<b>Q:</b> 'How do I make my container into a button?'
								<List>
									<List.Item>
										<b>A:</b> <TextStyle variation="subdued">In the customisation menu you can select 'Display Container Button' or 'Display Container Button (Floating)' to do so.</TextStyle>
									</List.Item>
								</List>
							</List.Item>
							<List.Item>
								<b>Q:</b> 'My widget has randomly disappeared. What should I do?'
								<List>
									<List.Item>
										<b>A:</b>{" "}
										<TextStyle variation="subdued">
											It's likely that we have temporarily disabled your widget. We do this when your widget has received more impressions then your plan supports. Go to your billing page to see if you've exceeded your plan. We recommend that you upgrade your plan at this point, but if you don't your widget will re-enable itself at the start of the
											next billing period
										</TextStyle>
									</List.Item>
								</List>
							</List.Item>
							<List.Item>
								<b>Q:</b> 'I've tried everything and my widget is not working. What should I do?'
								<List>
									<List.Item>
										<b>A:</b> <TextStyle variation="subdued">If you're within your billing plan and your products have processed, please reach out to us about this. We'll be happy to help you.</TextStyle>
									</List.Item>
								</List>
							</List.Item>
							<List.Item>
								<b>Q:</b> 'Can I remove the text 'PRIME AI' from the footer?'
								<List>
									<List.Item>
										<b>A:</b> <TextStyle variation="subdued">Yes, but you will need to contact us about this. </TextStyle>
									</List.Item>
								</List>
							</List.Item>
							<List.Item>
								<b>Q:</b> 'Can I request a feature?'
								<List>
									<List.Item>
										<b>A:</b> <TextStyle variation="subdued">Yes, please do contact us if you have any requests. Your feedback is very important to us. </TextStyle>
									</List.Item>
								</List>
							</List.Item>
						</List>
					</Card.Section>
				</Card>
			</Layout.Section>
		</Layout>
	);
}
