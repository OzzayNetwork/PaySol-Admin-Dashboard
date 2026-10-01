<template>
    <AIAgent />
    <div class="dropdown d-inline-block d-lg-inline-block ms-1">
        <button type="button" class="btn header-item noti-icon waves-effect" data-bs-toggle="dropdown"
            data-bs-placement="top" title="CS Payments AI AGents Suite" aria-haspopup="true" aria-expanded="false">
            <i class="bx bx-customize d-none" data-bs-toggle="tooltip" data-bs-placement="top"
                title="CS Payments AI AGents Suite"></i>
                <span class="d-non h-100 w-100" data-bs-toggle="tooltip" data-bs-placement="top"
                title="CS Payments AI AGents Suite">
                    <img class="img" style="height: 25px;" src="../../assets/images/icons/animated_shape-ai.svg" />
                    <span class="text-primary">Ai</span>
                </span>
        </button>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end">
            <div class="dropdown-header fw-bold text-center border-bottom pb-3">
                <h6 class="text-black mb-0">CS AI Agents Suit</h6>
            </div>
            <div class="px-lg-2 pt-2">
                <div class="row g-0">
                    <div class="col-4">
                        <a class="dropdown-icon-item p-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top"
                            title="Access CSP AI Agent">
                            <img src="../../assets/images/AI-Agent/favicon.png" alt="CSP Agent">
                            <span>CSP Agent</span>
                        </a>
                    </div>
                    <div class="col-4" data-bs-toggle="offcanvas" data-bs-target="#offHoma"
                        aria-controls="offcanvasRight">
                        <a class="dropdown-icon-item p-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top"
                            title="AI Agent for Homa Bay Executive">
                            <img src="../../assets/images/AI-Agent/homa-bay.png" alt="Homa Bay Executive">
                            <span>Homa Bay Executive</span>
                        </a>
                    </div>
                    <div class="col-4">
                        <a class="dropdown-icon-item p-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top"
                            title="AI Agent for Meru Executive">
                            <img src="../../assets/images/AI-Agent/county_logo.png" alt="Meru Executive">
                            <span>Meru Executive</span>
                        </a>
                    </div>
                </div>

                <div class="row g-0">
                    <div class="col-4" data-bs-toggle="offcanvas" data-bs-target="#offCanvasKplc"
                        aria-controls="offcanvasRight">
                        <a class="dropdown-icon-item p-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top"
                            title="KPLC AI Agent">
                            <img src="../../assets/images/AI-Agent/power.svg" alt="KPLC">
                            <span>KPLC</span>
                        </a>
                    </div>
                    <div class="col-4">
                        <a class="dropdown-icon-item p-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top"
                            title="AI Agent for Homa Bay Citizen">
                            <img src="../../assets/images/AI-Agent/homa-bay.png" alt="Homa Bay Citizen">
                            <span>Homa Bay Citizen</span>
                        </a>
                    </div>
                    <div class="col-4">
                        <a class="dropdown-icon-item p-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top"
                            title="AI Agent for Meru Citizen">
                            <img src="../../assets/images/AI-Agent/county_logo.png" alt="Meru Citizen">
                            <span>Meru Citizen</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script setup>
import AIAgent from "@/pages/AiAgents/AI.agent.vue"
</script>

<style lang="scss" scoped></style>