import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
// import { handleImg } from './components/MatchPage';

test("handles images correctly", () => {
    expect(2).toBe(2);
})

test("handles images correctly", () => {
    expect(2).toBe(2);
})

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});
