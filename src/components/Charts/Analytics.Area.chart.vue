<template>
    <div ref="chartContainer" class="w-100" style="height: 250px;"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import Highcharts from 'highcharts'
import {
    formatUploadDate,
    formatDateTime,
    smartDate,
    timeAgo,
    formatDate,
    getUserPreferences,
    dateDiff
} from '@/utils/dates';

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  series: {
    type: Object,
    required: true
  },
  metricName: {
    type: String,
    required: true
  },
  colorTheme: {
    type: Object,
    default: () => ({
      primary: '#3b6cf4',
      gradientFrom: 'rgba(59,108,244,0.25)',
      gradientTo: 'rgba(59,108,244,0.02)'
    })
  }

})

const chartContainer = ref(null)
let chartInstance = null

const createChart = () => {
    if (!chartContainer.value) return
    
    chartInstance = Highcharts.chart(chartContainer.value, {
        chart: {
            type: 'areaspline',
            backgroundColor: 'transparent',
            //spacing: [10, 0, 10, 0]
        },

        title: { text: null },

        xAxis: {
            categories: props.categories,
            crosshair: {
                color: props.colorTheme.primary,
                width: 1,
                dashStyle: 'Solid'
            },
            tickLength: 0,
            lineWidth: 0,

            // 🔥 ensures 1st point begins exactly at the start,
            // and last point touches right edge
            min: 0,
            max: props.categories.length - 1,
            startOnTick: false,
            endOnTick: false,

            labels: {
                rotation: 0,
                align: 'center',
                style: {
                    color: '#b4b4b4',
                    fontSize: '11px'
                },
                formatter: function () {
                    if (this.pos === 0 || this.pos === this.axis.categories.length - 1) {
                        return this.value
                    }
                    return ''
                }
            }

        },

        yAxis: {
            title: { text: null },
            gridLineColor: '#e0e0e0',

            // 🔥 Make all grid lines dotted EXCEPT bottom line
            gridLineDashStyle: 'Dot',
            minorGridLineWidth: 0,

            labels: {
                style: {
                    color: '#b4b4b4',
                    fontSize: '10px'
                },
                formatter() {
                    return this.value
                }
            }
        },

        tooltip: {
            shared: true,
            useHTML: true,
            backgroundColor: '#ffffff',
            borderColor: '#d9e5ff',
            borderWidth: 1,
            borderRadius: 6,
            shadow: false,
            padding: 10,
            headerFormat:
                '<span style="font-size:11px;color:#666;">{point.key}</span><br/>',
            pointFormat:
                `<span style="font-size:18px;font-weight:600;color:${props.colorTheme.primary};">{point.y:,.0f}</span><br>` +
                `<span style="font-size:11px;color:#999;">${props.metricName}</span>`
        },

        plotOptions: {
            series: {
                softThreshold: false, // 🔥 ensures data hugs the axis tightly
                pointPadding: 0,
                groupPadding: 0,
                cropThreshold: 1,
            },

            areaspline: {
                lineWidth: 2,
                color: props.colorTheme.primary,
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, props.colorTheme.gradientFrom],
                        [1, props.colorTheme.gradientTo]
                    ]
                },
                marker: {
                    enabled: true,
                    radius: 4,
                    fillColor: '#fff',
                    lineWidth: 2,
                    lineColor: props.colorTheme.primary,
                    states: {
                        hover: { radius: 6 }
                    }
                }
            }
        },

        legend: { enabled: false },
        credits: { enabled: false },

        series: [{
            name: props.series.name || props.metricName,
            data: props.series.data
        }]
    })
}

onMounted(() => {
    createChart()
})

// Watch for prop changes and recreate chart
watch(() => [props.categories, props.series, props.metricName], () => {
    if (chartInstance) {
        chartInstance.destroy()
    }
    createChart()
}, { deep: true })

onBeforeUnmount(() => {
    if (chartInstance) {
        chartInstance.destroy()
    }
})
</script>