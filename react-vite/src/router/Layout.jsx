import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Footer from "../components/Footer"
import Navigation from "../components/Navigation/Navigation";
import ScrollToTop from "../components/ScrollToTheTop";
import {Hourglass} from 'react-loader-spinner';

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <ScrollToTop />
        <Navigation />
        {isLoaded ? <Outlet /> : <Hourglass />}
        <Footer />
        <Modal />
      </ModalProvider>
    </>
  );
}
