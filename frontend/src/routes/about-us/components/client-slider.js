/**
 * Clients Slider
 */
import React, { Component } from "react";
import Slider from "react-slick";

// api
import api from 'Api';

export default class Clientslider extends Component {

  state = {
    clients: null
  }

  componentDidMount() {
    this.getClients();
  }

  // get clients
  getClients() {
    api.get('clients.js')
      .then((response) => {
        this.setState({ clients: response.data });
      })
      .catch(error => {
        // error handling
      })
  }

  render() {
    const { clients } = this.state;
    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      rtl: false,
      responsive: [
        {
          breakpoint: 1367,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div>
        <Slider {...settings}>
          {clients && clients.map((client, key) => (
            <div key={key}>
              <img src={client.photo_url} alt="client log" className="img-fluid" width="" height="" />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
