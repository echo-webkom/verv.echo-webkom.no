import type { AuthState } from '$lib/states/auth-state.svelte';
import { getContext, setContext } from 'svelte';

export const AUTH_KEY = 'auth_key';

export const setAuthState = (authState: AuthState) => {
	setContext(AUTH_KEY, authState);
	return authState;
};

export const getAuthState = () => {
	return getContext<AuthState>(AUTH_KEY);
};
