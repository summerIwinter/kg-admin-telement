<template>
  <div v-loading="itemsLoading" class="main">
    <el-select v-model="selectItem">
      <el-option
        v-for="key in options"
        :key="key"
        :label="key"
        :value="key"
      />
    </el-select>
    <el-table
      :data="items"
      border
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="70"
      />
      <el-table-column
        :prop="selectItem"
        :label="selectItem"
        align="center"
        min-width="100"
      />
      <el-table-column
        label="操作"
        align="center"
        width="200"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getDataItem } from '@/api/data'
export default {
  name: 'Item',
  data() {
    return {
      items: [],
      options: [],
      selectItem: '',
      itemsLoading: false
    }
  },
  computed: {
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.itemsLoading = true
      getDataItem({ 'id': this.$route.query.id }).then(response => {
        this.items = response.data.items
        this.itemsLoading = false
        this.selectItem = Object.keys(this.items[0])[1]
        this.options = Object.keys(this.items[0]).slice(1)
      })
    },
    handleEdit(index, item) {
      console.log(item.id)
      console.log(item)
    },
    handleDelete(index, item) {
      console.log(item.id)
      console.log(item)
      this.$delete(this.items, index)
    }
  }
}
</script>

<style lang="scss" scoped>
  .main {
    margin: 20px 20px;
  }
  .el-table {
    margin-top: 20px;
  }
</style>
