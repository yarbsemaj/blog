<div class="card-img-top skeleton-box" alt="loading" />
<div class="card-body ">
	<div style="height: 26px; width: 70%;" class="card-title skeleton-box" />
	<div style="height: 24px; width: 100%;" class="card-title skeleton-box" />
	<div class="card-text">
		{#each Array(15) as _}
			<div
				style="height: 24px; width: {Math.floor(Math.random() * 60) +
					40}%;"
				class="card-title skeleton-box"
			/>
		{/each}
	</div>
</div>

<style type="scss">
	@import "../skelitonPost.scss";
	@import "./Post.scss"
</style>
