"use client"
import { getFrontendUrl } from '@/app/utils/misc';
import React, { useEffect } from 'react'
import { Oval } from 'react-loader-spinner';

function LoginCallback() {
    useEffect(() => {
        fetch(getFrontendUrl() + "discord-back/login-callback", {
            method: "POST",
            body: JSON.stringify({
                code: window.location.href.split('?code=')[1]
            }), credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + document.cookie.split('VeinAuth=')[1].split(';')[0],
            }
        }).then(async (res) => {
            var res_json = await res.json()
            console.log(res_json)
            //set cookie from data.token
            document.cookie = `VeinAuth=${res_json.data.token};path=/;max-age=86400;`;
            if (res_json.success === true) {
                window.location.href = '/dashboard';
            }
            else {
                window.location.href = '/';
            }
        })
    }, []);
    return (
        <div className='loading'>
            <Oval color="var(--loading)" secondaryColor="var(--loading)" ariaLabel='loading' height={100} width={100} />
            <div id='error'>
                
            </div>
        </div>
    )
}

export default LoginCallback