'use strict'

const { validateAll } = use('Validator');
const Todo = use('App/Models/Todo');

class TodoController {
  async index ({ view }) {
    // fetch some data
    const todos = await Todo.all();
    
    return view.render('home', { todos: todos.toJSON() });
  }

  async store ({ request, response, session }) {
    const body = request.all();

    // validate the data 
    const rules = {
      text: 'required|min:8'
    };

    const messages = {
      'text.required': 'Please provide a todo.',
      'text.min': 'Your todo is not long enough.'
    };

    const validator = await validateAll(body, rules, messages);
    if (validator.fails()) {
      
      session.withErrors(validator.messages()).flashAll();
      return response.redirect('/');
    }

    const todo = await Todo.create({
      text: body.text
    });
    session.flash({ notification: 'Todo created successfully.' });
    return response.redirect('/');
  }
}

module.exports = TodoController
