const sideBar = document.querySelector('.sideBar');
const sideBardBtn = document.querySelector('.sideBardBtn');
const todoInput = document.querySelector('.todoInput');
const addBtn = document.querySelector('.addBtn');
const alert = document.querySelector('.alert');
let todoUl = document.querySelector('.todoList ul');
const editPopup = document.querySelector('.editPopup');
const confirmEdit = document.querySelector('.confirmEdit');
const cancelEdit = document.querySelector('.cancelEdit');
const editInput = document.querySelector('.editInput');
const popupAlert = document.querySelector('.popupAlert');
const todoSelect = document.querySelector('.todoSelect');
const editSelect = document.querySelector('.editSelect');

let $newTask;
let $idTask = 0;
let $editedTask;


function addNewTask() {
	if (todoInput.value !== '') {
		$idTask++;
		$newTask = document.createElement('li');
		$newTask.innerText = todoInput.value;
		if (todoSelect.value !== '') {
			$newTask.classList.add(todoSelect.value);
		}
		$newTask.setAttribute('id', `todo-${$idTask}`);

		if (todoSelect.value !== '') {
			const category = document.createElement('div');
			category.classList.add(todoSelect.value.toLowerCase());
			category.innerText = todoSelect.value;
			$newTask.appendChild(category);
		} else {
			const category = document.createElement('div');
			category.classList.add('none');
			category.innerText = '';
			$newTask.appendChild(category);
		}

		todoUl.appendChild($newTask);

		todoInput.value = '';
		alert.innerText = '';
		todoSelect.options[0].selected = 'selected';
		addToolsPanel();
	} else {
		alert.innerText = 'Add task content.';
	}
	localStorageTasks()
}

const checkClickSort = e => {
	const todoUlAll = document.querySelectorAll('.todoList ul li');
	let sortLi = e.target.closest('li').textContent;
	todoUlAll.forEach(element => {
		if (sortLi === 'ALL') {
			if (element.classList.contains('hideLi')) {
				element.classList.remove('hideLi');
			}
		} else if (element.classList.contains(sortLi)) {
			element.classList.remove('hideLi');
		} else {
			element.classList.add('hideLi');
		}
	});
};

const checkClick = e => {
	if (e.target.classList.value !== '') {
		if (e.target.closest('button').classList.contains('completeBtn')) {
			e.target.closest('li').classList.toggle('completed');
			e.target.closest('button').classList.toggle('completed');
		} else if (e.target.closest('button').classList.contains('editBtn')) {
			editTask(e);
		} else if (e.target.closest('button').classList.contains('deleteBtn')) {
			deleteTask(e);
		}
	}
	localStorageTasks()
};

const editTask = e => {
	const oldTask = e.target.closest('li').id;
	$editedTask = document.getElementById(oldTask);
	editInput.value = $editedTask.firstChild.textContent;
	editPopup.style.display = 'flex';
	localStorageTasks()
};

const changeTask = () => {
	function childEdit() {
		$editedTask.children[0].classList = '';
		$editedTask.children[0].classList = editSelect.value.toLowerCase();
		$editedTask.children[0].textContent = editSelect.value;
	}

	if (editInput.value !== '') {
		$editedTask.firstChild.textContent = editInput.value;
		popupAlert.innerText = '';
		editPopup.style.display = 'none';
		if ($editedTask.classList.contains('completed')) {
			if (editSelect.value !== '') {
				$editedTask.classList = '';
				$editedTask.classList = editSelect.value + ' completed';
				childEdit();
			}
		} else {
			if (editSelect.value !== '') {
				$editedTask.classList = '';
				$editedTask.classList = editSelect.value;
				childEdit();
			}
		}
	} else {
		popupAlert.innerText = 'You cant leave it blank';
	}
	localStorageTasks()
};

const deleteTask = e => {
	const deleteTaskx = e.target.closest('li');
	deleteTaskx.remove();
	if (todoUl.children.length === 0) {
		alert.innerText = 'No more tasks :)';
		$idTask = 0
	}
	localStorageTasks()
};

const enterCheck = () => {
	if (event.keyCode === 13) {
		addNewTask();
	}
};

function addToolsPanel() {
	const toolsPanel = document.createElement('div');
	toolsPanel.classList.add('tools');
	$newTask.appendChild(toolsPanel);

	const completeBtn = document.createElement('button');
	completeBtn.classList.add('completeBtn');
	completeBtn.innerHTML = '<i class="fa-solid fa-check">';

	const editBtn = document.createElement('button');
	editBtn.classList.add('editBtn');
	editBtn.innerText = 'EDIT';

	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('deleteBtn');
	deleteBtn.innerHTML = '<i class="fa-solid fa-trash">';

	toolsPanel.appendChild(completeBtn);
	toolsPanel.appendChild(editBtn);
	toolsPanel.appendChild(deleteBtn);
}

function showSideBar() {
	sideBar.classList.toggle('show');
	sideBar.classList.toggle('hide');
}

const localStorageTasks = () => {
	let taskContent = document.querySelector('.todoList ul').innerHTML;
	localStorage.setItem('taskId', $idTask);
	localStorage.setItem('taskContent', taskContent);
};

addBtn.addEventListener('click', () => {
	addNewTask();
});

cancelEdit.addEventListener('click', () => {
	editPopup.style.display = 'none';
	editInput.value = '';
});

window.onload = function(){
	document.querySelector(`.todoList ul`).innerHTML = localStorage.getItem('taskContent')
	$idTask = parseInt(localStorage.getItem('taskId'))

	if($idTask !== 0){
		alert.innerText = '';
	}else{
		alert.innerText = 'No more tasks :)';
	}
	todoUl = document.querySelector('.todoList ul');
}

sideBar.addEventListener('click', checkClickSort);
todoUl.addEventListener('click', checkClick);
confirmEdit.addEventListener('click', changeTask);
todoInput.addEventListener('keyup', enterCheck);
sideBardBtn.addEventListener('click', showSideBar);
