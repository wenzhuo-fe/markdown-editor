 <script setup lang="ts">
 import { usedocumentStore } from '@/stores/document';
import { ref } from 'vue';
 const documentStore = usedocumentStore()


const textareaRef = ref<HTMLTextAreaElement | null>(null)
  


// 通过位置来切割字符串
// 子传父，父再通过props传其他子
// 粗体
const bold = () => {
  // 获取ref来获取元素位置
  const start = textareaRef.value?.selectionStart
  const end = textareaRef.value?.selectionEnd

  if (start === undefined || end === undefined) return

  const content = documentStore.activeDocument.content
  
  // 切割成三段
  const before = content.slice(0, start)
  const selected = content.slice(start, end)
  const after = content.slice(end)

  documentStore.activeDocument.content =
    before + '**' + selected + '**' + after
}
// 下划线
const underline = () => {
  const start = textareaRef.value?.selectionStart
  const end = textareaRef.value?.selectionEnd

  if (start === undefined || end === undefined) return

  const content = documentStore.activeDocument.content
  
  // 切割成三段
  const before = content.slice(0, start)
  const selected = content.slice(start, end)
  const after = content.slice(end)

   documentStore.activeDocument.content = before+'<u>'+selected+'<u>'+after
}

// 斜体 
const italic = () => {
   // 获取ref来获取元素位置
  const start = textareaRef.value?.selectionStart
  const end = textareaRef.value?.selectionEnd

  if (start === undefined || end === undefined) return

  const content = documentStore.activeDocument.content
  
  // 切割成三段
  const before = content.slice(0, start)
  const selected = content.slice(start, end)
  const after = content.slice(end)

  documentStore.activeDocument.content =
    before + '*' + selected + '*' + after
}
// 删除线
const strikethrough = () => {
   // 获取ref来获取元素位置
  const start = textareaRef.value?.selectionStart
  const end = textareaRef.value?.selectionEnd

  if (start === undefined || end === undefined) return

  const content = documentStore.activeDocument.content
  
  // 切割成三段
  const before = content.slice(0, start)
  const selected = content.slice(start, end)
  const after = content.slice(end)

  documentStore.activeDocument.content =
    before + '~~' + selected + '~~' + after
}
// 标题
const title = (num:number) => {

  const start = textareaRef.value?.selectionStart

  if (start === undefined) return

  const content = documentStore.activeDocument.content

  // 找到当前行的起始位置
  const lineStart = content.lastIndexOf('\n', start - 1) + 1

  // 找到当前行的结束位置
  const lineEndIndex = content.indexOf('\n', start)
  const lineEnd = lineEndIndex === -1 ? content.length : lineEndIndex

  const before = content.slice(0, lineStart)
  const selected = content.slice(lineStart, lineEnd)
  const after = content.slice(lineEnd)

  documentStore.activeDocument.content =
    before + '#'.repeat(num) + ' ' + selected + after
}
// 下标
const subscript = () => {
  const start = textareaRef.value?.selectionStart
  const end = textareaRef.value?.selectionEnd

  if (start === undefined || end === undefined) return

  const content = documentStore.activeDocument.content
  
  // 切割成三段
  const before = content.slice(0, start)
  const selected = content.slice(start, end)
  const after = content.slice(end)

  documentStore.activeDocument.content =
    before + '~' + selected + '~' + after
}

// 上标
const superscript = () => {
   const start = textareaRef.value?.selectionStart
  const end = textareaRef.value?.selectionEnd

  if (start === undefined || end === undefined) return

  const content = documentStore.activeDocument.content
  
  // 切割成三段
  const before = content.slice(0, start)
  const selected = content.slice(start, end)
  const after = content.slice(end)

  documentStore.activeDocument.content =
    before + '^' + selected + '^' + after
}
// 引用
const blockquote  = () => {
  const start = textareaRef.value?.selectionStart

  if (start === undefined) return

  const content = documentStore.activeDocument.content

  // 找到当前行的起始位置
  const lineStart = content.lastIndexOf('\n', start - 1) + 1

  // 找到当前行的结束位置
  const lineEndIndex = content.indexOf('\n', start)
  const lineEnd = lineEndIndex === -1 ? content.length : lineEndIndex

  const before = content.slice(0, lineStart)
  const selected = content.slice(lineStart, lineEnd)
  const after = content.slice(lineEnd)

  documentStore.activeDocument.content =
    before + '>' + ' ' + selected + after
}


defineExpose({ bold,underline,italic,strikethrough,title,subscript,superscript,blockquote })
 </script>
 
 <template>
  
    <div class="pane-content">
    <textarea   ref="textareaRef" v-model="documentStore.activeDocument.content" class="markdown-input"></textarea>
  </div>
  
   
  

 </template>
 
 <style scoped lang="scss">
 .pane-content {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;

  .markdown-input {
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    padding: 7px 15px;
    border: none;
    outline: none;
    resize: none;

    background: #fff;
    color: #333;
    font-size: 14px;
    line-height: 1.8;
    font-family: Consolas, Monaco, monospace;

    overflow-y: auto;
    overflow-x: hidden;
  }
}
 </style>