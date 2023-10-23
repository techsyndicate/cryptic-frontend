"use client"
import React, { useEffect } from 'react'
import { Oval } from 'react-loader-spinner';

const urlPrefix = () => {
    return "http://localhost:4000/"
}

function LoginCallback() {
    useEffect(() => {
        fetch(urlPrefix() + "discord-back/register-callback", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                code: window.location.href.split('?code=')[1]
            },
            credentials: 'include',
        }).then((res) => {
            console.log(res.data)
            if (res.data.success === true) {
                window.location.href = '/profile';
            }
            else {
                window.location.href = '/login';
            }
        })
    }, []);
    return (
        <div className='loading'>
            <Oval color="var(--loading)" secondaryColor="var(--loading)" ariaLabel='loading' height={100} width={100} />
        </div >
    )
}

export default LoginCallback