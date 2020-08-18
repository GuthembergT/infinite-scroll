const postsContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;
let isLoading = false;

// Fetch posts fom API
async function getPosts() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

  const data = await res.json();

  return data;
}


// Show posts in DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>
    `;

    postsContainer.appendChild(postEl);
  })
}

// Show loader and fetch more posts
async function showLoading() {

  if (isLoading) {
    return;
  }

  page++;
  isLoading = true;
  loading.classList.add('show');

  await showPosts();

  isLoading = false;
  loading.classList.remove('show');

}

// Show initial posts
showPosts();

window.addEventListener('scroll', () => {
  const {
    scrollTop,
    scrollHeight,
    clientHeight
  } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    showLoading();
    console.log('bottom reached!');
  }
})