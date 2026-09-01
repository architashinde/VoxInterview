'use server';

import { auth, db } from '@/firebase/admin';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import error from 'next/dist/api/error';
import { cookies } from 'next/headers';


interface SignUpParams {
    uid: string;
    email: string;
    password: string;
}

interface SignInParams {
    email: string;
    idToken: string;
    password: string;
}

const ONE_WEEK = 60*60*24*7;

export async function signUp(params: SignUpParams) {
    const { uid, email, password } = params;

    try{
        const userRecord = await getDoc(doc(db, "users", uid));

        if(userRecord.exists()){
            return{
                success: false,
                message: 'User already exists'
            }
        }

        await setDoc(doc(db, 'users', uid), {
            email: email,
            name: name,
            password: password
        });

        return{
            success: true,
            message: 'User created successfully'
        }
        
    }catch(e: unknown){
        console.error('Error signing up:', e);

        if(typeof e === 'object' && e !== null && 'code' in e && e.code === 'auth/email-already-exists'){
            return{
                success: false,
                message: 'Email already exists'
            }

        }
        return{
            success: false,
            message: 'Failed to create an account'
        }
    }
    
} 

export async function signIn(params: SignInParams) {
    const { email, idToken, password } = params;
    try{
        const userRecord = await getDoc(doc(db, "users", email));

        if(!userRecord.exists()){
            return{
                success: false,
                message: 'User does not exist'
            }
        }
        await setSessionCookie(idToken);
        return{
            success: true,
            message: 'Signed in successfully'
        }

    }catch (e){
        console.log(e);
        return{
            success: false, 
            message: 'Failed to sign in'
        }

    }
}
export async function setSessionCookie(idToken:string){
     const cookieStore = await cookies();
     cookieStore.set('session', idToken, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
     })
}