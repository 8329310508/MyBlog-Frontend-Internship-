async function registerUser(e){
  e.preventDefault();
  const name=document.getElementById('name').value;
  const email=document.getElementById('email').value;
  const password=document.getElementById('password').value;
  try{
    const response=await
    fetch('http://localhost:3000/api/register',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name:name,
        email:email,
        password:password
      })
    });
    const data=await response.json();
    if(response.ok){
      alert('Registration successfully ! Please login.');
      location.href='login.html';
    } else{
      alert(data.message ||'Registration failed');
    } 
  }catch(error){
    console.error(error);
    alert('Server connection failed');
  }
}
async function loginUser(e){
  e.preventDefault();
  const email=document.getElementById('loginEmail').value;
  const password=document.getElementById('loginPassword').value;
  try{
    const response=await
    fetch('http://localhost:3000/api/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    });
    const data=await response.json();
    if(response.ok){
      localStorage.setItem('token',data.token);
      alert('Login Successfully!');
      location.href='dashboard.html';
    }else{
      alert(data.message || 'Login failed');
    }
  }
  catch(error){
    console.error(error);
    alert('Server connection failed');
  }
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