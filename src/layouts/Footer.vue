<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          © {{ currentYear }} Customer Relationship Management Dashboard
        </div>
        <div class="col-md-6 d-sm-none">
          <div class="text-sm-end d-sm-block">
            {{ businessName }}
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  setup() {
    const currentYear = new Date().getFullYear()
    const businessName = 'CS Payments'
    const branchName = ''

    return {
      currentYear,
      businessName,
      branchName,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
