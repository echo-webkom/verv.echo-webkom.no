import type { OAuth2Tokens } from './oauth2';
import { createOAuth2Request, encodeBasicCredentials, sendTokenRequest } from './requests';

const authorizeEndpoint = 'https://auth.dataporten.no/oauth/authorization';
const tokenEndpoint = 'https://auth.dataporten.no/oauth/token';

export interface FeideTokens {
	accessToken: string;
	tokenType: string;
	expiresAt: number;
	scope: string;
	idToken: string;
}

export class Feide {
	#clientId: string;
	#clientSecret: string;
	#redirectURI: string;

	constructor(clientId: string, clientSecret: string, redirectURI: string) {
		this.#clientId = clientId;
		this.#clientSecret = clientSecret;
		this.#redirectURI = redirectURI;
	}

	public createAuthorizationURL(state: string, scopes: string[]): URL {
		const url = new URL(authorizeEndpoint);
		url.searchParams.set('response_type', 'code');
		url.searchParams.set('client_id', this.#clientId);
		url.searchParams.set('state', state);
		url.searchParams.set('scope', scopes.join(' '));
		url.searchParams.set('redirect_uri', this.#redirectURI);
		return url;
	}

	public async validateAuthorizationCode(code: string): Promise<OAuth2Tokens> {
		const body = new URLSearchParams();
		body.set('grant_type', 'authorization_code');
		body.set('code', code);
		body.set('redirect_uri', this.#redirectURI);
		const request = createOAuth2Request(tokenEndpoint, body);
		const encodedCredentials = encodeBasicCredentials(this.#clientId, this.#clientSecret);
		request.headers.set('Authorization', `Basic ${encodedCredentials}`);
		const tokens = await sendTokenRequest(request);
		return tokens;
	}
}

type FeideUser = {
	user: {
		userid_sec: [];
		userid: string;
		name: string;
		email: string;
		profilephoto: string;
	};
	audience: string;
};

export async function getFeideUser(
	accessToken: string
): Promise<{ id: string; email: string; name: string }> {
	const feideUser: FeideUser = await fetch('https://auth.dataporten.no/userinfo', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	}).then((r) => r.json());

	return {
		id: feideUser.user.userid,
		email: feideUser.user.email,
		name: feideUser.user.name
	};
}
