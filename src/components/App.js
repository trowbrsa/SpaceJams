import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import FirstTimeVisitorModal from './FirstTimeVisitorModal/FirstTimeVisitorModal';
// import Image from './Image/Image';
// import InformationModal from './InformationModal/InformationModal'
// import Track from './Track/Track';
import data from '../../dailyData.json';
import MainScreen from './MainScreen';

class App extends Component {
  constructor(){
    super();

    this.state = {
      // loading: true,
    }
  }


  componentDidMount(){
    // if (localStorage.getItem("takenTour") !== null) {
    //   this.setState({
    //     takenTour: true
    //   })
    // }
    // localStorage.setItem("takenTour", true);
  }

  render(){
    let display = null;
    // if(this.state.loading){
    //   display = <LoadingScreen/>
    // } else {
    display = <MainScreen />
    // }

    return(
      <div>
         {display}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
