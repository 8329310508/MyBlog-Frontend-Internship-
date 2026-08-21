function registerUser(e){
  e.preventDefault();
  const name=document.getElementById('name').value;
  localStorage.setItem('blogUser',name);
  alert('Registration successful! Please login.');
  location.href='login.html';
}
function loginUser(e){
  e.preventDefault();
  alert('Login successful!');
  location.href='dashboard.html';
}
function createPost(e){
  e.preventDefault();
  const title=document.getElementById('title').value;
  const category=document.getElementById('category').value;
  const content=document.getElementById('content').value;
  const posts=JSON.parse(localStorage.getItem('posts')||'[]');
  posts.unshift({title,category,content});
  localStorage.setItem('posts',JSON.stringify(posts));
  e.target.reset();
  renderPosts();
  alert('Blog published successfully!');
}
function renderPosts(){
  const box=document.getElementById('posts');
  if(!box)return;
  const posts=JSON.parse(localStorage.getItem('posts')||'[]');
  box.innerHTML=posts.length?posts.map(p=>`<article class="card"><h3>${p.title}</h3><p>${p.content}</p><span>${p.category}</span></article>`).join(''):'<p>No blogs yet. Create your first blog below.</p>';
}
document.addEventListener('DOMContentLoaded',renderPosts);