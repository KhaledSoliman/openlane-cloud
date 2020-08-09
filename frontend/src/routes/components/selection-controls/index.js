/**
 * Selection Controls
 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { pink } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box

import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const styles = {
	checked: {
		color: pink[500],
	},
	bgsuccess: {
		backgroundColor: '#25C975',
	},
	textsuccess: {
		color: '#25C975',
		'& + $bgsuccess': {
			backgroundColor: '#25C975',
		},
	},
	bgwarning: {
		backgroundColor: '#EEA222',
	},
	textwarning: {
		color: '#EEA222',
		'& + $bgwarning': {
			backgroundColor: '#EEA222',
		},
	},
	bgprimary: {
		backgroundColor: '#895DFF',
	},
	textprimary: {
		color: '#895DFF',
		'& + $bgprimary': {
			backgroundColor: '#895DFF',
		},
	},
	bgdanger: {
		backgroundColor: '#F04E6A',
	},
	textdanger: {
		color: '#F04E6A',
		'& + $bgdanger': {
			backgroundColor: '#F04E6A',
		},
	},
};

class SelectionControls extends React.Component {

	state = {
		checkedA: true,
		checkedB: false,
		checkedC: true,
		checkedD: true,
		checkedE: true,
		checkedJ: true,
		checkedM: true,
		checkedP: true,
		genderRadio1: 'male',
		genderRadio2: 'male',
		genderRadio3: 'male'
	};

	handleChange = name => (event, checked) => {
		this.setState({ [name]: checked });
	};

	handleChangeRadio = (e, key) => {
		this.setState({ [key]: e.target.value });
	}

	render() {
		const { classes } = this.props;
		return (
			<div className="selection-controls-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.selectionControls" />} match={this.props.match} />
				<div className="row">
					<RctCollapsibleCard
						colClasses="col-sm-6 col-md-6 col-xl-3"
						heading={<IntlMessages id="widgets.simpleCheckbox" />}
					>
						<FormGroup>
							<FormControlLabel control={
								<Checkbox color="primary" checked={this.state.checkedA} onChange={this.handleChange('checkedA')} value="checkedA" />
							} label="Option A"
							/>
							<FormControlLabel control={
								<Checkbox color="primary" checked={this.state.checkedB} onChange={this.handleChange('checkedB')} value="checkedB" />
							} label="Option B"
							/>
							<FormControlLabel control={
								<Checkbox color="primary" checked={this.state.checkedC} onChange={this.handleChange('checkedC')} value="checkedC" />
							} label="Option C"
							/>
						</FormGroup>
					</RctCollapsibleCard>
					<RctCollapsibleCard
						colClasses="col-sm-6 col-md-6 col-xl-3"
						heading={<IntlMessages id="widgets.interminateSelection" />}
					>
						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox color="primary" checked={this.state.checkedD} onChange={this.handleChange('checkedD')} value="checkedD" indeterminate />
								} label="Indeterminate 1"
							/>
							<FormControlLabel
								control={
									<Checkbox color="primary" checked={this.state.checkedE} onChange={this.handleChange('checkedE')} value="checkedE" indeterminate />
								} label="Indeterminate 2"
							/>
							<FormControlLabel
								control={
									<Checkbox color="primary" checked={this.state.checkedF} onChange={this.handleChange('checkedF')} value="checkedF" indeterminate />
								} label="Indeterminate 3"
							/>
						</FormGroup>
					</RctCollapsibleCard>
					<RctCollapsibleCard
						colClasses="col-sm-6 col-md-6 col-xl-3"
						heading={<IntlMessages id="widgets.disabledCheckbox" />}
					>
						<FormGroup>
							<FormControlLabel disabled control={<Checkbox value="checkedG" />} label="UnSelected" />
							<FormControlLabel disabled control={<Checkbox checked value="checkedH" />} label="Selected" />
							<FormControlLabel disabled control={<Checkbox value="checkedI" />} label="Disabled" />
						</FormGroup>
					</RctCollapsibleCard>
					<RctCollapsibleCard
						colClasses="col-sm-6 col-md-6 col-xl-3"
						heading={<IntlMessages id="widgets.customColorCheckbox" />}
					>
						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox color="primary" checked={this.state.checkedJ} onChange={this.handleChange('checkedJ')}
										classes={{ checked: classes.checked, }} value="checkedJ" />
								} label="custom color 1"
							/>
							<FormControlLabel
								control={
									<Checkbox color="primary" checked={this.state.checkedK} onChange={this.handleChange('checkedK')}
										classes={{ checked: classes.checked, }} value="checkedK" />
								} label="custom color 2"
							/>
							<FormControlLabel
								control={
									<Checkbox color="primary" checked={this.state.checkedL} onChange={this.handleChange('checkedL')}
										classes={{ checked: classes.checked, }} value="checkedL" />
								} label="custom color 3"
							/>
						</FormGroup>
					</RctCollapsibleCard>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-12 col-xl-6">
						<RctCollapsibleCard
							heading={<IntlMessages id="widgets.VerticalStyleCheckbox" />}
						>
							<FormGroup>
								<FormControlLabel control={
									<Checkbox color="primary" checked={this.state.checkedM} onChange={this.handleChange('checkedM')} value="checkedM" />
								} label="Option M"
								/>
								<FormControlLabel control={
									<Checkbox color="primary" checked={this.state.checkedN} onChange={this.handleChange('checkedN')} value="checkedN" />
								} label="Option N"
								/>
								<FormControlLabel control={
									<Checkbox color="primary" checked={this.state.checkedO} onChange={this.handleChange('checkedO')} value="checkedO" />
								} label="Option O"
								/>
							</FormGroup>
						</RctCollapsibleCard>
						<RctCollapsibleCard
							heading={<IntlMessages id="widgets.radioButtons" />}
						>
							<div className="rct-block-title">
								<div className="row">
									<div className="col-sm-12 col-md-5">
										<FormControl component="fieldset" required className={classes.formControl}>
											<FormLabel component="legend">Gender</FormLabel>
											<RadioGroup aria-label="gender" name="gender1" className={classes.group} value={this.state.genderRadio1}
												onChange={(e) => this.handleChangeRadio(e, 'genderRadio1')} >
												<FormControlLabel value="female" control={<Radio />} label="Female" />
												<FormControlLabel value="male" control={<Radio />} label="Male" />
												<FormControlLabel value="other" control={<Radio />} label="Other" />
												<FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
											</RadioGroup>
										</FormControl>
									</div>
									<div className="col-sm-12 col-md-7">
										<FormControl component="fieldset" required>
											<FormLabel component="legend">Gender</FormLabel>
											<RadioGroup row aria-label="gender" name="gender2" value={this.state.genderRadio2} onChange={(e) => this.handleChangeRadio(e, 'genderRadio2')} >
												<FormControlLabel value="male" control={<Radio />} label="Male" />
												<FormControlLabel value="female" control={<Radio />} label="Female" />
												<FormControlLabel value="other" control={<Radio />} label="Other" />
												<FormControlLabel value="disabled" disabled control={<Radio />} label="Disabled" />
											</RadioGroup>
										</FormControl>
									</div>
								</div>
							</div>
						</RctCollapsibleCard>
					</div>
					<div className="col-sm-12 col-md-12 col-xl-6">
						<RctCollapsibleCard
							heading={<IntlMessages id="widgets.horizontalStyleCheckbox" />}
						>
							<FormGroup row>
								<FormControlLabel control={
									<Checkbox color="primary" checked={this.state.checkedP} onChange={this.handleChange('checkedP')} value="checkedP" />
								} label="Option M"
								/>
								<FormControlLabel control={
									<Checkbox color="primary" checked={this.state.checkedQ} onChange={this.handleChange('checkedQ')} value="checkedQ" />
								} label="Option N"
								/>
								<FormControlLabel control={
									<Checkbox color="primary" checked={this.state.checkedR} onChange={this.handleChange('checkedR')} value="checkedR" />
								} label="Option O"
								/>
							</FormGroup>
						</RctCollapsibleCard>
						<div className="row">
							<RctCollapsibleCard
								colClasses="col-sm-12 col-md-6"
								heading={<IntlMessages id="widgets.disabledRadio" />}
							>
								<FormControl component="fieldset" required>
									<FormLabel component="legend">Gender</FormLabel>
									<RadioGroup aria-label="gender" name="gender3" value={this.state.value} onChange={this.handleChange} >
										<FormControlLabel value="male2" disabled control={<Radio />} label="Male" />
										<FormControlLabel value="female2" disabled control={<Radio />} label="Female" />
										<FormControlLabel value="other2" disabled control={<Radio />} label="Other" />
										<FormControlLabel value="disabled2" disabled control={<Radio />} label="Disabled" />
									</RadioGroup>
								</FormControl>
							</RctCollapsibleCard>
							<RctCollapsibleCard
								colClasses="col-sm-12 col-md-6"
								heading={<IntlMessages id="widgets.withError" />}
							>
								<FormControl component="fieldset" required error>
									<FormLabel component="legend">Gender</FormLabel>
									<RadioGroup aria-label="gender" name="gender4" value={this.state.genderRadio3} onChange={(e) => this.handleChangeRadio(e, 'genderRadio3')}>
										<FormControlLabel value="male" control={<Radio />} label="Male" />
										<FormControlLabel value="female" control={<Radio />} label="Female" />
										<FormControlLabel value="other" control={<Radio />} label="Other" />
										<FormControlLabel value="disabled" disabled control={<Radio />} label="Disabled" />
									</RadioGroup>
									<FormHelperText>You can display an error</FormHelperText>
								</FormControl>
							</RctCollapsibleCard>
						</div>
					</div>
				</div>
				<RctCollapsibleCard
					heading={<IntlMessages id="widgets.switches" />}
					contentCustomClasses="d-flex justify-content-between align-center"
				>
					<Switch checked={this.state.checkedA} onChange={this.handleChange('checkedA')} aria-label="checkedA" />
					<Switch checked={this.state.checkedB} onChange={this.handleChange('checkedB')} aria-label="checkedB"
						classes={{ checked: classes.textsuccess, bar: classes.bgsuccess, }} />
					<Switch checked={this.state.checkedC} onChange={this.handleChange('checkedC')} aria-label="checkedC"
						classes={{ checked: classes.textwarning, bar: classes.bgwarning, }} />
					<Switch checked={this.state.checkedD} onChange={this.handleChange('checkedD')} aria-label="checkedD"
						classes={{ checked: classes.textprimary, bar: classes.bgprimary, }} />
					<Switch checked={this.state.checkedE} onChange={this.handleChange('checkedE')} aria-label="checkedE"
						classes={{ checked: classes.textdanger, bar: classes.bgdanger, }} />
					<Switch checked={false} aria-label="checkedF" disabled />
					<Switch checked aria-label="checkedG" disabled />
				</RctCollapsibleCard>
			</div>
		);
	}
}

export default withStyles(styles)(SelectionControls);
