import HeaderComponent from '../shared/header';
import SideBarComponent from '../shared/sidebar';
import './layout.scss';
import 'sweetalert2/src/sweetalert2.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }: { children: any }) => {
  const location = useLocation();

  if (
    [`/login`, `/reset-password`, `/change-password`, `/check-otp`].includes(
      location.pathname
    )
  ) {
    return (
      <>
        <div>{children}</div>
        <ToastContainer autoClose={2000} />
      </>
    );
  }
  return (
    <div className="h-100vh overflow-hidden">
      <div className="h-100vh w-100">
        <div className="p-0">
          <div className="h-100vh d-flex w-100">
            <SideBarComponent />
            <div className="bg-layout h-100vh p-4 w-100 overflow-auto">
              <HeaderComponent />
              <ToastContainer autoClose={2000} />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
