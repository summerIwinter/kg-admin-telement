<template>
  <div>
    <el-button type="primary" @click="selectType = true">新建数据集</el-button>
    <el-dialog title="新建数据集" :visible.sync="selectType">
      <el-button @click="csvData = true">直接导入CSV文件</el-button>
    </el-dialog>
    <el-dialog title="导入CSV数据" :visible.sync="csvData">
      <el-form :model="csvForm">
        <el-form-item label="名称：" label-width="100px">
          <el-input v-model="csvForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述：" label-width="100px">
          <el-input v-model="csvForm.describe" autocomplete="off" />
        </el-form-item>
        <el-form-item label="文件：" label-width="100px">
          <el-upload
            :action="uploadApi"
            :file-list="fileList"
            :on-change="handleChange"
            :on-success="handleSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" @click="csvData = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="createDataset">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addDataItem } from '@/api/data'

export default {
  name: 'NewDataset',
  data() {
    return {
      selectType: false,
      csvData: false,
      csvForm: {
        name: '',
        describe: '',
        fileId: ''
      },
      loading: false,
      uploadApi: '/api/upload',
      // uploadApi: 'https://jsonplaceholder.typicode.com/posts/',
      fileList: []
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1)
    },
    handleSuccess(response, file, fileList) {
    },
    createDataset() {
      // 检测请求参数
      // 检测是否上传文件以及响应
      this.csvForm.fileId = this.fileList[0].response.data.file_id
      this.loading = true
      addDataItem(this.csvForm).then(response => {
        this.$router.push({
          path: '/data/item',
          query: {
            id: this.csvForm.fileId
          }
        })
        this.loading = false
      })
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
