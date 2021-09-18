import { writable } from 'svelte/store';

export const posts = writable({ published: null, drafts: null });

export const updatePosts = async (userTokenText) => {
    if (userTokenText) {
        let data = await (
            await fetch(`${process.env.baseURL}/blog/api/posts/all`, {
                headers: {
                    Authorization: `Basic ${userTokenText}`,
                },
            })
        ).json();
        let published = data.published;
        let drafts = data.draft;
        posts.set({ published, drafts });
    } else {
        let published = (await (
            await fetch(`${process.env.baseURL}/blog/api/posts`)
        ).json()).published;
        posts.set({ published, drafts: [] });
    }
}