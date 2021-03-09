<template>
  <transition-expand>
    <slot />
  </transition-expand>
</template>

<script>
import TransitionExpand from '@/components/TransitionExpand';
export default {
  name: 'AccordionContent',
  components: { TransitionExpand },
};
</script>
