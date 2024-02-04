<template>
  <div class="container">
    <NCard class="cards">
      <h1>
        my Todd
      </h1>
      <div class="addTodo">
        <input v-model="input" placeholder="Add a new todo...." />
        <NButton @click="addTodo">
          Add
        </NButton>
      </div>
    </NCard>
    <NCard class="card" v-for="todo in todos" :key="todo.id" @click="updateTodo(todo.id)">
      <h4 :class="todo.completed ? 'complete' : ''">{{ todo.item }}</h4>
      <p @click.prvent="deleteTodo(todo.id)">X</p>
    </NCard>
  </div>
</template>

<script lang="ts" setup>
const { data: todos } = useFetch('/api/todo')

const input = ref("")

const addTodo = (async () => {
  if(!input) return

  await $fetch('/api/todo', {
    method: "POST",
    body: {
      "title": input.value
    }
  })
  input.value = ""
})

const updateTodo = (async (todoId) => {
  await $fetch(`/api/todo/${todoId}`, {
    method: "PUT"
  })
})

const deleteTodo = (async (todoId) => {
  await $fetch(`/api/todo/${todoId}`, {
    method: "delete"
  })
})
</script>
<style scoped>
body {
  background-color: #fff;
}

.container {
  padding: 2rem;
  margin: 0 auto;
  max-width: 50%;
}
.cards {
  padding: 2rem
}

.addTodo {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

input {
  outline: none;
}

.card {
  padding: 0.5rem;
  margin-top: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.complete {
  text-decoration: line-through;
}
</style>
