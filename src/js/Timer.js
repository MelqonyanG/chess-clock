import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
  }

  render() {
    return(
      <div className='col-md-6' style={{backgroundColor: this.props.bgColor, minHeight: '500px'}}>
        <span id={this.props.id}>
          <span id='wMin'>{this.props.time.m > 9 ? this.props.time.m : ('0' + this.props.time.m)}</span>:
          <span id='wSec'>{this.props.time.s > 9 ? this.props.time.s : ('0' + this.props.time.s)}</span>
        </span>
        <img src={this.props.imgPath} alt='keyleft' className='leftKey'/>
      </div>
    );
  }
}

export default Timer;
