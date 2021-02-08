<template>
  <div>{{ aa }}</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component({})
export default class Aa extends Vue {
  aa = 123
}
</script>