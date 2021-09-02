<template>
  <div class="app-page-wrapper">
    <div class="btn-box">
      <template v-for="item in btnList">
        <el-button
          :key="item.prop"
          size="mini"
          :disabled="item.disabled"
          :type="type[item.prop] || defaultType"
          @click.native="handleClick(item)"
          >{{ item.label }}</el-button
        >
      </template>
    </div>
    <el-table
        ref="multipleTable"
      :data="tableData"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
      type="selection"
      width="55"/>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        width="180">
      </el-table-column>
    </el-table>
    <el-pagination
        class="m-t-20"
        background
        layout="prev, pager, next"
        :page-sizes="[10, 25, 50]"
        :page-size="pageSize"
        :page-count="pageCount"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleIndexChange"
        >
    </el-pagination>
    <component
      :is="tag"
      v-if="open"
      :visible.sync="open"
      :op="formOp"
      @cancel="cancelPage"
    />
  </div>
</template>

<script>
import AddBlog from "./Components/AddBlog.vue";
import * as api from "@/api/blog/index";

export default {
  name: "Blog",
  components: {
    AddBlog,
  },
  props: {
    defaultType: {
      type: String,
      default: "primary",
    },
  },
  data() {
    return {
      loading: false,
      open: false,
      formOp: {},
      tag: "",
      rowData: {},
      type: {},
      btnList: [
        {
          label: "新增",
          prop: "add",
          canClick: ["all"],
        },
        {
          label: "编辑",
          prop: "edit",
          canClick: ["row"],
        },
        {
          label: "删除",
          prop: "del",
          canClick: ["row", 'group'],
        },
      ],
      sectionList: [],
      tableData: [],
      total: 0,
      pageSize: 5,
      pageCount: 1,
    };
  },
  created() {
    this.getData();
    this.setBtnStatus()
  },
  methods: {
    getData({ page = 1, pageSize = this.pageSize } = {}) {
      api.getDataList({ page, pageSize }).then((res) => {
        const data = res.data;
        this.tableData = data.data;
        this.total = data.total;
        this.pageCount = Math.ceil(this.total / this.pageSize);
      });
    },
    add(info) {
      this.tag = "AddBlog";
      this.formOp = {
        api: api.addBlog,
        rowData: {
          ...this.rowData,
        },
        info: {
          ...info,
          title: "新增配置",
        },
      };
    },
    edit(info) {
      this.tag = "AddBlog";
      this.formOp = {
        api: api.editBlog,
        rowData: {
          ...this.rowData,
        },
        info: {
          ...info,
          title: "新增配置",
        },
      };
    },
    del(info) {
      this.cancelPage()
      const delIds = this.sectionList.map(it=>it.id)
      console.log("🚀 ~ file: index.vue ~ line 146 ~ del ~ delIds", delIds)
      this.handleData({
          api: api.delBlog,
          params: { delIds},
          info,
          confirm: true
      }, ()=>{
          this.getData()
      })

    },
    setBtnStatus(val = "") {
      for (const item of this.btnList) {
        if (item.canClick.includes("all")) {
          // 永远可点击
          this.$set(item, "disabled", false);
        } else if (item.canClick.includes("never")) {
          // 永远不可点击
          this.$set(item, "disabled", "disabled");
        } else {
          // 基于传参判断是否可点击.
          // eslint-disable-next-line eqeqeq
          if (item.canClick.find((i) => i == val)) {
            this.$set(item, "disabled", false);
          } else {
            this.$set(item, "disabled", "disabled");
          }
        }
      }
    },
    handleSelectionChange(val) {
      // 重置选中行
      this.toggleRow();
      this.sectionList = val;
      if (val.length === 0) {
        this.setBtnStatus();
        this.getRow()
      } else if (val.length === 1) {
        this.getRow(val[0])
        this.setBtnStatus("row");
      } else {
        this.getRow()
        this.setBtnStatus("group");
      }
    },
    // 重置选中行
    toggleRow(row) {
      this.$refs.multipleTable.setCurrentRow(row);
    },
    handleIndexChange(val) {
      this.getData({ page: val });
    },
    /** 改变分页 单页长度 */
    handleSizeChange(val) {
      this.getData({ pageSize: val });
    },
    handleClick(data) {
      this.showPage();
      this[data.prop](data);
    },
    getRow(val={}){
        this.rowData = val
    },
    showPage() {
      this.open = true;
    },
    cancelPage(refresh) {
      this.open = false;
      if (refresh) this.getData();
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-box{
    display: flex;
    margin: 20px 0;
}
</style>
