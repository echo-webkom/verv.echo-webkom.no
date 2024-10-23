import type { ValidateSessionResult } from '$lib/server/auth';

type User = ValidateSessionResult['user'];
type Session = ValidateSessionResult['session'];

export class AuthState {
	#user = $state<User>(null);
	#session = $state<Session>(null);

	constructor(user: User, session: Session) {
		this.#user = user;
		this.#session = session;
	}

	get isAuthenticated() {
		return this.#user !== null && this.#session !== null;
	}

	get user() {
		return this.#user;
	}

	get session() {
		return this.#session;
	}

	set user(user: User) {
		this.#user = user;
	}

	set session(session: Session) {
		this.#session = session;
	}
}
