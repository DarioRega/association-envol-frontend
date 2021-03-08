<template>
  <svg-icon :name="name" class="icon" :class="`icon--${size}`" />
</template>

<script>
/**
 * Svg icon component
 * @example <icon name="arrow-down" size="100" />
 */
export default {
  name: 'Icon',
  props: {
    /**
     * Name of svg icon.
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * The size of the svg icon
     * @values 50, 75, 100, 125, 150, 175, full
     */
    size: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.icon {
  display: inline-block;
  vertical-align: middle;
  pointer-events: none;

  fill: currentColor;
  will-change: transform; /* Prevent cropped/blurry icons on Firefox */
}

@responsive {
  .icon--50 {
    width: 14px;
    height: 14px;
  }

  .icon--75 {
    width: 18px;
    height: 18px;
  }

  .icon--100 {
    width: 24px;
    height: 24px;
    vertical-align: -7px;
  }

  .icon--125 {
    width: 30px;
    height: 30px;
    vertical-align: -10px;
  }

  .icon--150 {
    width: 36px;
    height: 36px;
    vertical-align: -10px;
  }

  .icon--175 {
    width: 42px;
    height: 42px;
    vertical-align: -10px;
  }

  .icon--full {
    width: 100%;
    height: 100%;
  }
}
</style>
