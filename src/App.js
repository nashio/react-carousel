import React, { Component } from 'react';

const pics = [
  './assets/bread1.jpg',
  './assets/bread2.jpg',
  './assets/bread3.jpg',
  './assets/bread4.jpg',
];

class App extends Component {
  constructor(props) {
    super(props);
    const idxStart = 0;
    this.transitionSlide = this.transitionSlide.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.state = {
      current: idxStart,
      prev: this.getPrevIndex(idxStart),
      next: this.getNextIndex(idxStart)
    };
    // enable for autoplay
    // this.autoPlay = true;
  }

  getPrevIndex(idx) {
    if (idx <= 0) {
      return pics.length - 1;
    }
    return idx - 1;
  }

  getNextIndex(idx) {
    if (idx >= pics.length - 1) {
      return 0;
    }
    return idx + 1;
  }

  setIndexes(idx, dir) {
    this.setState({
      current: idx,
      prev: this.getPrevIndex(idx),
      next: this.getNextIndex(idx),
      dir
    });
  }

  transitionSlide(direction) {
    if (this.moving) return;
    // start animation
    this.setState({
      dir: direction,
      move: true
    });
    this.moving = true;

    // stop animation
    setTimeout(() => {
      this.setState({
        move: false
      });
      if (direction === 'next') {
        this.setIndexes(this.getNextIndex(this.state.current), 'next');
      } else {
        this.setIndexes(this.getPrevIndex(this.state.current), 'prev');
      }
      this.moving = false;
    }, 500);

  }

  componentDidMount() {
    if (this.autoPlay) {
      setInterval(this.handleNext, 2000);
    }
  }

  handlePrev() {
    this.transitionSlide('prev');
  }

  handleNext() {
    this.transitionSlide('next');
  }

  render() {
    const move = this.state.move ? 'move' : '';
    const dir = this.state.dir + '-dir';
    return (
      <div>
        <div className="carousel-mask">
          <div className={`pic-wrapper ${dir} ${move}`}>
            <div className="prev pic">
              <img src={pics[this.state.prev]} alt="" />
            </div>
            <div className="current pic">
              <img src={pics[this.state.current]} alt="" />
            </div>
            <div className="next pic">
              <img src={pics[this.state.next]} alt="" />
            </div>
          </div>
        </div>
        <div className="nav">
          <button onClick={this.handlePrev}>prev</button>
          <button onClick={this.handleNext}>next</button>
        </div>
      </div>
    );
  }
}

export default App;
