/**
 * Buttons
 */
import React from 'react';
import MatButton from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Button } from 'reactstrap';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

function RaisedButtons(props) {
	return (
		<div className="button-wrapper">
			<PageTitleBar title={<IntlMessages id="sidebar.buttons" />} match={props.match} />
			<RctCollapsibleCard
				heading={<IntlMessages id="widgets.flatButtons" />}
			>
				<span className="sub-heading">Bootstrap Color Scheme With Material Flat Button Concept</span>
				<MatButton className="text-primary mr-10 mb-10">Primary</MatButton>
				<MatButton className="text-secondary mr-10 mb-10">Secondary</MatButton>
				<MatButton className="text-success mr-10 mb-10">Success</MatButton>
				<MatButton className="text-warning mr-10 mb-10">Warning</MatButton>
				<MatButton className="text-info mr-10 mb-10">Info</MatButton>
				<MatButton className="text-danger mr-10 mb-10">Danger</MatButton>
				<MatButton color="primary" className="mr-10 mb-10">Button</MatButton>
				<MatButton color="secondary" className="mr-10 mb-10">Button</MatButton>
			</RctCollapsibleCard>
			<RctCollapsibleCard
				heading={<IntlMessages id="widgets.raisedButton" />}
			>
				<span className="sub-heading">Bootstrap and material Color Scheme With Material Raised Button Concept</span>
				<MatButton variant="raised" color="primary" className="mr-10 mb-10 text-white">Primary</MatButton>
				<MatButton variant="raised" className="btn-secondary mr-10 mb-10 text-white">Secondary</MatButton>
				<MatButton variant="raised" className="btn-success mr-10 mb-10 text-white">Success</MatButton>
				<MatButton variant="raised" className="btn-warning mr-10 mb-10 text-white">warning</MatButton>
				<MatButton variant="raised" className="btn-info mr-10 mb-10 text-white">Info</MatButton>
				<MatButton variant="raised" className="btn-danger mr-10 mb-10 text-white">Danger</MatButton>
				<MatButton variant="raised" color="primary" className="mr-10 mb-10 text-white">Button</MatButton>
				<MatButton variant="raised" color="secondary" className="mr-10 mb-10 text-white">Button</MatButton>
			</RctCollapsibleCard>
			<RctCollapsibleCard
				heading={<IntlMessages id="widgets.buttonWithIconAndLabel" />}
			>
				<span className="sub-heading">You can pick any icon from the material icons listed under Icons page Or feel free to add any new font icons and use that.</span>
				<MatButton variant="raised" color="primary" className="mr-10 mb-10 text-white btn-icon">Delete <i className="zmdi zmdi-delete"></i></MatButton>
				<MatButton variant="raised" className="btn-secondary mr-10 mb-10 text-white btn-icon">Send <i className="zmdi zmdi-mail-send"></i></MatButton>
				<MatButton variant="raised" className="btn-success mr-10 mb-10 text-white btn-icon"><i className="zmdi zmdi-check-all"></i> Success</MatButton>
				<MatButton variant="raised" className="btn-warning mr-10 mb-10 text-white btn-icon">Warning <i className="zmdi zmdi-alert-triangle"></i></MatButton>
				<MatButton variant="raised" className="btn-info mr-10 mb-10 text-white btn-icon">Info <i className="zmdi zmdi-info"></i></MatButton>
				<MatButton variant="raised" className="btn-danger mr-10 mb-10 text-white btn-icon">Danger <i className="zmdi zmdi-alert-circle"></i></MatButton>
				<MatButton variant="raised" color="primary" className="mr-10 mb-10 text-white btn-icon">Button <i className="zmdi zmdi-inbox"></i></MatButton>
				<MatButton variant="raised" color="secondary" className="mr-10 mb-10 text-white btn-icon">Button <i className="zmdi zmdi-favorite"></i></MatButton>
			</RctCollapsibleCard>
			<div className="row">
				<RctCollapsibleCard
					heading={<IntlMessages id="widgets.floatingActionButtons" />}
					colClasses="col-sm-12 col-md-6"
				>
					<span className="sub-heading">Floating Action buttons with disabled states</span>
					<MatButton variant="fab" color="primary" className="text-white mr-15 mb-10" aria-label="add">
						<i className="zmdi zmdi-settings"></i>
					</MatButton>
					<MatButton variant="fab" mini color="primary" className="text-white mr-15 mb-10" aria-label="add">
						<i className="zmdi zmdi-settings"></i>
					</MatButton>
					<MatButton variant="fab" className="btn-danger text-white mr-15 mb-10" aria-label="add">
						<i className="zmdi zmdi-favorite"></i>
					</MatButton>
					<MatButton variant="fab" mini className="btn-danger text-white mr-15 mb-10" aria-label="add">
						<i className="zmdi zmdi-favorite"></i>
					</MatButton>
					<MatButton variant="fab" disabled className="btn-info text-white mr-15 mb-10" aria-label="add">
						<i className="zmdi zmdi-help-outline"></i>
					</MatButton>
					<MatButton variant="fab" mini disabled className="btn-info text-white mr-15 mb-10" aria-label="add">
						<i className="zmdi zmdi-help-outline"></i>
					</MatButton>
				</RctCollapsibleCard>
				<RctCollapsibleCard
					heading={<IntlMessages id="widgets.iconButton" />}
					colClasses="col-sm-12 col-md-6"
				>
					<span className="sub-heading">Icon Buttons with Disable states You can Pick Any Icon under material icon font and use it.</span>
					<IconButton color="primary" aria-label="Delete">
						<i className="zmdi zmdi-delete"></i>
					</IconButton>
					<IconButton color="secondary" aria-label="Add an alarm">
						<i className="zmdi zmdi-alarm-check"></i>
					</IconButton>
					<IconButton className="text-danger" aria-label="Add an alarm">
						<i className="zmdi zmdi-favorite"></i>
					</IconButton>
					<input accept="image/*" className="d-none" id="icon-button-file" type="file" />
					<label htmlFor="icon-button-file">
						<IconButton className="text-warning" component="span">
							<i className="zmdi zmdi-image"></i>
						</IconButton>
					</label>
					<IconButton className="text-default" disabled aria-label="disabled Icon">
						<i className="zmdi zmdi-help"></i>
					</IconButton>
				</RctCollapsibleCard>
			</div>
			<RctCollapsibleCard
				heading={<IntlMessages id="widgets.socialMediaButton" />}
			>
				<span className="sub-heading">Various social media buttons for your project and using materail button concept</span>
				<div className="mb-30">
					<MatButton variant="fab" className="btn-twitter mr-15 mb-10 text-white">
						<i className="zmdi zmdi-twitter"></i>
					</MatButton>
					<MatButton variant="fab" className="btn-google mr-15 mb-10 text-white">
						<i className="zmdi zmdi-google"></i>
					</MatButton>
					<MatButton variant="fab" className="btn-facebook mr-15 mb-10 text-white">
						<i className="zmdi zmdi-facebook"></i>
					</MatButton>
					<MatButton variant="fab" className="btn-pinterest mr-15 mb-10 text-white">
						<i className="zmdi zmdi-pinterest"></i>
					</MatButton>
					<MatButton variant="fab" className="btn-instagram mr-15 mb-10 text-white">
						<i className="zmdi zmdi-instagram"></i>
					</MatButton>
					<MatButton variant="fab" className="btn-rss mr-15 mb-10 text-white">
						<i className="zmdi zmdi-rss"></i>
					</MatButton>
					<MatButton variant="fab" className="btn-tumblr mr-15 mb-10 text-white">
						<i className="zmdi zmdi-tumblr"></i>
					</MatButton>
					<MatButton variant="fab" className="btn-linkedin mr-15 mb-10 text-white">
						<i className="zmdi zmdi-linkedin"></i>
					</MatButton>
					<MatButton variant="fab" className="btn-dribbble mr-15 mb-10 text-white">
						<i className="zmdi zmdi-dribbble"></i>
					</MatButton>
					<MatButton variant="fab" className="btn-skype mr-15 mb-10 text-white">
						<i className="zmdi zmdi-skype"></i>
					</MatButton>
					<MatButton variant="fab" className="btn-youtube mr-15 mb-10 text-white">
						<i className="zmdi zmdi-youtube"></i>
					</MatButton>
					<MatButton variant="fab" className="btn-github mr-15 mb-10 text-white">
						<i className="zmdi zmdi-github"></i>
					</MatButton>
				</div>
				<div className="mb-30">
					<MatButton variant="raised" className="btn-icon btn-twitter mr-15 mb-10 text-white">
						<i className="zmdi zmdi-twitter zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-google mr-15 mb-10 text-white">
						<i className="zmdi zmdi-google zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-facebook mr-15 mb-10 text-white">
						<i className="zmdi zmdi-facebook zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-pinterest mr-15 mb-10 text-white">
						<i className="zmdi zmdi-pinterest zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-instagram mr-15 mb-10 text-white">
						<i className="zmdi zmdi-instagram zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-rss mr-15 mb-10 text-white">
						<i className="zmdi zmdi-rss zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-tumblr mr-15 mb-10 text-white">
						<i className="zmdi zmdi-tumblr zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-linkedin mr-15 mb-10 text-white">
						<i className="zmdi zmdi-linkedin zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-dribbble mr-15 mb-10 text-white">
						<i className="zmdi zmdi-dribbble zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-skype mr-15 mb-10 text-white">
						<i className="zmdi zmdi-skype zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-youtube mr-15 mb-10 text-white">
						<i className="zmdi zmdi-youtube zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-github mr-15 mb-10 text-white">
						<i className="zmdi zmdi-github zmdi-hc-lg"></i>
					</MatButton>
				</div>
				<div className="square">
					<MatButton variant="raised" className="btn-icon btn-twitter mr-15 mb-10 text-white">
						Twitter <i className="zmdi zmdi-twitter zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-google mr-15 mb-10 text-white">
						Google <i className="zmdi zmdi-google zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-facebook mr-15 mb-10 text-white">
						Facebook <i className="zmdi zmdi-facebook zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-pinterest mr-15 mb-10 text-white">
						Pinterest <i className="zmdi zmdi-pinterest zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-instagram mr-15 mb-10 text-white">
						Instagram <i className="zmdi zmdi-instagram zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-rss mr-15 mb-10 text-white">
						RSS <i className="zmdi zmdi-rss zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-tumblr mr-15 mb-10 text-white">
						Tumblr <i className="zmdi zmdi-tumblr zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-linkedin mr-15 mb-10 text-white">
						Linkedin <i className="zmdi zmdi-linkedin zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-dribbble mr-15 mb-10 text-white">
						Dribbble <i className="zmdi zmdi-dribbble zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-skype mr-15 mb-10 text-white">
						Skype <i className="zmdi zmdi-skype zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-youtube mr-15 mb-10 text-white">
						Youtube <i className="zmdi zmdi-youtube zmdi-hc-lg"></i>
					</MatButton>
					<MatButton variant="raised" className="btn-icon btn-github mr-15 mb-10 text-white">
						Github <i className="zmdi zmdi-github zmdi-hc-lg"></i>
					</MatButton>
				</div>
			</RctCollapsibleCard>
			<div className="sub-title">
				<h4><IntlMessages id="widgets.reactButton" /></h4>
			</div>
			<div className="row">
				<div className="col-sm-12 col-md-6">
					<RctCollapsibleCard
						heading="Simple Buttons"
					>
						<span className="sub-heading">Various buttons for your project and using React button concept</span>
						<Button className="mr-10 mb-10" color="primary">Primary</Button>
						<Button className="mr-10 mb-10" color="secondary">Secondary</Button>
						<Button className="mr-10 mb-10" color="success">Success</Button>
						<Button className="mr-10 mb-10" color="info">Info</Button>
						<Button className="mr-10 mb-10" color="warning">Warning</Button>
						<Button className="mr-10 mb-10" color="danger">Danger</Button>
						<Button className="mr-10 mb-10" color="link">Link</Button>
					</RctCollapsibleCard>
					<RctCollapsibleCard
						heading={<IntlMessages id="widgets.buttonSize" />}
					>
						<span className="sub-heading">React buttons with different sizes</span>
						<Button className="mr-10 mb-10" color="primary" size="lg">Large Button</Button>
						<Button className="mr-10 mb-10" color="success">Success</Button>
						<Button className="mr-10 mb-10" color="danger" size="sm">Small Button</Button>
					</RctCollapsibleCard>
					<RctCollapsibleCard
						heading={<IntlMessages id="widgets.buttonState" />}
					>
						<span className="sub-heading">React buttons with different State</span>
						<Button className="mr-10 mb-10" color="primary" active>Primary link</Button>
						<Button className="mr-10 mb-10" color="success" active>Success Link</Button>
						<Button className="mr-10 mb-10" color="primary" disabled>Primary button</Button>
						<Button className="mr-10 mb-10" color="secondary" disabled>Button</Button>
					</RctCollapsibleCard>
				</div>
				<div className="col-sm-12 col-md-6">
					<RctCollapsibleCard
						heading={<IntlMessages id="widgets.buttonOutline" />}
					>
						<span className="sub-heading">Various Outline buttons for your project and using React button concept</span>
						<Button className="mr-10 mb-10" outline color="primary">Primary</Button>
						<Button className="mr-10 mb-10" outline color="secondary">Secondary</Button>
						<Button className="mr-10 mb-10" outline color="success">Success</Button>
						<Button className="mr-10 mb-10" outline color="info">Info</Button>
						<Button className="mr-10 mb-10" outline color="warning">Warning</Button>
						<Button className="mr-10 mb-10" outline color="danger">Danger</Button>
						<Button className="mr-10 mb-10" outline color="link">Link</Button>
					</RctCollapsibleCard>
					<RctCollapsibleCard
						heading="Button Block"
					>
						<span className="sub-heading">React buttons with Full Width</span>
						<Button color="primary" block>Block level button</Button>
						<Button color="success" block>Block level button</Button>
					</RctCollapsibleCard>
				</div>
			</div>
		</div>
	);
}

export default RaisedButtons;
