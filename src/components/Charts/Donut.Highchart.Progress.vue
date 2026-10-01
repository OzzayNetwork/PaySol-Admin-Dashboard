<template>
  <div ref="chartContainer" class="chart-container" style="width: 400px;"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import Highcharts from 'highcharts';

const props = defineProps({
  utilized: {
    type: Number,
    required: true,
    validator: value => value >= 0
  },
  total: {
    type: Number,
    required: true,
    validator: value => value > 0
  },
  unit: {
    type: String,
    default: 'GB'
  },
  utilizedLabel: {
    type: String,
    default: 'Used'
  },
  remainingLabel: {
    type: String,
    default: 'Free'
  }
});

const chartContainer = ref(null);
const chart = ref(null);

// Computed properties
const utilizedPercentage = computed(() => {
  const percentage = (props.utilized / props.total) * 100;
  return Math.round(percentage * 10) / 10; // Round to 1 decimal place
});

const utilizedFormatted = computed(() => {
  return formatNumber(props.utilized);
});

const totalFormatted = computed(() => {
  return formatNumber(props.total);
});

const remainingValue = computed(() => {
  return props.total - props.utilized;
});

const remainingFormatted = computed(() => {
  return formatNumber(remainingValue.value);
});

// Helper function to format numbers with commas
const formatNumber = (num) => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
};

// Color function based on utilization percentage
const getColorForPercentage = (percentage) => {
  if (percentage < 50) return '#4CAF50'; // Green - Good
  if (percentage < 75) return '#FF9800'; // Orange - Warning
  return '#F44336'; // Red - Critical
};

// Function to update center label
const updateCenterLabel = () => {
  if (!chart.value) return;

  const centerX = chart.value.plotLeft + chart.value.plotWidth / 2;
  const centerY = chart.value.plotTop + chart.value.plotHeight / 2;

  // Remove existing labels if present
  if (chart.value.centerLabel) {
    chart.value.centerLabel.destroy();
  }
  if (chart.value.subLabel) {
    chart.value.subLabel.destroy();
  }
  if (chart.value.percentageLabel) {
    chart.value.percentageLabel.destroy();
  }

  // Main center text: "200GB Free"
  const mainText = `${remainingFormatted.value}${props.unit} `;
  const mainTextFontSize = '22px';
  
  // Sub text: "of 475 GB"
  const subText = `Free of ${totalFormatted.value} ${props.unit}`;
  const subTextFontSize = '14px';
  
  // Percentage text
  const percentageText = `${utilizedPercentage.value}% Used`;
  const percentageFontSize = '10px';
  const percentageColor = getColorForPercentage(utilizedPercentage.value);

  // Calculate total height
  const totalHeight = parseInt(mainTextFontSize) + parseInt(subTextFontSize) + parseInt(percentageFontSize) + 15;
  
  // Create main label
  chart.value.centerLabel = chart.value.renderer.text(
    mainText,
    centerX,
    centerY - totalHeight/3
  )
  .css({
    fontSize: mainTextFontSize,
    fontWeight: 'bold',
    color: '#333',
    textAnchor: 'middle',
    fontFamily: 'inherit'
  })
  .add();

  // Create sub label
  chart.value.subLabel = chart.value.renderer.text(
    subText,
    centerX,
    centerY
  )
  .css({
    fontSize: subTextFontSize,
    color: '#666',
    textAnchor: 'middle',
    fontFamily: 'inherit'
  })
  .add();

  // Create percentage label
  chart.value.percentageLabel = chart.value.renderer.text(
    percentageText,
    centerX,
    centerY + totalHeight/3
  )
  .css({
    fontSize: percentageFontSize,
    fontWeight: 'bold',
    color: percentageColor,
    textAnchor: 'middle',
    fontFamily: 'inherit'
  })
  .add();
};

// Function to update chart data
const updateChartData = () => {
  if (!chart.value) return;

  // Calculate percentages correctly
  const usedPercent = utilizedPercentage.value;
  const remainingPercent = 100 - usedPercent;

  // Update series data
  chart.value.series[0].setData([
    {
      name: `${props.utilizedLabel}: ${utilizedFormatted.value} ${props.unit}`,
      y: usedPercent,
      actualValue: props.utilized,
      unit: props.unit,
      color: getColorForPercentage(usedPercent)
    },
    {
      name: `${props.remainingLabel}: ${remainingFormatted.value} ${props.unit}`,
      y: remainingPercent,
      actualValue: remainingValue.value,
      unit: props.unit,
      color: '#E0E0E0'
    }
  ], false); // false means don't redraw yet

  // Update center label
  updateCenterLabel();
  
  // Redraw the chart
  chart.value.redraw();
};

// Initialize the chart
const initChart = () => {
  if (!chartContainer.value) return;

  // Calculate initial percentages
  const usedPercent = utilizedPercentage.value;
  const remainingPercent = 100 - usedPercent;

  const chartOptions = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'inherit'
      },
      events: {
        render: updateCenterLabel
      }
    },
    title: {
      text: null
    },
    credits: {
      enabled: false
    },
    tooltip: {
      useHTML: true,
      formatter: function() {
        const percentage = this.point.y.toFixed(1);
        const actualValue = this.point.options.actualValue;
        const unit = this.point.options.unit;
        const formattedValue = formatNumber(actualValue);
        const label = this.point.name.split(':')[0];
        
        return `
          <div style="font-family: inherit; padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 5px;">${label}</div>
            <div style="font-size: 20px; font-weight: bold; margin-bottom: 3px;">${formattedValue} ${unit}</div>
            <div style="color: #666; font-size: 14px;">${percentage}% of total</div>
          </div>
        `;
      },
      style: {
        fontFamily: 'inherit'
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      pie: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          distance: -10,
          formatter: function() {
            // Show label on the slice itself
            const label = this.point.name.split(':')[0];
            const percentage = this.percentage.toFixed(1);
            return `<span style="font-weight: bold; font-size: 10px;"></span><br/><span style="font-size: 10px;">${percentage}%</span>`;
          },
          style: {
            color: '#fff',
            textOutline: 'none',
            fontWeight: 'bold',
            fontSize: '14px',
            fontFamily: 'inherit'
          },
          useHTML: true
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '50%'],
        size: '100%'
      }
    },
    series: [{
      name: 'Progress',
      innerSize: '75%',
      data: [
        {
          name: props.utilizedLabel,
          y: usedPercent,
          actualValue: props.utilized,
          unit: props.unit,
          color: getColorForPercentage(usedPercent)
        },
        {
          name: props.remainingLabel,
          y: remainingPercent,
          actualValue: remainingValue.value,
          unit: props.unit,
          color: '#E0E0E0'
        }
      ]
    }]
  };

  chart.value = Highcharts.chart(chartContainer.value, chartOptions);
  
  // Initial render of center label
  setTimeout(updateCenterLabel, 100);
};

// Watch for prop changes
watch(() => [props.utilized, props.total, props.unit, props.utilizedLabel, props.remainingLabel], () => {
  if (chart.value) {
    updateChartData();
  }
}, { deep: true });

// Lifecycle hooks
onMounted(() => {
  initChart();
});

onBeforeUnmount(() => {
  if (chart.value) {
    chart.value.destroy();
  }
});
</script>

<style scoped>
.chart-container {
  height: 300px;
  font-family: inherit;
}

:deep(.highcharts-container) {
  font-family: inherit !important;
}

:deep(.highcharts-root text) {
  font-family: inherit !important;
}

:deep(.highcharts-tooltip) {
  font-family: inherit !important;
}

:deep(.highcharts-tooltip span) {
  font-family: inherit !important;
}

:deep(.highcharts-data-label text) {
  font-family: inherit !important;
}

:deep(.highcharts-data-label span) {
  font-family: inherit !important;
}
</style>