import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const pics = [
	'./assets/bread1.jpg',
	'./assets/bread2.jpg',
	'./assets/bread3.jpg',
	'./assets/bread4.jpg',
];

class App extends React.Component {
	constructor(props) {
		super(props);
		const idxStart = 0;
		this.transitionSlide = this.transitionSlide.bind(this);
		this.handlePrev = this.handlePrev.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.state = {
			index: idxStart,
			prev: this.getPrevIndex(idxStart),
			next: this.getNextIndex(idxStart),
			move: false,
		};
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
			index: idx,
			prev: this.getPrevIndex(idx),
			next: this.getNextIndex(idx),
			dir
		});
	}

	transitionSlide(direction) {
		// start animation
		this.setState({
			move: true
		});
		// stop animation
		setTimeout(() => {
			this.setState({
				move: false
			});
			if (direction === 'next') {
				this.setIndexes(this.getNextIndex(this.state.index), 'next');
			} else {
				this.setIndexes(this.getPrevIndex(this.state.index), 'prev');
			}

		}, 500);

	}

	componentDidMount() {
		if (this.autoStart) {
			setInterval(this.transitionSlide, 2000);
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
				<div className="mask">
					<div className="pic-wrapper">
						<div className={`prev pic ${move} ${dir}`}>
							<img src={pics[this.state.prev]} alt="" />
						</div>
						<div className={`current pic ${move} ${dir}`}>
							<img src={pics[this.state.index]} alt="" />
						</div>
						<div className={`next pic ${move} ${dir}`}>
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
