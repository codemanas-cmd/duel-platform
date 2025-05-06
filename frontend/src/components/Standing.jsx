import React from 'react'
import { useState } from 'react';
/*
-> shows cf like standing in same format
-> things needed : users array 
-> timestamp of a problem solved by user
-> keep track of wrong sub so can be added into penalty
-> have a button on top for refresh standings happens at
max every x/20 times in a duel where x is time for duel

*/
function Standing() {

    const [data,SetData] = useState([
        {rank:1, name:"manas", score:12,A:null, B:4, C:null},
        {rank:2, name:"shubham", score:10,A:null, B:null, C:null},
        {rank:3, name:"suresh",score:8,A:null, B:null, C:null},
        {rank:4, name:"kajal",score:8,A:null, B:2, C:null},
        {rank:5, name:"yo",score:8,A:1, B:null, C:null},
        {rank:0, name:"mahesh",score:8,A:null, B:null, C:9},
    ]);

    const problems = [
        {
            name:"A",
            url:"https://codeforces.com/problemset/problem/2072/F",
            points:1000,
        },
        {
            name:"B",
            url:"https://codeforces.com/problemset/problem/2072/F",
            points:1000,
        },
        {
            name:"C",
            url:"https://codeforces.com/problemset/problem/2072/F",
            points:1000,
        },
        {
            name:"C",
            url:"https://codeforces.com/problemset/problem/2072/F",
            points:1000,
        },
        {
            name:"C",
            url:"https://codeforces.com/problemset/problem/2072/F",
            points:1000,
        },
    ]

    const updateStanding = () => {
        const updatedData =  [...data].sort((a,b) => {
            return (a.rank < b.rank) ? -1 : 1;
        })

        SetData(updatedData)
    }
    return (
        <div className='flex-col p-22 w-full h-screen items-center justify-center'>
            <table className='w-full text-center border-2 border-gray-300 '>
                <thead className=' border-gray-300  '>
                    <tr className='font-bold  '>
                        <th className='p-3 border-r-2 border-gray-300 text-3xl '>#</th>
                        <th className='text-left border-r-2 border-gray-300 p-3 text-3xl'>Who</th>
                        <th className='border-r-2 border-gray-300 p-3 text-3xl'>=</th>
                        {
                            problems.map((prob)=>(
                                <th key={prob.name} className='flex-col text-center border-r-2 border-gray-300 p-3 gap-2 font-bold'>
                                    <a className=' text-blue-800 underline text-3xl' target='_new' href={prob.url}>{prob.name}</a>
                                    <div className='text-2xl font-bold'>{prob.points}</div>

                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody className='text-2xl'>
                    {
                        data.map((user,index) => (
                            <tr className={` ${index&1 ? '':'bg-gray-50' } border-2 h-20 border-gray-300 w-20`} key={user.name}>
                                <td className='border-r-1 border-gray-300 p-3'>{user.rank}</td>
                                <td className='font-bold text-red-800 text-left border-r-2 border-gray-300 p-3'>{user.name}</td>
                                <td className='font-bold border-gray-300 border-r-2 p-3'>{user.score}</td>
                                {
                                    
                                    problems.map((prob)=>(
                                        <td className='border-r-2 border-gray-300' key={prob.name}>
                                            <div className='font-bold text-green-600 text-4xl' >{user[prob.name]?'+' : ''}</div>
                                        </td>
                                        
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>

            </table>
            <button className='bg-gray-300 border-2 rounded font-bold p-4' onClick={updateStanding}>Update</button>
        </div>
        
        
    )
}

export default Standing