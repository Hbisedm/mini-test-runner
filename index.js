import * as glob from "glob";
import fs from "fs/promises";
import { build } from "esbuild";
// 1. 获取到所有的测试脚本  =>  *.spec.js
// 借助glob库帮助我们达到这个需求

const files = glob.sync("*.spec.js");
// console.log(files);

// new
for (const file of files) {
  const fileContent = await fs.readFile(file, "utf-8");
  runModule(fileContent);
}

// 执行会报错, 原因: import 不支持执行, 解决方案: 使用打包器
// 将import抽离成库
// new Function(fileContent)();

async function runModule(fileContent) {
  // 先生成打包内容，再执行，去掉import语句
  const result = await build({
    stdin: {
      contents: fileContent,
      resolveDir: process.cwd(),
    },
    write: false,
    bundle: true,
    target: "esnext",
  });
  const buildContent = result.outputFiles[0].text;
  new Function(buildContent)();
}
