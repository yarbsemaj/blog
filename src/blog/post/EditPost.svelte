<script>
	import Post from "./Post.svelte";
	import { onMount } from "svelte";
	import Fa from "svelte-fa";
	import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
	import { updatePosts } from "../../stores/posts";
	import { navigate } from "svelte-navigator";
	import { addAlert } from "../../stores/alerts";
	export let id;
	export let userTokenText;

	let post;
	let status;

	let loading = false;
	onMount(async () => {
		if (id) {
			const res = await fetch(
				`${process.env.baseURL}/blog/api/posts/${id}/edit`,
				{
					headers: {
						Authorization: `Basic ${userTokenText}`,
					},
				}
			);
			post = await res.json();
			status = post.status;
		} else {
			post = {
				title: "",
				description: "",
				body: "",
				image: `https://picsum.photos/1000/500`,
			};
		}
	});

	async function commit(status) {
		loading = true;
		if (id) {
			await update(status);
		} else {
			await save(status);
		}
		loading = false;
	}
	async function save(status) {
		post.status = status;
		try {
			let response = await (
				await fetch(`${process.env.baseURL}/blog/api/posts`, {
					method: "POST",
					headers: {
						Authorization: `Basic ${userTokenText}`,
					},
					body: JSON.stringify(post),
				})
			).json();
			if(!response.id){
				throw('save-error')
			}
			await updatePosts(userTokenText);
			addAlert("Post Created", "success");
			navigate(`/blog/post/${response.id}/edit`);
		} catch (e) {
			addAlert("Failed to create post", "danger");
		}
	}

	async function deletePost() {
		loading = true;
		try {
			await (
				await fetch(`${process.env.baseURL}/blog/api/posts/${id}`, {
					method: "DELETE",
					headers: {
						Authorization: `Basic ${userTokenText}`,
					},
				})
			).json();
			
			await updatePosts(userTokenText);
			addAlert("Post Removed", "success");
			navigate(`/blog/`);
		} catch (e) {
			addAlert("Failed to remove post", "danger");
		}
		loading = false;
	}

	async function update(status) {
		post.status = status;
		delete post.id;
		delete post.createdDate;
		try {
			let response = await (
				await fetch(`${process.env.baseURL}/blog/api/posts/${id}`, {
					method: "PUT",
					headers: {
						Authorization: `Basic ${userTokenText}`,
					},
					body: JSON.stringify(post),
				})
			).json();
			if(!response.id){
				throw('update-error')
			}
		
			await updatePosts(userTokenText);
			addAlert(`${post.title} Updated`, "success");
		} catch (e) {
			addAlert("Failed to update post", "danger");
		}
	}
</script>

<svelte:head>
	{#if post}
		<title>Edit:-{post.title}</title>
		<meta name="description" content={post.description} />
	{/if}
</svelte:head>

<div class="row">
	<div class="col">
		<Post {post} />
	</div>
	<div class="col">
		{#if post}
			<form class="d-flex flex-column h-100">
				<div class="mb-3">
					<label for="imageInput" class="form-label">Title</label>
					<input
						required
						id="imageInput"
						class="form-control"
						placeholder="Post title"
						bind:value={post.title}
					/>
				</div>
				<div class="mb-3">
					<label for="imageInput" class="form-label"
						>Short Description</label
					>
					<textarea
						required
						class="form-control"
						bind:value={post.description}
					/>
				</div>
				<div class="mb-3">
					<label for="imageInput" class="form-label">Hero Image</label
					>
					<input
						required
						id="imageInput"
						class="form-control"
						placeholder="https://example.com"
						bind:value={post.image}
					/>
				</div>
				<div class="mb-3 flex-grow-1 d-flex flex-column">
					<label required for="imageInput" class="form-label"
						>Body</label
					>
					<textarea
						class="form-control flex-grow-1"
						bind:value={post.body}
					/>
				</div>
				<div class="mb-3 d-flex justify-content-between">
					{#if loading}
						<div class="spinner-border" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					{:else}
						<div class="btn-group" role="group">
							<button
								type="button"
								class="btn btn-secondary"
								on:click={() => commit("draft")}
								>{#if post.status === "published"}Make Draft{:else}Save
									Draft{/if}</button
							>
							<button
								type="button"
								class="btn btn-info"
								on:click={() => commit("published")}
								>{#if post.status === "published"}
									Update{:else if id}Make Public{:else}Publish{/if}</button
							>
						</div>
						{#if id}
							<button
								type="button"
								on:click={deletePost}
								class="btn btn-danger"
								><Fa icon={faTrashAlt} /> Delete</button
							>
						{/if}
					{/if}
				</div>
			</form>
		{/if}
	</div>
</div>
