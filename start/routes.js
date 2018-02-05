'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route');
const Todo = use('App/Models/Todo');

Route.on('/').render('index');

Route.group(() => {
  Route.get('/dashboard', 'TodoController.index')
  Route.post('/', 'TodoController.store')
    .validator('SaveTodo')
}).middleware('auth');

Route.group(() => {
  Route.get('/delete/:id', 'TodoController.destroy');
  Route.get('/edit/:id', 'TodoController.edit');
  Route.post('/update/:id', 'TodoController.update').validator('SaveTodo');
}).prefix('/todos').middleware('findTodo');

Route.get('/logout', async ({ auth, response }) => {
  await auth.logout();
  return response.redirect('/');
});

Route.group(() => {
  Route.on('/signup').render('auth.sign-up');
  Route.on('/signin').render('auth.sign-in');
  Route.post('/signup', 'UserController.store').validator('SignUpUser');
  Route.post('/signin', 'UserController.signIn').validator('SignInUser');
}).prefix('/auth')
  .middleware('redirectIfAuthenticated');
