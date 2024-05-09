import { AuthProvider, useAuthContext } from './contexts/AuthProvider';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import {
  DefaultPage,
  EmailSentPage,
  HomePage,
  LoginPage,
  MePage,
  NotFoundPage,
  RecoverPasswordPage,
  ResetPasswordPage,
  UserPage,
} from '@pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmationModalProvider } from '@contexts/ConfirmationContext';

function Authenticated() {
  const location = useLocation();
  const { user, loading } = useAuthContext();

  if (loading) {
    return <>Loading, please wait...</>;
  }

  const isAuthenticated = !!user;
  return isAuthenticated ? (
    <DefaultPage />
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
            <Routes>
              <Route path="">
                <Route path="" element={<LoginPage />} />
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
                <Route path="/home" element={<HomePage />} />
                <Route path="dashboard" element={<>Dashboard Content</>} />
                <Route path="protected" element={<>Example protected page</>} />
                <Route
                  path="protected2"
                  element={<>Example protected page 2</>}
                />
              </Route>
            </Routes>
          </AuthProvider>
        </ConfirmationModalProvider>
      </BrowserRouter>
    </>
  );
}

export default App;