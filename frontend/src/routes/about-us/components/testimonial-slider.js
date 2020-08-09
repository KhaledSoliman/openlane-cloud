/**
 * Testimonial Slider
 */
import React, { Component } from "react";
import Slider from "react-slick";

// api
import api from 'Api';

export default class TestimonialSlider extends Component {

	state = {
		testimonials: null
	}

	componentDidMount() {
		this.getTestimonials();
	}

	// get testimonials
	getTestimonials() {
		api.get('testimonials.js')
			.then((response) => {
				this.setState({ testimonials: response.data });
			})
			.catch(error => {
				// error handling
			})
	}

	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true
		};
		const { testimonials } = this.state;
		return (
			<div className="row">
				<div className="col-sm-10 col-md-10 col-lg-6 mx-auto text-center">
					<Slider {...settings}>
						{testimonials && testimonials.map((testimonial, key) => (
							<div key={key}>
								<div className="user-img mb-20">
									<img src={testimonial.avatar} alt="reviewer profile" className="d-inline-block img-fluid rounded-circle" width="86" height="86" />
								</div>
								<h3 className="mb-10">{testimonial.name}</h3>
								<h4 className="mb-10 text-muted">{testimonial.designation}</h4>
								<p>{testimonial.body}</p>
							</div>
						))}
					</Slider>
				</div>
			</div>
		);
	}
}
