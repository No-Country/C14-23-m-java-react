import Navbar from './navbar/Navbar';
import { PropTypes } from 'prop-types';

function Layout({ children }) {
  Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;
