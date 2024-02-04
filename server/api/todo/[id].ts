import { db } from '../../db/index';
import { sendError } from "h3"

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  const context = event.context;
  const { id } = context.params;
  let index;
  const findTodoById = (todoId) => {
    const todo = db.todos.find((todo, i) => {
      if (todo.id === todoId) {
        index = i;
        return true;
      }
      return false;
    });
    if (!todo) {
			const TodoNotFoundError = createError({
				statusCode: 404,
				statusMessage: 'Todo Not Found',
				data: {}
			})

			sendError(event, TodoNotFoundError)
		}

    return {todo, index};
  };
  if (method === 'PUT') {
    const {todo, index} = findTodoById(id);
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };

    db.todos[index] = updatedTodo;

    return updatedTodo;
  }

  if (method === 'DELETE') {
    const {todo, index} = findTodoById(id);
    db.todos.splice(index, 1);
    return {
			message: 'item Deleted successfully'
		};
  }
});
