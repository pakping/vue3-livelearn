<template>
  <div class="container-fluid px-4">
    <div class="row">
      <div class="col-xl-12 col-md-12">
        <h1>ประเภทสินค้า</h1>

        <router-link to="/category/add" class="btn btn-primary"
          >เพิ่มข้อมูล</router-link
        >

        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>

        <div v-if="loading" class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <table class="table" v-if="categories.length">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ชื่อประเภทสินค้า</th>
              <th scope="col">เครื่องมือ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in categories" :key="item.id">
              <th scope="row">{{ item.id }}</th>
              <td>{{ item.name }}</td>
              <td>
                <router-link
                  :to="{ name: 'CategoryEdit', params: { id: item.id } }"
                >
                  แก้ไข
                </router-link>

                |

                <a href="#" @click.prevent="deleteCategoryById(item.id)">
                  ลบ
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { BASE_API_URL } from "../../constants";
import Swal from "sweetalert2";

export default {
  name: "CategoryIndexV1",
  setup() {
    const categories = ref([]);
    const errorMessage = ref("");
    const loading = ref(false);

    const getData = async () => {
      try {
        loading.value = true;
        const response = await axios.get(`${BASE_API_URL}/api/category`);
        categories.value = response.data; // [{}]
        // console.log(response.data);
      } catch (error) {
        //400, 500
        console.log(error);
        errorMessage.value = "เกิดข้อผิดพลาด กรุณาลองใหม่";
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      getData();
    });

    const deleteCategoryById = async (id) => {
      const isConfirm = window.confirm("แน่ใจว่าต้องการลบข้อมูลนี้");
      if (isConfirm === true) {
        const response = await axios.delete(
          `${BASE_API_URL}/api/category/${id}`
        );
        await Swal.fire(response.data.message, "ผลการทำงาน", "success");
        history.go(0);
      }
    };

    return { categories, errorMessage, loading, deleteCategoryById };
  },
};
</script>

<style></style>
