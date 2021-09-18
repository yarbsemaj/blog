<script>
	import { Router, Route } from "svelte-navigator";
	import "bootswatch/dist/darkly/bootstrap.min.css";
	import Home from "./Home.svelte";
	import Blog from "./blog/Blog.svelte";
</script>

<Router primary={false}>
	<Route path="/" component={Home} />
	<Route path="/blog/*" component={Blog} />
</Router>
