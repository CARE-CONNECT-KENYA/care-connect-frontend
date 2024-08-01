'use client'

import React,{useState,useEffect} from 'react'

type Users ={
    id: number;
    fullname: string;
    email: string;
    role : string;

};


function Allusers() {
    const[users, setUsers] = useState<Users[]>([]);

    useEffect(() =>{
        const fetchUsers = async () =>{
            try{
                const response = await fetch('care/superadmin/users', {
                    method: 'GET',
                    headers: {
                        'content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`, 
                    },

                });

            
            if (!response.ok){
                throw new Error('Failed to fetch providers')
            }
            const data = await response.json();
            setUsers(data);

        } catch(error){
            console.error('Error fetching users:', error);
        }
    };

        fetchUsers();

    }, []);
  
  return (
    <div>
        {users.map(users =>(
            <div key={users.id}>
                <ul>
                    <li>{users.fullname} | {users.role} | {users.email}</li>
                </ul>

            </div>

        ))}
      
    </div>
  )
}

export default Allusers
