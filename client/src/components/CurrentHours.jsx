import React from 'react';
import PropTypes from 'prop-types';
import Hours from './Hours';
import './CurrentHours.css';

export default class CurrentHours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extended: false,
      currDay: 'Sunday',
      time: '12:00 AM',
      isOpen: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  }


  componentDidMount() {
    const { times } = this.props;
    const { currDay } = this.state;
    this.updateDate();
    this.checkOpenStatus(times[currDay]);
  }

  checkOpenStatus(currentDayTimes) {
    const { time } = this.state;

    if (currentDayTimes !== 'Loading') {
      const regexFindHour = /(\d+):/;
      const currTimeHour = time.match(regexFindHour);
      if (time.includes('AM')) {
        const amOpeningHour = currentDayTimes[0].match(regexFindHour);
        if (+currTimeHour[1] > +amOpeningHour[1]) {
          this.setState({
            isOpen: true,
          });
        }
      }
      if (time.includes('PM')) {
        const pmOpeningHour = currentDayTimes[1].match(regexFindHour);
        if (+currTimeHour[1] < +pmOpeningHour[1]) {
          this.setState({
            isOpen: true,
          });
        }
      }
    }
  }

  updateDate() {
    const date = new Date();
    const dayOptions = { weekday: 'long' };

    this.setState({
      currDay: date.toLocaleDateString(date, dayOptions),
      time: date.toLocaleTimeString(),
    });
  }

  handleClick() {
    const { extended } = this.state;
    this.setState({
      extended: !extended,
    });
  }

  render() {
    const { times } = this.props;
    const { currDay, isOpen, extended } = this.state;
    const currentDayTimes = times[currDay];
    const openNow = (
      <div>
        <span className="hours-spacing"><span className="bold">Open Now</span></span>
         ·
        <span className="hours-spacing">{currentDayTimes[0]}</span>
         -
        <span className="hours-spacing">{currentDayTimes[1]}</span>
      </div>);
    const nextDay = this.days[(
      this.days.findIndex(findDay => findDay === currDay) + 1
    )] || this.days[0];
    const openTom = (
      <div>
        <span className="hours-spacing"><span className="bold">Closed Now</span></span>
         · Opens
        <span className="hours-spacing">{nextDay}</span>
         at
        <span className="hours-spacing">{times[nextDay][0]}</span>
      </div>);
    const allHours = extended
      ? "allHours"
      : null
    

    return (
      <div
        onClick={() => this.handleClick()}
        onKeyPress={() => this.handleClick()}
        role="presentation"
      >
        {isOpen ? openNow : openTom}
        <div id={allHours}>
          {
            extended && (
              this.days.map((day, index) => <Hours 
                key={`${new Date().getTime()}${index}`} 
                day={day} businessHours={times[day]} 
                currDay={currDay} />)
            )
          }
        </div>
      </div>
    );
  }
}

CurrentHours.propTypes = {
  times: PropTypes.shape({
    Friday: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    Monday: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    Saturday: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    Sunday: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    Thursday: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    Tuesday: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    Wednesday: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
};
