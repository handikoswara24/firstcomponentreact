import React from 'react';
import logo from './logo.svg';
import './App.css';
import Confirm from "./Confirm";

interface IState {
  confirmOpen: boolean;
  confirmMessage: string;
  confirmVisible: boolean;
  countDown: number;
}



class App extends React.Component<{}, IState> {
  private timer: number = 0;
  private renderCount: number = 0;

  constructor(props: {}) {
    super(props);
    this.state = {
      confirmOpen: false,
      confirmMessage: "Please hit the confirm button",
      confirmVisible: true,
      countDown: 10
    }
  }

  public static getDerivedStateFromProps(props: {}, state: IState) {
    console.log("getDerivedStateFromProps", props, state);
    return null;
  }

  private handleCancelConfirmOnClick = () => {
    this.setState({
      confirmOpen: false,
      confirmMessage: "Cool, carry on reading"
    });
    clearInterval(this.timer);
  };

  private handleOkConfirmOnClick = () => {
    this.setState({
      confirmOpen: false,
      confirmMessage: "Take a break, ...."
    });
    clearInterval(this.timer);
  };

  private handleConfirmClick = () => {
    this.setState({
      confirmOpen: true
    });
    clearInterval(this.timer);
  };

  private handleTimerTick() {
    this.setState({
      confirmMessage: `Please hit the confirm button ${this.state.countDown} secs to go`,
      countDown: this.state.countDown - 1
    }, () => {
      if (this.state.countDown <= 0) {
        clearInterval(this.timer);
        this.setState({
          confirmMessage: "Too late to confirm!",
          confirmVisible: false
        });
      }
    });

    if (this.state.countDown <= 0) {
      clearInterval(this.timer);
      this.setState({
        confirmMessage: "Too late to confirm!",
        confirmVisible: false
      });
    }
  }

  public componentDidMount() {
    this.timer = window.setInterval(() => {
      this.handleTimerTick();
    }, 1000);
  }

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  public getSnapshotBeforeUpdate(prevProps: {}, prevState: IState) {
    this.renderCount += 1;
    console.log("getSnapshotBeforeUpdate", prevProps, prevState, {
      renderCount: this.renderCount
    });
    return this.renderCount;
  }

  public componentDidUpdate(prevProps: {}, prevState: IState, snapshot: number) {
    console.log("componentDidUpdate", prevProps, prevState, snapshot, {
      renderCount: this.renderCount
    })
  }

  public shouldComponentUpdate(nextProps: {}, nextState: IState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    return true;
  }

  public render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header> */}
        <p>{this.state.confirmMessage}</p>
        { this.state.confirmVisible && <button onClick={this.handleConfirmClick}>Confirm</button>}
        <Confirm open={this.state.confirmOpen} title="React and Javascript" content="Are you sure you want to learn React and Typescript?"
          cancelOption="No Way" okCaption="Yes Plaese!" onCancelClick={this.handleCancelConfirmOnClick} onOkClick={this.handleOkConfirmOnClick} />
      </div>
    )
  }
}


export default App;
