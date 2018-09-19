/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import './index.css'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurant: null,
    };
  }

  componentDidMount() {
    this.getBusinessInfo(Math.floor(Math.random() * 100));
  }

  getBusinessInfo(id) {
    axios.get(`/api/restaurant/info/${id}`)
      .then((response) => {
        this.setState({
          restaurant: response.data,
        });
      });
  }


  render() {
    const { restaurant } = this.state;

    if (restaurant === null) {
      return <div />;
    }
    return (
      <div id="sticky">
        <Sidebar info={restaurant.businessInfo} />
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById('app'));
window.Info = App;
