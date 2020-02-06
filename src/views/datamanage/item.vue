<template>
  <div v-loading="itemLoading" class="main">
    <el-select v-model="selectCol">
      <el-option
        v-for="key in options"
        :key="key"
        :label="key"
        :value="key"
      />
    </el-select>
    <el-table
      :data="item"
      border
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="70"
      />
      <el-table-column
        :prop="selectCol"
        :label="selectCol"
        align="center"
        min-width="100"
      />
      <el-table-column
        label="操作"
        align="center"
        width="200"
        fixed="right"
      >
        <template scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改数据" :visible.sync="editDialog">
      <el-form v-model="editRow">
        <el-form-item
          v-for="(option,options_index) in options"
          :key="options_index"
          :label="option+'：'"
          label-width="100px"
        >
          <el-input v-model="editRow[option]" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDataItem, updateDataItemRow, delDataItemRow } from '@/api/data'
export default {
  name: 'Item',
  data() {
    return {
      item_id: this.$route.query.id,
      item: [],
      options: [],
      selectCol: '',
      itemLoading: false,
      editDialog: false,
      editRow: {}
    }
  },
  computed: {
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.itemLoading = true
      getDataItem({ 'id': this.item_id }).then(response => {
        this.item = response.data.items
        this.selectCol = Object.keys(this.item[0])[1]
        this.options = Object.keys(this.item[0]).slice(1)
        this.editRow = { ...this.item[0] }
        this.itemLoading = false
      })
    },
    handleEdit(index, row) {
      this.editRow = { ...row }
      this.editDialog = true
    },
    dialogEdit() {
      updateDataItemRow({
        'item_id': this.item_id,
        'row': this.editRow
      }).then(response => {
        this.fetchData()
      })
      this.editDialog = false
    },
    handleDelete(index, row) {
      console.log(row._id)
      console.log(row)
      delDataItemRow({
        'item_id': this.item_id,
        'row_id': row._id
      }).then(response => {
        this.$delete(this.item, index)
      })
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
