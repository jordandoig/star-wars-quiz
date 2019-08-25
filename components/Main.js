import React from 'react';
import Router from 'next/router'

const SUCCESS_TEXT = 'CORRECT! Prepare for Reload...';
const FAILURE_TEXT = 'INCORRECT! Try again...';
const DELAY_DURATION = 2000;

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.reset = this.reset.bind(this);

    this.state = {
      answered: false,
      answerText: SUCCESS_TEXT
    };
  }

  render() {
    return (
      <main className='main centeredContainer'>
        <section className='optionsSection centeredContainer'>
          <section className='optionsContainer centeredContainer halfContainer' onClick={this.select.bind(this)}>
            {this.props.swPeople.map((person) => (
              <div key={person.name} className='optionRow centeredContainer'>{person.name}</div>
            ))}
          </section>
        </section>
        <section className='gifSection centeredContainer'>
          <section className='halfContainer centeredContainer'>
            <img src={this.props.gifUrl} alt='Star Wars Gif' title='Star Wars Gif' className='gif'/>
          </section>
        </section>
        {!!this.state.answered && (
          <div className='answerContainer centeredContainer'>
            <section className='answerModal halfContainer centeredContainer'>
              <div className='bigText'>{this.state.answerText}</div>
            </section>
          </div>
        )}
      </main>
    );
  }

  select(event) {
    const selection = event.target.innerText;
    if (selection === this.props.randoName) {
      this.setAnswer(true);
      setTimeout(this.reset, DELAY_DURATION);
    } else {
      this.setAnswer(false);
      setTimeout(this.closeModal, DELAY_DURATION);
    }
  }

  setAnswer(correct) {
    let answerText = FAILURE_TEXT;
    if (correct) {
      answerText = SUCCESS_TEXT;
    }
    this.setState({answerText, answered: true});
  }

  reset() {
    Router.push('/');
  }

  closeModal() {
    this.setState({answered: false});
  }
}