/**
* Simple Panel
*/
import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

class SimplePanel extends React.Component {
	state = {
		expanded: null,
	};
	handleChange = panel => (event, expanded) => {
		this.setState({
			expanded: expanded ? panel : false,
		});
	};

	render() {
		return (
			<div>
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
						<Typography>Expansion Panel 1</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
              </Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
						<Typography>Expansion Panel 2</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
              </Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel disabled>
					<ExpansionPanelSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
						<Typography>Disabled Expansion Panel</Typography>
					</ExpansionPanelSummary>
				</ExpansionPanel>
			</div>
		);
	}
}

export default SimplePanel;
