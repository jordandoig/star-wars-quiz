import React from 'react';

// const Main = props => {
//   return (
//     <main className='main centeredContainer'>
//       <section className='optionsContainer centeredContainer'>
//         <section onClick={select.bind(this)}>
//           {props.swPeople.map((person) => (
//             <div key={person.name}>{person.name}</div>
//           ))}
//         </section>
//       </section>
//       <section className='gifContainer centeredContainer'>
//         <img src={props.gifUrl} alt='Star Wars Gif' title='Star Wars Gif' className='gif'/>
//       </section>
//     </main>
//   );
// };

// function select(event) {
//   console.log(event.target.innerText);
//   console.log(event.target.innerText === Main.props.randoName);
// }

// export default Main;

export default class Main extends React.Component {
  render() {
    return (
      <main className='main centeredContainer'>
        <section className='optionsContainer centeredContainer'>
          <section onClick={this.select.bind(this)}>
            {this.props.swPeople.map((person) => (
              <div key={person.name} className='optionRow'>{person.name}</div>
            ))}
          </section>
        </section>
        <section className='gifContainer centeredContainer'>
          <img src={this.props.gifUrl} alt='Star Wars Gif' title='Star Wars Gif' className='gif'/>
        </section>
      </main>
    );
  }

  select(event) {
    const selection = event.target.innerText;
    if (!selection) {
      console.log('a swing and a miss');
      return;
    }
    if (selection === this.props.randoName) {
      this.success();
    } else {
      this.failure();
    }
  }

  success() {
    console.log('Good Job!');
  }

  failure() {
    console.log('You done fucked up!');
  }
}