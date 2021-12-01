<template>
  <div class="container-fluid px-4">
    <h1>เพิ่มข้อมูล</h1>

    <div class="row">
      <div class="col-xl-6 col-md-6">
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="name" class="form-label">ชื่อประเภทสินค้า</label>
            <input v-model="name" type="text" class="form-control" id="name" />
            {{ name }}
          </div>
          <button type="submit" class="btn btn-primary">บันทึก</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useAdd } from "./use/crud-category";

export default {
  name: "CategoryAdd",
  setup() {
    const { name, onSubmit } = useAdd();

    return { name, onSubmit };
  },
};
</script>
