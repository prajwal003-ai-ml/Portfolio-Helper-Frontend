'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingComponent from '../components/Loading';
import api from '../axios';
import { User, useUserdata } from '../contexts/userdata';


const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');



  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const navigate = useRouter()

  const setUser = useUserdata(s=>s.setUser)

  const user:User = useUserdata(s=>s.user)

  useEffect(() => {
    if (!token) {
      setMessage('No token provided');
      setLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        setLoading(true);
       const data = await api.post('/auth/verify-email',{Token:token})

       setUser({...user,
        IsVerified:true
       })

       navigate.push('/admin')

      } catch (error: any) {
        setMessage(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  if (loading) return <LoadingComponent />;

  return (
    <div>
      {message}
    </div>
  );
};

export default Page;
