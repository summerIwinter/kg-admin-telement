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
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="csvData = false">取 消</el-button>
        <el-button type="primary" @click="csvData = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
      uploadApi: 'http:localhost:5000/api/upload',
      // uploadApi: 'https://jsonplaceholder.typicode.com/posts/',
      fileList: []
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1)
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
