import { AuthProvider, useAuthContext } from './contexts/AuthProvider';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import {
  EmailSentPage,
  HomePage,
  LoginPage,
  MePage,
  NotFoundPage,
  RecoverPasswordPage,
  ResetPasswordPage,
  RideOfferPage,
  SignupPage,
  UserPage,
} from '@pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmationModalProvider } from '@contexts/ConfirmationContext';
import { VehicleFormPage } from '@pages/Vehicle';

function Authenticated() {
  const location = useLocation();
  const { token, loading } = useAuthContext();

  if (loading) {
    return <>Loading, please wait...</>;
  }

  const isAuthenticated = !!token;
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <BrowserRouter>
        <ConfirmationModalProvider>
          <AuthProvider>
            <div className="row justify-center">
              <div className="col-sm-12 col-md-6">
                <Routes>
                  <Route path="">
                    <Route path="" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="recover_password">
                      <Route path="" element={<RecoverPasswordPage />} />
                      <Route path=":token" element={<ResetPasswordPage />} />
                    </Route>
                    <Route path="email_sent" element={<EmailSentPage />} />
                    <Route path="about" element={<>Example about page</>} />

                    <Route path="*" element={<NotFoundPage />} />
                  </Route>

                  <Route path="" element={<Authenticated />}>
                    <Route path="/me" element={<MePage />} />
                    <Route path="/users" element={<UserPage />} />

                    <Route path="home" element={<HomePage />} />
                    <Route path="ride_offer" element={<RideOfferPage />} />
                    <Route path="vehicle/add" element={<VehicleFormPage />} />
                  </Route>
                </Routes>
              </div>
            </div>
          </AuthProvider>
        </ConfirmationModalProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
