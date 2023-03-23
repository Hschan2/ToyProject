import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Today from './Today';
import Weather from './Weather';
import { LinkStyle, Nav, NavDisplay, NavTitle, TimeWeather } from '../constants/styledComponents';

export default function Navbar() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    })

    if (!isMounted) {
        return null;
    }

    return (
        <Nav>
            <NavTitle>Quick News</NavTitle>
            <TimeWeather>
                <Today />
                <Weather />
            </TimeWeather>
            <NavDisplay>
                <Link href='/' passHref>
                    <LinkStyle isActive={router.pathname === '/'}>사회</LinkStyle>
                </Link>
                <Link href='/about' passHref>
                    <LinkStyle isActive={router.pathname === '/about'}>경제</LinkStyle>
                </Link>
                <Link href='/third' passHref>
                    <LinkStyle isActive={router.pathname === '/third'}>정치</LinkStyle>
                </Link>
                <Link href='/fourth' passHref>
                    <LinkStyle isActive={router.pathname === '/fourth'}>연예</LinkStyle>
                </Link>
                <Link href='/fifth' passHref>
                    <LinkStyle isActive={router.pathname === '/fifth'}>IT</LinkStyle>
                </Link>
            </NavDisplay>
        </Nav>
    )
}
