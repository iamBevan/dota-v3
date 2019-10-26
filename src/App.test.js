import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { handleImg } from './components/MatchPage';

test("handles images correctly", () => {

})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
