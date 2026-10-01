<template>
<table-lite
  :is-loading="table.isLoading"
  :columns="table.columns"
  :rows="table.rows"
  :total="table.totalRecordCount"
  :sortable="table.sortable"
  @do-search="doSearch"
  @is-finished="tableLoadingFinish"
  class=""
  :table-class="'table table-striped table-bordered table-hover text-'"
/>
</template>

<script>
import { defineComponent, reactive, onMounted } from 'vue';
import TableLite from 'vue3-table-lite';

export default defineComponent({
  name: "TableTest",
  components: { TableLite },
  setup() {
    // Init Your table settings
    const table = reactive({
      isLoading: false,
      columns: [
        {
          label: "ID",
          field: "id",
          width: "5%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Name",
          field: "name",
          width: "15%",
          sortable: true,
        },
        {
          label: "Username",
          field: "username",
          width: "12%",
          sortable: true,
        },
        {
          label: "Email",
          field: "email",
          width: "20%",
          sortable: true,
        },
        {
          label: "Phone",
          field: "phone",
          width: "15%",
          sortable: true,
        },
        {
          label: "City",
          field: "city",
          width: "12%",
          sortable: true,
        },
        {
          label: "Website",
          field: "website",
          width: "12%",
          sortable: true,
        },
        {
          label: "Company",
          field: "company",
          width: "15%",
          sortable: true,
        },
      ],
      rows: [],
      totalRecordCount: 0,
      sortable: {
        order: "id",
        sort: "asc",
      },
    });

    /**
     * Table search event using JSONPlaceholder API
     */
    const doSearch = async (offset, limit, order, sort) => {
      table.isLoading = true;

      try {
        // Using JSONPlaceholder API for testing
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Debug: Log the raw API response
        console.log('Raw API Response:', data[0]); // Log first item to see structure
        
        // Transform data to match your table structure
        const transformedData = data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          website: user.website,
          company: user.company?.name || 'N/A', // Handle potential undefined
          username: user.username,
          city: user.address?.city || 'N/A',
          zipcode: user.address?.zipcode || 'N/A'
        }));
        
        // Debug: Log the transformed data
        console.log('Transformed Data:', transformedData[0]); // Log first transformed item
        
        // Simulate pagination (since JSONPlaceholder doesn't support it)
        const startIndex = offset;
        const endIndex = offset + limit;
        const paginatedData = transformedData.slice(startIndex, endIndex);
        
        // Sort data (basic implementation)
        if (order && sort) {
          paginatedData.sort((a, b) => {
            if (sort === 'asc') {
              return a[order] > b[order] ? 1 : -1;
            } else {
              return a[order] < b[order] ? 1 : -1;
            }
          });
        }
        
        table.rows = paginatedData;
        table.totalRecordCount = transformedData.length;
        table.sortable.order = order;
        table.sortable.sort = sort;
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        table.isLoading = false;
      }
    };

    /**
     * Table search finished event
     */
    const tableLoadingFinish = (elements) => {
      table.isLoading = false;
    };

    // Get data when component mounts
    onMounted(() => {
      doSearch(0, 10, 'id', 'asc');
    });

    return {
      table,
      doSearch,
      tableLoadingFinish,
    };
  }
});
</script>

<style lang="scss" scoped>

</style>