'use server';

import { auth, db } from '@/firebase/admin';
import { User } from '@firebase/auth';
import { cookies } from 'next/headers';

interface SignUpParams {
    uid: string;
    email: string;
    password: string;
    name: string;
}

interface SignInParams {
    email: string;
    idToken: string;
    password: string;
}

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
    const { uid, email, name } = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();

        if (userRecord.exists) {
            return {
                success: false,
                message: 'User already exists'
            };
        }

        await db.collection('users').doc(uid).set({
            email,
            name
            // don't store password in Firestore — Firebase Auth already handles it securely
        });

        return {
            success: true,
            message: 'User created successfully'
        };

    } catch (e: unknown) {
        console.error('Error signing up:', e);

        if (typeof e === 'object' && e !== null && 'code' in e && e.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: 'Email already exists'
            };
        }
        return {
            success: false,
            message: 'Failed to create an account'
        };
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;
    try {
        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord) {
            return {
                success: false,
                message: 'User does not exist'
            };
        }
        await setSessionCookie(idToken);
        return {
            success: true,
            message: 'Signed in successfully'
        };

    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: 'Failed to sign in'
        };
    }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000, // createSessionCookie wants milliseconds
  });

  cookieStore.set('session', sessionCookie, {
    maxAge: ONE_WEEK, 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });
}

export async function getCurrentUser():Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if(!sessionCookie) { return null; }
    try{
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if(!userRecord.exists) { return null; }

        return {
            ...userRecord.data(),
            id: userRecord.id,
        } as unknown as User;
    }catch (e){
        console.log(e)
        return null;
    }

}

export async function isAuthenticated(){
    const user = await getCurrentUser();

    return !!user;
}