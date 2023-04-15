import { AuthOptions, DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord";

interface DiscordUser {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    locale: string;
    mfa_enabled: boolean;
    email: string;
    verified: boolean;
    premium_type: number;
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    discordInfo: DiscordUser;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: { params: { scope: "identify guilds email" } },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
        const resp = await fetch("https://discord.com/api/users/@me", {
          headers: {
            authorization: `Bearer ${token.accessToken}`,
          },
        }).then((e) => e.json());
        session.discordInfo = {
            id: resp.id,
            username: resp.username,
            avatar: resp.avatar,
            discriminator: resp.discriminator,
            locale: resp.locale,
            mfa_enabled: resp.mfa_enabled,
            email: resp.email,
            verified: resp.verified,
            premium_type: resp.premium_type,
        }
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    error: "/",
  },
};

export default NextAuth(authOptions);
