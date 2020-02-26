import React from 'react';
import ReactDOM from 'react-dom';
import SCSS from './styles/app.scss';
import MainWrapper from "./components/MainWrapper.jsx";

const appData = {
  title: 'NDC MiniProject'
};

ReactDOM.render(
  <MainWrapper data={appData} />, document.getElementById('root')
);
