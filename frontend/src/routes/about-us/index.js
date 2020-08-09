/**
 * About Us Page
 */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import TestimonialSlider from './components/testimonial-slider';
import Clientslider from './components/client-slider';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import { RctCard } from 'Components/RctCard';

export default class AboutUS extends Component {
	render() {
		return (
			<div className="about-wrapper">
				<Helmet>
					<title>Reactify | About Us</title>
					<meta name="description" content="Reactify About Us Page" />
				</Helmet>
				<PageTitleBar title={<IntlMessages id="sidebar.aboutUs" />} match={this.props.match} />
				<div className="about-detail">
					<RctCard>
						<div className="row no-gutters row-eq-height align-items-center">
							<div className="col-sm-12 col-md-6 p-70">
								<div className="about-content align-items-center text-center">
									<span className="fw-bold d-block mb-20">Don’t worry, you’re in safe hands.</span>
									<h2 className="title mb-50">We are committed to our customers’ success from start to finish.</h2>
									<p className="fs-14 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since. Lorem Ipsum has been the industrys standard dummy text ever since. Lorem Ipsum is printing and typesetting simply dummy text.</p>
								</div>
							</div>
							<div className="col-sm-12 col-md-6">
								<div className="about-image">
									<img src={require('Assets/img/about-1.png')} alt="about gallery" className="img-fluid" width="743" height="495" />
								</div>
							</div>
						</div>
					</RctCard>
					<RctCard>
						<div className="row no-gutters row-eq-height align-items-center">
							<div className="col-sm-12 col-md-6 order-2 p-70">
								<div className="about-content align-items-center text-center">
									<span className="fw-bold d-block mb-20">Don’t worry, you’re in safe hands.</span>
									<h2 className="title mb-50">We are committed to our customers’ success from start to finish.</h2>
									<p className="fs-14">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since. Lorem Ipsum has been the industrys standard dummy text ever since. Lorem Ipsum is printing and typesetting simply dummy text.</p>
								</div>
							</div>
							<div className="col-sm-12 col-md-6 order-1">
								<div className="about-image">
									<img src={require('Assets/img/about-2.png')} alt="about gallery" className="img-fluid" width="743" height="495" />
								</div>
							</div>
						</div>
					</RctCard>
					<div className="row">
						<div className="col-sm-12 col-md-4">
							<RctCard>
								<div className="card-image">
									<img src={require('Assets/img/about-card-1.png')} alt="about card" className="img-fluid" width="485" height="323" />
								</div>
								<div className="card-content text-center p-30">
									<div className="section-title mb-40">
										<h3>Our Vision </h3>
									</div>
									<p>Vestibulum ultrices ligula sit amet augue interdum fermentum. Vestibulum sed nisi ornare, tincidunt ante et,
                  tempus metus. Nunc pellentesque purus odio, eu dictum mi luctus vitae. Class aptent taciti sociosqu ad litora
                  torquent per conubia nostra, per inceptos himenaeos. Maecenas fermentum interdum elit, </p>
								</div>
							</RctCard>
						</div>
						<div className="col-sm-12 col-md-4">
							<RctCard>
								<div className="card-image">
									<img src={require('Assets/img/about-card-2.png')} alt="about card" className="img-fluid" width="485" height="323" />
								</div>
								<div className="card-content text-center p-30">
									<div className="section-title mb-40">
										<h3>Our Mission</h3>
									</div>
									<p>Vestibulum ultrices ligula sit amet augue interdum fermentum. Vestibulum sed nisi ornare, tincidunt ante et,
                  tempus metus. Nunc pellentesque purus odio, eu dictum mi luctus vitae. Class aptent taciti sociosqu ad litora
                  torquent per conubia nostra, per inceptos himenaeos. Maecenas fermentum interdum elit, </p>
								</div>
							</RctCard>
						</div>
						<div className="col-sm-12 col-md-4">
							<RctCard>
								<div className="card-image">
									<img src={require('Assets/img/about-card-3.png')} alt="about card" className="img-fluid" width="485" height="323" />
								</div>
								<div className="card-content text-center p-30">
									<div className="section-title mb-40">
										<h3>Our Motivation</h3>
									</div>
									<p>Vestibulum ultrices ligula sit amet augue interdum fermentum. Vestibulum sed nisi ornare, tincidunt ante et,
                  tempus metus. Nunc pellentesque purus odio, eu dictum mi luctus vitae. Class aptent taciti sociosqu ad litora
                  torquent per conubia nostra, per inceptos himenaeos. Maecenas fermentum interdum elit, </p>
								</div>
							</RctCard>
						</div>
					</div>
					<RctCard customClasses="p-60">
						<TestimonialSlider />
					</RctCard>
					<RctCard customClasses="p-60">
						<Clientslider />
					</RctCard>
				</div>
			</div>
		);
	}
}
