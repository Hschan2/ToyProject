import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import Today from './Today';
import Weather from './Weather';
import { LinkStyle, Nav, NavDisplay, NavTitle, TimeWeather } from '../constants/styledComponents';

export default function Navbar() {
    const router = useRouter();

    return (
        <Nav>
            <NavTitle>Quick News</NavTitle>
            <TimeWeather>
                <Today />
                <Weather />
            </TimeWeather>
            <NavDisplay>
                <Link href='/' legacyBehavior>
                    <LinkStyle className={router.pathname === '/' ? 'active' : ''}>사회</LinkStyle>
                </Link>
                <Link href='/about' legacyBehavior>
                    <LinkStyle className={router.pathname === '/about' ? 'active' : ''}>경제</LinkStyle>
                </Link>
                <Link href='/third' legacyBehavior>
                    <LinkStyle className={router.pathname === '/third' ? 'active' : ''}>정치</LinkStyle>
                </Link>
                <Link href='/fourth' legacyBehavior>
                    <LinkStyle className={router.pathname === '/fourth' ? 'active' : ''}>연예</LinkStyle>
                </Link>
                <Link href='/fifth' legacyBehavior>
                    <LinkStyle className={router.pathname === '/fifth' ? 'active' : ''}>IT</LinkStyle>
                </Link>
            </NavDisplay>
        </Nav>
    )
}
