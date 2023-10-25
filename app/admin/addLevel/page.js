"use client"
import React, { useEffect, useState } from 'react'
import {Notyf} from 'notyf';
import { getFrontendUrl } from '@/app/utils/misc';
import { getUser } from '@/app/utils/getData';

export default function Page() {

    const [user, setUser] = useState(null);
    useEffect(() => {
        getUser().then((data) => {
            setUser(data);
            console.log(data);
            if (!data.admin) {
                window.location.href = '/';
            }
        });
    }, []);
    function submit() {
        var notyf = new Notyf();

        var levelNumber = document.getElementById("levelNumber").value;
        var maintext = document.getElementById("maintext").value;
        var authfrom = document.getElementById("authfrom").value;
        var authfromphoto = document.getElementById("authfromphoto").value;
        var leveltype = document.getElementById("leveltype").value;
        var image = document.getElementById("image").value;
        var sourceCodeHint = document.getElementById("sourceCodeHint").value;
        var answer = document.getElementById("answer").value;

        var data = {
            levelNumber, maintext, authfrom, image, sourceCodeHint, answer, leveltype, authfromphoto
        };

        fetch(getFrontendUrl() + 'admin/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.success) {
                notyf.success(data.msg);
            } else {
                notyf.error(data.msg);
            }
        });
    }

    return (
        <div>
            <div class="field">
                <label for="levelNumber">levelNumber</label>
                <input type="number" id="levelNumber" name="levelNumber" placeholder="1" />
            </div>

            <div class="field">
                <label for="leveltype">leveltype</label>
                <textarea type="text" id="leveltype" name="leveltype" placeholder="Cryptic" />
            </div>

            <div class="field">
                <label for="authfrom">Auth from?</label>
                <textarea type="text" id="authfrom" name="authfrom" placeholder="Aayush Garg" />
            </div>

            <div class="field">
                <label for="authfrom">Auth from photo</label>
                <textarea type="text" id="authfromphoto" name="authfromphoto" placeholder="Aayush Garg" />
            </div>

            <div class="field">
                <label for="maintext">maintext</label>
                <textarea type="text" id="maintext" name="maintext" placeholder="this is a pro level" />
            </div>

            <div class="field">
                <label for="image">image link</label>
                <textarea type="text" id="image" name="image" placeholder="this is a not required link" />
            </div>

            <div class="field">
                <label for="sourceCodeHint">sourceCodeHint</label>
                <textarea type="text" id="sourceCodeHint" name="sourceCodeHint" placeholder="this is a not required hint" />
            </div>

            <div class="field">
                <label for="answer">answer</label>
                <input type="text" id="answer" name="answer" placeholder="this is a answer" />
            </div>

            <input type="button" value="proceed" onClick={submit} class="signup-button" />

        </div>
    )
}
