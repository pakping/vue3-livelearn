<template>
  <div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">ข้อมูลหลัก</div>
          <router-link class="nav-link" to="/">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            หน้าหลัก
          </router-link>
          <router-link class="nav-link" :to="{ name: 'About' }">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            เกี่ยวกับเรา
          </router-link>

          <div class="sb-sidenav-menu-heading">ข้อมูลหลัก</div>
          <router-link class="nav-link" to="/product">
            <div class="sb-nav-link-icon">
              <i class="fas fa-chart-area"></i>
            </div>
            สินค้า
          </router-link>
          <router-link class="nav-link" to="/category">
            <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
            ประเภทสินค้า
          </router-link>
        </div>
      </div>
      <div class="sb-sidenav-footer" v-if="profile">
        <div class="small">Logged in as: {{ profile?.name }}</div>
        Email: {{ profile?.email }}
      </div>
    </nav>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "SideNav",
  setup() {
    const store = useStore();
    const profile = computed(() => store.state.profile); //เลือก state profile

    return {
      profile,
    };
  },
};
</script>

<style></style>
