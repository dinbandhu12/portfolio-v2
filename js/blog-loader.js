// Blog Post Loader - Loads and renders markdown blog posts

class BlogLoader {
  constructor() {
    this.blogPosts = [
      'ai-software-development.md',
      'indian-job-market-analysis.md',
      'india-education-global-standards.md',
      'grad-odyssey-software-engineering.md',
      'first-job-india-challenges.md'
    ];
    this.postsData = [];
  }

  // Parse frontmatter from markdown
  parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
      return { frontmatter: {}, content: content };
    }

    const frontmatterText = match[1];
    const markdownContent = match[2];

    const frontmatter = {};
    frontmatterText.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim();
        frontmatter[key.trim()] = value;
      }
    });

    return { frontmatter, content: markdownContent };
  }

  // Simple markdown to HTML converter (basic implementation)
  markdownToHtml(markdown) {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Images (must come before links to avoid conflicts)
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="blog-content-image">');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');

    // Lists
    html = html.replace(/^\d+\.\s+(.*)$/gim, '<li>$1</li>');
    html = html.replace(/^[\*\-]\s+(.*)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Wrap in paragraphs
    html = '<p>' + html + '</p>';

    // Clean up
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6]>)/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    html = html.replace(/<p>(<ul>)/g, '$1');
    html = html.replace(/(<\/ul>)<\/p>/g, '$1');

    return html;
  }

  // Load a single blog post
  async loadPost(filename) {
    try {
      const response = await fetch(`/blog-posts/${filename}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${filename}`);
      }

      const content = await response.text();
      const { frontmatter, content: markdownContent } = this.parseFrontmatter(content);

      // Extract excerpt from content if not provided
      if (!frontmatter.excerpt) {
        const firstParagraph = markdownContent.split('\n\n')[1] || '';
        frontmatter.excerpt = firstParagraph.substring(0, 150) + '...';
      }

      return {
        filename: filename.replace('.md', ''),
        ...frontmatter,
        content: markdownContent,
        htmlContent: this.markdownToHtml(markdownContent)
      };
    } catch (error) {
      console.error(`Error loading post ${filename}:`, error);
      return null;
    }
  }

  // Load all blog posts
  async loadAllPosts() {
    const posts = await Promise.all(
      this.blogPosts.map(filename => this.loadPost(filename))
    );

    this.postsData = posts.filter(post => post !== null);

    // Sort by date (newest first)
    this.postsData.sort((a, b) => new Date(b.date) - new Date(a.date));

    return this.postsData;
  }

  // Render blog posts on the page
  async renderBlogPosts() {
    await this.loadAllPosts();

    const featuredPost = this.postsData.find(post => post.featured === 'true');
    const regularPosts = this.postsData.filter(post => post.featured !== 'true');

    // Render featured post (block 2)
    if (featuredPost) {
      this.renderFeaturedPost(featuredPost);
    }

    // Render regular posts (blocks 3 and 4)
    this.renderRegularPosts(regularPosts);
  }

  // Render the featured post
  renderFeaturedPost(post) {
    const block2Content = document.querySelector('.blog-block-2-content-text');
    if (block2Content) {
      block2Content.innerHTML = `
        <h4 class="blog-block-2-featured">FEATURED POST</h4>
        <h2 class="blog-block-2-heading">${post.title}</h2>
        <p class="blog-block-2-para">
          ${post.excerpt}
          <br>
          <a href="/pages/blog-post.html?post=${post.filename}" class="read-more-link">
            Read More
            <i class="ri-arrow-right-long-line"></i>
          </a>
        </p>
      `;
    }

    // Update image if provided
    const block2Image = document.querySelector('.blog-block-2-content img');
    if (block2Image && post.image) {
      block2Image.src = post.image;
      block2Image.alt = post.title;
    }
  }

  // Render regular blog posts
  renderRegularPosts(posts) {
    // Render first two posts in block 3
    if (posts.length >= 1) {
      const block3_1 = document.querySelector('.blog-block-3-1-content-text');
      if (block3_1) {
        const post = posts[0];
        block3_1.innerHTML = `
          <h2 class="blog-block-3-1-heading">${post.title.replace(' ', ' <br /> ')}</h2>
          <p class="blog-block-3-1-para">
            ${post.excerpt}
            <br>
            <a href="/pages/blog-post.html?post=${post.filename}" class="read-more-link">
              Read More
              <i class="ri-arrow-right-long-line"></i>
            </a>
          </p>
        `;
      }
    }

    if (posts.length >= 2) {
      const block3_2 = document.querySelector('.blog-block-3-2-content-text');
      if (block3_2) {
        const post = posts[1];
        block3_2.innerHTML = `
          <h2 class="blog-block-3-2-heading">${post.title.replace(' ', ' <br /> ')}</h2>
          <p class="blog-block-3-2-para">
            ${post.excerpt}
            <br>
            <a href="/pages/blog-post.html?post=${post.filename}" class="read-more-link">
              Read More
              <i class="ri-arrow-right-long-line"></i>
            </a>
          </p>
        `;
      }
    }

    // Render next two posts in block 4
    if (posts.length >= 3) {
      const block4_1 = document.querySelector('.blog-block-4-1-content-text');
      if (block4_1) {
        const post = posts[2];
        block4_1.innerHTML = `
          <h2 class="blog-block-4-1-heading">${post.title}</h2>
          <p class="blog-block-4-1-para">
            ${post.excerpt}
            <br>
            <a href="/pages/blog-post.html?post=${post.filename}" class="read-more-link">
              Read More
              <i class="ri-arrow-right-long-line"></i>
            </a>
          </p>
        `;
      }
    }

    if (posts.length >= 4) {
      const block4_2 = document.querySelector('.blog-block-4-2-content-text');
      if (block4_2) {
        const post = posts[3];
        block4_2.innerHTML = `
          <h2 class="blog-block-4-2-heading">${post.title.replace(' ', ' <br> ')}</h2>
          <p class="blog-block-4-2-para">
            ${post.excerpt}
            <br>
            <a href="/pages/blog-post.html?post=${post.filename}" class="read-more-link">
              Read More
              <i class="ri-arrow-right-long-line"></i>
            </a>
          </p>
        `;
      }
    }
  }

  // Get a single post by filename
  async getPost(filename) {
    if (this.postsData.length === 0) {
      await this.loadAllPosts();
    }

    return this.postsData.find(post => post.filename === filename);
  }
}

// Initialize blog loader when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlog);
} else {
  initBlog();
}

function initBlog() {
  const blogLoader = new BlogLoader();

  // If we're on the blog listing page
  if (document.querySelector('.blog-section')) {
    blogLoader.renderBlogPosts();
  }

  // If we're on a blog post page
  if (document.querySelector('.blog-post-container')) {
    const urlParams = new URLSearchParams(window.location.search);
    const postFilename = urlParams.get('post');

    if (postFilename) {
      blogLoader.getPost(postFilename).then(post => {
        if (post) {
          renderBlogPost(post);
          // Render recent posts in sidebar
          renderRecentPosts(blogLoader, postFilename);
          // Update left sidebar with current and next blog
          updateLeftSidebar(blogLoader, post);
        }
      });
    }
  }
}

// Render individual blog post
function renderBlogPost(post) {
  document.title = `${post.title} | DBS World Portfolio`;

  const container = document.querySelector('.blog-post-container');
  if (container) {
    const currentUrl = encodeURIComponent(window.location.href);
    const postTitle = encodeURIComponent(post.title);

    container.innerHTML = `
      <article class="blog-post">
        <header class="blog-post-header">
          <div class="blog-post-meta">
            <span class="blog-post-date">${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            ${post.category ? `<span class="blog-post-category">${post.category}</span>` : ''}
          </div>
          <h1 class="blog-post-title">${post.title}</h1>
        </header>
        ${post.image ? `<img src="${post.image}" alt="${post.title}" class="blog-post-image">` : ''}
        <div class="blog-post-content">
          ${post.htmlContent}
        </div>
        <footer class="blog-post-footer">
          <div class="share-section">
            <h3 class="share-title">SHARE THIS POST</h3>
            <div class="share-buttons">
              <a href="https://twitter.com/intent/tweet?url=${currentUrl}&text=${postTitle}" target="_blank" rel="noopener" class="share-btn share-twitter" title="Share on Twitter">
                <i class="ri-twitter-x-fill"></i>
              </a>
              <a href="https://www.facebook.com/sharer/sharer.php?u=${currentUrl}" target="_blank" rel="noopener" class="share-btn share-facebook" title="Share on Facebook">
                <i class="ri-facebook-fill"></i>
              </a>
              <a href="https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}" target="_blank" rel="noopener" class="share-btn share-linkedin" title="Share on LinkedIn">
                <i class="ri-linkedin-fill"></i>
              </a>
              <a href="mailto:?subject=${postTitle}&body=Check out this blog post: ${currentUrl}" class="share-btn share-email" title="Share via Email">
                <i class="ri-mail-fill"></i>
              </a>
              <button onclick="navigator.clipboard.writeText('${window.location.href}'); alert('Link copied to clipboard!');" class="share-btn share-copy" title="Copy Link">
                <i class="ri-link"></i>
              </button>
            </div>
          </div>
          <a href="/pages/blog.html" class="back-to-blog">
            <i class="ri-arrow-left-line"></i> Back to Blog
          </a>
        </footer>
      </article>
    `;
  }
}

// Update left sidebar with current blog title and next blog post
async function updateLeftSidebar(blogLoader, currentPost) {
  await blogLoader.loadAllPosts();

  // Update current blog title
  const currentBlogTitle = document.getElementById('currentBlogTitle');
  if (currentBlogTitle) {
    currentBlogTitle.innerHTML = currentPost.title.toUpperCase().replace(' ', '<br>');
  }

  // Find next blog post (the one after current in the list)
  const currentIndex = blogLoader.postsData.findIndex(post => post.filename === currentPost.filename);
  const nextPost = blogLoader.postsData[currentIndex + 1] || blogLoader.postsData[0]; // Loop to first if at end

  // Update next blog section
  const nextBlogSection = document.getElementById('nextBlogSection');
  if (nextBlogSection && nextPost) {
    nextBlogSection.innerHTML = `
      <h3 class="sidebar-heading">${nextPost.title.toUpperCase().replace(' ', '<br>')}</h3>
      <p class="sidebar-text">
        ${nextPost.excerpt.substring(0, 120)}...
      </p>
      <a href="/pages/blog-post.html?post=${nextPost.filename}" class="next-post-link">
        Read Next <i class="ri-arrow-right-line"></i>
      </a>
    `;
  }
}

// Render recent posts in sidebar
async function renderRecentPosts(blogLoader, currentPostFilename) {
  await blogLoader.loadAllPosts();

  const recentPostsList = document.getElementById('recentPostsList');
  if (!recentPostsList) return;

  // Get all posts except the current one
  const otherPosts = blogLoader.postsData
    .filter(post => post.filename !== currentPostFilename)
    .slice(0, 4); // Show only 4 recent posts

  if (otherPosts.length === 0) {
    recentPostsList.innerHTML = '<li class="recent-post-item">No other posts available</li>';
    return;
  }

  recentPostsList.innerHTML = otherPosts.map(post => `
    <li class="recent-post-item">
      <a href="/pages/blog-post.html?post=${post.filename}" class="recent-post-link">
        ${post.title}
      </a>
      <span class="recent-post-date">${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
    </li>
  `).join('');
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BlogLoader;
}
