import { writable } from 'svelte/store';

export const userToken = writable(window.localStorage.getItem('userToken'));


export const posts = writable([]);