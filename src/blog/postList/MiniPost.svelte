<script>
	import { navigate } from "svelte-navigator";
	import relativeDate from "tiny-relative-date";
	export let id;
	export let isLogedIn;
	export let title;
	export let description;
	export let image;
	export let createdDate;
	export let status;
</script>

<div
	style="cursor: pointer;"
	on:click={() => navigate(`/blog/post/${id}${isLogedIn ? "/edit" : ""}`)}
	class={`card mt-3${status === "draft" ? "bg-warning" : ""}`}
>
	<div
		style="background-image: url('{image}');"
		class="card-img-top"
		alt={title}
	/>
	<div class="card-body">
		<h4 class="card-title">{title}</h4>
		<p class="card-text">
			{description}
		</p>
	</div>
	<div class="card-footer text-end">
		{relativeDate(new Date(createdDate))}
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
