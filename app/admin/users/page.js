"use client"
import { getFrontendUrl } from '@/app/utils/misc';
import { Notyf } from 'notyf';
import React, { useEffect, useState } from 'react'

export default function Page() {
    const [users, setUsers] = useState([]);

    function makeAdmin(id) {
        fetch('/admin/admin/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.success) {
                notyf.success(data.message);
            } else {
                notyf.error(data.message);
            }
        });
    }

    function banit(id) {
        fetch('/admin/banit/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.success) {
                notyf.success(data.message);
            } else {
                notyf.error(data.message);
            }
        });
    }
    useEffect(() => {
        var notyf = new Notyf({
            duration: 3000
        });

        fetch(getFrontendUrl() + 'admin/users', {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + document.cookie.split('VeinAuth=')[1].split(';')[0],
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            if (data.success) {
                setUsers(data.users);
            } else {
                notyf.error(data.message);
            }
        });
    }, [])

    return (
        <div className="users-container">
            {users?.map((user) => (
                <div key={user.name} style={{ display: 'flex' }}>
                    <div className="user-object">
                        <p>Name: {user.name}</p>
                        <p>School: {user.school}</p>
                        <p>
                            Discord: <a target="_blank" href={`https://discord.com/users/${user.id}`}>{user.discordUser.username}</a>
                        </p>
                        <p>Levels Completed: {user.completedLevels}</p>
                        <p>Levels Unlocked: {user.availableLevels}</p>
                        <p>Current Level: {user.current}</p>
                        <button onClick={() => makeAdmin(user._id)}>Admin: {user.admin}</button>
                        <button onClick={() => banit(user._id)}>Banned: {user.banned}</button>
                    </div>
                    <div>
                        <h1>Answer Log</h1>
                        {user?.answerlog?.map((log, index) => (
                            <div style={{ display: 'flex' }} key={index}>
                                <p>try: {log.try}</p>
                                <p>&nbsp;&nbsp; level: {log.level}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

    )
}
