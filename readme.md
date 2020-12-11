node 图片服务

启动
npm i //安装依赖
npm start //启动服务

入参
file 文件


VUE + axios 例子调用

<template>
  <div class="home">
    <input type="file" id="file">
      <input @click="submit" type="submit" value="提交" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
  data() {
    return {};
  },
  methods: {
    submit() {
      const fileDom: any = (document.getElementById("file") as HTMLInputElement);
      const formData = new FormData()
      formData.append("file", fileDom.files[0])
      this.axios
        .post("/upload", formData, {
          header: {
            'Content-Type': "multipart/form-data"
          },
        })
        .then((res: object) => {
          console.log(res);
        });
    }
  }
})
export default class Home extends Vue {}
</script>

