import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import RouterApp from './routers/AppRouter';

const JournalApp = () => {
    return (
        <Provider store={store} >
            <RouterApp />
        </Provider>
    )
};

export default JournalApp;
