import React from 'react'
import MoveUp from './btn/MoveUp'
import Navbar from './nav/Navbar'
import PageSizeButton from './btn/PageSizeButton'
import TimelineScroll from './page/TimelineScroll'

export default function Layout({ children }: { children: JSX.Element }) {
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
