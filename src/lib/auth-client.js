import { jwtClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    
    baseURL: "https://pet-adoption-platform-a188.vercel.app",
    plugins: [
        jwtClient()
    ]
})



export const { signIn, signUp, signOut, useSession } = authClient;