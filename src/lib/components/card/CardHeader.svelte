<script>
  import IconButton from "$lib/components/button/IconButton.svelte";
  import Select from "$lib/components/select/Select.svelte";
  import { addQueryParam } from "$lib/utils/url";
  import { page } from "$app/stores";

  export let filters = [];
  export let title = "";
  export let caption = "";
  export let buttons = [];
  export let center = false;
  export let border = false;

  const filterIds = filters.map((filter) => {
    return filter.id;
  });

  filters.forEach((filter) => {
    const query_value = $page.url.searchParams.get(filter.id);

    if (query_value) {
      filter.value = query_value;
    }

    filter.options.forEach((option) => {
      if (option === "break" || option.onselect) {
        return option;
      } else {
        option.onselect = () => {
          addQueryParam(filter.id, option.value, { show_loading: filter.id, keep_only: filterIds });
        };
      }
    });
  });
</script>

{#if filters.length || title || caption || buttons.length}
  <div class="header" class:border={border === true || border === "true"} class:filters={filters.length > 0}>
    <div class="filters">
      {#each filters as filter}
        <div class="filter">
          <Select {...filter} />
        </div>
      {/each}
    </div>

    {#if title || caption}
      <div class="title" class:center>
        {#if title}
          <h6>{title}</h6>
        {/if}
        {#if caption}
          <p>{@html caption}</p>
        {/if}
      </div>
    {/if}

    <div class="buttons">
      {#each buttons as button}
        <div class="action">
          <IconButton {...button} />
        </div>
      {/each}
    </div>
  </div>
{:else}
  <div class="header" class:border>
    <slot>No header props provided</slot>
  </div>
{/if}

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .border {
    border-bottom: 1px solid var(--gray-light);
  }

  .center {
    text-align: center;
  }

  .title {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
  }

  .filters {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .buttons {
    display: flex;
    align-items: center;
  }

  .filter + .filter {
    margin-left: 1rem;
  }

  .action + .action {
    margin-left: 0.5rem;
  }

  p {
    color: var(--gray);
    margin-bottom: 0px;
  }

  h6 + p {
    margin-top: 0.5rem;
  }

  @media only screen and (max-width: 767px) {
    .header {
      padding-top: 1.25rem;
    }

    .header.filters {
      display: block;
    }

    .filters > .filter {
      margin-left: 0;
      margin-bottom: 1rem;
      width: 100%;
    }

    .filter:last-of-type {
      margin-bottom: 0rem;
    }
  }
</style>
