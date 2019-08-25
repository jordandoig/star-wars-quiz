import React from 'react';
import Router from 'next/router'
import Head from 'next/head';
import Loader from '../components/Loader';
import '../styles/main.scss';

export default class Index extends React.Component {
  componentDidMount() {
    Router.push('/quiz');
  }

  render() {
    return (
      <div>
        <Head>
          <title>Star Wars Quiz</title>
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
        </Head>

        <Loader />
      </div>
    );
  }
}
