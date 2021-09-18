<script>
	import { navigate } from "svelte-navigator";
	import MiniPost from "./MiniPost.svelte";
	import SkeletonPosts from "./SkeletonPost.svelte";
	export let published;
	export let drafts;
	export let isLogedIn;
</script>

<svelte:head>
	<title>James Dev Blog</title>
	<meta name="description" content="A blog for all things techy" />
</svelte:head>

<div class="row justify-content-md-center">
	<div class="col col-lg-6">
		{#if isLogedIn}
			<div
				style="cursor: pointer;"
				on:click={() => navigate(`/blog/post/new`)}
				class="card bg-primary mt-3"
			>
				<div
					style="background-image: url('/img/new-post.jpeg');"
					class="card-img-top"
					alt={"newPost"}
				/>
				<div class="card-body">
					<h4 class="card-title">Create a new post...</h4>
				</div>
			</div>
		{/if}
		{#if drafts}
			{#each drafts as item}
				<MiniPost {isLogedIn} {...item} />
			{/each}
		{/if}
		{#if published}
			{#each published as item}
				<MiniPost {isLogedIn} {...item} />
			{/each}
		{:else}
			{#each Array(3) as _}
				<SkeletonPosts />
			{/each}
		{/if}
	</div>
</div>

<style type="scss">
	@import "./MiniPost.scss";
	.card-img-top {
		background-position: center;
		background-size: cover;
		background-color: #aaaaaa;
	}
</style>
