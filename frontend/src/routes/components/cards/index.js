/**
 * Cards
 */
import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  CardLink,
  CardGroup,
  CardImgOverlay
} from 'reactstrap';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

export default class Cards extends Component {
  render() {
    return (
      <div className="card-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.cards" />} match={this.props.match} />
        <RctCollapsibleCard
          heading={<IntlMessages id="widgets.simpleCards" />}
        >
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4 mb-30">
              <Card>
                <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/gallery-1.jpg')} alt="Card image cap" />
                <CardBody>
                  <CardTitle>Card Title</CardTitle>
                  <CardSubtitle>Card Subtitle</CardSubtitle>
                  <CardText>Some quick example text to build on the card title and make up the bulk of the cards content.</CardText>
                  <Button size="small" color="primary">Read More</Button>
                </CardBody>
              </Card>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 mb-30">
              <Card>
                <CardBody>
                  <CardTitle>Card Title</CardTitle>
                  <CardSubtitle>Card Subtitle</CardSubtitle>
                </CardBody>
                <img width="100%" className="img-fluid" src={require('Assets/img/gallery-7.jpg')} alt="Card cap" />
                <CardBody>
                  <CardText>Some quick example text to build on the card title and make up the bulk of the cards content.</CardText>
                  <CardLink href="javascript:void(0);" color="primary">Card Link</CardLink>
                  <CardLink href="javascript:void(0);" color="primary">Another Link</CardLink>
                </CardBody>
              </Card>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 mb-30">
              <Card>
                <CardBody>
                  <CardTitle>Card Title</CardTitle>
                  <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                  <CardText>
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </CardText>
                </CardBody>
                <CardImg bottom width="100%" className="img-fluid" src={require('Assets/img/gallery-9.jpg')} alt="Card image cap" />
              </Card>
            </div>
          </div>
        </RctCollapsibleCard>
        <RctCollapsibleCard
          heading={<IntlMessages id="widgets.backgroundVarient" />}
        >
          <div className="row">
            <div className="col-sm-12 col-md-4 mb-30">
              <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button color="light">Button</Button>
              </Card>
            </div>
            <div className="col-sm-12 col-md-4 mb-30">
              <Card body inverse color="primary">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button color="light">Button</Button>
              </Card>
            </div>
            <div className="col-sm-12 col-md-4 mb-30">
              <Card body inverse color="success">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button color="light">Button</Button>
              </Card>
            </div>
            <div className="col-sm-12 col-md-4 mb-30">
              <Card body inverse color="info">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button color="light">Button</Button>
              </Card>
            </div>
            <div className="col-sm-12 col-md-4 mb-30">
              <Card body inverse color="warning">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button color="light">Button</Button>
              </Card>
            </div>
            <div className="col-sm-12 col-md-4 mb-30">
              <Card body inverse color="danger">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button color="light">Button</Button>
              </Card>
            </div>
          </div>
        </RctCollapsibleCard>
        <RctCollapsibleCard
          heading={<IntlMessages id="widgets.cardOutline" />}
        >
          <div className="row">
            <div className="col-sm-12 col-md-4 mb-30">
              <Card body outline color="secondary">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Button</Button>
              </Card>
            </div>
            <div className="col-sm-12 col-md-4 mb-30">
              <Card body outline color="primary">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button color="primary">Button</Button>
              </Card>
            </div>
            <div className="col-sm-12 col-md-4 mb-30">
              <Card body outline color="success">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button color="success">Button</Button>
              </Card>
            </div>
            <div className="col-sm-12 col-md-4 mb-30">
              <Card body outline color="info">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button color="info">Button</Button>
              </Card>
            </div>
            <div className="col-sm-12 col-md-4 mb-30">
              <Card body outline color="warning">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button color="warning">Button</Button>
              </Card>
            </div>
            <div className="col-sm-12 col-md-4 mb-30">
              <Card body outline color="danger">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button color="danger">Button</Button>
              </Card>
            </div>
          </div>
        </RctCollapsibleCard>
        <RctCollapsibleCard
          heading={<IntlMessages id="widgets.overlayCard" />}
        >
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-3 mb-30 b-50">
              <Card>
                <CardImg width="100%" src={require('Assets/img/gallery-10.jpg')} className="img-fluid" alt="Card image cap" />
                <CardImgOverlay className="gradient-primary">
                  <CardTitle>Card Title</CardTitle>
                  <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                </CardImgOverlay>
              </Card>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3 mb-30 b-50">
              <Card>
                <CardImg width="100%" src={require('Assets/img/gallery-9.jpg')} className="img-fluid" alt="Card image cap" />
                <CardImgOverlay className="gradient-warning">
                  <CardTitle>Card Title</CardTitle>
                  <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                </CardImgOverlay>
              </Card>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3 mb-30 b-50">
              <Card>
                <CardImg width="100%" src={require('Assets/img/gallery-7.jpg')} className="img-fluid" alt="Card image cap" />
							 <CardImgOverlay className="gradient-success">
                  <CardTitle>Card Title</CardTitle>
                  <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                </CardImgOverlay>
              </Card>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3 mb-30 b-50">
              <Card>
                <CardImg width="100%" src={require('Assets/img/gallery-8.jpg')} className="img-fluid" alt="Card image cap" />
                <CardImgOverlay className="gradient-danger">
                  <CardTitle>Card Title</CardTitle>
                  <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                </CardImgOverlay>
              </Card>
            </div>
          </div>
        </RctCollapsibleCard>
        <RctCollapsibleCard
          heading={<IntlMessages id="widgets.cardGroup" />}
        >
          <CardGroup>
            <Card>
              <CardImg top width="100%" className="img-fluid" src={require('Assets/img/gallery-2.jpg')} alt="Card image cap" />
              <CardBody>
                <CardTitle>Card Title</CardTitle>
                <CardSubtitle>Card Subtitle</CardSubtitle>
                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                <Button color="primary" size="sm">Read More</Button>
              </CardBody>
            </Card>
            <Card>
              <CardImg top width="100%" className="img-fluid" src={require('Assets/img/gallery-3.jpg')} alt="Card image cap" />
              <CardBody>
                <CardTitle>Card Title</CardTitle>
                <CardSubtitle>Card Subtitle</CardSubtitle>
                <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                <Button color="primary" size="sm">Read More</Button>
              </CardBody>
            </Card>
            <Card>
              <CardImg top width="100%" className="img-fluid" src={require('Assets/img/gallery-4.jpg')} alt="Card image cap" />
              <CardBody>
                <CardTitle>Card Title</CardTitle>
                <CardSubtitle>Card Subtitle</CardSubtitle>
                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
                <Button color="primary" size="sm">Read More</Button>
              </CardBody>
            </Card>
          </CardGroup>
        </RctCollapsibleCard>
      </div>
    );
  }
}
