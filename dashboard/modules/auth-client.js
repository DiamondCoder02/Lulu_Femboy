const DiscordOauth2 = require("discord-oauth2");
const botId = process.env.ClientID;
const botSecret = process.env.ClientSecret;
const discordRedirect = process.env.discordRedirect;

const oauth = new DiscordOauth2({
	clientId: botId,
	clientSecret: botSecret,
	redirectUri: discordRedirect
});

const generateAuthURL = oauth.generateAuthUrl({
	scope: ["identify", "guilds"],
	prompt: "consent"
});

async function tokenRequest(code) {
	const token = await oauth.tokenRequest({
		code: code,
		scope: ["identify", "guilds"],
		grantType: "authorization_code"
	});
	return token;
}

module.exports.oauth = oauth;
module.exports.generateAuthURL = generateAuthURL;
module.exports.tokenRequest = tokenRequest;

/* AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
declare class OAuth extends EventEmitter {
	constructor(opts?: {
		version?: string;
		clientId?: string;
		redirectUri?: string;
		credentials?: string;
		clientSecret?: string;
		requestTimeout?: number;
		latencyThreshold?: number;
		ratelimiterOffset?: number;
	});
	on(event: "debug" | "warn", listener: (message: string) => void): this;
	tokenRequest(opts: {
		code?: string;
		scope: string[] | string;
		clientId?: string;
		grantType: "authorization_code" | "refresh_token";
		redirectUri?: string;
		refreshToken?: string;
		clientSecret?: string;
	}): Promise<OAuth.TokenRequestResult>;
	revokeToken(access_token: string, credentials?: string): Promise<string>;
	getUser(access_token: string): Promise<OAuth.User>;
	getUserGuilds(access_token: string): Promise<OAuth.PartialGuild[]>;
	getUserConnections(access_token: string): Promise<OAuth.Connection[]>;
	addMember(opts: {
		deaf?: boolean;
		mute?: boolean;
		roles?: string[];
		nickname?: string;
		userId: string;
		guildId: string;
		botToken: string;
		accessToken: string;
	}): Promise<OAuth.Member>;
	getGuildMember(
		access_token: string,
		guildId: string,
	): Promise<OAuth.Member>;
	generateAuthUrl(opts: {
		scope: string[] | string;
		state?: string;
		clientId?: string;
		prompt?: "consent" | "none";
		redirectUri?: string;
		responseType?: "code" | "token";
		permissions?: number;
		guildId?: string;
		disableGuildSelect?: boolean;
	}): string;
}
*/