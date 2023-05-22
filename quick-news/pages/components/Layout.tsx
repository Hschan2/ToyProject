import React from 'react'
import MoveUp from './MoveUp'
import Navbar from './Navbar'
import PageSizeButton from './PageSizeButton'
import TimelineScroll from './TimelineScroll'

export default function Layout({children} : {children: JSX.Element}) {

    return (
        <>
            <Navbar />
            <div>{children}</div>
            <MoveUp />
            <PageSizeButton />
            <TimelineScroll />
        </>
    )
}