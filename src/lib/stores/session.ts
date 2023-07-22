import type { Session } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

export const session = writable<Session | null>(null);
