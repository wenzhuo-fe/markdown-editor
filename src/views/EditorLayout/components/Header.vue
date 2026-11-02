 <script setup lang="ts">
 const emit = defineEmits(['bold','underline','italic','strikethrough'])
 </script>
 
 <template>
   <button @click="emit('bold')">B</button>
   
   <button @click="emit('underline')">U</button>
   <button @click="emit('italic')">I</button>
   <button @click="emit('strikethrough')">S</button>
 </template>
 
 <style scoped lang="scss">
 
 </style>