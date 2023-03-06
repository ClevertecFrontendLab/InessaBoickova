import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter,Navigate,Route, Routes } from 'react-router-dom';

import { PrivateRoute } from './hoc/private-routes';
import { AuthorizationPage } from './pages/authorization-page/authorization-page';
import { BookPage } from './pages/book';
import { ForgotPassPage } from './pages/forgot-pass-page/forgot-pass-page';
import { MainPage } from './pages/main';
import { RegistrationPage } from './pages/registration-page/registration-page';
import { TermsPage } from './pages/terms-page/terms-page';
import { store } from './store/store';

import './index.scss'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
     // eslint-disable-next-line react/jsx-filename-extension
     <HashRouter>
       <Provider store={store}>
          <Routes>
              <Route path='/auth' element={<AuthorizationPage/>} />
              <Route path='/' element={<Navigate to="/auth"/>} />
              <Route path='/registration' element={<RegistrationPage/>} />
              <Route path='/forgot-pass' element={<ForgotPassPage/>} />
              <Route path='/books' element={
                <PrivateRoute>
                    <Route element= {<MainPage/>}>
                        <Route path='/books/:category' element={<MainPage/>}/>
                    </Route>
                    <Route path='/terms' element={<TermsPage text= "Правила пользования"/>}/>
                    <Route path='/contract'  element={<TermsPage text= "Договор оферты"/>}/>
                    <Route path='/profile' element={<MainPage/>}/>
                    <Route path='/exit'  element={<MainPage/>}/>
                    <Route path='/books/:category/:bookId' element={<BookPage />}/>

                </PrivateRoute>
              }/>
                
          </Routes>
        </Provider>
    </HashRouter>  
);

