import React from 'react'
import Navbar from './Navbar'

export default function Layout({children} : {children: JSX.Element}) {
    return (
        <>
            <Navbar />
            <div>{children}</div>
        </>
    )
}