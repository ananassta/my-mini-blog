const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

function postData() {
  const postsDirectory = path.join(process.cwd(), '_posts')
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames.map(fileName => {
    const id = fileName.replace(/\.json$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = JSON.parse(fs.readFileSync(fullPath, 'utf8'))
    return {
      slug: id,
    title: fileContents.title
    }
  })
  return `export const posts = ${JSON.stringify(posts)}`
}

try {
  fs.readdirSync('../cache')
} catch (e) {
  fs.mkdirSync('../cache')
}

fs.writeFile('../cache/data.js', postData(), function (err) {
  if (err) return console.log(err);
  console.log('Posts cached.');
})
