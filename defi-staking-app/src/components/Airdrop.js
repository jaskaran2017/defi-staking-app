import React, { Component } from "react";

export default class Airdrop extends Component {
  //Airdrop to have timer
  //it should initialize the countdown after customer have staked a certain amount of tethers
  //timer functionality, countdown, startTimer, state- fir the time to work

  constructor() {
    super();
    this.state = {
      time: {},
      seconds: 20,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }
  ////
  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  //////
  countDown() {
    // count one sec at a time
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    // stop count when timer hit zero
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  // time convert function
  secondsToTime(secs) {
    let hours, minutes, seconds;
    hours = Math.floor(secs / (60 * 60));

    let devisor_for_mint = secs % (60 * 60);
    minutes = Math.floor(devisor_for_mint / 60);

    let devisor_for_secs = devisor_for_mint % 60;
    seconds = Math.ceil(devisor_for_secs);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  componentDidMount() {
    let timeLeft = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeft });
  }

  airDropReleaseToken() {
    let stakingB = this.props.stakingBalance;
    if (stakingB >= "50000000000000000000") {
      this.startTimer();
    if ( this.state.seconds === 0) {
      this.props.rwdTokens();
    }
      // this.props.rwdTokens();
    }
    // let rwdB = this.props.rwdBalance;
    // if (stakingB >= "50000000000000000000" && this.state.seconds === 0) {
    // if ( this.state.seconds === 0) {
    //   this.props.rwdTokens();
    // }
  }

  render() {
    this.airDropReleaseToken();

    return (
      <div style={{ color: "black" }}>
        {this.state.time.m}:{this.state.time.s}
        {/* {this.startTimer()} */}
      </div>
    );
  }
}
