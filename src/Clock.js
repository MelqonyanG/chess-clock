import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    console.log("constructor");
    super(props);
    this.state = {
          myTime: this.secondsToTime(this.props.time),
          mySeconds: this.props.time,
          oppTime: this.secondsToTime(this.props.time),
          oppSeconds: this.props.time
        };
    this.myTimer = 0;
    this.oppTimer = 0;
    this.countDown = this.countDown.bind(this);
    this.countDownOpp = this.countDownOpp.bind(this);
    this.changeTurn = this.changeTurn.bind(this);
    this.newTime = this.newTime.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.myTimer = setInterval(this.countDown, 1000);
  }

  componentDidUpdate(prevProps){
    console.log("componentDidUpdate");
    if(prevProps.time !== this.props.time){
      console.log("componentDidUpdateIF");
      this.setState({
        myTime: this.secondsToTime(this.props.time),
        mySeconds: this.props.time,
        oppTime: this.secondsToTime(this.props.time),
        oppSeconds: this.props.time,
      });
      this.myTimer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    console.log("countDownMY");
    let seconds = this.state.mySeconds - 1;
    if (this.state.mySeconds > 0) {
      this.setState({
        myTime: this.secondsToTime(seconds),
        mySeconds: seconds,
      });
    }
    if (seconds === 0) {
      clearInterval(this.myTimer);
    }
  }

  countDownOpp() {
    console.log("countDownOPP");
    let seconds = this.state.oppSeconds - 1;
    if(this.state.oppSeconds > 0){
      this.setState({
        oppTime: this.secondsToTime(seconds),
        oppSeconds: seconds,
      });
    }
    if (seconds === 0) {
      clearInterval(this.oppTimer);
    }
  }

  newTime(){
    clearInterval(this.myTimer);
    clearInterval(this.oppTimer);
  }

  changeTurn(){
    clearInterval(this.myTimer);
    this.oppTimer = setInterval(this.countDownOpp, 1000);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  render() {
    console.log("render");
    return(
      <div className="container">
        <div className='row' style={{ minHeight: '100px'}}>
        dkfjas
        </div>
        <div className='row'>
          <div className='col-md-6' style={{backgroundColor: 'black', minHeight: '500px'}}>
          black
          </div>
          <div className='col-md-6' style={{backgroundColor: 'white', minHeight: '500px'}}>
          white
          </div>
        </div>
      </div>
      // <button>{this.state.myTime.m} : {this.state.myTime.s}</button>
      //   <button>{this.state.oppTime.m} : {this.state.oppTime.s}</button>
      //   <br/><br/>
      //   <button type="button" onClick={this.newTime} >newT</button>
      //   <button type="button" onClick={this.changeTurn} >Next</button>
    );
  }
}

export default Clock;
