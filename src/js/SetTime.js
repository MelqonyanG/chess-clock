import React from 'react';

class SetTime extends React.Component {
  constructor(props) {
    super(props);
    this.changeMinutes = this.changeMinutes.bind(this);
    this.changeSeconds = this.changeSeconds.bind(this);
    this.changeIncrease = this.changeIncrease.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentSeconds){
      this.setState({seconds: nextProps.currentSeconds});
    }
  }

  changeMinutes(){
    var minVal = document.getElementById("minutes").value;
    var minutes;
    if (minVal){
      minutes = parseInt(minVal);
      if (minutes > 59){
        document.getElementById("minutes").value = 59;
        minutes = 59;
      } else if (minutes <= 0 ){
        document.getElementById("minutes").value = 0;
        minutes = 0;
      }
    }else {
      minutes = 0;
    }

    this.props.set_minutes(minutes);
  }

  changeSeconds(){
    var secVal = document.getElementById("seconds").value;
    var seconds;
    if (secVal){
      seconds = parseInt(secVal);
      if (seconds > 59){
        document.getElementById("seconds").value = 59;
        seconds = 59;
      } else if(seconds < 0){
        document.getElementById("seconds").value = 0;
        seconds = 0;
      }
    }else{
      seconds = 0;
    }

    this.props.set_seconds(seconds);
  }

  changeIncrease(){
    var incVal = document.getElementById("increase").value;
    if (incVal){
      var increase = parseInt(incVal);
      if (increase < 0){
        increase = 0;
      }
    }else{
      increase = 0;
    }
    this.props.set_increase(increase);
  }


  render() {
    return(
      <div className='row' style={{ minHeight: '100px'}}>
        <div className='col-md-3' style={{minHeight: '100px'}}>
          <button className="btn btn-light btn-block" onClick={this.props.start}
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
          <button className="btn btn-light btn-block" onClick={this.props.stop}
              style={{minHeight: '100px', fontSize:'40px'}}>STOP</button>
        </div>
      </div>
    );
  }
}

export default SetTime;
