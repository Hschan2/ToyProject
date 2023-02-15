import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import localFont from '@next/font/local'
import Today from './Today';

const myFont = localFont({ src: '../fonts/NewsCycle-Bold.ttf' })

export default function Navbar() {
    const router = useRouter();

    return (
        <nav>
            <h1 className={myFont.className}>Quick News</h1>
            <Today />
            <div>
                <Link href='/' legacyBehavior>
                    <a className={router.pathname === '/' ? 'active' : ''}>사회</a>
                </Link>
                <Link href='/about' legacyBehavior>
                    <a className={router.pathname === '/about' ? 'active' : ''}>경제</a>
                </Link>
                <Link href='/third' legacyBehavior>
                    <a className={router.pathname === '/third' ? 'active' : ''}>정치</a>
                </Link>
                <Link href='/fourth' legacyBehavior>
                    <a className={router.pathname === '/fourth' ? 'active' : ''}>연예</a>
                </Link>
                <Link href='/fifth' legacyBehavior>
                    <a className={router.pathname === '/fifth' ? 'active' : ''}>IT</a>
                </Link>
            </div>
            <style jsx>{`
                h1 {
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    margin: 5px 0;
                    font-size: 30px;
                }
                nav {
                    display: flex;
                    gap: 10px;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 20px;
                    padding-bottom: 10px;
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
                    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
                }
                img {
                    max-width: 100px;
                    margin-bottom: 5px;
                }
                nav a {
                    width: 70px;
                    border: 1px solid rgba(0, 0, 0, 0.15);
                    border-radius: 20px;
                    font-weight: 600;
                    font-size: 18px;
                    margin: 0 2px;
                    padding: 5px 0;
                    text-align: center;
                }
                .active {
                    color: tomato;
                }
                nav div {
                    display: flex;
                    gap: 10px;
                }
            `}</style>
        </nav>
    )
}
