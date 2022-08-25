async function logout() {
  console.log('logout clicked1')

  const response = await fetch('./api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  });

  console.log(response, 'response in logout');

  if (response.ok) {
  console.log('logout clicked2 , in response ok')
  document.location.replace('/');

  } else {
    alert(response.statusText);
  }
}

document.querySelector('#logoutBtn').addEventListener('click', logout);