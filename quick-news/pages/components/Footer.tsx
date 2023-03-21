import React from 'react'

function Footer() {

    return (
        <>
            <footer>
                <div>It was Developed with NextJS</div>
                <div>Copyright &copy; HONG SEONGCHAN</div>
            </footer>
            <style jsx>{`
                footer {
                    padding: 15px 0;
                    text-align: center;
                    color: rgba(0, 0, 0, 0.5);
                    font-size: 0.7rem;
                }
            `}</style>
        </>
    )
}

export default Footer