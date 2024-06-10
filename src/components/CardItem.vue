<template>
  <div class="card">
    <img
      :src="character.image"
      :alt="character.name"
      loading="lazy"
      class="card__img"
    />
    <h3 class="card__name">{{ character.name }}</h3>
    <p
      class="card__status"
      :class="{
        card__status_green: character.status === 'Alive',
        card__status_grey: character.status === 'unknown',
      }"
    >
      {{ character.status }}
    </p>
  </div>
</template>

<script>
export default {
  name: "CardItem",
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: 200px;
  text-align: center;
  height: 300px;
  position: relative;
}

.card__img {
  width: 100%;
  height: auto;
}

.card__name {
  margin: 10px 0;
  font-size: 18px;
  color: #333;
}

.card__status {
  display: inline-flex;
  padding: 3px 10px;
  background: black;
  color: white;
  position: absolute;
  top: 50%;
  right: 0;
}
.card__status_green {
  background: rgb(30, 208, 30);
}
.card__status_grey {
  background: rgb(110, 110, 110);
}
</style>
