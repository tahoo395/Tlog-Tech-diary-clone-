<template>
  <div id="editorjs" class="reset"></div>
</template>


<script>
import EditorJS from "@editorjs/editorjs";
import header from "@editorjs/header";
import image from "@editorjs/image";
import list from "@editorjs/list";
import checklist from "@editorjs/checklist";
import quote from "@editorjs/quote";
import warning from "@editorjs/warning";
import codeBox from "@bomdi/codebox";
import table from "@editorjs/table";

import underline from "@editorjs/underline";
import inlineCode from "@editorjs/inline-code";
import marker from "@editorjs/marker";

export default {
  data() {
    return {
        editor: null,
    };
  },
  created() {
    const editor = new EditorJS({
      autofocus: true,
      tools: {
        header,
        image: {
          class: image,
          config: {
            endpoints: {
              byFile: "http://localhost:8000/upload/",
            },
          },
        },
        list,
        checklist,
        quote,
        warning,
        codeBox: {
          class: codeBox,
          config: {
            themeURL:
              "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css", // Optional
            themeName: "atom-one-dark", // Optional
            useDefaultTheme: "dark", // Optional. This also determines the background color of the language select drop-down
          },
        },
        table,
        underline,
        inlineCode,
        marker,
      },
      placeholder: "Yeah, I'm unstoppable today 💪",
    });
    this.editor = editor
  },
  methods:{
    async save(){
      let data = await this.editor.save()
      return data.blocks
    }
  }
};
</script>

<style lang="scss">
.ce-block__content,
.ce-toolbar__content {
  max-width: unset;
  .ce-header {
    padding: 0;
    margin-bottom: 0;
  }
}
</style>