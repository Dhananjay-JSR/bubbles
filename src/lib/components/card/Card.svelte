<script>
  import { pageStore } from "$lib/stores/page.store";
  import CardHeader from "./CardHeader.svelte";
  import CardFooter from "./CardFooter.svelte";

  // import { scale, fade, fly } from "svelte/transition";
  // import { quintOut } from "svelte/easing";

  export let header = {};
  export let footer = {};
  export let py = 0.625;
  export let px = 2;
  export let color = "white";
  export let shadow = true;
  export let border = null;
  export let height100 = false;

  let style = "";

  if (px !== 2) {
    style += `padding-left:${px}rem;padding-right:${px}rem;`;
  }

  if (py !== 0.625) {
    style += `padding-top:${py}rem;padding-bottom:${py}rem;`;
  }

  let background = null;

  if (color) {
    style += `background:var(--${color});`;
    background = ``;
  }

  // in:fly={{ y: -50, duration: 250, delay: 300 }}
  // out:fly={{ y: -50, duration: 250 }}
</script>

<div class="card" class:shadow class:border class:height-100={height100} {style}>
  {#if header && Object.keys(header).length}
    <CardHeader {...header} />
  {/if}
  <div class="body" class:height-100={height100}>
    <slot />
  </div>

  {#if footer && Object.keys(footer).length}
    <CardFooter {...footer} />
  {/if}
</div>

<style>
  .card {
    position: relative;
    padding: 0.625rem 2rem 0.625rem;
    border-radius: 1.5rem;
    background: var(--white);
  }

  .shadow {
    -webkit-box-shadow: rgba(227, 230, 236, 0.65) 0px 0px 6.875rem;
    -moz-box-shadow: rgba(227, 230, 236, 0.65) 0px 0px 6.875rem;
    box-shadow: rgba(227, 230, 236, 0.65) 0px 0px 6.875rem;
  }

  .border {
    border: 1px solid var(--gray-light);
  }

  .height-100 {
    height: 100%;
  }

  @media only screen and (max-width: 767px) {
    .card {
      padding: 1rem;
    }
  }
</style>
