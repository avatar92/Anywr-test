import { Provider } from 'react-redux';
import store from './services/store';

const StoreProvider = ({ children }) => (
    <Provider store={store}>{children}</Provider>
);

export default StoreProvider;