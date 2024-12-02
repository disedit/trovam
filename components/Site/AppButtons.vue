<template>
  <div class="app-buttons">
    <h2 class="flex gap-4 items-center">
      <ShapesShape5 class="shape" />
      <span class="compensate">Descarrega't l'app de la Fira Trovam</span>
    </h2>
    <div class="flex gap-4 items-center">
      <a href="https://apps.apple.com/es/app/fira-trovam/id6695746493" target="_blank">
        <img src="../../assets/images/apple-button.svg" alt="Descarrega en l'App Store per a iOS" />
      </a>
      <a href="https://play.google.com/store/apps/details?id=com.meetmaps.FiraTrovam&pli=1" target="_blank">
        <img src="../../assets/images/google-button.png" alt="Descarrega en Google Play" />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-buttons {
  border-block: 2px var(--white) solid;
  padding-block: var(--site-padding);
  display: flex;
  gap: var(--site-padding);
  align-items: center;
  text-transform: uppercase;
  justify-content: center;
  font-size: var(--text-md);
  margin: var(--site-padding);

  img {
    height: 3rem;
  }

  .shape {
    color: var(--yellow);
    height: 1.25em;
  }
}

@include media('<md') {
  .app-buttons {
    flex-direction: column;
  }
}
</style>