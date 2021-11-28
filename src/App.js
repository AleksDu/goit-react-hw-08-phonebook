import { lazy, Suspense, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Container from "./components/Container";
import AppBar from "./components/AppBar";
import LoaderComponent from "./components/LoaderComponent";
import { authOperations } from "./redux/auth";

// import s from "./App.module.css";
const HomePage = lazy(() =>
  import("./pages/HomePage" /*webpackChunkName: 'home-page' */)
);
const RegisterPage = lazy(() =>
  import("./pages/RegisterPage" /*webpackChunkName: 'register-page' */)
);
const LoginPage = lazy(() =>
  import("./pages/LoginPage" /*webpackChunkName: 'login-page' */)
);
const ContactsPage = lazy(() =>
  import("./pages/ContactsPage" /*webpackChunkName: 'contacts-page' */)
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage" /*webpackChunkName: 'not-found-page' */)
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authOperations.getUser());
  }, [dispatch]);

  return (
    <Container>
      <AppBar />

      <Suspense fallback={<LoaderComponent />}>
        <Switch>
          <PublicRoute path="/" exact>
            <HomePage />
          </PublicRoute>
          <PublicRoute path="/register" restricted redirectTo="/contacts">
            <RegisterPage />
          </PublicRoute>
          <PublicRoute path="/login" restricted redirectTo="/contacts">
            <LoginPage />
          </PublicRoute>
          <PrivateRoute path="/contacts" redirectTo="/login">
            <ContactsPage />
          </PrivateRoute>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>

      <ToastContainer autoClose={2500} position="top-right" />
    </Container>
  );
}

export default App;
