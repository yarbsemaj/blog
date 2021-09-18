<script>
	import { userToken } from "../stores/user.js";
	import { navigate } from "svelte-navigator";
	import { addAlert } from "../stores/alerts.js";

	let form = {
		uname: "",
		password: "",
	};

	async function login(event) {
		event.preventDefault();
		let token = btoa(`${form.uname}:${form.password}`);
		try {
			await fetch(`${process.env.baseURL}/blog/api/login`, {
				method: "POST",
				headers: {
					Authorization: `Basic ${token}`,
				},
			});
			window.localStorage.setItem("userToken", token);
			userToken.set(token);
			navigate("/blog/");
		} catch (e) {
			addAlert('Login Error', 'danger');
		}
	}
</script>

<div class="row justify-content-md-center">
	<div class="col col-lg-5 d-flex flex-column justify-content-center vh-100">
		<div class="card">
			<div class="card-body">
				<form on:submit={login}>
					<h1 class="h3 mb-3 fw-normal">Please sign in</h1>
					<div class="form-floating">
						<input
							type="text"
							class="form-control"
							id="floatingInput"
							placeholder="username"
							bind:value={form.uname}
						/>
						<label for="floatingInput">Username</label>
					</div>
					<div class="form-floating">
						<input
							type="password"
							class="form-control"
							id="floatingPassword"
							placeholder="Password"
							bind:value={form.password}
						/>
						<label for="floatingPassword">Password</label>
					</div>
					<button
						type="submit"
						class="w-100 btn btn-lg btn-primary mt-3"
						>Sign in</button
					>
				</form>
			</div>
		</div>
	</div>
</div>
