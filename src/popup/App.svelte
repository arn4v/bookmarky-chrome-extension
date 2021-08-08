<script>
	let token = null;
	let newToken = "";

	function getStoredToken() {
		chrome.storage.sync.get(["token"], function (result) {
			token = result?.token ?? null;
		});
	}

	function storeToken() {
		chrome.storage.sync.set({ token: newToken });
		getStoredToken();
	}

	getStoredToken();

	$: {
		if (token) {
			chrome.tabs.query(
				{
					active: true,
					currentWindow: true,
				},
				(tabs) => {
					const { title, url, index } = tabs[0];
					const params = new URLSearchParams();
					params.set("title", title);
					params.set("url", url);
					chrome.tabs.create({
						index: index + 1,
						url: `https://bookmarky.io/create?${params.toString()}`,
					});
					window.close();
				}
			);
		}
	}
</script>

<section>
	{#if false}
		<ul class="flex flex-col w-48 bg-gray-800 text-white py-4">
			<li class="w-full">
				<button class="items-center flex justify-center gap-2 w-full">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					Save tab
				</button>
			</li>
		</ul>
	{/if}

	<!-- {#if token === null} -->
	{#if false}
		<div
			class="bg-gray-800 text-white flex flex-col gap-4 items-center justify-center py-6 px-8"
		>
			<span class="text-lg whitespace-nowrap font-bold">
				Enter your API Token
			</span>
			<span
				>Learn how to obtain API token <a
					target="_blank"
					rel="noopener noreferrer"
					href="https://bookmarky.io/docs/generating-tokens"
					class="text-blue-400 hover:underline">here</a
				>.</span
			>
			<input
				bind:value={newToken}
				class="bg-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
			/>
			<button
				on:click={storeToken}
				class="bg-gray-600 rounded-md px-4 py-2 hover:bg-gray-500 transition"
			>
				Store token
			</button>
		</div>
	{/if}
</section>
