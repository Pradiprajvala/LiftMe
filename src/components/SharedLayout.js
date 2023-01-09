import { Outlet } from "react-router-dom";
import Header from "./Header";
import React from 'react'

const SharedLayout = () => {
    return(
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default SharedLayout;