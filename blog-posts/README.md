# Blog Posts - How to Use

This folder contains all your blog posts in Markdown format. You can easily add, edit, or remove blog posts by managing the `.md` files in this directory.

## File Structure

Each blog post is a separate `.md` (Markdown) file with:
- **Frontmatter** - Metadata at the top of the file
- **Content** - The actual blog post content in Markdown format

## Creating a New Blog Post

1. Create a new `.md` file in this folder (e.g., `my-new-post.md`)
2. Add frontmatter at the top of the file
3. Write your content using Markdown syntax
4. Register the post in `/js/blog-loader.js`

### Example Blog Post

```markdown
---
title: My Awesome Blog Post
date: 2026-02-16
featured: false
image: /assets/imgs/my-post-image.jpg
excerpt: A short description of what this post is about. This will appear on the blog listing page.
category: Development
---

# My Awesome Blog Post

This is the main content of your blog post. You can use all standard Markdown syntax.

## Subheading

- Bullet points
- More bullet points

### Another Subheading

**Bold text** and *italic text* are supported.

You can add [links](https://example.com) and more!
```

## Frontmatter Fields

- **title** (required) - The title of your blog post
- **date** (required) - Publication date in YYYY-MM-DD format
- **featured** (optional) - Set to `true` to feature this post at the top
- **image** (optional) - Path to the header image
- **excerpt** (required) - Short description (150-200 characters)
- **category** (optional) - Category tag (Design, Development, Technology, etc.)

## Registering Your Post

After creating a new blog post file, you need to register it in the blog loader:

1. Open `/js/blog-loader.js`
2. Find the `blogPosts` array in the constructor
3. Add your new filename to the array:

```javascript
this.blogPosts = [
  'ui-ux-design.md',
  'web-development.md',
  'webassembly-future.md',
  'fullstack-solutions.md',
  'accessible-interfaces.md',
  'my-new-post.md'  // Add your new post here
];
```

## Markdown Syntax Reference

### Headers
```markdown
# H1 Header
## H2 Header
### H3 Header
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
```

### Lists
```markdown
- Unordered list item
- Another item

1. Ordered list item
2. Another item
```

### Links
```markdown
[Link text](https://example.com)
```

### Images
```markdown
![Alt text](/path/to/image.jpg)
```

### Blockquotes
```markdown
> This is a quote
```

### Code
```markdown
Inline `code` goes here

\`\`\`javascript
// Code block
function hello() {
  console.log("Hello!");
}
\`\`\`
```

## Editing Existing Posts

Simply open any `.md` file in this folder, make your changes, and save. The blog will automatically reflect your updates when the page is refreshed.

## Deleting Posts

1. Delete the `.md` file from this folder
2. Remove the filename from the `blogPosts` array in `/js/blog-loader.js`

## Tips

- Keep excerpt short and engaging (aim for 150-200 characters)
- Use descriptive filenames (lowercase, hyphen-separated)
- Always include a title, date, and excerpt in frontmatter
- Featured posts appear in the highlighted section on the blog page
- Only one post should be featured at a time for best results
- Images should be placed in `/assets/imgs/` folder
- Test your post by opening the blog page in a browser

## File Naming Convention

Use lowercase letters, numbers, and hyphens:
- ✅ `my-blog-post.md`
- ✅ `webassembly-tutorial.md`
- ❌ `My Blog Post.md`
- ❌ `BlogPost_2024.md`

---

Happy blogging!
