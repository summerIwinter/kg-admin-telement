<template>
  <div class="datamanage-container">
    <NewDataset class="new-dataset" />
    <el-row v-for="(row, row_index) in datasets_four" :key="row_index" v-loading="loading" :gutter="20">
      <el-col v-for="(item, col_index) in row" :key="col_index" :span="6">
        <div class="grid-content bg-purple">
          <el-card shadow="hover">
            <div class="item">
              <span>{{ item["name"] }}</span>
            </div>
            <div class="iteminfo">
              <!-- <i class="el-icon-time" /> -->
              <time class="time">{{ "创建时间:"+item["create_time"] }}</time>
            </div>
            <div class="bottom clearfix">
              <div class="button">
                <el-button size="medium" class="delBut" @click="handleDelItem(item)">删除</el-button>
                <!-- <el-button type="text" class="miniBut movBut">移动</el-button> -->
                <el-button type="primary" size="medium" class="manBut" @click="handleItem(item)">管理</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getDataList, delDataItem } from '@/api/data'
import NewDataset from './components/NewDataset'

export default {
  name: 'Datamanage',
  components: {
    NewDataset
  },
  data() {
    return {
      loading: false,
      datasets: [],
      dialogVisible: false
    }
  },
  computed: {
    datasets_four: function() {
      const datasets_four = []
      this.datasets.forEach((item, index) => {
        const row = Math.floor(index / 4)
        item['index'] = index
        if (!datasets_four[row]) {
          datasets_four[row] = []
        }
        datasets_four[row].push(item)
      })
      return datasets_four
    }
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getDataList().then(response => {
        this.datasets = response.data.items
        this.loading = false
      })
    },
    handleItem(item) {
      this.$router.push({
        path: '/data/item',
        query: {
          id: item.id
        }
      })
    },
    handleDelItem(item) {
      delDataItem({ 'id': item.id }).then(response => {
        this.$delete(this.datasets, item['index'])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .datamanage-container {
    margin: 0px 20px;
  }
  .new-dataset {
    margin-top: 20px;
  }
	.el-row {
    margin: 20px;
	}
	.el-col {
		border-radius: 4px;
	}
	.bg-purple {
		background: #d3dce6;
	}
	.grid-content {
		border-radius: 4px;
		min-height: 100px;
	}
	.time {
		font-size: 13px;
		color: #999;
	}
	.item {
		line-height: 100px;
	}
	.iteminfo {
		text-align: left;
		line-height: 12px;
	}
	.bottom {
		border-top: 1px solid #ddd;
		margin-top: 8px;
		padding-top: 16px;
		line-height: 12px;
	}
	.delBut {
		color:red;
	}
	.movBut {
		color:royalblue;
	}
	.manBut {
	float: right;
	}
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	.clearfix:after {
		clear: both
	}
</style>
