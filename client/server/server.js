const express = require('express')
const cors = require('cors')
const fs = require('fs/promises')
const app = express()
const PORT = process.env.PORT || 3000;
const recipesFilePath = './recipes.json'
const users = [
  { id: 1, username: 'admin', password: 'admin' }
]

app.use(cors())
app.use(express.json())

let recipes = []

async function loadRecipes() {
  try {
    const data = await fs.readFile(recipesFilePath)
    recipes = JSON.parse(data)
  } catch (error) {
    console.error('Error loading recipes:', error.message)
  }
}

async function saveRecipes() {
  try {
    await fs.writeFile(recipesFilePath, JSON.stringify(recipes, null, 2))
  } catch (error) {
    console.error('Error saving recipes:', error.message)
  }
}

// Routes

app.get('/recipes', (req, res) => {
  res.json(recipes)
})

app.post('/recipes', (req, res) => {
  const newRecipe = req.body
  recipes.push(newRecipe)
  saveRecipes()
  res.status(201).json(newRecipe)
})

app.get('/recipes', (req, res) => {
  const { search } = req.query

  if (!search) {
    return res.json(recipes)
  }

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  res.json(filteredRecipes)
})

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password)

  if (user) {
    res.json({ success: true, message: 'Sikeres bejelentkezés!' })
  } else {
    res.status(401).json({ success: false, message: 'Hibás felhasználónév vagy jelszó!' })
  }
})

app.listen(PORT, async () => {
  await loadRecipes()
  console.log(`Server is running on port ${PORT}`)
})
