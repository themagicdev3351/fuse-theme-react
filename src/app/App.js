import '@fake-db';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import history from '@history';
import { Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Auth } from './auth';
import withAppProviders from './withAppProviders';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FirebaseService from 'app/services/firebaseService';
import { useDispatch, useSelector } from 'react-redux';
import { users } from './auth/store/usersSlice';

// import firebaseService from 'app/services/firebaseService';
/**
 * Axios HTTP Request defaults
 */
axios.defaults.baseURL = 'http://127.0.0.1:8000';
// axios.defaults.headers.common = { "Access-Control-Allow-Origin": "http://127.0.0.1:8000" };
// axios.defaults.headers.post['X-CSRF-Token'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://127.0.0.1:8000';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';



const App = () => {

  return (
    <Auth>
      <Router history={history}>
        <FuseAuthorization>
          <FuseTheme>
            <SnackbarProvider
              maxSnack={5}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              classes={{
                containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99',
              }}
            >
              <FuseLayout />
            </SnackbarProvider>
          </FuseTheme>
        </FuseAuthorization>
      </Router>
    </Auth>
  );
};

export default withAppProviders(App)();
