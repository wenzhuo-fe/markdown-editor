
<script setup lang="ts">
import Header from './components/Header.vue'
import Editor from './components/Editor.vue'
import Preview from './components/Preview.vue'
import { ref } from 'vue';
const editorRef = ref<InstanceType<typeof Editor> | null>(null)

const handleBold = () => {
  editorRef.value?.bold()
}

const handleunderLine = () => {
  editorRef.value?.underline()
}

const handleitalic = () => {
   editorRef.value?.italic()
}

const handlestrikethrough = () => {
  editorRef.value?.strikethrough()
}

</script>

<template>
  <div class="editor-layout">
    <!-- 顶部工具栏 -->
    <header class="editor-header">
      <Header @bold="handleBold" @underline="handleunderLine" @italic="handleitalic" @strikethrough="handlestrikethrough" />
    </header>

    <!-- 左右编辑区域 -->
    <main class="editor-main">
      <section class="editor-pane">
        <div class="pane-header">
          <span class="pane-dot"></span>
          MARKDOWN SOURCE
        </div>
        <div class="pane-content">
          <Editor ref="editorRef"/>
        </div>
      </section>

      <section class="preview-pane">
        <div class="pane-header">
          <span class="pane-dot"></span>
          LIVE PREVIEW
        </div>
        <div class="pane-content">
          <Preview />
        </div>
      </section>
    </main>

    <!-- 底部状态栏 -->
    <footer class="editor-footer">
      <span>Markdown Editor</span>
      <span>Ready</span>
    </footer>
  </div>
</template>

<style scoped lang="scss">

.editor-layout {
  width: 82%;
  max-width: 1633px;
  height: 700px;
  margin: 8px auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #ddd;

  // 顶部工具栏外框
  .editor-header {
    height: 37px;
    flex-shrink: 0;
    border-bottom: 1px solid #ddd;
    background: #fff;
  }

  // 左右编辑主体
  .editor-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  .editor-pane,
  .preview-pane {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    background: #fff;
    overflow: hidden;
  }

  .editor-pane {
    border-right: 4px solid #e5e5e5;
  }

  // 区域标题
  .pane-header {
    height: 36px;
    flex-shrink: 0;
    padding: 0 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    font-size: 11px;
    color: #64748b;
    font-weight: 600;
  }

  .pane-content {
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  // 底部状态栏
  .editor-footer {
    height: 36px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    border-top: 1px solid #ddd;
    font-size: 12px;
    color: #64748b;
  }
}

@media (max-width: 768px) {
  .editor-layout {
    width: 96%;
    height: calc(100vh - 16px);

    .editor-main {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
    }
  }
}

</style>
