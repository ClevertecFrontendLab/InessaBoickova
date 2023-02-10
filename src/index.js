import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter,Navigate,Route, Routes } from 'react-router-dom';
import {applyMiddleware , compose,legacy_createStore as createStore} from 'redux';
import thunk from 'redux-thunk';

import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { TermsPage } from './pages/terms-page/terms-page';
import { reducer } from './reducer';

import './index.scss'; 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <React.StrictMode>
     <Provider store={store}>
     <HashRouter>
          <Routes>
            <Route path='/' element={<Navigate to="/books/all"/>} />
                <Route element= {<MainPage/>}>
                  <Route  path='/books' element={<Navigate to="/books/all"/>} />
                  <Route  path='/books/:category' element={<MainPage/>}/>
                </Route>
                <Route path='/terms' element={<TermsPage text= "Правила пользования"/>}/>
                <Route path='/contract'  element={<TermsPage text= "Договор оферты"/>}/>
                <Route path='/profile' element={<MainPage/>}/>
                <Route path='/exit'  element={<MainPage/>}/>
                <Route path='/books/:category/:bookId' element={<BookPage />}/>
          </Routes>
        </HashRouter>
     </Provider>
  </React.StrictMode>
);

