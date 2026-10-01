
<template>
  <div class="user-profile">
    <!-- Single skeleton -->
    <SkeletonLoader 
      width="200px" 
      height="200px" 
      type="circle" 
    />
    
    <!-- Text skeleton with multiple lines -->
    <SkeletonLoader 
      type="text" 
      :lines="3" 
      width="300px" 
      lastLineWidth="70%"
      marginTop="20px"
    />
    
    <!-- Using SkeletonContainer for grouped elements -->
    <SkeletonContainer gap="24px">
      <SkeletonLoader 
        width="150px" 
        height="24px" 
        rounded
      />
      <SkeletonLoader 
        type="text" 
        :lines="4" 
        lastLineWidth="40%"
      />
      <SkeletonLoader 
        width="100px" 
        height="36px" 
        rounded
      />
    </SkeletonContainer>
    
    <!-- Avatar with text (simulating a user list) -->
    <div class="user-item">
      <SkeletonLoader 
        width="40px" 
        height="40px" 
        type="circle" 
      />
      <div class="user-details">
        <SkeletonLoader 
          width="120px" 
          height="16px" 
          marginBottom="8px"
        />
        <SkeletonLoader 
          width="80px" 
          height="12px" 
        />
      </div>
    </div>
    
    <!-- Card skeleton -->
    <div class="card-skeleton">
      <SkeletonLoader 
        width="100%" 
        height="200px" 
        rounded
      />
      <div class="card-content">
        <SkeletonLoader 
          width="60%" 
          height="20px" 
          marginBottom="12px"
          rounded
        />
        <SkeletonLoader 
          type="text" 
          :lines="2" 
          textLineHeight="14px"
          lastLineWidth="40%"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import SkeletonLoader from 'SkeletonLoader.vue'
import SkeletonContainer from 'SkeletonContainer.vue'
</script>

<style>
.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
}

.user-details {
  flex: 1;
}

.card-skeleton {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px;
}

.card-content {
  padding-top: 16px;
}
</style>