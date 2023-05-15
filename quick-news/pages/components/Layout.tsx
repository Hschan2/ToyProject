import React from 'react'
import MoveUp from './MoveUp'
import Navbar from './Navbar'

export default function Layout({children} : {children: JSX.Element}) {

    return (
        <>
            <Navbar />
            <div>{children}</div>
            <MoveUp />
        </>
    )
}