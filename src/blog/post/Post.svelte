<script>
	import SvelteMarkdown from "svelte-markdown";
	import Blockquote from "../../markdown/Blockquote.svelte";
	import Image from "../../markdown/Image.svelte";
	import Table from "../../markdown/Table.svelte";
	import SkeletonPost from "./SkeletonPost.svelte";
	export let post;

	let renders = {
		image: Image,
		table: Table,
		blockquote: Blockquote,
	};
</script>

<div class="card mt-2 blog-post">
	{#if post}
		<div
			style="background-image: url('{post.image}'); ;"
			class="card-img-top post-image"
			alt={post.title}
		/>
		<div class="card-body">
			<h1 class="card-title">{post.title}</h1>
			<p class="card-text">
				<SvelteMarkdown renderers={renders} source={post.body} />
			</p>
		</div>
	{:else}
		<SkeletonPost />
	{/if}
</div>

<style type="scss">
		@import "./Post.scss";

	.post-image {
		background-position: center;
		background-size: cover;
		background-color: #aaaaaa;
	
	}
</style>
