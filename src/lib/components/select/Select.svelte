<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import { pageStore, configStore } from "$lib/stores/stores";
  import { isValidInput } from "$lib/utils/form";
  import { configLabel } from "$lib/utils/config";
  import Dropdown from "$lib/components/dropdown/Dropdown.svelte";

  const _uuid = uuid();

  export let label = "Select an option";
  export let error = "An error occurred";
  export let value = null;
  export let options = [];
  export let desc = null;
  export let id = _uuid;
  export let search = options.length > 5 ? true : false;
  export let type = "select";
  export let validation = null;
  export let validate_on_blur = $configStore.validate_on_blur;
  export let vob = $configStore.validate_on_blur;
  export let min_width = true;

  const _label = configLabel(label, validation);

  let timestamp = 0;

  let title = "Select an option";
  let is_focused = false;
  let is_list_open = false;

  $: is_loading = $pageStore.loading.includes(id);
  $: is_error = $pageStore.errors && $pageStore.errors.findIndex((item) => item === id) >= 0 ? true : false;

  $: if (is_error) {
    setTimeout(() => {
      hideError();
    }, $configStore.error_delay);
  }

  $: if (value !== undefined) {
    const option = options.find((item) => item.value === value);

    if (option?.label) {
      title = option.label;
    }
  }

  $: if (value !== undefined) {
    is_list_open = false;
  }

  $: if (is_focused) {
    hideError();
  }

  function hideError() {
    $pageStore.errors = $pageStore.errors.filter((a) => a !== id);
  }

  function toggleSelectWithClick(event) {
    event.preventDefault();

    if (!is_focused) {
      is_focused = true;
    }

    //the focus event fires before the click event
    //check to make sure the focus event didn't open
    if (event.timeStamp - timestamp > 200) {
      if (!is_list_open) {
        is_list_open = true;
      } else {
        is_list_open = false;
      }
    }
  }

  function selectFocused(event) {
    $pageStore.clicked = _uuid;
    timestamp = event.timeStamp;
    is_focused = true;

    //if the search was open, the focus would be lost but we force the list open
    //so when we focus back, we want to close the list
    if (event?.relatedTarget && event?.relatedTarget?.classList.contains("search")) {
      is_list_open = false;
    } else {
      is_list_open = true;
    }
  }

  function selectBlurred(event) {
    if (event.relatedTarget && event.relatedTarget.classList.contains("search")) {
      return;
    }

    is_focused = false;
    is_list_open = false;

    if (validate_on_blur === true && vob === true) {
      if (validation && !isValidInput(value, validation)) {
        if ($pageStore.errors === undefined) {
          $pageStore.errors = [];
        }

        if (!$pageStore.errors.includes(id)) {
          $pageStore.errors.push(id);
          $pageStore.errors = $pageStore.errors;
        }
      }
    }
  }

  function keydown(event) {
    if ((event.key === "Enter" || event.key === " ") && is_focused && !is_list_open) {
      event.preventDefault();
      is_list_open = true;
    }
  }
</script>

<svelte:body on:keydown={keydown} />

<div
  class="form__field__container select"
  class:is_list_open
  class:min__width={min_width}
  {id}
  tabindex="0"
  on:focus={selectFocused}
  on:blur={selectBlurred}
>
  <div class="head" class:is_loading class:error={is_error} on:click={toggleSelectWithClick}>
    {#if label}
      <div class="label" class:hidden={is_error}>{_label}</div>
    {/if}
    <div class="label error" class:hidden={!is_error}>{error}</div>
    <span class="value">{title}</span>
  </div>

  {#if is_list_open}
    <Dropdown bind:options {search} bind:value {type} />
  {/if}

  {#if desc}
    <p class="field__desc">{@html desc}</p>
  {/if}
</div>

<style>
  .select {
    position: relative;
    cursor: pointer;
  }

  .min__width {
    min-width: 15.625rem;
  }

  .select:focus .head {
    border-color: var(--primary);
  }

  .head {
    position: relative;
    -webkit-box-align: center;
    -ms-flex-align: center;
    display: block;
    height: 5rem;
    padding: 0 2.875rem 0 1.25rem;
    border: 2px solid transparent;
    background: rgba(228, 228, 228, 0.3);
    border-radius: 1rem;
    font-weight: 600;
    color: var(--gray);
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .head:before {
    content: "";
    position: absolute;
    top: 50%;
    right: 1.25rem;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 0.875rem;
    height: 8px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='8'%3E%3Cpath fill='%231b1d21' d='M.293.293A1 1 0 0 1 1.613.21l.094.083L7 5.585 12.293.293a1 1 0 0 1 1.32-.083l.094.083a1 1 0 0 1 .083 1.32l-.083.094-6 6a1 1 0 0 1-1.32.083l-.094-.083-6-6a1 1 0 0 1 0-1.414z'/%3E%3C/svg%3E")
      no-repeat 50% 50%/100% auto;
    -webkit-transition: -webkit-transform 0.25s;
    transition: -webkit-transform 0.25s;
    -o-transition: transform 0.25s;
    transition: transform 0.25s;
    transition: transform 0.25s, -webkit-transform 0.25s;
  }

  .head.is_loading:before {
    content: "";
    background: none;
    transition: none;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
    position: absolute;
    top: 40%;
    right: 1.25rem;
    box-sizing: border-box;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: #fff;
    animation: spinner 0.6s linear infinite;
  }

  /* .head.disabled {
    cursor: not-allowed;
  }

  .head.disabled:before {
    content: none;
  } */

  .label {
    margin-bottom: 0 !important;
    padding-top: 1rem;
    padding-bottom: 4px;
    pointer-events: none;
    font-size: 0.625rem;
    font-weight: 700;
    line-height: 1.6;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: var(--gray);
    transition: transform 0.2s;
  }

  .error {
    color: var(--error) !important;
    border-color: var(--error) !important;
  }

  .value {
    color: var(--black);
  }

  .select.is_list_open .head {
    border-color: var(--primary);
    background: #ffffff;
    color: var(--black);
  }

  .select.is_list_open .head:before {
    -webkit-transform: translateY(-50%) rotate(180deg);
    -ms-transform: translateY(-50%) rotate(180deg);
    transform: translateY(-50%) rotate(180deg);
  }

  .label {
    margin-bottom: 0 !important;
    padding-top: 1rem;
    padding-bottom: 4px;
    pointer-events: none;
    font-size: 0.625rem;
    font-weight: 700;
    line-height: 1.6;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: var(--gray);
    transition: transform 0.2s;
  }

  .value {
    color: var(--black);
  }

  .field__desc {
    padding: 0.625rem 1.375rem 0 !important;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.33333;
    color: var(--gray);
  }

  /* @media only screen and (max-width: 1179px) {
    .options {
      right: 0;
      width: auto;
      padding: 1.5rem 1.25rem;
    }
  }

  @media only screen and (max-width: 767px) {
    .select {
      width: 100%;
      justify-content: flex-start;
    }
  } */
</style>
