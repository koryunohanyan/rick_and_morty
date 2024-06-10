<template>
  <div class="not-found">
    <div class="not-found__wrapper">
      <h1 class="not-found__title">404 - Page Not Found</h1>
      <p class="not-found__message">
        The page you are looking for does not exist.
      </p>
      <router-link to="/" class="not-found__link">Go to Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
};
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
}

.not-found__wrapper {
  text-align: center;
}

.not-found__title {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.not-found__message {
  margin-bottom: 1em;
}

.not-found__link {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.not-found__link:hover {
  text-decoration: underline;
}
</style>
