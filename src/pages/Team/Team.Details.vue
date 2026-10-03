<template>
    <div class="container-fluid">
        <!-- Page Title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">Admin Profile</h4>
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                                <router-link to="/">Dashboard</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/team">Team</router-link>
                            </li>
                            <li class="breadcrumb-item active">
                                {{ admin?.full_name || '…' }}
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loader -->
        <div v-if="isLoading">
            <LoaderVue />
        </div>

        <!-- Not found / error -->
        <div v-else-if="loadError" class="row justify-content-center">
            <div class="col-md-6">
                <div class="card text-center p-5">
                    <i class="bx bx-error-circle text-danger fs-1 mb-3"></i>
                    <h5 class="mb-2">{{ loadError }}</h5>
                    <router-link to="/team" class="btn btn-link">← Back to the team</router-link>
                </div>
            </div>
        </div>

        <div v-else class="row justify-content-center">
            <!-- ===================================================== -->
            <!-- LEFT: identity card                                    -->
            <!-- ===================================================== -->
            <div class="col-sm-12 col-lg-4">
                <div class="card">
                    <!-- Banner -->
                    <div style="height: 108px; overflow: hidden;" class="position-relative">
                        <img class="card-img-top img-fluid position-absolute" style="bottom: -100%;"
                            src="../../assets/images/modern-bg/waves.png" alt="">
                    </div>

                    <div class="card-body text-center d-flex flex-column align-items-center justify-content-center position-relative">
                        <!-- Avatar with conditional online dot -->
                        <div class="avatar-xl profile-user-wid mb-4 position-relative" style="margin-top: -65px;">
                            <img v-if="admin.profile_photo_url" :src="admin.profile_photo_url"
                                class="img-thumbnail rounded-circle" alt="" />
                            <div v-else class="img-thumbnail rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center border-4"
                                style="width: 100%; height: 100%; font-size: 32px; font-weight: 600;">
                                {{ initials }}
                            </div>
                            <span v-if="isOnline" class="online-indicator" :title="`Last seen ${smartDate(admin.last_seen_at)}`"></span>
                        </div>

                        <h5 class="font-size-15 text-truncate fw-bold text-black mb-0">
                            {{ admin.full_name }}
                        </h5>
                        <p class="text-muted mb-0 text-truncate">
                            {{ roleLabel }}<span v-if="admin.job_title"> · {{ admin.job_title }}</span>
                        </p>

                        <!-- ===== Status block ===== -->
                        <!-- Active variant -->
                        <div v-if="admin.is_active" class="w-100 mt-4 text-start">
                            <div class="p-3 border-top border-dark-muted bg-success-subtle rounded">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="flex-shrink-0">
                                        <i class="bx bx-check-shield h2 text-success mb-0"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="d-flex justify-content-between align-items-start flex-wrap gap-2">
                                            <h5 class="font-size-15 text-black mb-0">
                                                <span v-if="isOnline">Online now</span>
                                                <span v-else>Active</span>
                                            </h5>
                                            <span class="badge bg-success text-uppercase">Active</span>
                                        </div>
                                        <p class="text-muted mb-0 mt-1 small">
                                            <span v-if="admin.status === 'invited'">
                                                Invited — has not set a password yet
                                            </span>
                                            <span v-else-if="admin.last_seen_at">
                                                Last seen {{ smartDate(admin.last_seen_at) }}
                                            </span>
                                            <span v-else>Has not logged in yet</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Deactivated variant -->
                        <div v-else class="w-100 mt-4 text-start">
                            <div class="p-3 border-top border-dark-muted bg-danger-subtle rounded">
                                <div class="d-flex align-items-start gap-3">
                                    <div class="flex-shrink-0">
                                        <i class="bx bx-user-x h2 text-danger mb-0"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                                            <h5 class="font-size-15 text-black mb-0">
                                                Deactivated
                                                <strong v-if="admin.deactivated_at">
                                                    {{ smartDate(admin.deactivated_at) }}
                                                </strong>
                                            </h5>
                                            <span class="badge bg-danger text-uppercase">Inactive</span>
                                        </div>
                                        <div v-if="admin.deactivation_reason" class="mb-2">
                                            <span class="fw-semibold text-dark">Reason <br> </span>
                                            <span class="text-muted">{{ admin.deactivation_reason }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row m-0 px-0 w-100 pt-3">
                            <div class="col-6 mt-4 mb-3">
                                <div class="d-block py-3 px-4 text-center border border-dashed border-gray-5 rounded position-relative">
                                    <div class="avatar-sm mx-auto position-absolute top-0 start-50 translate-middle">
                                        <div class="avatar-title rounded-circle bg-dark bg-soft border-soft-warning">
                                            <i class="mdi mdi-calendar-check fs-3 text-dark"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="fs-12 text-muted mb-1 mt-3">Registered On</div>
                                        <h6 class="m-0 p-0">
                                            {{ admin.created_at ? smartDate(admin.created_at) : 'Unknown' }}
                                        </h6>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6 mt-4 mb-3">
                                <div class="d-block py-3 px-4 text-center border border-dashed border-gray-5 rounded position-relative">
                                    <div class="avatar-sm mx-auto position-absolute top-0 start-50 translate-middle">
                                        <div class="avatar-title rounded-circle bg-info bg-soft border-soft-warning">
                                            <i class="mdi mdi-login fs-3 text-info"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="fs-12 text-muted mb-1 mt-3">Last Login</div>
                                        <h6 class="m-0 p-0">
                                            {{ admin.last_login_at ? smartDate(admin.last_login_at) : 'Never' }}
                                        </h6>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6 mt-4">
                                <div class="d-block py-3 px-4 text-center border border-dashed border-gray-5 rounded position-relative">
                                    <div class="avatar-sm mx-auto position-absolute top-0 start-50 translate-middle">
                                        <div class="avatar-title rounded-circle bg-primary bg-soft border-soft-warning">
                                            <i class="mdi mdi-file-document-outline fs-3 text-primary"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="fs-12 text-muted mb-1 mt-3">Documents</div>
                                        <h4 class="m-0 p-0">{{ admin.identifications?.length || 0 }}</h4>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6 mt-4">
                                <div class="d-block py-3 px-4 text-center border border-dashed border-gray-5 rounded position-relative">
                                    <div class="avatar-sm mx-auto position-absolute top-0 start-50 translate-middle">
                                        <div class="avatar-title rounded-circle bg-success bg-soft border-soft-warning">
                                            <i class="mdi mdi-shield-check-outline fs-3 text-success"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="fs-12 text-muted mb-1 mt-3">Verification</div>
                                        <h6 class="m-0 p-0 text-capitalize">{{ verificationLabel }}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contact details -->
                    <div class="card-body border-top">
                        <div class="d-flex flex-column gap-4">
                            <!-- Email -->
                            <div class="d-flex align-items-center gap-3">
                                <div><span class="mdi-email-outline mdi fs-2"></span></div>
                                <div>
                                    <span class="fw-semibold text-muted mb-0">Email</span>
                                    <p class="text-black mb-0">
                                        <span>{{ admin.email || '-' }}</span>
                                        <span v-if="admin.verification?.email_verified"
                                            title="Email verified"
                                            class="mdi-check-decagram mdi text-primary fs-5 mx-2"></span>
                                    </p>
                                </div>
                            </div>
                            <!-- Phone -->
                            <div class="d-flex align-items-center gap-3">
                                <div><span class="mdi-phone-in-talk-outline mdi fs-2"></span></div>
                                <div>
                                    <span class="fw-semibold text-muted">Phone</span>
                                    <p class="text-black mb-0">
                                        <span>{{ admin.phone || '-' }}</span>
                                        <span v-if="admin.verification?.phone_verified"
                                            title="Phone verified"
                                            class="mdi-check-decagram mdi text-primary fs-5 mx-2"></span>
                                    </p>
                                </div>
                            </div>
                            <!-- Role -->
                            <div class="d-flex align-items-center gap-3">
                                <div><span class="mdi-account-tie-outline mdi fs-2"></span></div>
                                <div>
                                    <span class="fw-semibold text-muted">Role</span>
                                    <p class="text-black mb-0 text-capitalize">{{ roleLabel || '-' }}</p>
                                </div>
                            </div>
                            <!-- Job title -->
                            <div v-if="admin.job_title" class="d-flex align-items-center gap-3">
                                <div><span class="mdi-briefcase-outline mdi fs-2"></span></div>
                                <div>
                                    <span class="fw-semibold text-muted">Job Title</span>
                                    <p class="text-black mb-0">{{ admin.job_title }}</p>
                                </div>
                            </div>
                            <!-- Last login location -->
                            <div v-if="admin.last_login_location" class="d-flex align-items-center gap-3">
                                <div><span class="mdi-map-marker-outline mdi fs-2"></span></div>
                                <div>
                                    <span class="fw-semibold text-muted">Last Login Location</span>
                                    <p class="text-black mb-0">{{ admin.last_login_location }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Identification documents -->
                    <div v-if="admin.identifications?.length" class="card-body border-top">
                        <h6 class="text-uppercase text-muted mb-3 font-size-12 fw-bold">Identification Documents</h6>
                        <div class="d-flex flex-column gap-3">
                            <div v-for="doc in admin.identifications" :key="doc.type"
                                class="d-flex align-items-center gap-3">
                                <div><span class="mdi-card-account-details-outline mdi fs-2"></span></div>
                                <div>
                                    <span class="fw-semibold text-muted">{{ doc.type_name }}</span>
                                    <p class="text-black mb-0 fw-bold">{{ doc.identifier }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Action buttons -->
                    <div class="card-body border-top gap-3 d-flex flex-wrap">
                        <button v-if="admin.is_active && isNotSelf" class="btn btn-soft-danger waves-effect waves-light"
                            :disabled="actionBusy" @click="openDeactivate">
                            <span>Deactivate admin</span>
                        </button>
                        <button v-else-if="!admin.is_active && isNotSelf" class="btn btn-outline-success w-100 d-flex align-items-center justify-content-center gap-2"
                            :disabled="actionBusy" @click="onReactivate">
                            <span v-if="actionBusy" class="spinner-border spinner-border-sm"></span>
                            <i v-else class="mdi mdi-account-check fs-4"></i>
                            <span>{{ actionBusy ? 'Reactivating…' : 'Reactivate admin' }}</span>
                        </button>

                        <div class="btn-group flex-grow-1">
                            <button type="button"
                                class="btn btn-primary dropdown-toggle w-100"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                More Options <i class="mdi mdi-chevron-down"></i>
                            </button>
                            <ul class="dropdown-menu p-2" data-bs-auto-close="true">
                                <li v-if="admin.status === 'invited'">
                                    <a class="dropdown-item d-flex py-2" href="javascript:void(0);"
                                        @click="resendVerification">
                                        <i class="mdi mdi-message-reply-text me-2 fs-4"></i>
                                        <span>Resend verification</span>
                                    </a>
                                </li>
                                <li>
                                    <router-link class="dropdown-item d-flex py-2" :to="`/team/${admin.id}`">
                                        <i class="bx bxs-info-circle me-2 fs-4"></i>
                                        <span>View details</span>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===================================================== -->
            <!-- RIGHT: tabbed panel                                    -->
            <!-- ===================================================== -->
            <div class="col-sm-12 col-lg-8">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Admin Detailed System Info</h4>
                    </div>
                    <div class="card-header bg-white px-0 pt-0">
                        <ul class="nav nav-tabs nav-tabs-custom card-header-tabs mx-0">
                            <li class="nav-item">
                                <a class="nav-link py-3" :class="{ active: activeTab === 'activity' }"
                                    href="javascript:void(0);" @click="activeTab = 'activity'">
                                    <i class="mdi mdi-history me-1 d-none"></i>
                                    Activity log
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link py-3" :class="{ active: activeTab === 'settings' }"
                                    href="javascript:void(0);" @click="activeTab = 'settings'">
                                    <i class="mdi mdi-cog-outline me-1 d-none"></i>
                                    Account Settings
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="card-body" style="min-height:70vh">
                        <!-- ===== ACTIVITY TAB ===== -->
                        <div v-if="activeTab === 'activity'">
                            <!-- Loading (first fetch) -->
                            <div v-if="loadingActivity && activity.length === 0" class="text-center py-4">
                                <div class="d-flex justify-content-center align-items-center" style="height: 65vh;">
                                    <div class="spinner-border text-primary"></div>
                                </div>
                            </div>

                            <!-- Empty -->
                            <div v-else-if="activity.length === 0" class="text-center py-5">
                                <div class="d-flex justify-content-center align-items-center" style="height: 70vh;">
                                    <div>
                                        <i class="mdi mdi-timeline-clock-outline fs-1 text-muted"></i>
                                        <h6 class="mt-2 mb-1">No activity yet</h6>
                                        <p class="text-muted small mb-0">
                                            Events for this admin will appear here as they happen.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- Timeline -->
                            <div v-else>
                                <ul class="verti-timeline list-unstyled">
                                    <li v-for="(log, i) in activity" :key="i" class="event-list">
                                        <div class="event-timeline-dot" style="left: -17px;">
                                            <span class="avatar-xs rounded-circle d-flex align-items-center justify-content-center"
                                                :class="activityIconBg(log.event)">
                                                <i class="mdi fs-4" :class="[activityIcon(log.event), activityIconColor(log.event)]"></i>
                                            </span>
                                        </div>
                                        <div class="d-flex mb-3">
                                            <div class="flex-grow-1">
                                                <div>
                                                    <h5 class="font-size-14 text-capitalize">{{ activityLabel(log.event) }} <template v-if="log.channel">[{{ log.channel }}]</template></h5>
                                                    <p class="text-muted mb-0">
                                                        {{ smartDate(log.at) }}
                                                        <span v-if="log.ip_address"> · {{ log.ip_address }}</span>
                                                    </p>
                                                    <div v-if="metaPairs(log.meta).length" class="mt-1 d-flex flex-wrap gap-2">
                                                        <span v-for="(pair, j) in metaPairs(log.meta)" :key="j"
                                                            class="text-capitalize badge-alt2 bg-gray-200 text-dark bg-primary-soft w-auto">
                                                            {{ pair }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                                <!-- Footer -->
                                <div class="text-center pt-2">
                                    <p class="text-muted small mb-0">
                                        <i class="bx bx-check-circle text-success me-1"></i>
                                        Showing the last {{ activity.length }} events
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- ===== ACCOUNT SETTINGS TAB ===== -->
                        <div v-else-if="activeTab === 'settings'">
                            <div class="row align-items-center justify-content-center">
                                <div class="col-xl-9 col-lg-10 mt-3 col-sm-12 col-md-11">
                                    <div class="list-group list-group-flush">

                                        <!-- Two Factor Authentication -->
                                        <div class="p-3 border border-dashed rounded-3 mb-3 d-flex align-items-center justify-content-between gap-3 border-dark-subtle">
                                            <div class="d-flex gap-3 align-items-center">
                                                <div class="avatar-sm mx-auto">
                                                    <span class="avatar-title rounded-circle bg-dark bg-soft font-size-24" style="height:3rem;width:3rem;">
                                                        <i class="mdi mdi-shield-key-outline text-black"></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <p class="mb-0 fw-semibold">Two-Factor Authentication (2FA)</p>
                                                    <small class="text-muted">
                                                        Require this admin to verify their identity using a one-time code during every sign-in.
                                                    </small>
                                                </div>
                                            </div>
                                            <div class="d-flex gap-3 align-items-center">
                                                <template v-if="!isUpdatingMFA">
                                                    <label v-if="admin.security?.require_otp_always" class="form-check-label text-success fw-bold">Enabled</label>
                                                    <label v-else class="form-check-label text-muted">Disabled</label>
                                                </template>
                                                <template v-else>
                                                    Updating... <span class="spinner-border spinner-border-sm text-muted"></span>
                                                </template>
                                                <div class="form-check form-switch form-switch-md mb-0">
                                                    <input class="form-check-input" type="checkbox"
                                                        :checked="admin.security.require_otp_always"
                                                        :disabled="admin.security.otp_always_locked || isUpdatingMFA"
                                                        @click.prevent="onMfaClick">
                                                </div>
                                            </div>
                                        </div>

                                        <!-- OTP on New Device -->
                                        <div class="p-3 border border-dashed rounded-3 mb-3 d-flex align-items-center justify-content-between gap-3 border-dark-subtle">
                                            <div class="d-flex gap-3 align-items-center">
                                                <div class="avatar-sm mx-auto">
                                                    <span class="avatar-title rounded-circle bg-dark bg-soft font-size-24" style="height:3rem;width:3rem;">
                                                        <i class="mdi mdi-key-wireless text-black"></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <p class="mb-0 fw-semibold">Require OTP for New Devices</p>
                                                    <small class="text-muted">
                                                        Send a verification code whenever this admin signs in from a new or unrecognized device.
                                                    </small>
                                                </div>
                                            </div>
                                            <div class="d-flex gap-3 align-items-center">
                                                <template v-if="!isUpdatingNewDeviceOtp">
                                                    <label v-if="admin.security.require_otp_new_device" class="form-check-label text-success fw-bold">Enabled</label>
                                                    <label v-else class="form-check-label text-muted">Disabled</label>
                                                </template>
                                                <template v-else>
                                                    Updating... <span class="spinner-border spinner-border-sm text-muted"></span>
                                                </template>
                                                <div class="form-check form-switch form-switch-md mb-0">
                                                    <input class="form-check-input" type="checkbox"
                                                        :checked="admin.security.require_otp_new_device"
                                                        :disabled="isUpdatingNewDeviceOtp"
                                                        @click.prevent="onNewDeviceOtpClick">
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Automatic Logout -->
                                        <div class="p-3 border border-dashed rounded-3 mb-3 d-flex align-items-center justify-content-between gap-3 border-dark-subtle">
                                            <div class="d-flex gap-3 align-items-center">
                                                <div class="avatar-sm mx-auto">
                                                    <span class="avatar-title rounded-circle bg-dark bg-soft font-size-24" style="height:3rem;width:3rem;">
                                                        <i class="mdi mdi-timer-outline text-black"></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <p class="mb-0 fw-semibold">Automatic Logout</p>
                                                    <small class="text-muted">
                                                        Automatically sign this admin out after a period of inactivity.
                                                    </small>
                                                </div>
                                            </div>
                                            <div class="d-flex gap-3 align-items-center">
                                                <select class="form-select form-select-sm" style="width:auto;"
                                                    :value="admin.security.idle_logout_minutes"
                                                    :disabled="loadingLogoutTime || !isNotSelf"
                                                    @change="onChangeIdleLogout($event)">
                                                    <option v-for="o in logoutOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
                                                </select>
                                                <template v-if="loadingLogoutTime">
                                                    <span class="spinner-border spinner-border-sm text-muted"></span>
                                                </template>
                                            </div>
                                        </div>

                                        <!-- Trusted Device Period -->
                                        <div class="p-3 border border-dashed rounded-3 mb-3 d-flex align-items-center justify-content-between gap-3 border-dark-subtle">
                                            <div class="d-flex gap-3 align-items-center">
                                                <div class="avatar-sm mx-auto">
                                                    <span class="avatar-title rounded-circle bg-dark bg-soft font-size-24" style="height:3rem;width:3rem;">
                                                        <i class="mdi mdi-cellphone-key text-black"></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <p class="mb-0 fw-semibold">Trusted Device Period</p>
                                                    <small class="text-muted">
                                                        How long a verified device stays trusted before it needs a code again.
                                                    </small>
                                                </div>
                                            </div>
                                            <div class="d-flex gap-3 align-items-center">
                                                <select class="form-select form-select-sm" style="width:auto;"
                                                    :value="admin.security.device_trust_days"
                                                    :disabled="loadingTrustDays || !isNotSelf"
                                                    @change="onChangeTrustDays($event)">
                                                    <option v-for="o in trustDayOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
                                                </select>
                                                <template v-if="loadingTrustDays">
                                                    <span class="spinner-border spinner-border-sm text-muted"></span>
                                                </template>
                                            </div>
                                        </div>

                                        <!-- Verification rows -->
                                        <div class="p-3 border border-dashed rounded-3 mb-3 d-flex align-items-center justify-content-between gap-3 border-dark-subtle">
                                            <div class="d-flex gap-3 align-items-center">
                                                <div class="avatar-sm mx-auto">
                                                    <span class="avatar-title rounded-circle bg-dark bg-soft font-size-24" style="height:3rem;width:3rem;">
                                                        <i class="mdi mdi-email-check-outline text-black"></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <p class="mb-0 fw-semibold">Email Verification</p>
                                                    <small class="text-muted">Whether the email address has been confirmed.</small>
                                                </div>
                                            </div>
                                            <div>
                                                <span class="badge text-uppercase"
                                                    :class="admin.verification?.email_verified ? 'bg-success' : 'bg-secondary'">
                                                    {{ admin.verification?.email_verified ? 'Verified' : 'Pending' }}
                                                </span>
                                            </div>
                                        </div>

                                        <div class="p-3 border border-dashed rounded-3 mb-3 d-flex align-items-center justify-content-between gap-3 border-dark-subtle">
                                            <div class="d-flex gap-3 align-items-center">
                                                <div class="avatar-sm mx-auto">
                                                    <span class="avatar-title rounded-circle bg-dark bg-soft font-size-24" style="height:3rem;width:3rem;">
                                                        <i class="mdi mdi-phone-check-outline text-black"></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <p class="mb-0 fw-semibold">Phone Verification</p>
                                                    <small class="text-muted">Whether the phone number has been confirmed.</small>
                                                </div>
                                            </div>
                                            <div>
                                                <span class="badge text-uppercase"
                                                    :class="admin.verification?.phone_verified ? 'bg-success' : 'bg-secondary'">
                                                    {{ admin.verification?.phone_verified ? 'Verified' : 'Pending' }}
                                                </span>
                                            </div>
                                        </div>

                                        <div class="p-3 border border-dashed rounded-3 mb-3 d-flex align-items-center justify-content-between gap-3 border-dark-subtle">
                                            <div class="d-flex gap-3 align-items-center">
                                                <div class="avatar-sm mx-auto">
                                                    <span class="avatar-title rounded-circle bg-dark bg-soft font-size-24" style="height:3rem;width:3rem;">
                                                        <i class="mdi mdi-lock-reset text-black"></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <p class="mb-0 fw-semibold">Password</p>
                                                    <small class="text-muted">Whether this admin has set their own password yet.</small>
                                                </div>
                                            </div>
                                            <div>
                                                <span class="badge text-uppercase"
                                                    :class="admin.verification?.password_set ? 'bg-success' : 'bg-warning text-dark'">
                                                    {{ admin.verification?.password_set ? 'Set' : 'Not set' }}
                                                </span>
                                            </div>
                                        </div>

                                        <div class="p-3 d-none border border-dashed rounded-3 d-flex align-items-center justify-content-between gap-3 border-dark-subtle">
                                            <div class="d-flex gap-3 align-items-center">
                                                <div class="avatar-sm mx-auto">
                                                    <span class="avatar-title rounded-circle bg-dark bg-soft font-size-24" style="height:3rem;width:3rem;">
                                                        <i class="mdi mdi-history text-black"></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <p class="mb-0 fw-semibold">Security Audit Log</p>
                                                    <small class="text-muted">Password changes, logins, and admin actions.</small>
                                                </div>
                                            </div>
                                            <div>
                                                <label class="form-check-label text-nowrap">See Activity tab</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Deactivation modal -->
    <DeactivateAdminModal ref="deactivateModal" :admin="admin" @deactivated="onAdminDeactivated"
        @close="() => {}" @toast="(t, m) => showToast('success', t, m)" @error="(t, m) => showError(t, m)" />

    <!-- Confirm modal (disabling security toggles) -->
    <ConfirmActionModal v-if="showConfirmModal" :user="admin" :title="action?.title"
        :message="action?.message" :confirm-text="action?.confirmText" :confirm-class="action?.confirmClass"
        :icon="action?.icon" :btn-title="action?.buttonTitle" :actionKey="action?.key"
        :loading="isConfirmActionLoading" :loading-text="action?.loadingText"
        @cancel="handleCancel" @confirm="handleConfirm" />

    <ImageToast :status="toastStatus" :title="toastTitle" :message="toastMessage" :image="toastImage"
        :imageHeight="70" @hide="toastStatus = null" />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import NProgress from "nprogress";

// API
import AdminsAPI from '@/api/admins'
import AuthAPI from '@/api/auth'

// Components
import LoaderVue from '@/layouts/Loader.vue'
import ImageToast from '@/components/ImageToast.vue'
import ConfirmActionModal from '@/components/ConfirmActionModal.vue'
import DeactivateAdminModal from './DeactivateAdminModal.vue'

// Utils
import { smartDate } from '@/utils/dates'
import successImage from '../../assets/images/icons/check.png'
import errorImage from '../../assets/images/icons/error.png'

import { SECURITY_ACTIONS } from '@/constants/securityActions.js'

const logoutOptions = [
    { value: 5, label: '5 Minutes' },
    { value: 10, label: '10 Minutes' },
    { value: 15, label: '15 Minutes' },
    { value: 20, label: '20 Minutes' },
    { value: 30, label: '30 Minutes' },
    { value: 45, label: '45 Minutes' },
    { value: 60, label: '1 Hour' },
    { value: 120, label: '2 Hours' },
    { value: 240, label: '4 Hours' },
    { value: 480, label: '8 Hours' },
    { value: 720, label: '12 Hours' },
    { value: 1440, label: '24 Hours' },
];

const trustDayOptions = [
    { value: 7, label: '7 days' },
    { value: 14, label: '14 days' },
    { value: 30, label: '30 days' },
    { value: 60, label: '60 days' },
    { value: 90, label: '90 days' },
    { value: 180, label: '6 months' },
    { value: 365, label: '1 year' },
];

const loadingLogoutTime = ref(false)
const loadingTrustDays = ref(false)

const route = useRoute()
const adminId = computed(() => route.params.id)

// ── State ──────────────────────────────────────────────────────────────
const isLoading = ref(true)
const loadError = ref(null)

const admin = ref({})
const currentAdmin = ref({})

// Activity log
const activity = ref([])
const loadingActivity = ref(false)

const actionBusy = ref(false)
const activeTab = ref('activity')

const deactivateModal = ref(null)

// Toast
const toastStatus = ref(null)
const toastTitle = ref('')
const toastMessage = ref('')
const toastImage = ref(null)

// Confirm action (disabling security toggles)
const showConfirmModal = ref(false)
const action = ref(null)
const pendingUpdate = ref(null)   // { field, value } as soon as the confirm modal closes
const isUpdatingMFA = ref(false)
const isUpdatingNewDeviceOtp = ref(false)
const isConfirmActionLoading = ref(false)

// ── Computed ───────────────────────────────────────────────────────────
const isNotSelf = computed(() => currentAdmin.value.id !== admin.value?.id)

const initials = computed(() => {
    const f = admin.value?.first_name?.charAt(0) || ''
    const l = admin.value?.last_name?.charAt(0) || ''
    return (f + l).toUpperCase() || 'U'
})

const roleLabel = computed(() => {
    const r = admin.value?.role
    return r?.display_name || r?.name || ''
})

const verificationLabel = computed(() => {
    const v = admin.value?.verification
    if (v?.email_verified && v?.phone_verified) return 'Verified'
    if (v?.email_verified || v?.phone_verified) return 'Partial'
    return 'Pending'
})

// "Online" = last_seen_at within the last 3 minutes
const isOnline = computed(() => {
    if (!admin.value?.is_active) return false
    if (!admin.value?.last_seen_at) return false
    const seen = new Date(admin.value.last_seen_at).getTime()
    return (Date.now() - seen) < 3 * 60 * 1000
})

// ── Fetching ──────────────────────────────────────────────────────────
async function getAdmin() {
    try {
        const { data } = await AdminsAPI.get(adminId.value)
        admin.value = data.data || data
    } catch (error) {
        if (error.response?.status === 404) {
            loadError.value = 'Admin not found.'
        } else {
            loadError.value = error.response?.data?.message || 'Failed to load admin.'
        }
    }
}

async function getCurrentAdmin() {
    try {
        const { data } = await AuthAPI.me()
        currentAdmin.value = data.data || data.user || {}
    } catch (e) {
        // non-blocking
    }
}

async function getActivity() {
    if (loadingActivity.value) return
    loadingActivity.value = true
    try {
        const { data } = await AdminsAPI.activity(adminId.value, { limit: 50 })
        activity.value = data.data || []
    } catch (error) {
        activity.value = []
        showError('Activity Unavailable', error.response?.data?.message || 'Could not load activity log.')
    } finally {
        loadingActivity.value = false
    }
}

// ── Actions ───────────────────────────────────────────────────────────
function openDeactivate() {
    deactivateModal.value?.open()
}

function onAdminDeactivated({ reason }) {
    admin.value.is_active = false
    admin.value.status = 'deactivated'
    admin.value.deactivated_at = new Date().toISOString()
    admin.value.deactivation_reason = reason
}

async function onReactivate() {
    if (!confirm(`Reactivate ${admin.value.full_name}?`)) return
    actionBusy.value = true
    try {
        await AdminsAPI.reactivate(adminId.value)
        await getAdmin()
        showToast('success', 'Admin Reactivated', `${admin.value.full_name} is now active.`)
    } catch (error) {
        showError('Reactivation Failed', error.response?.data?.message || 'Could not reactivate.')
    } finally {
        actionBusy.value = false
    }
}

async function resendVerification() {
    try {
        await AdminsAPI.resendVerification(adminId.value, { channel: 'email' })
        showToast('success', 'Verification Resent', `A new verification code was sent to ${admin.value.email}.`)
    } catch (error) {
        showError('Resend Failed', error.response?.data?.message || 'Could not resend verification.')
    }
}

// ── Security settings ─────────────────────────────────────────────────
async function updateAdmin(payload) {
    const { data } = await AdminsAPI.update(adminId.value, payload)
    admin.value = data.data || admin.value
}

// 2FA toggle — disabling needs a confirm, enabling applies immediately.
function onMfaClick() {
    const current = admin.value.security.require_otp_always
    if (!current) {
        applyMfa(true)
    } else {
        pendingUpdate.value = { apply: (v) => applyMfa(v), key: 'disableMfa' }
        action.value = SECURITY_ACTIONS.DISABLE_MFA
        showConfirmModal.value = true
    }
}

async function applyMfa(newValue) {
    showConfirmModal.value = false
    isUpdatingMFA.value = true
    isConfirmActionLoading.value = true
    try {
        await updateAdmin({ require_otp_always: newValue })
        showToast('success', 'Two-Factor Authentication Updated',
            `Two-factor authentication is now ${newValue ? 'enabled' : 'disabled'} for ${admin.value.full_name}.`)
    } catch (error) {
        showError('Update Failed', error.response?.data?.message || 'Unable to update two-factor authentication.')
    } finally {
        isUpdatingMFA.value = false
        isConfirmActionLoading.value = false
        pendingUpdate.value = null
        action.value = null
    }
}

// New-device OTP toggle.
function onNewDeviceOtpClick() {
    const current = admin.value.security.require_otp_new_device
    if (!current) {
        applyNewDeviceOtp(true)
    } else {
        pendingUpdate.value = { apply: (v) => applyNewDeviceOtp(v), key: 'disableNewDeviceOtp' }
        action.value = SECURITY_ACTIONS.DISABLE_NEW_DEVICE_OTP
        showConfirmModal.value = true
    }
}

async function applyNewDeviceOtp(newValue) {
    showConfirmModal.value = false
    isUpdatingNewDeviceOtp.value = true
    isConfirmActionLoading.value = true
    try {
        await updateAdmin({ require_otp_new_device: newValue })
        showToast('success', 'New Device Authentication Updated',
            `OTP verification for new devices is now ${newValue ? 'enabled' : 'disabled'}.`)
    } catch (error) {
        showError('Update Failed', error.response?.data?.message || 'Unable to update new device verification.')
    } finally {
        isUpdatingNewDeviceOtp.value = false
        isConfirmActionLoading.value = false
        pendingUpdate.value = null
        action.value = null
    }
}

// Automatic logout + trusted device period dropdowns.
async function onChangeIdleLogout(event) {
    const value = Number(event.target.value)
    loadingLogoutTime.value = true
    try {
        await updateAdmin({ idle_logout_minutes: value })
        showToast('success', 'Automatic Logout Updated',
            `${admin.value.full_name} will be signed out after ${prefixByMinutes(value)} of inactivity.`)
    } catch (error) {
        showError('Update Failed', error.response?.data?.message || 'Could not update automatic logout.')
    } finally {
        loadingLogoutTime.value = false
    }
}

async function onChangeTrustDays(event) {
    const value = Number(event.target.value)
    loadingTrustDays.value = true
    try {
        await updateAdmin({ device_trust_days: value })
        showToast('success', 'Trusted Device Period Updated',
            `Devices will be trusted for ${value} days before needing a code again.`)
    } catch (error) {
        showError('Update Failed', error.response?.data?.message || 'Could not update the trusted device period.')
    } finally {
        loadingTrustDays.value = false
    }
}

// Confirm modal plumbing
function handleCancel() {
    showConfirmModal.value = false
    action.value = null
    pendingUpdate.value = null
}

async function handleConfirm({ action: actionKey }) {
    if (pendingUpdate.value && pendingUpdate.value.key === actionKey) {
        await pendingUpdate.value.apply(false)
    }
}

// ── Activity helpers ──────────────────────────────────────────────────
const ACTIVITY_META = {
    admin_created: { icon: 'mdi-account-plus', label: 'Admin created' },
    admin_updated: { icon: 'mdi-account-edit', label: 'Admin updated' },
    admin_deactivated: { icon: 'mdi-account-cancel', label: 'Admin deactivated' },
    admin_reactivated: { icon: 'mdi-account-check', label: 'Admin reactivated' },
    otp_sent: { icon: 'mdi-email-receive-outline', label: 'OTP sent' },
    otp_failed: { icon: 'mdi-alert-circle-outline', label: 'OTP failed' },
    otp_verified: { icon: 'mdi-check-decagram', label: 'OTP verified' },
    password_set: { icon: 'mdi-key-variant', label: 'Password set' },
    login_locked: { icon: 'mdi-lock-alert', label: 'Login locked' },
    login_failed: { icon: 'mdi-account-alert', label: 'Login failed' },
    login_blocked_inactive: { icon: 'mdi-account-off-outline', label: 'Login blocked (inactive)' },
    login_success: { icon: 'mdi-login', label: 'Login' },
    login_otp_failed: { icon: 'mdi-alert-circle-outline', label: 'Login OTP failed' },
    login_otp_resend_failed: { icon: 'mdi-alert-circle-outline', label: 'OTP resend failed' },
    login_otp_required: { icon: 'mdi-shield-key-outline', label: 'OTP required' },
    device_trusted: { icon: 'mdi-shield-check-outline', label: 'Device trusted' },
    device_untrusted: { icon: 'mdi-shield-off-outline', label: 'Device untrusted' },
    password_reset_requested: { icon: 'mdi-lock-reset', label: 'Password reset requested' },
    password_reset: { icon: 'mdi-key-change', label: 'Password reset' },
    password_change_failed: { icon: 'mdi-key-alert-outline', label: 'Password change failed' },
    password_changed: { icon: 'mdi-key-change', label: 'Password changed' },
    logout: { icon: 'mdi-logout', label: 'Sign out' },
    session_revoked: { icon: 'mdi-devices', label: 'Session revoked' },
    sessions_revoked_others: { icon: 'mdi-devices', label: 'Other sessions revoked' },
}

function activityById(event) {
    return ACTIVITY_META[event] || { icon: 'mdi-information-outline', label: event.replace(/_/g, ' ') }
}

function activityIcon(event) {
    return activityById(event).icon
}

function activityLabel(event) {
    return activityById(event).label
}

function activityIconColor(event) {
    if (['otp_verified', 'login_success', 'admin_reactivated', 'password_set', 'password_reset', 'password_changed', 'device_trusted'].includes(event)) return 'text-success'
    if (['otp_failed', 'login_failed', 'login_locked', 'admin_deactivated', 'login_blocked_inactive', 'login_otp_failed', 'password_change_failed'].includes(event)) return 'text-danger'
    if (['password_reset_requested', 'otp_sent', 'login_otp_resend_failed'].includes(event)) return 'text-warning'
    return 'text-muted'
}

function activityIconBg(event) {
    if (['otp_verified', 'login_success', 'admin_reactivated', 'password_set', 'password_reset', 'password_changed', 'device_trusted'].includes(event)) return 'bg-success-subtle'
    if (['otp_failed', 'login_failed', 'login_locked', 'admin_deactivated', 'login_blocked_inactive', 'login_otp_failed', 'password_change_failed'].includes(event)) return 'bg-danger-subtle'
    if (['password_reset_requested', 'otp_sent', 'login_otp_resend_failed'].includes(event)) return 'bg-warning-subtle'
    return 'bg-light'
}

// Flatten meta JSON into displayable key:value badges, skipping noisy keys.
function metaPairs(meta) {
    if (!meta || typeof meta !== 'object') return []
    const skip = new Set(['created_by'])
    const out = []
    for (const [k, v] of Object.entries(meta)) {
        if (skip.has(k)) continue
        if (v === null || v === undefined || v === '') continue
        const label = k.replace(/_/g, ' ')
        out.push(`${label}: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
    }
    return out
}

function prefixByMinutes(minutes) {
    if (minutes % 1440 === 0) return `${minutes / 1440} day(s)`
    if (minutes % 60 === 0) return `${minutes / 60} hour(s)`
    return `${minutes} minute(s)`
}

// ── Toast ─────────────────────────────────────────────────────────────
function showToast(status, title, message) {
    toastStatus.value = status
    toastTitle.value = title
    toastMessage.value = message
    toastImage.value = status === 'success' ? successImage : null
}
function showError(title, message) {
    toastStatus.value = 'error'
    toastTitle.value = title
    toastMessage.value = message
    toastImage.value = errorImage
}

// ── Lifecycle ─────────────────────────────────────────────────────────
onMounted(async () => {
    NProgress.start()
    document.title = 'Admin Profile · PaySol'
    await Promise.all([getCurrentAdmin()])
    await getAdmin()
    if (!loadError.value) {
        document.title = `${admin.value.full_name || 'Admin'} · PaySol`
    }
    isLoading.value = false
    NProgress.done()
})

// React to route changes (e.g. navigating from /team/3 → /team/5)
watch(() => route.params.id, async (newId, oldId) => {
    if (newId === oldId) return
    isLoading.value = true
    loadError.value = null
    activity.value = []
    await getAdmin()
    isLoading.value = false
})

// Lazy-load activity the first time the tab opens
watch(activeTab, (tab) => {
    if (tab === 'activity' && activity.value.length === 0 && !loadingActivity.value) {
        getActivity()
    }
})
</script>

<style scoped>
.nav-tabs .nav-link {
    cursor: pointer;
}
</style>