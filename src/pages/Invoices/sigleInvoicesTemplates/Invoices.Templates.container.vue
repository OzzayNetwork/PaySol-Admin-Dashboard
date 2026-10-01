<template>
    <header id="page-topbar">
        <div class="row bg-primary-muted">
            <div class="col-12  text-dark px-5 py-2 mb-0 text-center">
                <h6 class="mb-0 text-uppercase d-flex gap-2 justify-content-center align-items-center">
                    <span>Invoice No. bll12345676 </span>
                    <span class="badge bg-warning text-uppercase text-black d-none">Pending</span>
                    <span class="badge bg-success text-uppercase d-none">Paid</span>
                    <span class="badge bg-danger text-uppercase ">Over Due</span>
                </h6>
            </div>
        </div>
        <div class="navbar-header px-3 gap-3">
            <div class="d-flex align-items-center  gap-3">
                <div>
                    <img src="../../../assets/images/favicon.svg" alt="" height="40px">
                </div>
                <span class="fw-bold text-semi-bold d-none d-lg-inline-block">Invoice Retrieval Center</span>
            </div>
            <div class="d-none d-lg-flex flex-grow-1 search-cont align-items-center justify-content-center py-3">

                <form action="" method="get" class=" position-relative w-lg-75 w-xl-50 w-md-100">
                    <span class="bx bx-search-alt"></span>
                    <input type="search" class="form-control" id="search2" placeholder="Search...">
                    <button type="button" class="btn btn-primary btn-rounded waves-effect waves-light search-btn">
                        <i class="mdi mdi-magnify fs-4 align-middle me-2"></i> Search
                    </button>
                </form>
            </div>

            <div class="d-flex">

                <div class="dropdown d-inline-block d-lg-none ms-2">
                    <button type="button" class="btn header-item noti-icon waves-effect"
                        id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <i class="mdi mdi-magnify"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                        aria-labelledby="page-header-search-dropdown">

                        <form class="p-3">
                            <div class="form-group m-0">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search ..."
                                        aria-label="Recipient's username">
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="submit"><i
                                                class="mdi mdi-magnify"></i></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                   
                </div>





                <div class="dropdown d-none d-lg-inline-block ms-1">
                    <button type="button" class="btn header-item noti-icon waves-effect" data-bs-toggle="fullscreen">
                        <i class="bx bx-fullscreen" data-bs-placement="top" title="Full Screen"></i>
                    </button>
                </div>

                <div class="dropdown d-inline-block">
                    <button type="button" class="btn header-item noti-icon waves-effect"
                        id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <i class="bx bx-bell bx-tada"></i>
                        <span class="badge bg-danger rounded-pill">3</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                        aria-labelledby="page-header-notifications-dropdown">
                        <div class="p-3">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h6 class="m-0" key="t-notifications"> Notifications </h6>
                                </div>
                                <div class="col-auto">
                                    <a href="#!" class="small" key="t-view-all"> View All</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                



            </div>
            <DIV>
                 <button class="btn btn-primary btn-lg waves-effect waves-light">
                        Pay KES 350
                    </button>
            </DIV>
        </div>
    </header>

    <div class="phone-search-cont d-flex d-none align-items-center px-3 py-2 d-print-none">
        <button type="button" class="btn-close fs-4" data-bs-dismiss="modal" aria-label="Close"></button>
        <div class="d-flex flex-grow-1 search-cont align-items-center justify-content-center py-3">
            <form action="" method="get" class=" position-relative w-lg-75 w-xl-50 w-md-100">
                <span class="bx bx-search-alt"></span>
                <input type="search" class="form-control" id="search2" placeholder="Search...">
                <button type="button" class="btn btn-primary btn-rounded waves-effect waves-light search-btn">
                    <i class="mdi mdi-magnify fs-4 align-middle"></i>
                </button>
            </form>
        </div>
    </div>
    <div class="d-flex w-100 d-print-none" style="height: 120px;"></div>


    <div class="print-page-cont pag">
        <InvoiceOne />
        <InvoiceTwo />
        <InvoiceThree />
        <InvoiceFour />
    </div>
    <div class="d-flex w-100 d-print-none" style="height: 55px;"></div>

    <footer class="invoice-template-footer">
        <div class="footer-content">
            <span class="page-info">Page 3 of 3</span>
            <div class="zoom-controls">
                <button type="button" class="zoom-btn" id="zoom-out" title="Zoom out">
                    <i class="mdi mdi-minus"></i>
                </button>
                <input type="range" class="zoom-slider" min="10" max="500" value="130" id="zoom-range">
                <button type="button" class="zoom-btn" id="zoom-in" title="Zoom in">
                    <i class="mdi mdi-plus"></i>
                </button>
                <span class="zoom-percentage">100%</span>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// the invoices templates
import InvoiceOne from './Invoice.one.vue';
import InvoiceTwo from './Invoice.two.vue';
import InvoiceThree from './Invoice.three.vue';
import InvoiceFour from './Invoice.four.vue';

const zoomLevel = ref(100);

onMounted(() => {
    const zoomRange = document.getElementById('zoom-range');
    const zoomIn = document.getElementById('zoom-in');
    const zoomOut = document.getElementById('zoom-out');
    const zoomPercentage = document.querySelector('.zoom-percentage');

    // Apply initial zoom
    applyZoom(100);

    if (zoomRange && zoomIn && zoomOut && zoomPercentage) {
        zoomRange.addEventListener('input', (e) => {
            zoomLevel.value = parseInt(e.target.value);
            zoomPercentage.textContent = `${zoomLevel.value}%`;
            applyZoom(zoomLevel.value);
        });

        zoomIn.addEventListener('click', () => {
            if (zoomLevel.value < 500) {
                zoomLevel.value = Math.min(500, parseInt(zoomLevel.value) + 10);
                zoomRange.value = zoomLevel.value;
                zoomPercentage.textContent = `${zoomLevel.value}%`;
                applyZoom(zoomLevel.value);
            }
        });

        zoomOut.addEventListener('click', () => {
            if (zoomLevel.value > 10) {
                zoomLevel.value = Math.max(10, parseInt(zoomLevel.value) - 10);
                zoomRange.value = zoomLevel.value;
                zoomPercentage.textContent = `${zoomLevel.value}%`;
                applyZoom(zoomLevel.value);
            }
        });
    }
});

function applyZoom(zoom) {
    const content = document.querySelector('.print-page-cont');
    if (content) {
        const scale = zoom / 100;
        content.style.transform = `scale(${scale})`;
        content.style.transformOrigin = 'top left';
        // Adjust the container width to prevent horizontal scrollbar issues
        content.style.width = `${100 / scale}%`;
    }
}
</script>

<style>
.search-cont {
    position: relative;
    font-size: 1rem;
    position: relative;
    font-size: 1rem;
}

.search-cont .form-control {
    border-radius: 30px;
    height: 50px;
    padding-right: 130px;
    padding-left: 50px;
    width: 100%;
    font-size: 1rem;
}

.search-cont .search-btn {
    border-radius: 30px;
    position: absolute;
    top: 50%;
    height: 40px;
    right: 5px;
    border: none;
    padding-left: 30px;
    padding-right: 30px;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 1rem;
}

.search-cont span {
    position: absolute;
    z-index: 10;
    font-size: 1rem;
    line-height: 50px;
    left: 25px;
    top: 0;
    color: #74788d;
}


.print-page-cont {
    transition: transform 0.2s ease;
    transform-origin: top left;
    display: flex;
    align-items: center;
    flex-direction: column;

}

.print-page-cont .page {
    border: 1px solid #E0E0E0;
   
    margin: 15px;
     margin-bottom: 20px;
}

.invoice-template-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1000;
    background-color: #f8f9fa;
    border-top: 1px solid #e0e0e0;
}

.footer-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padding: 8px 24px; */
    min-height: 32px;
}

.page-info {
    font-size: 11px;
    color: #5f6368;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    flex: 1;
    text-align: center;
}

.zoom-controls {
    display: flex;
    align-items: center;
    gap: 8px;
}

.zoom-btn {
    background: transparent;
    border: none;
    color: #5f6368;
    cursor: pointer;
    padding: 4px 8px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    transition: background-color 0.2s;
}

.zoom-btn:hover {
    background-color: #e8eaed;
}

.zoom-slider {
    width: 120px;
    height: 4px;
    -webkit-appearance: none;
    appearance: none;
    background: #dadce0;
    outline: none;
    border-radius: 2px;
}

.zoom-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    background: #1a73e8;
    cursor: pointer;
    border-radius: 50%;
}

.zoom-slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: #1a73e8;
    cursor: pointer;
    border-radius: 50%;
    border: none;
}

.zoom-percentage {
    font-size: 11px;
    color: #5f6368;
    min-width: 40px;
    text-align: right;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* Print styles */
@media print {
    #page-topbar {
        display: none;
    }

    .invoice-template-footer {
        display: none !important;
    }

    .print-page-cont .page {
        border: none;
        margin-bottom: 0px;
        margin: 0px;
    }
}
</style>