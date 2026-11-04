import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export interface DocumentItem {
  id: string
  title: string
  content: string
}
export const usedocumentStore = defineStore('document', () => {
  // 默认值
  let defaultDocument = {
  id: '',
  title: '',
  content: ''
}
// active为展示属性
  let activeId = ref("")
  //  保存数据变量
 let documentList = ref<DocumentItem[]>([defaultDocument])
//  computed动态计算当前选中目标
  const activeDocument = computed(() => documentList.value.find(item => item.id === activeId.value) ?? defaultDocument)

 return {
  defaultDocument,
  documentList,
  activeId,
  activeDocument
 }
},{
  persist:true
})
