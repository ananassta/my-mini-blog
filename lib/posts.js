import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), '_posts')

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.json$/, '')

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = JSON.parse(fs.readFileSync(fullPath, 'utf8'))
    const title = fileContents.title

    return {
      slug,
      title
    }
  })
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.json$/, '')
      }
    }
  })
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.json`)
  const fileContents = JSON.parse(fs.readFileSync(fullPath, 'utf8'))
    const title = fileContents.title
    const processedContent = fileContents.content
  const contentHtml = processedContent.toString()

  return {
    slug,
    contentHtml,
    title
  }
}
