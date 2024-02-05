<template>
  <div class="container border-2 border-[#000] p-[2rem] rounded-2xl mx-auto mt-[5rem] w-[50rem]">
    <div class="border-b-2 border-[#000] p-[2rem]">
      <h1 class="text-5xl">
        My Todos
      </h1>
      <div class="flex justify-between mt-[3rem]">
        <div>
          <input v-model="input" placeholder="Add a new todo...." class="text-2xl outline-none focus:border-b-2 border-[#000] mt-[0.7rem] w-[30rem] transition-all delay-50" />
        </div>
        <div>
          <button @click="handleReset" :class="!input.length ? 'bg-gray-100 text-[#000] line-through' : 'bg-sky-500 '" class="rounded-md px-[3rem] py-2 text-[#fff]" :disabled="!input.length">
            Add
          </button>
        </div>
      </div>
    </div>
    <div class="mt-[2rem] border-2 border-[#e7e7e7] p-[1rem] rounded-xl flex justify-between" v-for="todo in todos" :key="todo.id" @click="updateTodo(todo.id)">
      <h4 :class="todo.completed ? 'line-through' : ''">{{ todo.item }}</h4>
      <button @click.prvent="deleteTodo(todo.id)" class="transition-transform hover:scale-150">
        X
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const input = ref("")

const { todos, addTodo, updateTodo, deleteTodo } = useTodos()

const handleReset = () => {
  addTodo(input.value)
  input.value = ''
}
</script>
