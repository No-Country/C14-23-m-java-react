import React from 'react';
import NavBar from './navbar/NavBar';


function Layout({children}) {
    return (
       <>
        <NavBar />
        {children}
       </>

       
    );
}

export default Layout;