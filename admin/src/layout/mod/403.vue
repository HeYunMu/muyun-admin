<template>
  <div class="page">
    <Container>
      <n-result
        status="403"
        title="403 禁止访问"
        description="总有些门是对你关闭的"
      >
        <template #footer>
          <n-button @click="$router.back">我要回去</n-button>
        </template>
      </n-result>
    </Container>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
