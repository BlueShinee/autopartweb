import nextAuth from "next-auth"
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import Pocketbase from "pocketbase"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET =process.env.GOOGLE_CLIENT_SECRET

const authoption = {
    session:{
        strategy:"jwt"
    },
    providers:[
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks:{
        async SignIn(account ,profile){
            if (!profile?.email) {
                throw new Error("No Profile")
            }

            return true
        }
    }
}

const handler = NextAuth(authoption)
export {handler as GET,handler as POST}