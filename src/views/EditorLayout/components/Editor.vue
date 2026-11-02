 <script setup lang="ts">
 import { usedocumentStore } from '@/stores/document';
import { ref } from 'vue';
 const documentStore = usedocumentStore()


const textareaRef = ref<HTMLTextAreaElement | null>(null)
  


// 通过位置来切割字符串
// 子传父，父再通过props传其他子
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



defineExpose({ bold,underline,italic,strikethrough })
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