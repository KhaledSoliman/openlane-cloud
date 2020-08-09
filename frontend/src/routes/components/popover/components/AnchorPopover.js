/**
 * Anchor Popover
 */
import React from 'react';
import { findDOMNode } from 'react-dom';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class AnchorPopover extends React.Component {
  state = {
    open: false,
    anchorEl: null,
    anchorOriginVertical: 'bottom',
    anchorOriginHorizontal: 'center',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'center',
    positionTop: 300, // Just so the popover can be spotted more easily
    positionLeft: 800, // Same as above
    anchorReference: 'anchorEl',
  };
  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };
  handleNumberInputChange = key => event => {
    this.setState({
      [key]: parseInt(event.target.value, 10),
    });
  };
  handleClickButton = () => {
    this.setState({
      open: true,
      anchorEl: findDOMNode(this.button),
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  button = null;

  render() {
    const { open, anchorEl, anchorOriginVertical, anchorOriginHorizontal, transformOriginVertical, transformOriginHorizontal, positionTop, positionLeft, anchorReference, } = this.state;
    return (
      <div className="popover-wrapper animated fadeInUp">
        <Button ref={node => { this.button = node; }}
          variant="raised" color="primary" className="text-white mb-30" onClick={this.handleClickButton} >
          Open Popover
              </Button>
        <Popover open={open} anchorEl={anchorEl} anchorReference={anchorReference} anchorPosition={{ top: positionTop, left: positionLeft }}
          onClose={this.handleClose}
          anchorOrigin={{ vertical: anchorOriginVertical, horizontal: anchorOriginHorizontal, }}
          transformOrigin={{ vertical: transformOriginVertical, horizontal: transformOriginHorizontal, }} >
          <Typography className="p-15">The content of the Popover.</Typography>
        </Popover>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">anchorReference</FormLabel>
              <RadioGroup row aria-label="anchorReference" name="anchorReference" value={this.state.anchorReference} onChange={this.handleChange('anchorReference')} >
                <FormControlLabel color="primary" value="anchorEl" control={<Radio />} label="anchorEl" />
                <FormControlLabel color="primary" value="anchorPosition" control={<Radio />} label="anchorPosition" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">anchorPosition.top</InputLabel>
              <Input id="position-top" type="number" value={this.state.positionTop} onChange={this.handleNumberInputChange('positionTop')} />
            </FormControl>
            &nbsp;
              <FormControl>
              <InputLabel htmlFor="position-left">anchorPosition.left</InputLabel>
              <Input id="position-left" type="number" value={this.state.positionLeft} onChange={this.handleNumberInputChange('positionLeft')} />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">anchorOrigin.vertical</FormLabel>
              <RadioGroup row aria-label="anchorOriginVertical" name="anchorOriginVertical" value={this.state.anchorOriginVertical} onChange={this.handleChange('anchorOriginVertical')} >
                <FormControlLabel color="primary" value="top" control={<Radio />} label="Top" />
                <FormControlLabel color="primary" value="center" control={<Radio />} label="Center" />
                <FormControlLabel color="primary" value="bottom" control={<Radio />} label="Bottom" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">transformOrigin.vertical</FormLabel>
              <RadioGroup row aria-label="transformOriginVertical" name="transformOriginVertical" value={this.state.transformOriginVertical} onChange={this.handleChange('transformOriginVertical')} >
                <FormControlLabel color="primary" value="top" control={<Radio />} label="Top" />
                <FormControlLabel color="primary" value="center" control={<Radio />} label="Center" />
                <FormControlLabel color="primary" value="bottom" control={<Radio />} label="Bottom" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">anchorOrigin.horizontal</FormLabel>
              <RadioGroup row aria-label="anchorOriginHorizontal" name="anchorOriginHorizontal" value={this.state.anchorOriginHorizontal} onChange={this.handleChange('anchorOriginHorizontal')} >
                <FormControlLabel color="primary" value="left" control={<Radio />} label="Left" />
                <FormControlLabel color="primary" value="center" control={<Radio />} label="Center" />
                <FormControlLabel color="primary" value="right" control={<Radio />} label="Right" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">transformOrigin.horizontal</FormLabel>
              <RadioGroup row aria-label="transformOriginHorizontal" name="transformOriginHorizontal" value={this.state.transformOriginHorizontal} onChange={this.handleChange('transformOriginHorizontal')} >
                <FormControlLabel color="primary" value="left" control={<Radio />} label="Left" />
                <FormControlLabel color="primary" value="center" control={<Radio />} label="Center" />
                <FormControlLabel color="primary" value="right" control={<Radio />} label="Right" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default AnchorPopover;
