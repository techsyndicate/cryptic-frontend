"use client"
import React, { useEffect } from 'react'
import { Oval } from 'react-loader-spinner';

const urlPrefix = () => {
    return "http://localhost:4000/"
}

function LoginCallback() {
    useEffect(() => {
        fetch(urlPrefix() + "discord-back/login-callback", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: window.location.href.split('?code=')[1]
            }),
            credentials: 'include',
        }).then(async (res) => {
            res = await res.json()
            console.log(res)
            // if (res.success === true) {
            //     window.location.href = '/profile';
            // }
            // else {
            //     window.location.href = '/login';
            // }
        })
    }, []);
    return (
        <div className='loading'>
            <Oval color="var(--loading)" secondaryColor="var(--loading)" ariaLabel='loading' height={100} width={100} />
        </div >
    )
}

export default LoginCallback