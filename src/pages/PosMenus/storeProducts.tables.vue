<template>
  <div>
    <!-- Skeleton Loader -->
    <div v-if="loading" class="skeleton-container">
      <!-- Header Skeleton -->
      <div class="skeleton-header">
        <div class="skeleton-bar header-bar" v-for="i in 8" :key="`header-${i}`"></div>
      </div>
      
      <!-- Rows Skeleton -->
      <div class="skeleton-body">
        <div 
          v-for="row in 10" 
          :key="`row-${row}`" 
          class="skeleton-row"
          :style="{ animationDelay: `${(row - 1) * 0.1}s` }"
        >
          <div class="skeleton-bar image-skeleton"></div>
          <div class="skeleton-bar long"></div>
          <div class="skeleton-bar short"></div>
          <div class="skeleton-bar medium"></div>
          <div class="skeleton-bar short"></div>
          <div class="skeleton-bar medium"></div>
          <div class="skeleton-bar mini"></div>
        </div>
      </div>
      
      <!-- Loading Text -->
      <div class="loading-info">
        <span class="loading-spinner"></span>
        Loading products...
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
//   {
//     data: 'id',
//     title: 'ID',
//     width: '60px',
//     className: 'text-center',
//     render: function(data, type, row) {
//       return `<span class="badge bg-secondary">${data}</span>`
//     }
//   },
  {
    data: 'image',
    title: 'Image',
    width: '80px',
    className: 'text-center',
    orderable: false,
    render: function(data, type, row) {
      return `
        <div class="product-image">
          <img src="${data}" alt="${row.title}" class="img-thumbnail" style="width: 50px; height: 50px; object-fit: cover;">
        </div>
      `
    }
  },
  {
    data: 'title',
    title: 'Product Name',
    render: function(data, type, row) {
      return `
        <div class="product-info">
          <h6 class="mb-1 text-dark">${data.length > 50 ? data.substring(0, 50) + '...' : data}</h6>
          <small class="text-muted">${row.category}</small>
        </div>
      `
    }
  },
  {
    data: 'price',
    title: 'Price',
    className: 'text-end',
    render: function(data, type, row) {
      return `<span class="fw-bold text-success fs-6">$${parseFloat(data).toFixed(2)}</span>`
    }
  },
  {
    data: 'category',
    title: 'Category',
    render: function(data, type, row) {
      const categoryColors = {
        "men's clothing": 'primary',
        "women's clothing": 'pink',
        'jewelery': 'warning',
        'electronics': 'info'
      }
      const color = categoryColors[data] || 'secondary'
      return `<span class="badge bg-${color}">${data.charAt(0).toUpperCase() + data.slice(1)}</span>`
    }
  },
  {
    data: 'rating',
    title: 'Rating',
    className: 'text-center',
    render: function(data, type, row) {
      const stars = Math.round(data.rate)
      const starHtml = '★'.repeat(stars) + '☆'.repeat(5 - stars)
      return `
        <div class="rating">
          <span class="text-warning">${starHtml}</span>
          <br>
          <small class="text-muted">${data.rate}/5 (${data.count})</small>
        </div>
      `
    }
  },
  {
    data: 'description',
    title: 'Description',
    render: function(data, type, row) {
      return `<span class="text-muted" title="${data}">
                ${data.length > 100 ? data.substring(0, 100) + '...' : data}
              </span>`
    }
  },
  {
    data: null,
    title: 'Actions',
    orderable: false,
    searchable: false,
    className: 'text-center',
    width: '120px',
    render: function(data, type, row) {
      return `
        <div class="btn-group btn-group-sm" role="group">
          <button type="button" class="btn btn-outline-primary view-btn" data-id="${row.id}" title="View Product">
            <i class="bi bi-eye"></i>
          </button>
          <button type="button" class="btn btn-outline-success cart-btn" data-id="${row.id}" title="Add to Cart">
            <i class="bi bi-cart-plus"></i>
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
    lengthMenu: "Show _MENU_ products",
    info: "Showing _START_ to _END_ of _TOTAL_ products",
    infoEmpty: "No products available",
    infoFiltered: "(filtered from _MAX_ total products)",
    zeroRecords: "No matching products found",
    emptyTable: "No products available",
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
  },

  // Custom event handlers
  drawCallback: function() {
    // Add event listeners after table is drawn
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.closest('button').dataset.id
        console.log('View product:', productId)
        // Handle view product
      })
    })

    document.querySelectorAll('.cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.closest('button').dataset.id
        console.log('Add to cart:', productId)
        // Handle add to cart
      })
    })

    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.closest('button').dataset.id
        console.log('Edit product:', productId)
        // Handle edit product
      })
    })

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.closest('button').dataset.id
        if(confirm('Are you sure you want to delete this product?')) {
          console.log('Delete product:', productId)
          // Handle delete product
        }
      })
    })
  }
}

// Load data
onMounted(async () => {
  loading.value = true
  try {
    // Add delay to see skeleton loader
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const response = await fetch('https://fakestoreapi.com/products')
    const products = await response.json()
    
    data.value = products.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating
    }))
  } catch (error) {
    console.error('Error loading products:', error)
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

/* Product specific styles */
.product-image img {
  border-radius: 4px;
  transition: transform 0.2s;
}

.product-image img:hover {
  transform: scale(1.1);
}

.product-info h6 {
  line-height: 1.2;
}

.rating {
  font-size: 14px;
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
  width: 80px;
}

.skeleton-bar.medium {
  width: 120px;
}

.skeleton-bar.long {
  width: 180px;
}

.skeleton-bar.image-skeleton {
  width: 50px;
  height: 50px;
  border-radius: 4px;
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
  
  .product-info h6 {
    font-size: 14px;
  }
}

/* Bootstrap badge color variations */
.badge.bg-pink {
  background-color: #e91e63 !important;
}
</style>