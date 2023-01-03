import React, { useCallback, useState, useEffect } from "react";
import { Modal, TextContainer, Banner, Link } from "@shopify/polaris";
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";

function InstallModal({retailer_details, search_params}) {
	const [active, setActive] = useState(new_install());
	const handleChange = useCallback(() => setActive(!active), [active]);
	const navigate = useNavigate();

	const redirect_to_guide = () => { 
		handleChange()
		navigate(`/guide?${search_params}`)
	}

	return (
		<div>
			<Modal
				open={active}
				onClose={handleChange}
				title="🎉 Thank You for Installing"
				// primaryAction={{
				// 	content: 'Guide Page',
				// 	onAction: redirect_to_guide,
				//   }}
				  secondaryActions={[
					{
					  content: 'Close',
					  onAction: handleChange,
					},
				  ]}
			>
				<Modal.Section>
					<TextContainer>
						<p>Thank You for installing the <b>Find Clothes By Picture App</b>. We're currently generating your widget by processing your entire product feed. This process <b>may take up to 24 hours</b>; you will be notified via email when it is completed.</p>
						<p>While we're busy setting up your widget, explore your admin page and get a sense of how this app works. If you require any assistance, please contact us at <a href="mailto:support@primeai.co.uk">support@primeai.co.uk</a> </p>
						<p>Once again, <b>thank you</b> for installing, we hope your customers have a great experience using this app. 😁</p>
						<Banner>
							Learn more about {""}
							<Link url="https://www.primeai.co.uk/" external>
								PRIME AI
							</Link>
						</Banner>
					</TextContainer>
				</Modal.Section>
			</Modal>
		</div>
	);
}

function new_install() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const new_install = urlParams.get("new_install");
	const is_this_a_new_install = new_install === "true" ? true : false;

	return is_this_a_new_install;
}

export default InstallModal;
