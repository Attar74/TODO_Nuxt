import { db } from '../../db/index';
import { v4 as uuid } from 'uuid';
import { sendError } from 'h3';

export default defineEventHandler(async (event) => {
  const method = event.req.method;

  if (method === 'GET') {
    return db.todos;
  }

  if (method === 'POST') {
    const body = await readBody(event);
    if (!body.title) {
      const TodoNotFoundError = createError({
        statusCode: 400,
        statusMessage: 'No item provided',
        data: {},
      });

      sendError(event, TodoNotFoundError);
    }

    const newTodo = {
      id: uuid(),
      item: body.title,
      completed: false,
    };
    db.todos.push(newTodo);
    return newTodo;
  }
});
