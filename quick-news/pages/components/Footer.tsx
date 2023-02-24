import React from 'react'

function Footer() {

    return (
        <>
            <div className='container'>
                <footer>
                    <div>It was Developed with React, Spring</div>
                    <div>Copyright &copy; HONG SEONGCHAN</div>
                </footer>
            </div>
            <style jsx>{`
                .container {
                    position: relative;
                    min-height: 100%;
                    padding-bottom: 70px;
                }
                .container footer {
                    position: absolute;
                    bottom: 0;
                    padding: 15px 0;
                    left: 50%;
                    transform: translateX(-50%);
                    text-align: center;
                    color: rgba(0, 0, 0, 0.5);
                    font-size: 0.7rem;
                }
            `}</style>
        </>
    )
}

export default Footer