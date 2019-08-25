import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import '../styles/main.scss';

const STAR_WARS_PEOPLE_URL = 'https://swapi.co/api/people/';
const GIPHY_SEARCH_URL = `https://api.giphy.com/v1/gifs/search?lang=en&api_key=${process.env.GIPHY_API_KEY}&q=`;

const Quiz = props => (
  <div>
    <Head>
      <title>Star Wars Quiz</title>
      <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
      <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans&display=swap" rel="stylesheet"></link>
    </Head>

    <Header />
    <Main
      swPeople={props.swPeople}
      gifUrl={props.gifUrl}
      randoName={props.randoName}
    />
    <Footer />
  </div>
);

Quiz.getInitialProps = async () => {
  try {
    // const swPeople = await getThenRandomize(4); // More resilient to API changes, but SLOW
    const swPeople = await randomizeThenGet(4); // Hacky, but much faster
    const gifData = await sample(swPeople);
    return { swPeople, gifUrl: gifData.url, randoName: gifData.name }
  } catch (error) {
    Router.push('/'); // Restart if we encounter an error
  }
}

// Get all the people from the API and then select some of them randomly
async function getThenRandomize(count) {
  try {
    let result = [];
    // Get ALL the people
    const people = await recursivelyGet([], STAR_WARS_PEOPLE_URL);
    const totalPeople = people.length;
    // Pick some of them, but not more than there are
    while (result.length < count && result.length < totalPeople) {
      result = result.concat(people.splice(Math.floor(Math.random() * people.length), 1));
    }
    return result;
  } catch (error) {
    Router.push('/'); // Restart if we encounter an error
  }
}

// Request, incorporate, handle pagination
async function recursivelyGet(result, url) {
  try {
    // Fetch and format people from API
    const res = await fetch(url);
    const json = await res.json();
    // Merge new people into final result
    result = result.concat(json.results);
    // Check for next page
    if ( !!json.next ) {
      // Retrieve next page
      return recursivelyGet(result, json.next);
    }
    return result;
  } catch (error) {
    Router.push('/'); // Restart if we encounter an error
  }
}

// We know there are 87 people on the API with ids from 1 to 87
// If this changes then this function will break or omit people
async function randomizeThenGet(count) {
  const idArr = getUniqueRandoms(count, 1, 87);
  const ppl = await getWithIds(idArr);
  return ppl;
}

// Pick a set of random ids, but do not expect more than there are
function getUniqueRandoms(count, min, max) {
  const range = 1 + max - min;
  let result = [];
  while (result.length < count && result.length < range) {
    let int = Math.floor(Math.random() * range) + min;
    if (result.indexOf(int) === -1) {
      result.push(int);
    }
  }
  return result;
}

// Retreive the person's info for each id
async function getWithIds(idArr) {
  try {
    let result = [];
    for (let i = 0; i < idArr.length; i++) {
      const url = STAR_WARS_PEOPLE_URL + idArr[i];
      const res = await fetch(url);
      const json = await res.json();
      result.push(json);
    }
    return result;
  } catch (error) {
    Router.push('/'); // Restart if we encounter an error
  }
}

// Select a random person and get a gif based on their name
// Save the name to reference when the user makes a guess
async function sample(pplArr) {
  try {
    const rando = pplArr[Math.floor(Math.random() * pplArr.length)];
    const res = await fetch(GIPHY_SEARCH_URL + rando.name);
    const json = await res.json();
    return {
      url: json.data[0].images.original.url,
      name: rando.name
    };
  } catch (error) {
    Router.push('/'); // Restart if we encounter an error
  }
}

export default Quiz;
