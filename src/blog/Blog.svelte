<script>
	import { onDestroy } from "svelte";
	import { Router, Route, navigate } from "svelte-navigator";

	import "bootswatch/dist/darkly/bootstrap.min.css";
	import { userToken } from "../stores/user";

	import PostList from "./postList/PostList.svelte";
	import ViewPost from "./post/ViewPost.svelte";
	import EditPost from "./post/EditPost.svelte";
	import Login from "./Login.svelte";
	import AlertList from "../alerts/AlertList.svelte";
	import { posts, updatePosts } from "../stores/posts";

	let isLogedIn = false;
	let userTokenText = "";

	let published;
	let drafts;

	const unsubscribeUserToken = userToken.subscribe(async (value) => {
		isLogedIn = !!value;
		userTokenText = value;
		await updatePosts(userTokenText);
	});

	const unsubscribePosts = posts.subscribe(async (value) => {
		published = value.published;
		drafts = value.drafts;
	});

	onDestroy(unsubscribePosts);
	onDestroy(unsubscribeUserToken);

	function logout() {
		userToken.set(null);
		localStorage.removeItem("userToken");
	}

	let date = new Date();
</script>

<Router primary={false}>
	<div class="container">
		<AlertList />
		<div class="row justify-content-md-center">
			<div class="col col-lg-7 mt-3">
				<h1
					on:click={() => location.href='/blog/'}
					style="cursor: pointer;"
					class="display-3 py-2 text-center"
				>
					James' Dev Blog <img
						style="height: 1em;"
						alt="logo"
						src={"/img/logo.svg"}
					/>
				</h1>
			</div>
		</div>
		<Route path="/">
			<PostList {published} {drafts} {userTokenText} {isLogedIn} />
		</Route>
		<Route path="/login" component={Login} />
		<Route path="/post/new">
			<EditPost {userTokenText} />
		</Route>
		<Route path="/post/:id" component={ViewPost} />
		<Route path="/post/:id/edit" let:params>
			<EditPost id={params.id} {userTokenText} />
		</Route>

		<div class="row justify-content-center my-3 login-footer">
			<div class="text-center">
				<span style="cursor: pointer;" on:click={() => navigate("/")}
					>&copy; James Bray {date.getFullYear()}</span
				>
				{#if isLogedIn}
					<div
						style="cursor: pointer;"
						class="text-center"
						on:click={logout}
					>
						Logout
					</div>
				{:else}
					<div
						style="cursor: pointer;"
						class="text-center"
						on:click={() => navigate("/blog/login")}
					>
						Login
					</div>
				{/if}
			</div>
		</div>
	</div>
</Router>

<style>
	.login-footer {
		transition: height 0.5s;
		height: 30px;
		overflow: hidden;
	}
	.login-footer:hover {
		height: 60px;
	}
</style>
