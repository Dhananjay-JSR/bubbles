<main class="page__wrapper">
  <slot />
</main>

<style>
  main {
    width: 100%;
    max-width: 1280px;
    min-height: 100vh;
    margin: 0 auto;
    padding: 0 5rem;
  }

  @media only screen and (max-width: 1179px) {
    main {
      padding: 0 1.5rem;
    }
  }
</style>
