"use client"
import { getFrontendUrl } from '@/app/utils/misc';
import React, { useEffect } from 'react'
import { Oval } from 'react-loader-spinner';

function LoginCallback() {
    useEffect(() => {
        fetch(getFrontendUrl() + "discord-back/login-callback", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: window.location.href.split('?code=')[1]
            }),
            credentials: 'include',
        }).then(async (res) => {
            var res_copy = res.clone()
            var res_json = await res.json()
            console.log(res_json)
            if (res_json.success === true) {
                window.location.href = '/dashboard';
            }
            else {
                var res_html = await res_copy.text()
                // Initialize the DOM parser
                var parser = new DOMParser();

                // Parse the text
                var doc = parser.parseFromString(res_html, "text/html");
                document.getElementById('error').innerHTML = doc;
            }
            // else {
            //     window.location.href = '/login';
            // }
        })
    }, []);
    return (
        <div className='loading'>
            <Oval color="var(--loading)" secondaryColor="var(--loading)" ariaLabel='loading' height={100} width={100} />
            <div id='error'>

            </div>
        </div >
    )
}

export default LoginCallback