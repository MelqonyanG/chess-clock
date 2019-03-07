import React from 'react';
import { FaInfo } from 'react-icons/fa';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          whiteTime: this.secondsToTime(0),
          whiteSeconds: 0,
          blackTime: this.secondsToTime(0),
          blackSeconds: 0,
          turn: 'w',
          inc: 0,
          hover: false
        };
    this.whiteTimer = 0;
    this.blackTimer = 0;
    this.countDownWhite = this.countDownWhite.bind(this);
    this.countDownBlack = this.countDownBlack.bind(this);
    this.changeTurn = this.changeTurn.bind(this);
    this.changeMinutes = this.changeMinutes.bind(this);
    this.changeSeconds = this.changeSeconds.bind(this);
    this.changeIncrease = this.changeIncrease.bind(this);
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

  changeMinutes(){
    var minVal = document.getElementById("minutes").value;
    if (minVal){
      var minutes = parseInt(minVal);
      if (minutes > 60){
        document.getElementById("minutes").value = 60;
        minutes = 60;
      } else if (minutes < 0 ){
        document.getElementById("minutes").value = 0;
        minutes = 0;
      }
      var wSeconds = this.state.whiteSeconds + parseInt(minutes) * 60;
      var bSeconds = this.state.blackSeconds + parseInt(minutes) * 60;

      var newT = this.state.whiteTime;
      newT.m = minutes;
      this.setState({
        whiteTime: newT,
        blackTime: newT,
        whiteSeconds: wSeconds,
        blackSeconds: bSeconds
      });
    }
  }

  changeSeconds(){
    var secVal = document.getElementById("seconds").value;
    if (secVal){
      var seconds = parseInt(secVal);
      if (seconds > 59){
        document.getElementById("seconds").value = 59;
        seconds = 59;
      } else if(seconds < 0){
        document.getElementById("seconds").value = 0;
        seconds = 0;
      }
      var wSeconds = this.state.whiteSeconds + parseInt(seconds);
      var bSeconds = this.state.blackSeconds + parseInt(seconds);

      var newT = this.state.whiteTime;
      newT.s = seconds;
      this.setState({
        whiteTime: newT,
        blackTime: newT,
        whiteSeconds: wSeconds,
        blackSeconds: bSeconds
      });
    }
  }

  changeIncrease(){
    var incVal = document.getElementById("increase").value;
    if (incVal){
      var increase = parseInt(incVal);
      if (increase > 0){
        this.setState({
          inc: increase
        });
      }
    }
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


  handleMouseIn() {
    this.setState({ hover: true })
  }

  handleMouseOut() {
    this.setState({ hover: false })
  }

  render() {
    const tooltipStyle = {
        display: this.state.hover ? 'block' : 'none',
        backgroundColor: '#D8E1E2'
      };
    return(
      <div>
        <div>
          <span onMouseOver={this.handleMouseIn.bind(this)}
                onMouseOut={this.handleMouseOut.bind(this)}><FaInfo/></span>
          <div>
            <div style={tooltipStyle}>
              <p>Define minutes for per side in <b>minutes</b> field</p>
              <p>Define seconds for per side in <b>seconds</b> field</p>
              <p>Define increase for per side in <b>increase</b> field</p>
              <p>Start the clock with the <b>START</b> button</p>
              <p>Stop the clock with the <b>STOP</b> button</p>
              <p>Change turn with the <b>&rArr;</b> and <b>&lArr;</b> keys in your keyboard</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className='row' style={{ minHeight: '100px'}}>
            <div className='col-md-3' style={{minHeight: '100px'}}>
              <button className="btn btn-light btn-block" onClick={this.start}
                  style={{minHeight: '100px', fontSize:'40px'}}>START</button>
            </div>
            <div className='col-md-6 row' style={{minHeight: '100px'}}>
              <div className='col-md-4'>
                <input type='number' min='0' max='22' className="form-control"
                style={{minHeight: '100px', fontSize:'25px', textAlign: 'center'}}
                 placeholder='minutes' onInput={this.changeMinutes} id='minutes'/>
              </div>
              <div className='col-md-1'>
                <span style={{fontSize:'60px', textAlign: 'center'}}><b>:</b></span>
              </div>
              <div className='col-md-4'>
                <input className="form-control" type='number' min='0' max='22'
                style={{minHeight: '100px', fontSize:'25px', textAlign: 'center'}}
                placeholder='seconds' onInput={this.changeSeconds} id='seconds'/>
              </div>
              <div className='col-md-3'>
                <input className="form-control" type='number' min='0' max='22'
                style={{minHeight: '100px', fontSize:'25px', textAlign: 'center'}}
                placeholder='inc' onInput={this.changeIncrease} id='increase'/>
              </div>
            </div>
            <div className='col-md-3' style={{minHeight: '100px'}}>
              <button className="btn btn-light btn-block" onClick={this.stop}
                  style={{minHeight: '100px', fontSize:'40px'}}>STOP</button>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6' style={{backgroundColor: 'white', minHeight: '500px'}}>
              <span id='whiteTime'>
                <span id='wMin'>{this.state.whiteTime.m > 9 ? this.state.whiteTime.m : ('0' + this.state.whiteTime.m)}</span>:
                <span id='wSec'>{this.state.whiteTime.s > 9 ? this.state.whiteTime.s : ('0' + this.state.whiteTime.s)}</span>
              </span>
              <img src={require('./img/left.png')} alt='keyleft' className='leftKey'/>
            </div>
            <div className='col-md-6' style={{backgroundColor: 'black', minHeight: '500px'}}>
              <span id='blackTime'>
                <span id='bMin'>{this.state.blackTime.m > 9 ? this.state.blackTime.m : ('0' + this.state.blackTime.m)}</span>:
                <span id='bSec'>{this.state.blackTime.s > 9 ? this.state.blackTime.s : ('0' + this.state.blackTime.s)}</span>
              </span>
              <img src={require('./img/right.png')} alt='rightKey' className='rightKey'/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Clock;
