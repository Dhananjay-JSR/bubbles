import { writable, derived } from "svelte/store";
import { modalStore } from "$lib/stores/modal.store";

export const pageStore = writable({
  title: null,
  sidebar: {
    is_toggled: false,
    active_item: null,
    notifications: [],
  },
  select: null,
  dropdown: null,
  fetching: false,
  clicked: null,
  errors: [],
  host: null,
});

export const noscrollStore = derived([modalStore, pageStore], ([$modalStore, $pageStore]) => {
  if ($modalStore.active || $pageStore.sidebar.is_toggled) {
    return true;
  } else {
    return false;
  }
});