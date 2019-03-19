import React from 'react';
import AppInfo from './AppInfo';
import SetTime from './SetTime';
import Timer from './Timer';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          seconds: 0,
          whiteTime: this.secondsToTime(0),
          whiteSeconds: 0,
          blackTime: this.secondsToTime(0),
          blackSeconds: 0,
          turn: 'w',
          inc: 0
        };
    this.whiteTimer = 0;
    this.blackTimer = 0;
    this.countDownWhite = this.countDownWhite.bind(this);
    this.countDownBlack = this.countDownBlack.bind(this);
    this.changeTurn = this.changeTurn.bind(this);

    this.set_increase = this.set_increase.bind(this);
    this.set_seconds = this.set_seconds.bind(this);
    this.set_minutes = this.set_minutes.bind(this);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);

    window.addEventListener("keydown", this.changeTurn, true);
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

  set_increase(increase){
    this.setState({
      inc: increase
    });
  }

  set_seconds(seconds){
    const time = this.secondsToTime(this.state.seconds);
    const minutes = time.m;
    const newSeconds = seconds + minutes * 60;

    this.setState({
      seconds: newSeconds,
      whiteTime: this.secondsToTime(newSeconds),
      blackTime: this.secondsToTime(newSeconds),
      whiteSeconds: newSeconds,
      blackSeconds: newSeconds
    });
  }

  set_minutes(minutes){
    const time = this.secondsToTime(this.state.seconds);
    const seconds  = time.s;
    const newSeconds = minutes * 60 + seconds;

    this.setState({
      seconds: newSeconds,
      whiteTime: this.secondsToTime(newSeconds),
      blackTime: this.secondsToTime(newSeconds),
      whiteSeconds: newSeconds,
      blackSeconds: newSeconds
    });
  }


  start(){
    if(this.state.turn === 'w'){
      clearInterval(this.whiteTimer);
      document.getElementById('whiteTime').style.fontSize = '160px';
      document.getElementById('blackTime').style.fontSize = '120px';
      this.whiteTimer = setInterval(this.countDownWhite, 1000);
    }else{
      clearInterval(this.blackTimer);
      document.getElementById('whiteTime').style.fontSize = '120px';
      document.getElementById('blackTime').style.fontSize = '160px';
      this.blackTimer = setInterval(this.countDownBlack, 1000);
    }
  }

  stop(){
    clearInterval(this.whiteTimer);
    clearInterval(this.blackTimer);
    document.getElementById('whiteTime').style.fontSize = '120px';
    document.getElementById('blackTime').style.fontSize = '120px';
  }

  countDownWhite() {
    let seconds = this.state.whiteSeconds - 1;
    if (this.state.whiteSeconds > 0) {
      this.setState({
        whiteTime: this.secondsToTime(seconds),
        whiteSeconds: seconds,
      });
    }
    if (seconds === 0) {
      clearInterval(this.whiteTimer);
      document.getElementById('whiteTime').style.fontSize = '120px';
      document.getElementById('whiteTime').style.color = 'red';
    }
  }

  countDownBlack() {
    let seconds = this.state.blackSeconds - 1;
    if(this.state.blackSeconds > 0){
      this.setState({
        blackTime: this.secondsToTime(seconds),
        blackSeconds: seconds,
      });
    }
    if (seconds === 0) {
      clearInterval(this.blackTimer);
      document.getElementById('blackTime').style.fontSize = '120px';
      document.getElementById('blackTime').style.color = 'red';
    }
  }

  changeTurn(event){
    if(event.code === 'ArrowLeft'){
      if(this.state.turn === 'w'){
        let seconds = this.state.whiteSeconds + this.state.inc;
        this.setState({
          whiteTime: this.secondsToTime(seconds),
          whiteSeconds: seconds,
          turn: 'b',
        });
        clearInterval(this.whiteTimer);
        clearInterval(this.blackTimer);
        document.getElementById('whiteTime').style.fontSize = '120px';
        document.getElementById('blackTime').style.fontSize = '160px';
        this.blackTimer = setInterval(this.countDownBlack, 1000);
      }
    } else if(event.code === 'ArrowRight'){
      if(this.state.turn === 'b'){
        let seconds = this.state.blackSeconds + this.state.inc;
        this.setState({
          blackTime: this.secondsToTime(seconds),
          blackSeconds: seconds,
          turn: 'w'
        });
        clearInterval(this.blackTimer);
        clearInterval(this.whiteTimer);
        document.getElementById('whiteTime').style.fontSize = '160px';
        document.getElementById('blackTime').style.fontSize = '120px';
        this.whiteTimer = setInterval(this.countDownWhite, 1000);
      }
    }
  }

  render() {
    return(
      <div>
        <AppInfo />
        <div className="container">
          <SetTime currentSeconds={this.state.seconds} start={this.start} stop={this.stop}
              set_increase={this.set_increase} set_seconds={this.set_seconds} set_minutes={this.set_minutes} />

          <div className='row'>
            <Timer bgColor='white' id='whiteTime' time={this.state.whiteTime} imgPath={require('./../img/left.png')} />
            <Timer bgColor='black' id='blackTime' time={this.state.blackTime} imgPath={require('./../img/right.png')} />
          </div>
        </div>
      </div>
    );
  }
}

export default Clock;
