# Node+Express+Pug+SQLite

Compiled  by Tan Bee Hoon (contact: tbeehoon@gmail), dated 15 Sep 2025

This readme shows: 

1. Task1 - Handling Events in React

2. Task2 - State Management using React Hooks

3. Task3 - Asynchronous Data Fetching with AJAX

4. Reference - Github Repo 

5. How to set up the environment for NVM, React and Vite.

   

## 1. Task1-Handling Events in React

> [!NOTE]
>
> Requirements:
>
> a) Create a simple component with a button labeled “Toggle Message.” 
>
> b) When the button is clicked, toggle a message on the screen that says “Hello, welcome to React!” This message should disappear when the button is clicked again.



### 1.1. Explanation

The file App.jsx is modified to complete the task:

a. Created a `<Button onClick={handleToggle}>Toggle Message</Button>` inside component App

b. The button is labelled “Toggle Message”

c. Using a state variable `showMessage` (`useState(false)`) to keep track of whether the message should be visible

d. The `handleToggle` function flips the value of `showMessage` each time the button is clicked.

e. Conditionally render the message, which ensures the message appears when `showMessage` is true and disappears when it’s false.

```
{showMessage && (
  <p>Hello, welcome to React!</p>
)}
```



### 1.2 Code for App.jsx

The code for the full App.jsx is as follows:

![](./public/task1.jpg)

```
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import beelogo from '/bees.png'
import './App.css'

function App() {
  const [showMessage, setShowMessage] = useState(false)

  const handleToggle = () => {
    setShowMessage((prev) => !prev)
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://tbeehoon.wordpress.com/" target="_blank">
          <img src={beelogo} className="logo bee" alt="Bee logo" />
        </a>
      </div>
      <h1>Vite + React + Bee</h1>
      
      {/* Toggle Message Button and Message */}
      <div className="card">
        <Button onClick={handleToggle}>Toggle Message</Button>
        {showMessage && (
          <p>Hello, welcome to React!</p>
        )}
      </div>
      <p className="read-the-docs">
        "Do not React, learn to Respond."
      </p>
    </>
  )
}

export default App
```



### 1.3 Output 

Run the code:

```
npm run dev
```

The following is the resulting browser screen capture:

![](./public/task1-screen.jpg)



---

## 2. Task2-State Management using React Hooks

> [!NOTE]
>
> Requirements: 
>
> a) Build a component called ColorChanger. This component should have a text input where users can enter a colour name (e.g., “blue”). 
>
> b) The component should display a box that changes colour based on the input. 
>
> c) As the user types into the input, the box should automatically update to the new colour if it’s a valid colour name. 

Two files are modified to complete the task:

### 2.1 Explanation 

#### **2.1.1 `App.jsx` – The Main Application Component**

App.jsx is setup to "frame" the app, and import in ColorChange as a child component, 

a. Import custom **ColorChanger**

```
import ColorChanger from './ColorChanger'
```

b. Render ColorChanger Component inside the styled card.

```
{/* ColorChanger Component */}
<div className="card" style={{ marginTop: 0 }}>
	<ColorChanger />
</div>
```



#### **2.1.2 ColorChanger.jsx** - Interactive Color Nox 

This the component for the interactive color box. 

a. Start with State Management. The **color** variable stores the user input, initiated as empty (' ').

```
const [color, setColor] = useState('')
```



b. The color validation is done with variable **isValidColor**.  It creates a temporary DOM style object and tries to set its `color`. If the browser recognizes the input (like `"red"`, `"#00ff00"`, or `"rgb(0,0,255)"`), it will be set. If it’s invalid, it will remain empty.

```
const isValidColor = (col) => {
  const s = new Option().style
  s.color = col
  return s.color !== ''
}
```



c. The color box is styled with the the following: 

* The main box is **320×100px**.

* Background is user’s chosen color if valid. A dull grey (`#eee`) if not.

* Centered text with background transitions.

  ```
  const boxStyle = {
    width: '320px',
    height: '100px',
    backgroundColor: isValidColor(color) ? color : '#eee',
    border: '1px solid #ccc',
    marginTop: '10px',
    transition: 'background 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#222',
  }
  ```



d. Rendering Logic is defined in two steps:

Step1 - User types a color name (like `"red"`) or a CSS color value. Updates the `color` state on change.

```
<input
    id="color-input"
    type="text"
    value={color}
    onChange={e => setColor(e.target.value)}
    placeholder="e.g. blue, red, green"
    style={{ marginLeft: '10px' }}
/>
```

Step2 - If the color is valid and not empty, displays the color’s name inside the box. Otherwise shows the default message.

```
<div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
    <div style={boxStyle}>
      {isValidColor(color) && color ? color : (
        <> 
            I am a boring box with no color. <br/> 
            Please enter a color to make me colorful.
        </>
        )}
    </div>
</div>
```



### 2.2 Code for ColorChanger.jsx

The full code for ColorChanger.jsx is as follows:

![](./public/task2.jpg)

```
import { useState } from 'react'

function ColorChanger() {
  const [color, setColor] = useState('')

  // Check if the color is valid by trying to set it on a dummy element
  const isValidColor = (col) => {
    const s = new Option().style
    s.color = col
    return s.color !== ''
  }

  const boxStyle = {
    width: '320px',
    height: '100px',
    backgroundColor: isValidColor(color) ? color : '#eee',
    border: '1px solid #ccc',
    marginTop: '10px',
    transition: 'background 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#222',
  }

  return (
    <div className="card">
      <label htmlFor="color-input">Enter a color name:</label>
      <input
        id="color-input"
        type="text"
        value={color}
        onChange={e => setColor(e.target.value)}
        placeholder="e.g. blue, red, green"
        style={{ marginLeft: '10px' }}
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <div style={boxStyle}>
          {isValidColor(color) && color ? color : (
            <> 
                I am a boring box with no color. <br/> 
                Please enter a color to make me colorful.
            </>
            )}
        </div>
      </div>
    </div>
  )
}

export default ColorChanger
```



### 2.3 Output

Run the code:

```
npm run dev
```

The resulting browser screen is shown below:

![](./public/task2-screen.jpg)

---

## 3. Task3-Asynchronous Data Fetching with AJAX 

> [!NOTE]
>
> Requirements: 
>
> a) Create a UserProfile component that fetches user data from an API (for example, https://jsonplaceholder.typicode.com/users/1) and displays the user’s name, email, and address on the page. 
>
> b) Display a loading message while data is being fetched. 



### 3.1 Explanation

Two files are modified to complete the task:

#### 3.1.1 `App.jsx` – The Main Application Component

**App.jsx** is setup to "frame" the app, and import in **UserProfile** as a child component, 

a. Import custom **UserProfile **

```
import UserProfile from './UserProfile'
```

b. Render **UserProfile** Component inside the styled card.

```
{/* UserProfile Component */}
<div className="card" style={{ marginTop: 0 }}>
	<UserProfile />
</div>
```



#### 3.1.2 `UserProfile.jsx` – Fetching and Displaying User Data

This component demonstrates how to fetch asynchronous data in React using the `useEffect` and `useState` hooks. It loads a fake user profile from the public API **`https://jsonplaceholder.typicode.com/users/1`** and displays the user’s information.

##### a.  **State Management**

The component manages three pieces of state:

- **`user`** : holds the fetched user data (initially `null`).
- **`loading`** : a boolean that tracks whether the fetch is in progress (initially `true`).
- **`error`** : stores any error message if the fetch fails (initially `null`).

```
 const [user, setUser] = useState(null)
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState(null)
```

##### b. **Data Fetching with `useEffect`**

The `useEffect` hook triggers when the component mounts. The process:

* Set `loading` to `true` before fetching.
* Use `fetch` to call the API.
* If the response is OK, convert it to JSON and update `user`.
* If the response is invalid, throw an error.
* Catch any errors, set `error`, and stop loading.

```
useEffect(() => {
	setLoading(true)
	fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((data) => {
        setUser(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
}, [])
```

![](./public/task3-1.jpg)



##### c. **Conditional Rendering**

The component displays different UI states based on the fetch status:

- If `loading` then Show *“Loading user profile…”*
- If `error` then Show the error message
- if `!user` then Return null, meaning don't render anything for this component
- If `user` is available then Render the profile details (refer to next section)

```
if (loading) return <div className="card">Loading user profile...</div>
if (error) return <div className="card">Error: {error}</div>
if (!user) return null
```



##### **d. Display User Data**

Once the API returns data, the component displays the user’s **name**, **email**, and **full address** inside a styled card.

```
return (
    <div className="card">
      <h3>User Profile</h3>
      <div><strong>Name:</strong> {user.name}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div>
        <strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
      </div>
    </div>
  )
```

![](./public/task3-2)

### 3.2 Code for UserProfile.jsx

The full code for **UserProfile.jsx** is as follows:

```
import { useEffect, useState } from 'react'

function UserProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((data) => {
        setUser(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="card">Loading user profile...</div>
  if (error) return <div className="card">Error: {error}</div>
  if (!user) return null

  return (
    <div className="card">
      <h3>User Profile</h3>
      <div><strong>Name:</strong> {user.name}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div>
        <strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
      </div>
    </div>
  )
}

export default UserProfile
```

![](./public/task3-3.jpg)

### 3.3 Output

Run the code:

```
npm run dev
```

The resulting browser screen is shown below:

![](./public/task3-screen.jpg)



## 4. Reference - Git Hub Repo 

Final git push for module8part2 app is pushed to the following github repo: 

https://github.com/tbeehoon/module8part2/tree/main



---



## 5. Setup the environment

### 5.1 Install NVM (Node Version Manager) (*Optional*)

If NVM is not installed yet, download the latest `nvm-setup.exe` from the releases page: https://github.com/coreybutler/nvm-windows/releases

> [!TIP]
>
> Avoid installing the “global” Node.js from nodejs.org if using NVM. 



### 5.2 Install the latest version (*Optional*) 

If the latest version is not available in on the machine, install the version required (LTS recommended):

```
# Install latest LTS
nvm install lts

# Use it now
nvm use lts
```

Do verification:

```
# Verify
node -v
npm -v
```

Note: This installation using node version v22.19.0



### 5.3 Create the project

Generate the project:

```
npx express-generator --view=pug task1ap
```

> [!TIP]
>
> **Recommended way** if you haven’t installed `express-generator` globally.
>
> `npx` will fetch the latest `express-generator` package from npm and run it directly.
>
> No need to keep it installed on your system afterward.
>
> In summary: no install needed, always latest

Change to project directory:

```
cd task1app
```

Then install dependencies:

```
npm install
```

This is the directory structure and dependency installed: 

![image-20250928185533090](C:\Users\user\projects\Emeritus-FullStackAI\Module10\Mod10-Task1\task1app\public\images\setup1.png)



### 5.4 Setup for auto-reload

For convenience, add auto-reload to the setup.

Add **nodemon** for auto-reload:

```
npm i -D nodemon
npm install --save-dev nodemon
```

In `package.json`, add a dev script:

```
"scripts": {
  "start": "node ./bin/www",
  "dev": "nodemon ./bin/www"
}
```



### 5.4 Provide a default port number (*Optional*)

This line of code should be included as part of the setup. Update the file "`bin/www`"

```
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
```

#### a. **Checks for an environment variable**

- `process.env.PORT` looks for a `PORT` variable in your system environment.
- This is common in hosting platforms (like Heroku, Render, Azure, etc.) where the platform assigns your app a port dynamically.
- If `process.env.PORT` is **not set**, it falls back to `'3000'`.

#### b. **Provides a default (fallback)**

- The `|| '3000'` means:
  - If no environment variable exists, use string `'3000'`.
  - So when you run locally, you usually get port `3000` unless you override it.

#### c. **Normalizes the value**

- `normalizePort()` is a helper function (defined further down in `bin/www`). It makes sure the port is in a usable format:

  

### 5.5 Add Bootstrap to the project (*Optional*)

Install Bootstrap and its dependencies:

```
npm install bootstrap
```

Import Bootstrap CSS in your main JS file (e.g., index.js, App.js, or main.js):

```
import 'bootstrap/dist/css/bootstrap.min.css';
```



### 5.6 Initialize Git

Version control the project using Git.

```
# Initialize a git repository
git init

# Add all project files
git add .

# Commit the files
git commit -m "Initial commit: setup project"
```

To add to Github.

```
# Add remote 
git remote add origin https://github.com/tbeehoon/module8part2.git

# Push changes
git branch -M main
git push -u origin main
```

> [!TIP]
>
> In case identity need to be authenticated:

```
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```



### 5.7 Setup .gitignore

Add a `.gitignore` file in the root of the project to exclude files and folders not required in version control. Some examples of items to include:

```
# dependencies
/node_modules

# production build
/dist

# logs
npm-debug.log*
*.log

# environment variables
.env
.env.local
.env.*.local

# IDE/editor folders
.vscode/
.DS_Store
Thumbs.db
```



## 6. Setup Dynamic content rendering with Pug

### 6.1 Edit a route (send dynamic data)

Edit the routing in routes/index.js.

```
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  const items = [
    { id: 1, text: 'About Express' },
    { id: 2, text: 'About Pug' },
    { id: 3, text: 'About SQLite' }
  ];
  res.render('index', { title: 'Module 10 Task 1', items, showHelp: true });
});

module.exports = router;
```



### 6.2 Edit Layout & template

Edit the layout in views/layout.pug.

```
doctype html
html
  head
    title #{title} | Demo
    meta(charset="utf-8")
    meta(name="viewport", content="width=device-width, initial-scale=1")
    link(rel="stylesheet", href="/stylesheets/style.css")
  body
    header
      h1 #{title}
      nav
        a(href="/") Home
        |  ·
        a(href="/todos") Todos
    main
      block content
    footer
      p ©tbeehoon#{new Date().getFullYear()}

```

Edit the main html index page.

```
extends layout

block content
  if showHelp
    p Welcome! This page renders a dynamic list below.

  if items && items.length
    ul
      each item in items
        li #{item.text}
  else
    p No items found.
```

Run the page:

```
npm run dev
```

This is the output:

![image-20250928225441656](./public/images/setup2.png)

### 6.3 to Update with bootstrap styling

Copy bootstrap files to public folder:

```
copy node_modules\bootstrap\dist\css\bootstrap.min.css task1app\public\stylesheets\

copy node_modules\bootstrap\dist\js\bootstrap.bundle.min.js task1app\public\javascripts\
```

Edit the layout file layout.pug with the the following:

```
doctype html
html
  head
    title #{title} | Demo
    meta(charset="utf-8")
    meta(name="viewport", content="width=device-width, initial-scale=1")
    link(rel="stylesheet", href="/stylesheets/style.css")
    link(rel="stylesheet", href="/stylesheets/bootstrap.min.css")
  body
    nav.navbar.navbar-expand-lg.navbar-light.bg-light.mb-4
      .container-fluid
        a.navbar-brand(href="/") BeeProject
        button.navbar-toggler(type="button", data-bs-toggle="collapse", data-bs-target="#navbarNav", aria-controls="navbarNav", aria-expanded="false", aria-label="Toggle navigation")
          span.navbar-toggler-icon
        #navbarNav.collapse.navbar-collapse
          ul.navbar-nav.me-auto.mb-2.mb-lg-0
            li.nav-item
              a.nav-link.active(href="/") Home
            li.nav-item
              a.nav-link(href="/todos") Todos
    .container
      header.my-4
        h1 #{title}
      main
        block content
      footer.text-center.mt-5
        p ©tbeehoon#{new Date().getFullYear()}
    script(src="/javascripts/bootstrap.bundle.min.js")
```

Here’s a summary of the changes made to the layout.pug:

- Added Bootstrap CSS and JS:

  - Linked bootstrap.min.css in the <head>.

  - Included bootstrap.bundle.min.js at the bottom of the body.

- Upgraded the navigation bar:

  - Replaced the old nav with a responsive Bootstrap navbar component.

  - Added a brand link (BeeProject) using .navbar-brand.

  - Kept both the brand and a Home link in the navigation.

  - Styled the navigation links (Home, Todos) with Bootstrap classes.

- Improved layout structure:

  - Wrapped the main content in a Bootstrap .container for better alignment and spacing.

  - Added spacing and centering to the header and footer using Bootstrap utility classes.

- Footer update:

  - Footer is now centered and spaced with .text-center and .mt-5.

  - Footer displays ©tbeehoon<year> with the year remaining dynamic.



This is the new bootstrap look: 

![image-20250928232818335](./public/images/setup3.png)

### 7. Integration using SQLite and CRUD operations (For Task 4b)

#### 7.1 Install the driver for **better-sqlite3**:

```
npm i better-sqlite3
```

#### 7.2 Create a DB module

To set up a SQLite-backed todo store with functions for listing, adding, and deleting todos, and have a router template for CRUD operations on those todos.

Create a new db/index.js.

```
const Database = require('better-sqlite3');
const db = new Database('app.db'); // file created if missing

// Create a table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = {
  allTodos() {
    return db.prepare('SELECT id, text, created_at FROM todos ORDER BY id DESC').all();
  },
  addTodo(text) {
    return db.prepare('INSERT INTO todos (text) VALUES (?)').run(text);
  },
  deleteTodo(id) {
    return db.prepare('DELETE FROM todos WHERE id = ?').run(id);
  },
  updateTodo(id, text) {
    return db.prepare('UPDATE todos SET text = ? WHERE id = ?').run(text, id);
  }
};

```

#### 7.2 Add a router for CRUD

Create a **routes/todo.js**

```
const express = require('express');
const router = express.Router();
const store = require('../db');

// List
router.get('/', (req, res) => {
  const todos = store.allTodos();
  res.render('todos/index', { title: 'Todos', todos });
});

// Show edit form
router.get('/:id/edit', (req, res) => {
  const id = Number(req.params.id);
  const todo = store.allTodos().find(t => t.id === id);
  if (!todo) return res.redirect('/todos');
  res.render('todos/edit', { title: 'Edit Todo', todo });
});

// Update
router.post('/:id/edit', (req, res) => {
  const id = Number(req.params.id);
  const text = (req.body.text || '').trim();
  if (!Number.isNaN(id) && text) store.updateTodo(id, text);
  res.redirect('/todos');
});

// Create
router.post('/', (req, res) => {
  const text = (req.body.text || '').trim();
  if (text) store.addTodo(text);
  res.redirect('/todos');
});

// Delete
router.post('/:id/delete', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isNaN(id)) store.deleteTodo(id);
  res.redirect('/todos');
});

module.exports = router;
```



#### 7.3 Wire Router and Body Parsers 

Mount the router in app.js:

```
var todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);
```

That code imports the `todos` router and tells Express: *“For every request that starts with `/todos`, hand it off to the router defined in `routes/todos.js`.”*

#### 7.4 Create pug views for the todo list with bootstrap styling

Make a folder `views/todos/` and add views/todos/index.pug.

Include the code:

```
extends ../layout

block content
  .row.justify-content-center
    .col-md-8
      h2.mb-4 Todo List
      if todo
        form(action=`/todos/${todo.id}/edit` method="POST" class="input-group mb-4")
          input.form-control(type="text" name="text" value=todo.text required)
          button.btn.btn-success(type="submit") Update
          a.btn.btn-secondary.ms-2(href="/todos") Cancel
      else
        form(action="/todos" method="post" class="input-group mb-4")
          input.form-control(type="text" name="text" placeholder="What needs doing?" required)
          button.btn.btn-primary(type="submit") Add
      if todos.length
        ul.list-group
          each t in todos
            li.list-group-item.d-flex.justify-content-between.align-items-center
              span= t.text
              .btn-group
                a.btn.btn-sm.btn-warning(href=`/todos/${t.id}/edit`) Edit
                form(action=`/todos/${t.id}/delete` method="post" class="d-inline m-0 p-0")
                  button.btn.btn-sm.btn-danger(type="submit" onclick="return confirm('Delete this todo?')") Delete
      else
        div.alert.alert-info No todos yet. Add one above!
```

The code does the following:

- The form uses an input group and styled button.

- Todos are displayed in a Bootstrap list group.

- The layout is responsive and visually appealing.

- Alerts and spacing use Bootstrap utility classes.



#### 7.5 Output

This is how the **todos** page looks like:

![image-20250929002003183](.\public\images\setup4.png)

![image-20250929002124877](.\public\images\setup5.png)

#### 7.6 Summary

The setup here supports all CRUD operations for todos using SQLite:

- Create: Add new todos.

- Read: List all todos.

- Update: Edit existing todos (with an edit form and update route).

- Delete: Remove todos.





@Q.E.D.