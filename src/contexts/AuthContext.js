import React, { useContext, useEffect, useState } from 'react'
import {auth,db}  from '../firebase';
import firebase from 'firebase';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password, fullname,brandsProvider){
        return auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            db.collection("accounts").doc(auth.user.uid).set({
                fullname: fullname,
                email: auth.user.email,
                brandsProvider: brandsProvider,
                brandId: []

              });
        })

    }

    function signupWithGoogle(){
        var provider = new firebase.auth.GoogleAuthProvider();
     return auth.signInWithPopup(provider)
        .then(function (result){
            setCurrentUser(result.user)
        const usersRef = db.collection("accounts").doc(result.user.uid);

        usersRef.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            db.collection("accounts").doc(result.user.uid).set({
                fullname: result.user.displayName,
                email: result.user.email,
              });
          } 
        })
        });
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(()=>{
       const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe

    }, [])

    const value = {
        currentUser,
        login,
        signup,
        signupWithGoogle,
        logout,
        resetPassword
    }
    return (
        <AuthContext.Provider value={value} >
        {!loading && children}            
        </AuthContext.Provider>
    )
}