export default function DiscordLogin() {
    return (
        <div>
            <a href="https://discord.com/api/oauth2/authorize?client_id=426722888293548032&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fcallback&response_type=code&scope=identify%20email%20guilds">Login with Discord</a>
        </div>
    )
}