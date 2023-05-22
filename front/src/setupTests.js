// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { render,cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import store from './services/store';
import { Provider } from 'react-redux';

afterEach(() => {
    cleanup();
});

const StoreProvider = ({ children }) => (
    <Provider store={store}>{children}</Provider>
);

export const renderWithStore = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);

    return {
        user: userEvent.setup(),
        ...render(ui, { wrapper: StoreProvider }),
    };
};


