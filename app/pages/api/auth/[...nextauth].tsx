import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // Extract necessary user details
            const { email, name } = user;

            // Prepare data to send to your Flask backend
            const userData = {
                fullname: name,
                email: email,
                password: "", // You can generate a random password or leave it empty
                role: "normal"
            };

            try {
                // Check if the user already exists in your backend
                const response = await fetch('/care/addusers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                if (response.ok) {
                    // User was successfully added or already exists
                    return true;
                } else {
                    // Handle errors (e.g., user already exists, validation errors)
                    const errorData = await response.json();
                    console.error('Error adding user:', errorData);
                    return false;
                }
            } catch (error) {
                console.error('Error connecting to backend:', error);
                return false;
            }
        }
    }
});
