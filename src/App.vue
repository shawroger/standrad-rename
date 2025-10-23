<script setup lang="ts">
import { ref } from "vue";
import { parseInput } from "./utils";
import { date2Rtime, getDateString } from "./xid";

const data = ref({
  index: "",
  name: "",
  tag: "",
  person: "",
  time: "",
  tip: "",
  prior: "",
  version: "",
  identifier: "",
});

const input = ref("");
const autoUpdateTime = ref(false);

function changeInput() {
  const json = parseInput(input.value);
  console.log(json);
  if (json?.name?.includes("_V")) {
    data.value.name = json.name.split("_V")[0];
    data.value.version = json.name.split("_V")[1];
  } else {
    data.value.version = "";
    data.value.name = json.name;
  }
  data.value.time = json?.time || "";
  data.value.identifier =
    options.find((e) => e.value === json?.identifier)?.value || "";
  data.value.prior = json?.prior || "";
  data.value.index = json?.index || "";
  data.value.tag = (json?.tag || "").replace(/&/g, ";");
  data.value.tip = (json?.tip || "").replace(/\$/g, ";");
  data.value.person = (json?.person || "").replace(/@/g, ";");

  console.log("data", { ...data.value });
}

function splitAll(input: string) {
  return input
    .split("\n")
    .map((e) => e.trim().split(";"))
    .flat()
    .map((e) => e.trim())
    .flat();
}

function changeData() {
  if (!data.value.time) {
    autoUpdateTime.value = true;
  }
  const yyyyMMddHHmmss = getDateString();
  const rtime = date2Rtime(
    autoUpdateTime.value ? yyyyMMddHHmmss : data.value.time
  );
  if (autoUpdateTime.value && !data.value.time) {
    data.value.time = rtime;
  }
  let inputValue = data.value.name;
  if (data.value.version) {
    inputValue += "_V" + data.value.version;
  }

  if (data.value.tag) {
    inputValue += "&" + splitAll(data.value.tag).join("&");
  }

  if (data.value.person) {
    inputValue += "@" + splitAll(data.value.person).join("@");
  }

  if (data.value.tip) {
    inputValue += "$" + splitAll(data.value.tip).join("$");
  }

  if (rtime !== "000000") {
    inputValue += "-" + rtime;
  }

  if (data.value.identifier && data.value.prior) {
    inputValue =
      data.value.prior + "." + data.value.identifier + "-" + inputValue;
  }

  if (data.value.identifier && !data.value.prior) {
    inputValue = data.value.identifier + "-" + inputValue;
  }

  if (!data.value.identifier && data.value.prior) {
    inputValue = data.value.prior + "-" + inputValue;
  }

  input.value = inputValue;
}

const options = `紧急数据|000
紧急数据.密码密钥|010
紧急数据.物品位置|020
工作项目|100
工作项目.紧急重要|110
工作项目.紧急不重要|120
工作项目.重要不紧急|130
工作项目.不紧急不重要|140
工作项目.待机项目|150
工作项目.科研|101
工作项目.工程|102
学业项目|200
学业项目.重要学业|210
学业项目.工作技术|220
学业项目.能力提升|230
学业项目.能力提升.现实生产类|231
学业项目.能力提升.语言类|232
学业项目.能力提升.写作类|233
学业项目.能力提升.编程开发类|234
学业项目.能力提升.方法类|235
学业项目.能力提升.效率类|235
学业项目.能力提升.资源硬件类|237
学业项目.能力提升.资源软件类|238
个人项目|300
个人项目.现实生产类|310
个人项目.语言写作类|320
个人项目.编程开发类|330
兴趣爱好|400
个人笔记|500
个人笔记.日志|510
个人笔记.生活日志|511
个人笔记.工作日志|512
个人笔记.随笔|520
个人笔记.随笔.现代文|521
个人笔记.随笔.古体诗|522
个人笔记.随笔.外文|523
个人笔记.随笔.图片|524
个人笔记.随笔.Fomina|525
个人笔记.解决方案|530
个人笔记.解决方案.现实生产类|531
个人笔记.解决方案.语言类|532
个人笔记.解决方案.写作类|533
个人笔记.解决方案.编程开发类|534
个人笔记.解决方案.方法类|535
个人笔记.解决方案.效率类|535
个人笔记.解决方案.资源硬件类|537
个人笔记.解决方案.资源软件类|538
个人笔记.黎曼卡片|540
个人笔记.黎曼卡片.Fleeting Note|541
个人笔记.黎曼卡片.Literature Note|542
个人笔记.黎曼卡片.Permanent Note|543
课外阅读|600
课外阅读.网页|610
课外阅读.网页.wiki|611
课外阅读.网页.新闻门户|612
课外阅读.图片|620
课外阅读.图片.纯图片|621
课外阅读.图片.文字图片|622
课外阅读.报纸|630
课外阅读.报纸.人民日报、新华社|631
课外阅读.短视频|640
课外阅读.长视频|650
课外阅读.短篇电子书|660
课外阅读.长篇电子书|670
课外阅读.短篇纸质书|680
课外阅读.长篇纸质书|690
新闻摘录|700
新闻摘录.来源.电视|701
新闻摘录.来源.官媒，如人民日报、新华社|702
新闻摘录.来源.微信公众号|703
新闻摘录.来源.新闻门户|704
新闻摘录.来源.飞书、微信群|705
新闻摘录.来源.QQ|706
新闻摘录.来源.抖音、快手|707
新闻摘录.来源.外国网站|708
新闻摘录.来源.境外势力|709
新闻摘录.重大新闻|710
新闻摘录.官方通知|720
新闻摘录.娱乐|730
新闻摘录.内部新闻|750
新闻摘录.无来源不确切新闻|760
他人转载|800
他人转载.家属|810
他人转载.同学同事|820
他人转载.朋友|830
他人转载.网友|840
他人转载.陌生人|850
他人转载.群体|880
垃圾桶|900`
  .split("\n")
  .map((e) => e.split("|"))
  .map((e) => ({
    name: e[1] + " = " + e[0],
    value: e[1],
  }));
</script>

<template>
  <div class="container">
    <div class="form-wrapper">
      <h1 class="form-title">标准命名表单</h1>

      <form id="mainForm">
        <div class="form-group">
          <label for="priority">优先级</label>
          <input
            type="text"
            id="priority"
            name="priority"
            @input="changeData"
            v-model="data.prior"
            placeholder="请输入优先级 例如 A001/B011/C100"
          />
        </div>

        <div class="form-group">
          <label for="identifierType">标识符类型</label>
          <select
            id="identifierType"
            name="identifierType"
            @change="changeData"
            v-model="data.identifier"
          >
            <option value="">请选择标识符类型</option>
            <option v-for="item in options" :value="item.value">
              {{ item.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="title">标题</label>
          <input
            type="text"
            id="title"
            name="title"
            @input="changeData"
            placeholder="请输入标题"
            v-model="data.name"
          />
        </div>

        <div class="form-group">
          <label for="version">版本号</label>
          <input
            type="text"
            id="version"
            name="version"
            @input="changeData"
            v-model="data.version"
            placeholder="请输入版本号"
          />
        </div>

        <div class="form-group">
          <label for="tags">标签</label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="请输入标签"
            @input="changeData"
            v-model="data.tag"
          />
        </div>

        <div class="form-group">
          <label for="personnel">人员</label>
          <input
            type="text"
            id="personnel"
            name="personnel"
            v-model="data.person"
            @input="changeData"
            placeholder="请输入人员"
          />
        </div>

        <div class="form-group">
          <label for="description">说明</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            @input="changeData"
            v-model="data.tip"
            placeholder="请输入说明"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="timeThreshold">时间戳</label>
          <input
            type="text"
            @input="changeData"
            id="timeThreshold"
            name="timeThreshold"
            v-model="data.time"
            placeholder="请输入时间戳"
          />
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input
              type="checkbox"
              id="autoUpdate"
              @input="changeData"
              name="autoUpdate"
              v-model="autoUpdateTime"
            />
            <span>自动更新到当前时间戳</span>
          </label>
        </div>
      </form>

      <div class="output-section">
        <h2 class="output-title">最终输出结果</h2>
        <input
          type="text"
          class="output-content"
          id="personnel"
          name="personnel"
          @input="changeInput"
          v-model="input"
          placeholder="最终输出结果"
        />
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
