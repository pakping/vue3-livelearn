import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../../constants";

export function useAdd() {
  const name = ref("");
  const router = useRouter();

  const onSubmit = async () => {
    const response = await axios.post(`${BASE_API_URL}/api/category`, {
      name: name.value,
    });
    // alert(response.data.message);
    Swal.fire(response.data.message, "ผลการทำงาน", "success");
    router.replace("/category");
  };

  return { name, onSubmit };
}

export function useEdit() {
  const id = ref(0);
  const name = ref("");
  const router = useRouter();
  const route = useRoute();

  onMounted(() => {
    id.value = route.params.id;
    //  alert(id.value);
    getCategoryById(id.value);
  });

  const getCategoryById = async (id) => {
    const response = await axios.get(`${BASE_API_URL}/api/category/${id}`);
    name.value = response.data.name;
  };

  const onSubmit = async () => {
    const response = await axios.put(`${BASE_API_URL}/api/category`, {
      id: id.value,
      name: name.value,
    });
    // alert(response.data.message);
    Swal.fire(response.data.message, "ผลการทำงาน", "success");
    router.replace("/category");
  };

  return { name, onSubmit };
}

export function useIndex() {
  const categories = ref([]);
  const errorMessage = ref("");
  const loading = ref(false);
  const page = ref(1);
  const totalPage = ref(0);

  const getData = async (page) => {
    try {
      loading.value = true;
      const response = await axios.get(
        `${BASE_API_URL}/api/category?page=${page}&page_size=10`
      );
      categories.value = response.data.data; // [{}]
      totalPage.value = response.data.last_page;
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
    getData(page.value); //เริ่มต้นหน้า 1
  });

  const deleteCategoryById = async (id) => {
    const isConfirm = window.confirm("แน่ใจว่าต้องการลบข้อมูลนี้");
    if (isConfirm === true) {
      const response = await axios.delete(`${BASE_API_URL}/api/category/${id}`);
      await Swal.fire(response.data.message, "ผลการทำงาน", "success");
      history.go(0);
    }
  };

  return {
    categories,
    errorMessage,
    loading,
    deleteCategoryById,
    page,
    totalPage,
    getData,
  };
}
