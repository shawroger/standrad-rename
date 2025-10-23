<script setup lang="ts">
import { onMounted, ref } from "vue";
import { date2Rtime, getDateString, rtime2Date } from "./utils";

const xid = ref("");
const timestamp = ref("");
function changeXID() {
  timestamp.value = rtime2Date(xid.value);
}
function changeTimestamp() {
  xid.value = date2Rtime(timestamp.value);
}
function generateCurrentTime() {
  const yyyyMMddHHmmss = getDateString();
  xid.value = date2Rtime(yyyyMMddHHmmss);
  timestamp.value = rtime2Date(xid.value);
}
onMounted(() => generateCurrentTime());
</script>

<template>
  <div class="container">
    <div class="form-wrapper">
      <h1 class="form-title">信息表单</h1>

      <form id="mainForm">
        <div class="form-group">
          <label for="priority">优先级</label>
          <input
            type="text"
            id="priority"
            name="priority"
            placeholder="请输入优先级"
          />
        </div>

        <div class="form-group">
          <label for="identifier">标识符</label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            placeholder="请输入标识符"
          />
        </div>

        <div class="form-group">
          <label for="identifierType">标识符类型</label>
          <select id="identifierType" name="identifierType">
            <option value="">请选择标识符类型</option>
            <option value="type1">类型1</option>
            <option value="type2">类型2</option>
            <option value="type3">类型3</option>
          </select>
        </div>

        <div class="form-group">
          <label for="title">标题</label>
          <input type="text" id="title" name="title" placeholder="请输入标题" />
        </div>

        <div class="form-group">
          <label for="version">版本号</label>
          <input
            type="text"
            id="version"
            name="version"
            placeholder="请输入版本号"
          />
        </div>

        <div class="form-group">
          <label for="tags">标签</label>
          <input type="text" id="tags" name="tags" placeholder="请输入标签" />
        </div>

        <div class="form-group">
          <label for="personnel">人员</label>
          <input
            type="text"
            id="personnel"
            name="personnel"
            placeholder="请输入人员"
          />
        </div>

        <div class="form-group">
          <label for="description">说明</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            placeholder="请输入说明"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="timeThreshold">时间戳</label>
          <input
            type="text"
            id="timeThreshold"
            name="timeThreshold"
            placeholder="请输入时间戳"
          />
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" id="autoUpdate" name="autoUpdate" />
            <span>自动更新到当前时间戳</span>
          </label>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input
              type="checkbox"
              id="modifyIdentifier"
              name="modifyIdentifier"
            />
            <span>修改标识符</span>
          </label>
        </div>
      </form>

      <div class="output-section">
        <h2 class="output-title">最终输出结果</h2>
        <div class="output-content" id="outputContent">
          <pre id="outputData">{}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
