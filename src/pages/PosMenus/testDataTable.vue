<template>
  <div>
    <!-- Skeleton Loader -->
    <div v-if="loading" class="skeleton-container">
      <!-- Header Skeleton -->
      <div class="skeleton-header">
        <div class="skeleton-bar header-bar" v-for="i in 9" :key="`header-${i}`"></div>
      </div>
      
      <!-- Rows Skeleton -->
      <div class="skeleton-body">
        <div 
          v-for="row in 10" 
          :key="`row-${row}`" 
          class="skeleton-row"
          :style="{ animationDelay: `${(row - 1) * 0.1}s` }"
        >
          <div class="skeleton-bar short"></div>
          <div class="skeleton-bar long"></div>
          <div class="skeleton-bar medium"></div>
          <div class="skeleton-bar long"></div>
          <div class="skeleton-bar medium"></div>
          <div class="skeleton-bar short"></div>
          <div class="skeleton-bar medium"></div>
          <div class="skeleton-bar short"></div>
          <div class="skeleton-bar mini"></div>
        </div>
      </div>
      
      <!-- Loading Text -->
      <div class="loading-info">
        <span class="loading-spinner"></span>
        Loading data...
      </div>
    </div>

    <!-- Actual DataTable -->
    <DataTable 
      v-else
      :data="data" 
      :columns="columns"
      :options="tableOptions"
      ref="dataTable"
      class="dataTable display table table-hover table-stripe borderd- table dt-responsive nowrap w-100 dataTable dtr-inline"
      style="width: 100%"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net'
// import 'datatables.net-dt/css/dataTables.dataTables.css'


DataTable.use(DataTablesCore)

// Reactive data
const data = ref([])
const loading = ref(false)
const dataTable = ref(null)

// Column definitions
const columns = [
  {
    data: 'id',
    title: 'ID',
    width: '60px',
    className: 'text-center',
    render: function(data, type, row) {
      return `<span class="badge bg-secondary">${data}</span>`
    }
  },
  {
    data: 'name',
    title: 'Name',
    render: function(data, type, row) {
      return `
        <div class="d-flex align-items-center justify-content-start">
            <div class="avatar-sm">
                <span class="avatar-title rounded-circle bg-success bg-soft text-success font-size-16">
                     ${data.substring(0, 2).toUpperCase()}
                </span>
            </div>
            <div class="mx-2">
                <h5 class="font-size-14 mb-1"><a href="javascript: void(0);" class="text-dark">${data}</a></h5>
                <p class="text-muted mb-0">${row.username}</p>
            </div>
        </div>
      `
    }
  },
  {
    data: 'username',
    title: 'Username',
    render: function(data, type, row) {
      return `<code class="bg-light text-dark px-2 py-1 rounded">${data}</code>`
    }
  },
  {
    data: 'email',
    title: 'Email',
    render: function(data, type, row) {
      return `<a href="mailto:${data}" class="text-decoration-none text-success">
                <i class="bi bi-envelope me-1"></i>${data}
              </a>`
    }
  },
  {
    data: 'phone',
    title: 'Phone',
    render: function(data, type, row) {
      return `<span class="text-muted">
                <i class="bi bi-telephone me-1"></i>${data}
              </span>`
    }
  },
  {
    data: 'city',
    title: 'City',
    render: function(data, type, row) {
      return `<span class="text-info">
                <i class="bi bi-geo-alt me-1"></i>${data}
              </span>`
    }
  },
  {
    data: 'website',
    title: 'Website',
    render: function(data, type, row) {
      return `<a href="https://${data}" target="_blank" class="text-decoration-none text-primary">
                <i class="bi bi-link-45deg me-1"></i>${data}
              </a>`
    }
  },
  {
    data: 'company',
    title: 'Company',
    render: function(data, type, row) {
      return `<span class="badge bg-success">${data}</span>`
    }
  },
  {
    data: null,
    title: 'Action',
    orderable: false,
    searchable: false,
    className: 'text-center',
    width: '120px',
    render: function(data, type, row) {
      return `
        <div class="btn-group btn-group-sm" role="group">
          <button type="button" class="btn btn-outline-primary view-btn" data-id="${row.id}" title="View">
            <i class="bi bi-eye"></i>
          </button>
          <button type="button" class="btn btn-outline-warning edit-btn" data-id="${row.id}" title="Edit">
            <i class="bi bi-pencil"></i>
          </button>
          <button type="button" class="btn btn-outline-danger delete-btn" data-id="${row.id}" title="Delete">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      `
    }
  }
]

// Table options
const tableOptions = {
  responsive: true,
  pageLength: 10,
  lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
  order: [[0, 'asc']],
  searching: true,
  paging: true,
  info: true,
  autoWidth: false,
  stateSave: true,
  
  language: {
    search: "",
    lengthMenu: "Show _MENU_ entries",
    info: "Showing _START_ to _END_ of _TOTAL_ entries",
    infoEmpty: "No entries available",
    infoFiltered: "(filtered from _MAX_ total entries)",
    zeroRecords: "No matching records found",
    emptyTable: "No data available in table",
    paginate: {
      first: "First",
      previous: "Previous",
      next: "Next",
      last: "Last"
    }
  },
  
  dom: 'lrtip',
  
  buttons: ['copy', 'csv', 'excel', 'pdf'],
  
  headerCallback: function (thead) {
    thead.classList.add('table-dark', 'text-uppercase', 'my-custom-thead')
  }
}

// Load data
onMounted(async () => {
  loading.value = true
  try {
    // Add delay to see skeleton loader
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json()
    
    data.value = users.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      city: user.address?.city || 'N/A',
      website: user.website,
      company: user.company?.name || 'N/A'
    }))
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style>
/* DataTable Styles */
table.dataTable>tbody>tr {
    background-color: transparent;
}

tbody, td, tfoot, th, thead, tr {
    border-color: #e5e7eb;
    border-style: solid;
    border-width: 0;
}

/* Skeleton Loader */
.skeleton-container {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  overflow: hidden;
}

.skeleton-header {
  display: flex;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-bottom: 1px solid #e5e7eb;
}

.skeleton-header .header-bar {
  height: 20px;
  flex: 1;
  background: #d1d5db;
  border-radius: 4px;
}

.skeleton-body {
  padding: 0;
}

.skeleton-row {
  display: flex;
  gap: 15px;
  padding: 15px;
  border-bottom: 1px solid #f3f4f6;
  align-items: center;
  animation: slideIn 0.5s ease-out;
}

.skeleton-row:last-child {
  border-bottom: none;
}

.skeleton-bar {
  background: #e5e7eb;
  border-radius: 4px;
  height: 16px;
  animation: pulse 1.2s ease-in-out infinite;
}

.skeleton-bar.mini {
  width: 40px;
}

.skeleton-bar.short {
  width: 60px;
  flex-grow: 1;
}

.skeleton-bar.medium {
  width: 100px;
}

.skeleton-bar.long {
  width: 140px;
}

.loading-info {
  text-align: center;
  padding: 20px;
  color: #6b7280;
  font-size: 14px;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    background-color: #e5e7eb;
  }
  50% {
    opacity: 0.5;
    background-color: #f3f4f6;
  }
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .skeleton-row {
    gap: 10px;
    padding: 10px;
  }
  
  .skeleton-row .skeleton-bar:nth-child(n+6) {
    display: none;
  }
}
</style>