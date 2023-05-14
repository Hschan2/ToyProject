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
                    <LinkStyle isActive={router.pathname === '/'}>주요뉴스</LinkStyle>
                </Link>
                <Link href='/total' passHref>
                    <LinkStyle isActive={router.pathname === '/total'}>인기</LinkStyle>
                </Link>
                <Link href='/business' passHref>
                    <LinkStyle isActive={router.pathname === '/business'}>경제</LinkStyle>
                </Link>
                <Link href='/general' passHref>
                    <LinkStyle isActive={router.pathname === '/general'}>사회</LinkStyle>
                </Link>
                <Link href='/entertainment' passHref>
                    <LinkStyle isActive={router.pathname === '/entertainment'}>연예</LinkStyle>
                </Link>
                <Link href='/sports' passHref>
                    <LinkStyle isActive={router.pathname === '/sports'}>스포츠</LinkStyle>
                </Link>
                <Link href='/technology' passHref>
                    <LinkStyle isActive={router.pathname === '/technology'}>테크</LinkStyle>
                </Link>
                <Link href='/health' passHref>
                    <LinkStyle isActive={router.pathname === '/health'}>건강</LinkStyle>
                </Link>
                <Link href='/science' passHref>
                    <LinkStyle isActive={router.pathname === '/science'}>과학</LinkStyle>
                </Link>
            </NavDisplay>
        </Nav>
    )
}
