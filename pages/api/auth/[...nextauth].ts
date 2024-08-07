import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Log the profile JSON
      console.log("Google profile JSON:", JSON.stringify(profile, null, 2));

      const { email, name } = user;
      const userData = {
        fullname: name!,
        email: email!,
        password: "Blueband@100",
      };

      try {
        // Check if the user already exists in your backend
        const checkResponse = await axios.post(`${process.env.FLASK_BACKEND_URL}/care/checkuser`, { email });

        if (checkResponse.data.exists) {
          // User exists, allow sign-in to proceed
          return true;
        } else {
          // User does not exist, add them
          const addResponse = await axios.post(`${process.env.FLASK_BACKEND_URL}/care/addusers`, userData);

          if (addResponse.status === 201) {
            console.log("User successfully added to backend.");
            return true;
          } else {
            console.error("Error adding user to backend:", addResponse.data);
            return false;
          }
        }
      } catch (error) {
        console.error("Error connecting to backend:", error);
        return false;
      }
    }
  },
  debug: true // Enable debug logging
};

export default NextAuth(authOptions);
