import React from 'react';
import { FaInfo } from 'react-icons/fa';

class AppInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }

    this.handleMouseIn = this.handleMouseIn.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
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
        backgroundColor: '#D8E1E2',
        width: '30%',
        position: 'fixed',
        zIndex: 10
      };
    return(
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
    );
  }
}

export default AppInfo;
