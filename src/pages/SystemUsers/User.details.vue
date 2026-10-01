<template>
    <div class="container-fluid">
        <!-- Page Title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">User Profile</h4>
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                                <router-link to="/">Dashboard</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/users/list">User Management</router-link>
                            </li>
                            <li class="breadcrumb-item active">
                                {{ user?.full_name || '…' }}
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <!-- 🔄 Loader -->
        <div v-if="isLoading">
            <LoaderVue />
        </div>

        <!-- 🚫 Not found / error -->
        <div v-else-if="loadError" class="row justify-content-center">
            <div class="col-md-6">
                <div class="card text-center p-5">
                    <i class="bx bx-error-circle text-danger fs-1 mb-3"></i>
                    <h5 class="mb-2">{{ loadError }}</h5>
                    <router-link to="/users/list" class="btn btn-link">← Back to users</router-link>
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
                            <img v-if="user.profile_photo_url" :src="user.profile_photo_url"
                                class="img-thumbnail rounded-circle" alt="" />
                            <div v-else class="img-thumbnail rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center border-4"
                                style="width: 100%; height: 100%; font-size: 32px; font-weight: 600;">
                                {{ initials }}
                            </div>
                            <span v-if="isOnline" class="online-indicator" :title="`Last seen ${smartDate(user.last_seen_at)}`"></span>
                        </div>

                        <h5 class="font-size-15 text-truncate fw-bold text-black mb-0">
                            {{ user.full_name }}
                        </h5>
                        <p class="text-muted mb-0 text-truncate">
                            {{ roleLabel }}<span v-if="user.designation"> · {{ user.designation }}</span>
                        </p>

                        <!-- ===== Status block ===== -->
                        <!-- Active variant -->
                        <div v-if="user.is_active" class="w-100 mt-4 text-start">
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
                                            <span v-if="user.last_seen_at">
                                                Last seen {{ smartDate(user.last_seen_at) }}
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
                                                <strong v-if="user.deactivation?.deactivated_at">
                                                    {{ smartDate(user.deactivation.deactivated_at) }}
                                                </strong>
                                                <template v-if="user.deactivation?.deactivated_by">
                                                    by <strong>{{ user.deactivation.deactivated_by.name ||'-'}}</strong>
                                                </template>
                                            </h5>
                                            <span class="badge bg-danger text-uppercase">Inactive</span>
                                        </div>
                                        <div v-if="user.deactivation?.reason" class="mb-2">
                                            <span class="fw-semibold text-dark">Reason <br> </span>
                                            <span class="text-muted">{{ user.deactivation.reason }}</span>
                                        </div>
                                        <div v-if="user.deactivation?.notes">
                                            <span class="fw-semibold text-dark d-block mb-1">Notes: <br></span>
                                            <p class="text-muted mb-0">{{ user.deactivation.notes }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                        <div class="row m-0 px-0 w-100 pt-3">

                             <div class="col-6 mt-4 mb-3">
                                <div @click="activeTab = 'settings'"  class="d-block py-3 px-4  text-center border border-dashed border-gray-5 rounded position-relative">
                                    
                                    <div class="avatar-sm mx-auto position-absolute top-0 start-50 translate-middle ">
                                            <div class="avatar-title rounded-circle bg-primary bg-soft  border-soft-warning ">
                                        <i class="mdi mdi-devices fs-3 text-primary"></i>
                                    </div>
                                    </div>
                                    <div>
                                        <div class="fs-12 text-muted mb-1 mt-3">Active Sessions</div>
                                        <h4 class="m-0 p-0">
                                            <span v-if="loadingSessions" class="spinner-border spinner-border-sm text-muted"></span>
                                        <span v-else>{{ sessions.length }}</span>
                                        </h4>
                                    </div>
                                </div>
                            </div>

                             <div class="col-6 mt-4 mb-3">
                                <div  class="d-block py-3 px-4  text-center border border-dashed border-gray-5 rounded position-relative">
                                    
                                    <div class="avatar-sm mx-auto position-absolute top-0 start-50 translate-middle ">
                                            <div class="avatar-title rounded-circle bg-success bg-soft  border-soft-warning ">
                                        <i class="mdi mdi-file-document-outline  fs-3 text-success"></i>
                                    </div>
                                    </div>
                                    <div>
                                        <div class="fs-12 text-muted mb-1 mt-3">Forms Submitted</div>
                                        <h4 class="m-0 p-0">
                                            <span class="mb-0">{{ formsCount }}</span>
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6 mt-4 ">
                                <div  class="d-block py-3 px-4  text-center border border-dashed border-gray-5 rounded position-relative">
                                    
                                    <div class="avatar-sm mx-auto position-absolute top-0 start-50 translate-middle ">
                                            <div class="avatar-title rounded-circle bg-dark bg-soft  border-soft-warning ">
                                        <i class="mdi mdi-calendar-check fs-3 text-dark"></i>
                                    </div>
                                    </div>
                                    <div>
                                        <div class="fs-12 text-muted mb-1 mt-3">Registered On</div>
                                        <h6 class="m-0 p-0">
                                            {{ user.audit.created_at ? smartDate(user.audit.created_at) : 'Unknown' }}
                                        </h6>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6 mt-4 ">
                                <div  class="d-block py-3 px-4  text-center border border-dashed border-gray-5 rounded position-relative">
                                    
                                    <div class="avatar-sm mx-auto position-absolute top-0 start-50 translate-middle ">
                                            <div class="avatar-title rounded-circle bg-info bg-soft  border-soft-warning ">
                                        <i class="mdi mdi-login fs-3 text-info fs-3 text-info"></i>
                                    </div>
                                    </div>
                                    <div>
                                        <div class="fs-12 text-muted mb-1 mt-3">Last Login</div>
                                        <h6 class="m-0 p-0">
                                            {{ user.last_login_at ? smartDate(user.last_login_at) : 'Never' }}
                                        </h6>
                                    </div>
                                </div>
                            </div>

                            <div class="col-4 d-none">
                                <div class=" py-3 px-4 rounded-1 d-flex flex-column  border border-dashed border-gray-5">
                                    <h5 class=" fw-bolder">28.65K</h5>
                                    <p class="fs-12 text-muted mb-0">Active Sessions</p>
                                </div>
                            </div>

                            <div class="col-4 d-none">
                                <div class=" py-3 px-4 rounded-1 d-flex flex-column  border border-dashed border-gray-5">
                                    <h5 class=" fw-bolder">28.65K</h5>
                                    <p class="fs-12 text-muted mb-0">Last Login</p>
                                </div>
                            </div>

                            <div class="col-4 d-none">
                                <div class=" py-3 px-4 rounded-1 d-flex flex-column  border border-dashed border-gray-5">
                                    <h5 class=" fw-bolder">28.65K</h5>
                                    <p class="fs-12 text-muted mb-0">Forms Submitted</p>
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
                                        <span>{{ user.email || '-' }}</span>
                                        <span v-if="user.verification?.email_verified"
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
                                        <span>{{ user.phone || '-' }}</span>
                                        <span v-if="user.verification?.phone_verified"
                                            title="Phone verified"
                                            class="mdi-check-decagram mdi text-primary fs-5 mx-2"></span>
                                    </p>
                                </div>
                            </div>
                            <!-- National ID -->
                            <div class="d-flex align-items-center gap-3">
                                <div><span class="mdi-card-account-details-outline mdi fs-2"></span></div>
                                <div>
                                    <span class="fw-semibold text-muted">National ID</span>
                                    <p class="text-black mb-0">{{ user.national_id || '-' }}</p>
                                </div>
                            </div>
                            <!-- Polling station -->
                            <div v-if="user.polling_station" class="d-flex align-items-center gap-3">
                                <div><span class="mdi-map-marker-outline mdi fs-2"></span></div>
                                <div>
                                    <span class="fw-semibold text-muted">Assigned Station</span>
                                    <p class="text-black mb-0">
                                        {{ user.polling_station.name }}
                                        <span class="text-muted">· Stream {{ user.polling_station.stream_number }}</span>
                                    </p>
                                    <small class="text-muted">Code {{ user.polling_station.code }}</small>
                                </div>
                            </div>

                            <!-- role in the organizations -->

                            <div v-if="user.designation" class="d-flex align-items-center gap-3">
                                <div><span class="mdi-account-tie-outline mdi fs-2"></span></div>
                                <div>
                                    <span class="fw-semibold text-muted">Designation</span>
                                    <p class="text-black mb-0">{{ user.designation }}</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    <!-- Action button (currently hidden via d-none) -->
                    
                    <div class="card-body border-top gap-3 d-flex ">
                        <button v-if="user.is_active" class="btn btn-soft-danger waves-effect waves-light"
                            :disabled="actionBusy" @click="openDeactivate">
                            
                            <span>Deactivate user</span>
                        </button>
                        <button v-else class="btn btn-outline-success w-100 d-flex align-items-center justify-content-center gap-2"
                            :disabled="actionBusy" @click="onReactivate">
                            <span v-if="actionBusy" class="spinner-border spinner-border-sm"></span>
                            <i v-else class="mdi mdi-account-check fs-4"></i>
                            <span>{{ actionBusy ? 'Reactivating…' : 'Reactivate user' }}</span>
                        </button>

                       <div class="btn-group flex-grow-1">
                            <button type="button" class="btn btn-primary dropdown-toggle w-100" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                More Options <i class="mdi mdi-chevron-down"></i>
                            </button>
                            <ul class="dropdown-menu p-2" data-bs-auto-close="true">
                                                        
                                    <li>
                                        <router-link class="dropdown-item d-flex py-2"
                                            :to="`/users/${user.id}/edit`">
                                            <i class="bx bxs-pencil me-2 fs-4"></i>
                                            <span>Edit user</span>
                                        </router-link>
                                    </li>
                                    <li v-if="!user.verification?.fully_verified">
                                        <a class="dropdown-item d-flex py-2" href="javascript:void(0);"
                                            @click="resendOtp(user)">
                                            <i class="mdi mdi-message-reply-text me-2 fs-4"></i>
                                            <span>Resend OTP</span>
                                        </a>
                                    </li>
                                </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===================================================== -->
            <!-- RIGHT: stats strip + tabbed panel                       -->
            <!-- ===================================================== -->
            <div class="col-sm-12 col-lg-8">

                <!-- Tabbed panel -->
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">User Detailed System Info</h4>
                    </div>
                    <div class="card-header bg-white px-0 pt-0">
                        <ul class="nav nav-tabs nav-tabs-custom card-header-tabs mx-0">
                            <li class="nav-item">
                                <a class="nav-link py-3" :class="{ active: activeTab === 'sessions' }"
                                    href="javascript:void(0);" @click="activeTab = 'sessions'">
                                    <i class="mdi mdi-devices me-1 d-none"></i>
                                    <span class="fs-">Sessions</span>
                                    <span v-if="!loadingSessions" class="badge bg-light text-dark ms-1 bg-opacity-50 d-none">{{ sessions.length }}</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link py-3" :class="{ active: activeTab === 'activity' }"
                                    href="javascript:void(0);" @click="activeTab = 'activity'">
                                    <i class="mdi mdi-history me-1 d-none"></i>
                                    Activity log
                                    <span v-if="activityTotal > 0" class="badge bg-light text-dark ms-1 bg-opacity-50 d-none">{{ activityTotal }}</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link py-3" :class="{ active: activeTab === 'forms' }"
                                    href="javascript:void(0);" @click="activeTab = 'forms'">
                                    <i class="mdi mdi-file-document-outline me-1 d-none"></i>
                                    Submitted Forms
                                    <span class="badge bg-light text-dark ms-1 bg-opacity-50 d-none">{{ formsCount }}</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link py-3" :class="{ active: activeTab === 'settings' }"
                                    href="javascript:void(0);" @click="activeTab = 'settings'">
                                    <i class="mdi mdi-file-document-outline me-1 d-none"></i>
                                    Account Settings
                                    <span class="badge bg-light text-dark ms-1 bg-opacity-50 d-none">{{ formsCount }}</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="card-body" style="min-height:70vh">
                        <!-- ===== SESSIONS TAB ===== -->
                        <div v-if="activeTab === 'sessions'">
                            <!-- Loading -->
                            <div v-if="loadingSessions" class="text-center py-4">
                                <div class="spinner-border text-primary"></div>
                            </div>

                            <template v-if="loadingSessions">
                                 <div v-for="(_, i) in skeletonRows" :key="i" class="list-group list-group-flush d-flex flex-row  gap-3 mb-3 border border-dashed border-gray-5 rounded-3 p-3 justify-content-between align-items-center">
                                    <div class="d-flex gap-3 flex-grow-1 align-items-center">
                                        <div>
                                             <SkeletonLoader width="36px" height="36px" style="border-radius: 50%;" />
                                        </div>
                                        <div class="flex-grow-1">
                                            <SkeletonLoader type="text" :lines="1" height="12px" :width="rand(30,80)" class="mb-2" />
                                            <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(42, 70)" class="" />
                                        </div>
                                    </div>
                                    <div style="width: 72px;">
                                        <SkeletonLoader type="text" :lines="1" height="36px" :width="rand(100,100)" class="mb-2" />
                                    </div>
                                 </div>
                            </template>

                            <!-- Empty -->
                            <div v-else-if="sessions.length === 0" class="text-center py-4">
                                <div class="d-flex justify-content-center align-items-center" style="height: 65vh;">
                                     
                                    <div>   
                                        <i class="mdi mdi-shield-off-outline fs-1 text-muted"></i>
                                        <h6 class="mt-2 mb-1">No active sessions</h6>
                                        <p class="text-muted small mb-0">
                                            <span v-if="!user.is_active">All sessions were revoked when the account was deactivated.</span>
                                            <span v-else>This user is not signed in on any device.</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- List -->
                            <div v-else>
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <p class="text-muted mb-0 small">
                                        {{ sessions.length }} active {{ sessions.length === 1 ? 'device' : 'devices' }}
                                    </p>
                                    <button class="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                                        :disabled="revokingAll" @click="onRevokeAll">
                                        <span v-if="revokingAll" class="spinner-border spinner-border-sm"></span>
                                        <i v-else class="mdi mdi-logout"></i>
                                        Sign out everywhere
                                    </button>
                                </div>

                                <div>
                                    <div class="p-4 bg-warning-muted rounded-3 mb-4">
                                        <p class="fs-12 text-dark text-truncate-2-line">Clear memory <strong>46.94 MB</strong> from temporary files. By clearing memory storage reduce loads.</p>
                                        <a href="javascript:void(0);" class="fs-10 text-uppercase text-danger d-flex align-items-center">
                                            <span class="wd-10 ht-10 d-flex align-items-center justify-content-center bg-danger text-white me-2 rounded-circle">
                                                <i class="feather feather-x fs-8"></i>
                                            </span>
                                            <span>Sign Out Everywhere</span>
                                        </a>
                                    </div>
                                </div>
                                

                              

                                <div class="list-group list-group-flush">
                                    <div 
                                        v-for="session in sessions" :key="session.id"
                                        class="p-3 border border-dashed rounded-3 mb-3 d-flex align-items-center justify-content-between gap-3 border-dark-subtle">
                                        <div class="d-flex gap-3 align-items-center">
                                            <div class="d-none"> <i :class="deviceIcon(session.device)" class="mdi fs-1 text-muted"></i></div>
                                            <div>  <Icon :icon="getDeviceIcon(session.device)" width="34" height="34" /></div>
                                            <div>
                                                <p class="mb-0 fw-semibold">{{ session.device }}</p>
                                                <small class="text-muted">
                                                        Last used {{ session.last_used_at ? smartDate(session.last_used_at) : 'never' }}
                                                        · Created {{ smartDate(session.created_at) }}
                                                    </small>
                                            </div>
                                        </div>
                                        <div>
                                            <button class="btn btn-soft-danger waves-effect waves-light"
                                                :disabled="revokingTokenId === session.id"
                                                @click="onRevokeOne(session)">
                                                <span v-if="revokingTokenId === session.id" class="spinner-border spinner-border-sm"></span>
                                                <span v-else>Revoke</span>
                                            </button>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>

                        <!-- ===== ACTIVITY TAB ===== -->
                        <div v-else-if="activeTab === 'activity'">
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
                                            Events for this user will appear here as they happen.
                                        </p>
                                     </div>
                               </div>
                            </div>

                            <!-- Timeline -->
                            <div v-else>
                                <ul class="verti-timeline list-unstyled">
                                    <li  v-for="log in activity" :key="log.id"  class="event-list">
                                        <div class="event-timeline-dot" style="left: -17px;">
                                             <span class="avatar-xs rounded-circle d-flex align-items-center justify-content-center"
                                                :class="activityIconBg(log.event)">
                                                <i class="mdi fs-4" :class="[activityIcon(log.event), activityIconColor(log.event)]"></i>
                                            </span>
                                        </div>
                                        <div class="d-flex mb-3">
                                            <div class="flex-shrink-0 me-3 d-none">
                                                <i class="mdi fs-4" :class="[activityIcon(log.event), activityIconColor(log.event)]"></i>
                                            </div>
                                            <div class="flex-grow-1">
                                                <div>
                                                    <h5 class="font-size-14 text-capitalize">{{ log.event_label }} <template v-if="log.channel">[{{ log.channel }}]</template></h5>
                                                    <p class="text-muted mb-0">
                                                         {{ smartDate(log.created_at) }}
                                                        <span v-if="log.ip_address"> · {{ log.ip_address }}</span>
                                                    </p>
                                                    <div v-if="metaPairs(log.meta).length" class="mt-1 d-flex flex-wrap gap-2">
                                                        <span v-for="(pair, i) in metaPairs(log.meta)" :key="i"
                                                            class="text-capitalize badge-alt2 bg-gray-200 text-dark bg-primary-soft w-auto">
                                                            {{ pair }}
                                                        </span>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                  
                                </ul>


                                <!-- Load more / footer -->
                                <div class="text-center pt-2">
                                    <button v-if="activityHasMore" class="btn btn-link waves-effect"
                                        :disabled="loadingActivity" @click="loadMoreActivity">
                                        <span v-if="loadingActivity" class="spinner-border spinner-border-sm me-1"></span>
                                        Load More
                                    </button>
                                    <p v-else class="text-muted small mb-0">
                                        <i class="bx bx-check-circle text-success me-1"></i>
                                        Showing all {{ activityTotal }} events
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- ===== FORMS TAB (placeholder) ===== -->
                        <div v-else-if="activeTab === 'forms'" class="text-center py-5 d-flex align-items-center justify-content-center" style="height: 60vh;">
                            <div >
                                <i class="mdi mdi-file-upload-outline fs-1 text-muted"></i>
                                <h6 class="mt-2 mb-1">No forms submitted yet</h6>
                                <p class="text-muted small mb-0">
                                    Form 34 uploads from this user will be listed here once the feature goes live.
                                </p>
                            </div>
                        </div>

                        <!-- security details -->
                        <div v-else-if="activeTab==='settings'">
                           <div class="row align-items-center justify-content-center">
                                <div class="col-xl-8 col-lg-9 mt-3 col-sm-12 col-md-10">
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
                                                    <p class="mb-0 fw-semibold">Two-Factor Authentication (2FA) </p>
                                                    <small class="text-muted">
                                                        Require the user to verify their identity using a one-time verification code during sign-in.
                                                    </small>
                                                </div>
                                            </div>

                                            <div class="d-flex gap-3 align-items-center" >
                                                <template v-if="!isUpdatingMFA">
                                                    <label v-if="user.security.requires_otp_always" class="form-check-label text-success fw-bold">Enabled</label>
                                                    <label v-else class="form-check-label text-muted">Disabled</label>
                                                </template>
                                                <template v-else>
                                                    Updating... <span class="spinner-border spinner-border-sm text-muted"></span>
                                            </template>

                                                <div class="form-check form-switch form-switch-md mb-0">
                                                    <input 
                                                        ref="mfaCheck"
                                                        @click="twoFactorAuthClicked()" 
                                                        class="form-check-input" 
                                                        type="checkbox" 
                                                        key="mfaCheck" 
                                                        :checked="user.security.requires_otp_always" 
                                                        :disabled="user.security.otp_always_locked||isUpdatingMFA"
                                                    >
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Multiple Device Login -->
                                        <div class="p-3 border border-dashed rounded-3 mb-3 d-flex align-items-center justify-content-between gap-3 border-dark-subtle">
                                            <div class="d-flex gap-3 align-items-center">
                                                <div class="avatar-sm mx-auto">
                                                    <span class="avatar-title rounded-circle bg-dark bg-soft font-size-24" style="height:3rem;width:3rem;">
                                                        <i class="mdi mdi-devices text-black"></i>
                                                    </span>
                                                </div>

                                                <div>
                                                    <p class="mb-0 fw-semibold">Allow Multiple Device Logins</p>
                                                    <small class="text-muted">
                                                        Allow the user to remain signed in across multiple devices simultaneously.
                                                    </small>
                                                </div>
                                            </div>

                                            <div class="d-flex gap-3 align-items-center">
                                                

                                                <template v-if="!isMultipleDeviceLoginLoading">
                                                    <label v-if="user.security.allow_multiple_device_logins" class="form-check-label text-success fw-bold">Enabled</label>
                                                    <label v-else class="form-check-label text-muted">Disabled</label>
                                                </template>
                                                <template v-else>
                                                    Updating... <span class="spinner-border spinner-border-sm text-muted"></span>
                                                </template>

                                                <div class="form-check form-switch form-switch-md mb-0">
                                                    <input 
                                                    key="multipleDeviceLoginCheckBox"
                                                    ref="multipleDeviceLoginCheckBox"
                                                    class="form-check-input" 
                                                    type="checkbox" 
                                                    :checked="user.security.allow_multiple_device_logins"
                                                    @change="multipleDeviceLoginCheck">
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
                                                        Automatically sign the user out after a period of inactivity.
                                                    </small>
                                                </div>
                                            </div>

                                            <div class="d-flex gap-3 align-items-center">

                                                <div class="dropdown mt-4 mt-sm-0">
                                                    <label class="form-check-label text-nowrap dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" :disabled="loadingLogoutTime">
                                                        
                                                        <template v-if="loadingLogoutTime">Updating... <span class="spinner-border spinner-border-sm text-muted"></span></template>
                                                        
                                                        <template v-else>{{ selectedLogout.label }}</template>
                                                    </label>
                                                    

                                                    
                                                    <div class="dropdown-menu">
                                                        <a 
                                                        
                                                        v-for="option in logoutOptions"
                                                        :key="option.value" class="dropdown-item"
                                                        :class="{ 'text-primary': selectedLogout.value === option.value }"
                                                        @click="selectedLogout = option"
                                                        >
                                                            {{ option.label }}
                                                        </a>                                                        
                                                    </div>
                                                </div>

                                                <div class="d-flex align-items-center justify-content-end" style="width:50px;">
                                                    <i class="dripicons-chevron-right fs-3 d-flex align-items-center justify-content-end"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Password -->
                                        <div class="p-3 border border-dashed rounded-3 mb-3 d-flex align-items-center justify-content-between gap-3 border-dark-subtle">
                                            <div class="d-flex gap-3 align-items-center">
                                                <div class="avatar-sm mx-auto">
                                                    <span class="avatar-title rounded-circle bg-dark bg-soft font-size-24" style="height:3rem;width:3rem;">
                                                        <i class="mdi mdi-lock-reset text-black"></i>
                                                    </span>
                                                </div>

                                                <div>
                                                    <p class="mb-0 fw-semibold">Password</p>
                                                    <small class="text-muted">
                                                        View when the user's password was last changed or reset it if necessary.
                                                    </small>
                                                </div>
                                            </div>

                                            <div class="d-flex gap-3 align-items-center">
                                                <label class="form-check-label text-nowrap">{{ user.security.password_changed_at ? smartDate(user.security.password_changed_at) : 'Never' }}</label>

                                                <div class="d-flex align-items-center justify-content-end" style="width:50px;">
                                                    <i class="dripicons-chevron-right fs-3 d-flex align-items-center justify-content-end"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Active Sessions -->
                                        <div class="p-3 border border-dashed rounded-3 mb-3 d-flex align-items-center justify-content-between gap-3 border-dark-subtle">
                                            <div class="d-flex gap-3 align-items-center">
                                                <div class="avatar-sm mx-auto">
                                                    <span class="avatar-title rounded-circle bg-dark bg-soft font-size-24" style="height:3rem;width:3rem;">
                                                        <i class="mdi mdi-monitor-dashboard text-black"></i>
                                                    </span>
                                                </div>

                                                <div>
                                                    <p class="mb-0 fw-semibold">Active Sessions</p>
                                                    <small class="text-muted">
                                                        Review all devices where the user is currently signed in and remotely end active sessions.
                                                    </small>
                                                </div>
                                            </div>

                                            <div 
                                            @click="sessionsClicked"
                                            class="d-flex gap-3 align-items-center" >
                                                <label class="form-check-label text-nowrap">{{ sessions.length }} Active Sessions</label>

                                                <div class="d-flex align-items-center justify-content-end" @click="activeTab = 'settings'" style="width:50px;">
                                                    <i class="dripicons-chevron-right fs-3 d-flex align-items-center justify-content-end"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Trusted Devices -->
                                        <div class="p-3 border border-dashed rounded-3 mb-3 d-flex align-items-center justify-content-between gap-3 border-dark-subtle">
                                            <div class="d-flex gap-3 align-items-center">
                                                <div class="avatar-sm mx-auto">
                                                    <span class="avatar-title rounded-circle bg-dark bg-soft font-size-24" style="height:3rem;width:3rem;">
                                                        <i class="mdi mdi-cellphone-key text-black"></i>
                                                    </span>
                                                </div>

                                                <div>
                                                    <p class="mb-0 fw-semibold">Trusted Devices</p>
                                                    <small class="text-muted">
                                                        Manage devices that are trusted and can sign in without additional verification.
                                                    </small>
                                                </div>
                                            </div>

                                            <div class="d-flex gap-3 align-items-center">
                                                <label class="form-check-label text-nowrap">5 Devices</label>

                                                <div class="d-flex align-items-center justify-content-end" style="width:50px;">
                                                    <i class="dripicons-chevron-right fs-3 d-flex align-items-center justify-content-end"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Login Notifications -->
                                        <div class="p-3 border border-dashed rounded-3 mb-3 d-flex align-items-center justify-content-between gap-3 border-dark-subtle d-none">
                                            <div class="d-flex gap-3 align-items-center">
                                                <div class="avatar-sm mx-auto">
                                                    <span class="avatar-title rounded-circle bg-dark bg-soft font-size-24" style="height:3rem;width:3rem;">
                                                        <i class="mdi mdi-bell-ring-outline text-black"></i>
                                                    </span>
                                                </div>

                                                <div>
                                                    <p class="mb-0 fw-semibold">Login Notifications</p>
                                                    <small class="text-muted">
                                                        Notify the user whenever a new device or location is used to access the account.
                                                    </small>
                                                </div>
                                            </div>

                                            <div class="d-flex gap-3 align-items-center">
                                                <label class="form-check-label">Enabled</label>

                                                <div class="form-check form-switch form-switch-md mb-0">
                                                    <input class="form-check-input" type="checkbox" checked>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- OTP on New Device Login -->
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
                                                        Send a one-time verification code whenever this user signs in from a new or unrecognized device before granting access.
                                                    </small>
                                                </div>
                                            </div>

                                            <div class="d-flex gap-3 align-items-center">
                                                 <template v-if="!isMultiDeviceLoading">
                                                    <label v-if="user.security.require_otp_new_device" class="form-check-label text-success fw-bold">Enabled</label>
                                                    <label v-else class="form-check-label text-muted">Disabled</label>
                                                </template>
                                                <template v-else>
                                                    Updating... <span class="spinner-border spinner-border-sm text-muted"></span>   
                                                </template>

                                                <div class="form-check form-switch form-switch-md mb-0" disabled>
                                                    <input 
                                                        class="form-check-input" 
                                                        type="checkbox" 
                                                        key="newDeviceCheck"
                                                        ref="newDeviceCheck"
                                                        :checked="user.security.require_otp_new_device"
                                                        @change="multiDeviceAuthClicked"
                                                        :disabled="isMultiDeviceLoading"
                                                    >
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Login Restrictions -->
                                        <div 
                                             data-bs-toggle="offcanvas"
                                            data-bs-target="#loginRestrictionsCanvas"
                                            aria-controls="loginRestrictionsCanvas"
                                            ref="openLoginRestrictionsAsideBtn" 
                                            @click="restrictionsAsideIsOpen=true" 
                                            :class="{ 'bg-soft bg-primary': restrictionsAsideIsOpen }"                                          
                                            class="cursor-pointer waves-effect p-3 border border-dashed rounded-3 mb-3 d-flex align-items-center justify-content-between gap-3 border-dark-subtle"
                                        >
                                            <div class="d-flex gap-3 align-items-center">
                                                <div class="avatar-sm mx-auto">
                                                    <span class="avatar-title rounded-circle bg-dark bg-soft font-size-24" style="height:3rem;width:3rem;">
                                                        <i class="mdi mdi-map-marker-radius-outline text-black"></i>
                                                    </span>
                                                </div>

                                                <div>
                                                    <p class="mb-0 fw-semibold">Login Restrictions</p>
                                                    <small class="text-muted">
                                                        Restrict sign-ins based on IP address, location or business hours.
                                                    </small>
                                                </div>
                                            </div>

                                            <div class="d-flex gap-3 align-items-center">
                                                <label class="form-check-label text-nowrap">No Restrictions</label>

                                                <div class="d-flex align-items-center justify-content-end" style="width:50px;">
                                                    <i class="dripicons-chevron-right fs-3 d-flex align-items-center justify-content-end"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Failed Login Attempts -->
                                        <div class="p-3 d-none border border-dashed rounded-3 mb-3 d-flex align-items-center justify-content-between gap-3 border-dark-subtle">
                                            <div class="d-flex gap-3 align-items-center">
                                                <div class="avatar-sm mx-auto">
                                                    <span class="avatar-title rounded-circle bg-dark bg-soft font-size-24" style="height:3rem;width:3rem;">
                                                        <i class="mdi mdi-alert-circle-outline text-black"></i>
                                                    </span>
                                                </div>

                                                <div>
                                                    <p class="mb-0 fw-semibold">Failed Login Attempts</p>
                                                    <small class="text-muted">
                                                        View recent unsuccessful sign-in attempts and account lockout events.
                                                    </small>
                                                </div>
                                            </div>

                                            <div class="d-flex gap-3 align-items-center">
                                                <label class="form-check-label text-nowrap">8 Attempts</label>

                                                <div class="d-flex align-items-center justify-content-end" style="width:50px;">
                                                    <i class="dripicons-chevron-right fs-3 d-flex align-items-center justify-content-end"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Security Audit -->
                                        <div class="p-3 border border-dashed rounded-3 d-flex align-items-center justify-content-between gap-3 border-dark-subtle d-none">
                                            <div class="d-flex gap-3 align-items-center">
                                                <div class="avatar-sm mx-auto">
                                                    <span class="avatar-title rounded-circle bg-dark bg-soft font-size-24" style="height:3rem;width:3rem;">
                                                        <i class="mdi mdi-history text-black"></i>
                                                    </span>
                                                </div>

                                                <div>
                                                    <p class="mb-0 fw-semibold">Security Audit Log</p>
                                                    <small class="text-muted">
                                                        Review password changes, login history, security settings updates and administrator actions.
                                                    </small>
                                                </div>
                                            </div>

                                            <div class="d-flex gap-3 align-items-center">
                                                <label class="form-check-label text-nowrap">View Log</label>

                                                <div class="d-flex align-items-center justify-content-end" style="width:50px;">
                                                    <i class="dripicons-chevron-right fs-3 d-flex align-items-center justify-content-end"></i>
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
        <DeactivateUserModal 
            ref="deactivateModal" :user="user" :reasons="deactivationReasons"
            :roles="userRoles" :admin="currentAdmin" @deactivated="onUserDeactivated"
            @close="() => {}" @toast="(t, m) => showToast('success', t, m)"
            @error="(t, m) => showError(t, m)" 
            />

        <ImageToast :status="toastStatus" :title="toastTitle" :message="toastMessage" :image="toastImage"
            :imageHeight="70" @hide="toastStatus = null" />

            

             <ConfirmActionModal
                v-if="showConfirmModal"
                :user="user"
                :title="action?.title"
                :message="action?.message"
                :confirm-text="action?.confirmText"
                :confirm-class="action?.confirmClass"
                :icon="action?.icon "
                :btn-title="action?.buttonTitle"
                :actionKey="action?.key"
                :loading="isConfirmActionLoading"
                :loading-text="action?.loadingText"

                @cancel="handleCancel"
                @confirm="handleConfirm"
            />

            <LoginRestrictions
                id="loginRestrictionsCanvas"
                title="Login Restrictions"
                subtitle="Control where and when the user can access the system."
                icon="mdi mdi-map-marker-radius-outline"
                @save="saveDevices"
                :user="user"
            />

            <button
                type="button"
                class="btn btn-primary d-none"
                data-bs-toggle="offcanvas"
                data-bs-target="#loginRestrictionsCanvas"
                aria-controls="loginRestrictionsCanvas"
                ref="openLoginRestrictionsAsideBtn">Testind Side Bar</button>
           
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { getDeviceIcon } from '@/utils/icons'
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import NProgress from "nprogress";//the proggress bar at the top


// API
import UsersAPI from '@/api/users'
import AuthAPI from '@/api/auth'

// Components
import SkeletonLoader from '@/components/Loaders/SkeletonLoader.vue'
import LoaderVue from '@/layouts/Loader.vue'
import ImageToast from '@/components/ImageToast.vue'
import DeactivateUserModal from './DeactivateUserModal.vue'
import Disable2faModal from './components/confirm.disable2fa.modal.vue'
import ConfirmActionModal from '@/components/ConfirmActionModal.vue'
import  LoginRestrictions from './components/User.loginrestrictions.aside.vue'
// Utils
import { smartDate, formatDateTime } from '@/utils/dates'
import successImage from '../../assets/images/icons/check.png'
import errorImage from '../../assets/images/icons/error.png'

import { SECURITY_ACTIONS } from '@/constants/securityActions.js'

const initialized = ref(false)
const logoutOptions = [
    { value: 0, label: 'Never' },
    { value: 5, label: '5 Minutes' },
    { value: 10, label: '10 Minutes' },
    { value: 15, label: '15 Minutes' },
    { value: 20, label: '20 Minutes' },
    { value: 30, label: '30 Minutes' },
    { value: 45, label: '45 Minutes' },
    { value: 60, label: '1 Hour' },
    { value: 120, label: '2 Hours' },
    { value: 240, label: '4 Hours' },
    { value: 480, label: '8 Hours' }
];

const loadingLogoutTime = ref(false)

const selectedLogout = ref(logoutOptions[4]); //default to 20 minutes

const route = useRoute()
const userId = computed(() => route.params.id)

// Skeleton
const skeletonRows = Array.from({ length: 10 })
const rand = (min, max) => `${Math.floor(Math.random() * (max - min) + min)}%`

// ── State ──────────────────────────────────────────────────────────────
const isLoading = ref(true)
const loadError = ref(null)

const user = ref({})
const userRoles = ref([])
const currentAdmin = ref(null)
const deactivationReasons = ref([])

const sessions = ref([])
const loadingSessions = ref(false)
const revokingTokenId = ref(null)
const revokingAll = ref(false)

// Activity log
const activity = ref([])
const loadingActivity = ref(false)
const activityPage = ref(1)
const activityLastPage = ref(1)
const activityTotal = ref(0)
const activityHasMore = ref(false)

const actionBusy = ref(false)
const activeTab = ref('sessions')

const deactivateModal = ref(null)

// Forms placeholder (no backend yet)
const formsCount = ref(0)

// Toast
const toastStatus = ref(null)
const toastTitle = ref('')
const toastMessage = ref('')
const toastImage = ref(null)

//handling confirm action
const showConfirmModal = ref(false)
const action = ref(null)
const mfaCheck = ref(null)
const newDeviceCheck= ref(null)
const multipleDeviceLoginCheckBox= ref(null)
const isUpdatingMFA = ref(false);
const isMultiDeviceLoading = ref(false);    
const isConfirmActionLoading = ref(false);
const isMultipleDeviceLoginLoading = ref(false);
const restrictionsAsideIsOpen = ref(false);
// ── Computed ───────────────────────────────────────────────────────────
const initials = computed(() => {
    const f = user.value?.first_name?.charAt(0) || ''
    const l = user.value?.last_name?.charAt(0) || ''
    return (f + l).toUpperCase() || 'U'
})

const roleLabel = computed(() => {
    const name = user.value?.role
    if (!name) return ''
    const match = userRoles.value.find(r => r.name === name)
    return match?.label || name.replace(/_/g, ' ')
})

// "Online" = last_seen_at within the last 3 minutes
const isOnline = computed(() => {
    if (!user.value?.is_active) return false
    if (!user.value?.last_seen_at) return false
    const seen = new Date(user.value.last_seen_at).getTime()
    return (Date.now() - seen) < 3 * 60 * 1000
})

// ── Fetching ──────────────────────────────────────────────────────────
async function getUser() {
    try {

        const { data } = await UsersAPI.getById(userId.value)
        user.value = data.data || data
        console.log('User Details:', user.value)
        const autoLogOutMin=user.value?.security?.automatic_logout_minutes || 20;

        selectedLogout.value = logoutOptions.find(option => option.value === autoLogOutMin);

    } catch (error) {
        if (error.response?.status === 404) {
            loadError.value = 'User not found.'
        } else {
            loadError.value = error.response?.data?.message || 'Failed to load user.'
        }
    }
}

async function getRoles() {
    try {
        const { data } = await UsersAPI.roles(true)
        userRoles.value = data.data || []
    } catch (e) {
        // non-blocking
    }
}

async function getCurrentAdmin() {
    try {
        const { data } = await AuthAPI.me()
        currentAdmin.value = data.data || data.user || null
    } catch (e) {
        // non-blocking
    }
}

async function getDeactivationReasons() {
    try {
        const { data } = await UsersAPI.deactivationReasons()
        deactivationReasons.value = data.data || []
    } catch (e) {
        // non-blocking
    }
}

async function getSessions() {
    loadingSessions.value = true
    try {
        const { data } = await UsersAPI.userSessions(userId.value)
        sessions.value = data.data || []
        console.log(sessions)
    } catch (error) {
        sessions.value = []
        showError('Sessions Unavailable', error.response?.data?.message || 'Could not load sessions.')
    } finally {
        loadingSessions.value = false
    }
}

async function getActivity(loadMore = false) {
    if (loadingActivity.value) return
    loadingActivity.value = true
    try {
        const page = loadMore ? activityPage.value + 1 : 1
        const { data } = await UsersAPI.userActivity(userId.value, { page, per_page: 20 })
        const rows = data.data || []
        if (loadMore) {
            activity.value.push(...rows)
        } else {
            activity.value = rows
        }
        const meta = data.meta || {}
        activityPage.value = meta.current_page || page
        activityLastPage.value = meta.last_page || 1
        activityTotal.value = meta.total ?? activity.value.length
        activityHasMore.value = activityPage.value < activityLastPage.value
    } catch (error) {
        if (!loadMore) activity.value = []
        showError('Activity Unavailable', error.response?.data?.message || 'Could not load activity log.')
    } finally {
        loadingActivity.value = false
    }
}

function loadMoreActivity() {
    if (!activityHasMore.value || loadingActivity.value) return
    getActivity(true)
}

// ── Actions ───────────────────────────────────────────────────────────
function openDeactivate() {
    deactivateModal.value?.open()
}

function onUserDeactivated(updatedUser) {
    user.value = { ...user.value, ...updatedUser }
    // Sessions are revoked server-side on deactivation; reflect that here
    sessions.value = []
}

async function onReactivate() {
    if (!confirm(`Reactivate ${user.value.full_name}?`)) return
    actionBusy.value = true
    try {
        const { data } = await UsersAPI.reactivate(userId.value)
        user.value = { ...user.value, ...(data.data || {}) }
        showToast('success', 'User Reactivated', `${user.value.full_name} is now active.`)
    } catch (error) {
        showError('Reactivation Failed', error.response?.data?.message || 'Could not reactivate.')
    } finally {
        actionBusy.value = false
    }
}

async function onRevokeOne(session) {
    if (!confirm(`Revoke "${session.device}"? The device will be signed out immediately.`)) return
    revokingTokenId.value = session.id
    try {
        await UsersAPI.revokeUserSession(userId.value, session.id)
        sessions.value = sessions.value.filter(s => s.id !== session.id)
        showToast('success', 'Session Revoked', `${session.device} was signed out.`)
    } catch (error) {
        showError('Revoke Failed', error.response?.data?.message || 'Could not revoke.')
    } finally {
        revokingTokenId.value = null
    }
}

async function onRevokeAll() {
    if (!confirm(`Sign out ${user.value.full_name} from all devices?`)) return
    revokingAll.value = true
    try {
        const { data } = await UsersAPI.revokeUserSessions(userId.value)
        sessions.value = []
        showToast('success', 'All Sessions Revoked', data.message || 'All devices were signed out.')
    } catch (error) {
        showError('Revoke Failed', error.response?.data?.message || 'Could not revoke.')
    } finally {
        revokingAll.value = false
    }
}

// ── Helpers ───────────────────────────────────────────────────────────
function deviceIcon(device = '') {
    const d = device.toLowerCase()
    if (d.includes('edge')) return 'mdi-microsoft-edge'
    if (d.includes('chrome')) return 'mdi-google-chrome'
    if (d.includes('firefox')) return 'mdi-firefox'
    if (d.includes('safari')) return 'mdi-apple-safari'
    if (d.includes('android')) return 'mdi-android'
    if (d.includes('ios') || d.includes('iphone') || d.includes('ipad')) return 'mdi-apple-ios'
    if (d.includes('mobile')) return 'mdi-cellphone'
    return 'mdi-monitor'
}


// ── Activity icon mapping ─────────────────────────────────────────────
function activityIcon(event) {
    return ({
        user_created: 'mdi-account-plus',
        user_updated: 'mdi-account-edit',
        otp_sent: 'mdi-email-receive-outline',
        otp_verified: 'mdi-check-decagram',
        otp_failed: 'mdi-alert-circle-outline',
        password_set: 'mdi-key-variant',
        login_success: 'mdi-login',
        login_failed: 'mdi-account-alert',
        login_locked: 'mdi-lock-alert',
        logout: 'mdi-logout',
        password_reset_requested: 'mdi-lock-reset',
        user_deactivate_requested: 'mdi-account-clock',
        user_deactivated: 'mdi-account-cancel',
        user_reactivated: 'mdi-account-check',
        user_session_revoked: 'mdi-devices',
        user_sessions_revoked: 'mdi-devices',
    })[event] || 'mdi-information-outline'
}

function activityIconColor(event) {
    if (['otp_verified', 'login_success', 'user_reactivated', 'password_set'].includes(event)) return 'text-success'
    if (['otp_failed', 'login_failed', 'login_locked', 'user_deactivated'].includes(event)) return 'text-danger'
    if (['password_reset_requested', 'otp_sent', 'user_deactivate_requested'].includes(event)) return 'text-warning'
    return 'text-muted'
}

function activityIconBg(event) {
    if (['otp_verified', 'login_success', 'user_reactivated', 'password_set'].includes(event)) return 'bg-success-subtle'
    if (['otp_failed', 'login_failed', 'login_locked', 'user_deactivated'].includes(event)) return 'bg-danger-subtle'
    if (['password_reset_requested', 'otp_sent', 'user_deactivate_requested'].includes(event)) return 'bg-warning-subtle'
    return 'bg-light'
}

// Flatten meta JSON into displayable key:value badges, skipping noisy keys.
function metaPairs(meta) {
    if (!meta || typeof meta !== 'object') return []
    const skip = new Set(['otp_id', 'created_by'])
    const out = []
    for (const [k, v] of Object.entries(meta)) {
        if (skip.has(k)) continue
        if (v === null || v === undefined || v === '') continue
        const label = k.replace(/_/g, ' ')
        out.push(`${label}: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
    }
    return out
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

function sessionsClicked(){
    activeTab.value = 'sessions'
}

// account security settings functions
function twoFactorAuthClicked(event) {
      const twoFactorEnabled = user.value.security.requires_otp_always;
      if(twoFactorEnabled){
        showConfirmModal.value = true;
        action.value = SECURITY_ACTIONS.DISABLE_MFA;
        mfaCheck.value.checked=true; // Store the checkbox element
      }  
      else{
        handleTwoFactorAuthChange(true)
      }
}

async function handleTwoFactorAuthChange(newValue) {
    const payload = {
        require_otp_always: newValue
    };

    try {
        isUpdatingMFA.value = true;
        isConfirmActionLoading.value = true;

        const res=await UsersAPI.update(userId.value, payload);
        console.log(res.data.data);
        user.value.security.requires_otp_always = newValue;

         // Close the modal
        showConfirmModal.value = false;

        showToast(
            'success',
            'Multi-Factor Authentication Updated',
            `The user's multi-factor authentication has been ${newValue ? 'enabled' : 'disabled'}.`
        );
        
    } catch (error) {
        console.error('Failed to update MFA:', error);

        showToast(
            'error',
            'Update Failed',
            error?.response?.data?.message ||
            'Unable to update the multi-factor authentication setting.'
        );
    } finally {
        isUpdatingMFA.value = false;
        isConfirmActionLoading.value = false;
    }
}



function multiDeviceAuthClicked(event) {
    const requireOtpNewDevice = user.value.security.require_otp_new_device;

    if (requireOtpNewDevice) {
        showConfirmModal.value = true;
        action.value = SECURITY_ACTIONS.DISABLE_NEW_DEVICE_OTP;
        newDeviceCheck.value.checked = true; // Store the checkbox element
    } else {
        handleMultiDeviceAuthChange(true);
    }
}

async function handleMultiDeviceAuthChange(newValue) {
    const payload = {
        require_otp_new_device: newValue
    };

    try {
        isMultiDeviceLoading.value = true;
        isConfirmActionLoading.value = true;

        const res = await UsersAPI.update(userId.value, payload);

        console.log(res.data.data);

        user.value.security.require_otp_new_device = newValue;

        // Close the modal
        showConfirmModal.value = false;

        showToast(
            'success',
            'New Device Authentication Updated',
            `OTP verification for new devices has been ${newValue ? 'enabled' : 'disabled'}.`
        );
    } catch (error) {
        console.error('Failed to update new device authentication:', error);

        showToast(
            'error',
            'Update Failed',
            error?.response?.data?.message ||
            'Unable to update the new device authentication setting.'
        );
    } finally {
        isMultiDeviceLoading.value = false;
        isConfirmActionLoading.value = false;
    }
}

function multipleDeviceLoginCheck(event) {
    const allowMultipleLogins = user.value.security.allow_multiple_device_logins;

    if (allowMultipleLogins) {
        showConfirmModal.value = true;
        action.value = SECURITY_ACTIONS.DISABLE_MULTI_DEVICE;
        multipleDeviceLoginCheckBox.value.checked = true;
    } else {
        handleMultipleDeviceLoginChange(true);
    }
}

async function handleMultipleDeviceLoginChange(newValue) {
    const payload = {
        allow_multiple_device_logins: newValue
    };

    try {
        isMultipleDeviceLoginLoading.value = true;
        isConfirmActionLoading.value = true;

        const res = await UsersAPI.update(userId.value, payload);

        console.log(res.data.data);

        user.value.security.allow_multiple_device_logins = newValue;

        showConfirmModal.value = false;

        showToast(
            'success',
            'Multiple Device Login Updated',
            `Multiple device logins have been ${newValue ? 'enabled' : 'disabled'}.`
        );
    } catch (error) {
        console.error('Failed to update multiple device login setting:', error);

        showToast(
            'error',
            'Update Failed',
            error?.response?.data?.message ||
            'Unable to update the multiple device login setting.'
        );
    } finally {
        isMultipleDeviceLoginLoading.value = false;
        isConfirmActionLoading.value = false;
    }
}

const handleCancel = () => {
    showConfirmModal.value = false
    action.value = null
}

// handling the popup confirmed
const handleConfirm = ({ action, user }) => {
    switch (action) {
        case 'disableMfa':
        handleTwoFactorAuthChange(false)
        break

        case 'disableNewDeviceOtp':
        handleMultiDeviceAuthChange(false)
        break

        case 'deleteUser':
        deleteUser(user)
        break

        case 'disableMultiDevice':
        handleMultipleDeviceLoginChange(false)
        break
    }
}

// ── Lifecycle ─────────────────────────────────────────────────────────
onMounted(async () => {
    document.title = 'User Profile · Kwa Ground'
    await Promise.all([getRoles(), getCurrentAdmin(), getDeactivationReasons()])
    await getUser()
    if (!loadError.value) {
        await getSessions()
        document.title = `${user.value.full_name || 'User'} · Kwa Ground`
    }
    isLoading.value = false
    initialized.value = true

     const offcanvas = document.getElementById('loginRestrictionsCanvas')

      offcanvas.addEventListener('shown.bs.offcanvas', () => {
        restrictionsAsideIsOpen.value = true
    })

    offcanvas.addEventListener('hidden.bs.offcanvas', () => {
        restrictionsAsideIsOpen.value = false
    })
})

// React to route changes (e.g. navigating from /users/3 → /users/5)
watch(() => route.params.id, async (newId, oldId) => {
    if (newId === oldId) return
    isLoading.value = true
    loadError.value = null
    activity.value = []           // reset between users
    activityPage.value = 1
    activityTotal.value = 0
    activityHasMore.value = false
    await getUser()
    if (!loadError.value) await getSessions()
    isLoading.value = false
})

// Lazy-load activity the first time the tab opens
watch(activeTab, (tab) => {
    if (tab === 'activity' && activity.value.length === 0 && !loadingActivity.value) {
        getActivity()
    }
})

//changing the logout time in the dropdown
watch(selectedLogout, async (newValue) => {
    const payload={ automatic_logout_minutes: newValue.value }

    //prevents function from running on page load, only when user changes the value
     if (!initialized.value) return
    if (!newValue) return
    try {
        loadingLogoutTime.value = true
        await UsersAPI.update(userId.value, payload)
        user.value.security.automatic_logout_minutes = newValue.value
        showToast('success', 'Automatic Logout Updated', `User will be logged out after ${newValue.label}.`)
    } catch (error) {
        showError('Update Failed', error.response?.data?.message || 'Could not update automatic logout.')
        console.log('Error updating automatic logout:', error)
    }
    finally {
        loadingLogoutTime.value = false
    }
})
</script>

<style scoped>

.nav-tabs .nav-link {
    cursor: pointer;
}

.activity-feed .avatar-sm {
    width: 36px;
    height: 36px;
}
.activity-feed li:last-child {
    border-bottom: 0 !important;
    padding-bottom: 0 !important;
    margin-bottom: 0 !important;
}
</style>