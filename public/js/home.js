const greeting=document.querySelector('.greeting');

window.onload=()=>{
    if(!sessionStorage.name){
        location.href='/login';
    }else{
        greeting.innerHTML=`hello ${sessionStorage.name}`;
    }
}

const logOut=document.querySelector('.logout');

logOut.onclick=()=>{
    sessionStorage.clear();
    location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    const userGrid = document.getElementById('userGrid');
    const userGridContainer=document.getElementById('userGridContainer');

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            const users = await response.json();
            renderUsers(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const renderUsers = (users) => {
        userGrid.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td contenteditable="true" data-field="name">${user.name}</td>
                <td contenteditable="true" data-field="email">${user.email}</td>
                <td data-field="password">${user.password}</td>
                <td>
                <button onclick="updateUser(${user.id}, this)">Update</button>
                <button onclick="deleteUser(${user.id}, this)">Delete</button>
                </td>
            `;
            userGrid.appendChild(row);
        });
    };

    window.updateUser = async (id, button) => {
        const row = button.parentNode.parentNode;
        const name = row.querySelector('[data-field="name"]').innerText;
        const email = row.querySelector('[data-field="email"]').innerText;
        // const password = row.querySelector('[data-field="password"]').innerText;

        try {
            const response = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email})
            });
            const result = await response.json();
            if (response.ok) {
                alert('User updated successfully');
            } else {
                alert(`Error: ${result}`);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user');
        }
    };
    window.deleteUser=async(id,button)=>{
        try{
            const response=await fetch(`/api/users/${id}`,{
                method:'DELETE'
            });
            const result= await response.json();
            if(response.ok){
                alert('User deleted successfully');
                const row = button.parentNode.parentNode;
                row.remove();
            }
            else{
                alert(`Error:${result}`);
            }
        }catch(error){
            console.error('Error deleting user:',error);
            alert('Error deleting user');
        }
    };
    window.toggleUserGrid = () => {
        if (userGridContainer.style.display === 'none' || userGridContainer.style.display === '') {
            userGridContainer.style.display = 'block';
            fetchUsers();
            greeting.classList.add('up');
            Show.innerHTML="Hide User Grid";
        } else {
            userGridContainer.style.display = 'none';
            Show.innerHTML="Show User Grid";
            greeting.classList.remove('up');
        }
    };

    fetchUsers();
});