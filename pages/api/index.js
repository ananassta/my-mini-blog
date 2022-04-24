import matter from 'gray-matter'
import marked from 'marked'
import yaml from 'js-yaml'

export async function getAllPosts(){
    const fs = require("fs")
    const path = require("path");
    try {
        const arrayOfFiles = fs.readdirSync(path.resolve(__dirname, "../../../_posts"))
    const posts = []
    for (let i = 0; i < arrayOfFiles.length; i++) {
        
        const post = arrayOfFiles[i]

        const content = await import(`../../_posts/${post}`);
        const meta = matter(content.default)
        posts.push({
            slug: post.replace('.json',''),
            title: meta.title
        })
      }
    return posts;
    }
    catch {
        const arrayOfFiles = fs.readdirSync(path.resolve(__dirname, "../../../../_posts"))
    const posts = []
    for (let i = 0; i < arrayOfFiles.length; i++) {
        const post = arrayOfFiles[i]

        const content = await import(`../../_posts/${post}`);
        const meta = matter(content.default)
        posts.push({
            slug: post.replace('.json',''),
            title: meta.title
        })
      }
    return posts;
    }
}

export async function getPostBySlug(slug){
    const fileContent = await import(`../../_posts/${slug}.json`)
    const meta = matter(fileContent.default)
    const content = meta.content  
    return {
        title: meta.title,
        content: content,
        category: meta.category,
        tags: meta.tags
    }
}

export async function getAllCategories(){
    const fs = require("fs")
    const path = require("path");
    const arrayOfFiles = fs.readdirSync(path.resolve(__dirname, "../../../_posts"))
    let categories = []
    for (let i = 0; i < arrayOfFiles.length; i++) {
        const article  = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../_posts/" + arrayOfFiles[i]), 'utf8'));

        const category = article.category
        for (let j = 0; j < category.length; j++){
            if (categories.indexOf(category[j]) === -1) {
                categories.push(category[j])
            }
        }

    }

    let categ = []
    categories = categories.sort();
    for (let i = 0; i < categories.length; i++) {
        categ.push({
            category: categories[i],
            title: categories[i]
        })
    }
 
    return categ;
}

export async function getAllCategoriesForCategory(){
    const fs = require("fs")
    const path = require("path");
    const arrayOfFiles = fs.readdirSync(path.resolve(__dirname, "../../../../_posts"))

    let categories = []
    for (let i = 0; i < arrayOfFiles.length; i++) {

        const article  = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../../_posts/" + arrayOfFiles[i]), 'utf8'));

        const category = article.category

        for (let j = 0; j < category.length; j++){
            if (categories.indexOf(category[j]) === -1) {
                categories.push(category[j])
            }
        }

    }

    let categ = []
    categories = categories.sort();
    for (let i = 0; i < categories.length; i++) {
        categ.push({
            category: categories[i],
            title: categories[i]
        })
    }

    return categ;
}

export async function getAllPostsForCategory(category){

    const fs = require("fs")
    const path = require("path");
    try {
    const arrayOfFiles = fs.readdirSync(path.resolve(__dirname, "../../../../_posts"))

    const posts = []
    for (let i = 0; i < arrayOfFiles.length; i++) {
        const article  = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../../_posts/" + arrayOfFiles[i]), 'utf8'));

        const post = arrayOfFiles[i]

        const categ = article.category
        for (let j = 0; j < categ.length; j++){
            if (categ[j] === category) {
                posts.push({
                    slug: post.replace('.json',''),
                    title: article.title
                })
            }
        }
    }
    
    return posts;
    }
    catch {
        const arrayOfFiles = fs.readdirSync(path.resolve(__dirname, "../../../_posts"))
     
        const posts = []
        
        for (let i = 0; i < arrayOfFiles.length; i++) {
            const article  = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../_posts/" + arrayOfFiles[i]), 'utf8'));
    
            const post = arrayOfFiles[i]
    
            const categ = article.category
            for (let j = 0; j < categ.length; j++){
                if (categ[j] === category) {
                    posts.push({
                        slug: post.replace('.json',''),
                        title: article.title
                    })
                }
            }
        }
        
        return posts;
    }

}

export async function getAllTags(){
    const fs = require("fs")
    const path = require("path");
    const arrayOfFiles = fs.readdirSync(path.resolve(__dirname, "../../../_posts"))

    let tags = []
    for (let i = 0; i < arrayOfFiles.length; i++) {

        const article  = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../_posts/" + arrayOfFiles[i]), 'utf8'));

        const tag = article.tags
        for (let j = 0; j < tag.length; j++){
            if (tags.indexOf(tag[j]) === -1) {
                tags.push(tag[j])
            }
        }
    }
    let all_tags = []
    tags = tags.sort();
    for (let i = 0; i < tags.length; i++) {
        all_tags.push({
            tag: tags[i],
            title: tags[i]
        })
    }
    return all_tags;
}

export async function getAllTagsForTag(){
    const fs = require("fs")
    const path = require("path");
    const arrayOfFiles = fs.readdirSync(path.resolve(__dirname, "../../../../_posts"))

    let tags = []
    for (let i = 0; i < arrayOfFiles.length; i++) {

        const article  = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../../_posts/" + arrayOfFiles[i]), 'utf8'));

        const tag = article.tags
        for (let j = 0; j < tag.length; j++){
            if (tags.indexOf(tag[j]) === -1) {
                tags.push(tag[j])
            }
        }

    }
    let all_tags = []
    tags = tags.sort();
    for (let i = 0; i < tags.length; i++) {
        all_tags.push({
            tag: tags[i],
            title: tags[i]
        })
    }
    return all_tags;
}

export async function getAllPostsForTag(tag){

    const fs = require("fs")
    const path = require("path");
    try {
    const arrayOfFiles = fs.readdirSync(path.resolve(__dirname, "../../../../_posts"))
 
    const posts = []
    for (let i = 0; i < arrayOfFiles.length; i++) {
        const article  = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../../_posts/" + arrayOfFiles[i]), 'utf8'));

        const post = arrayOfFiles[i]

        const tages = article.tags
        for (let j = 0; j < tages.length; j++){
            if (tages[j] === tag) {
                posts.push({
                    slug: post.replace('.json',''),
                    title: article.title
                })
            }
        }
    }
    
    return posts;
    }
    catch {
        const arrayOfFiles = fs.readdirSync(path.resolve(__dirname, "../../../_posts"))
        
        const posts = []
        for (let i = 0; i < arrayOfFiles.length; i++) {
            const article  = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../_posts/" + arrayOfFiles[i]), 'utf8'));
    
            const post = arrayOfFiles[i]
    
            const tages = article.tags
            for (let j = 0; j < tages.length; j++){
                if (tages[j] === tag) {
                    posts.push({
                        slug: post.replace('.json',''),
                        title: article.title
                    })
                }
            }
        }
        
        return posts;
    }

}

export async function getConfig(){
    const fs = require('fs'); 
    const path = require("path");
    try {
        let config = fs.readFileSync(path.resolve(__dirname, "../../../config.yaml"), 'utf8');
        return yaml.load(config)
    }
    catch {
        let config = fs.readFileSync(path.resolve(__dirname, "../../../../config.yaml"), 'utf8');
        return yaml.load(config)
    };
    
}

export async function getConfigForCategory(){
    const fs = require('fs'); 
    const path = require("path");
    try { let config = fs.readFileSync(path.resolve(__dirname, "../../../../config.yaml"), 'utf8'); return yaml.load(config) }
    catch{
    let config = fs.readFileSync(path.resolve(__dirname, "../../../config.yaml"), 'utf8');
    return yaml.load(config)
    };
}
