<script>
	import Post from "./Post.svelte";
	export let id;
	import { onMount } from "svelte";

	let post;
	onMount(async () => {
		const res = await fetch(`${process.env.baseURL}/blog/api/posts/${id}`);
		post = await res.json();
	});
</script>

<svelte:head>
	{#if post}
		<title>{post.title}</title>
		<meta name="description" content={post.description} />
	{/if}
</svelte:head>

<div class="row justify-content-md-center">
	<div class="col col-lg-7">
		<Post {post} />
	</div>
</div>
