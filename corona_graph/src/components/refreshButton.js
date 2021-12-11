import React from 'react'

const refreshButton = () => {

    const refreshPage = (e) => {
        e.preventDefault();

        window.location.reload();
    }

    return (
        <>
            <button onClick={refreshPage}>새로고침</button>
        </>
    )
}

export default refreshButton
