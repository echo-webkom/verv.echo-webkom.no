declare global {
	namespace App {
		interface Locals {
			user: import('$lib/server/auth').ValidateSessionResult['user'];
			session: import('$lib/server/auth').ValidateSessionResult['session'];
		}
	}
}

export {};
