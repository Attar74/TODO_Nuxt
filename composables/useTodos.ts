const useTodos = () => {
	const { data: todos , refresh } = useAsyncData('todo',() => {
		return $fetch('/api/todo')
	})

  const addTodo = async (title) => {
    if (!title) return;

    await $fetch('/api/todo', {
      method: 'POST',
      body: { title },
    });
    refresh();
  };

  const updateTodo = async (todoId) => {
    await $fetch(`/api/todo/${todoId}`, {
      method: 'PUT',
    });
    refresh();
  };

  const deleteTodo = async (todoId) => {
    await $fetch(`/api/todo/${todoId}`, {
      method: 'delete',
    });
    refresh();
  };

	return { todos, addTodo, updateTodo, deleteTodo }
};

export default useTodos;
