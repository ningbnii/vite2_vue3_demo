import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import styleImport from "vite-plugin-style-import";
import px2vp from "postcss-px2vp";

const vantStyleImport = () => {
  const libraryName = "vant";
  return styleImport({
    libs: [
      {
        libraryName,
        esModule: true,
        resolveStyle(name) {
          return `${libraryName}/es/${name}/style`;
        },
      },
    ],
  });
};

export default defineConfig({
  // 大佬方案https://juejin.cn/post/6961737808339795975
  css: {
    postcss: {
      plugins: [
        px2vp({
          viewportWidth(rule) {
            const file = rule.source?.input.file;
            if (file?.includes("vant")) return 375;
            return 750;
          },
        }),
      ],
    },
  },
  plugins: [vue(), vantStyleImport()],
});
