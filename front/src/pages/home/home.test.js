import { screen, render,fireEvent,waitFor } from '@testing-library/react';
import Home from './index';
import StoreProvider from '../../storeProvider';


describe('Home compoenents test', () => {
    beforeEach(() => {
        render(<StoreProvider><Home /></StoreProvider>);
    });

    it('visibility test', () => {
        const container = screen.getByTestId(/home/i);
        expect(container).toBeInTheDocument();
    });
    it('test form submit', () => {
        const container = screen.getByTestId(/home/i);
        const usernameInput = screen.getByTestId(/username-input/i);
        const passwordInput = screen.getByTestId(/password-input/i);
        const form = screen.getByTestId(/form/i);

        fireEvent.change(usernameInput, { target: { value: 'safik' } })
        fireEvent.change(passwordInput, { target: { value: 'safik123' } })
        
        fireEvent.submit(form);
    });
})