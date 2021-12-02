(() => {

	//Создание тайтла сайта 
	function createTitleOfToDoList (title) {
		const titleH1 = document.createElement('h2');
		titleH1.textContent = title;
		titleH1.classList.add('title');
		return titleH1;
	}

	function createFormOfToDoList () {
		const form = document.createElement('form');
		const input = document.createElement('input');
		const btnNewItem = document.createElement('button');
		form.classList.add('form');
		input.placeholder = "Купить хлеб";
		input.classList.add('input');
		btnNewItem.innerHTML = "Добавить";
		btnNewItem.classList.add('btnNewItem');
		form.append(input);
		form.append(btnNewItem);
		return {form, input, btnNewItem}
	}

	function createToDoList () {
		const list = document.createElement('ul');
		list.classList.add('list');
		return list;
	}

	function createEditForm(lastText) {
		const btnEdit = document.createElement('button');
		const btnEditImg = document.createElement('img');
		const editForm = document.createElement('form');
		const editInput = document.createElement('input');
		btnEditImg.src = "../IMG/edit.png";
		btnEditImg.alt = "Редартировать";
		btnEdit.classList.add('btnEdit');
		editForm.classList.add('editForm');
		editInput.classList.add('editInput');
		btnEditImg.classList.add('btnEditImg');
		editForm.prepend(editInput);
		btnEdit.prepend(btnEditImg);
		return {btnEdit, editForm, editInput}
	}

	function createListItem(itemEvent) {
		let isComplete = false;

		const liItem = document.createElement('li');
		const liText = document.createElement('p');
		const btnWrapper = document.createElement('div');
		const btnComplete = document.createElement('button');
		const btnRemove = document.createElement('button');
		
		let editBlock = createEditForm(liText.textContent);

		btnComplete.innerHTML = 'Выполнено';
		btnRemove.innerHTML = 'Удалить';
		
		liText.classList.add('liText');
		btnComplete.classList.add('btnComplete');
		btnRemove.classList.add('btnRemove');
		btnWrapper.classList.add('btnWrapper');
		
		
		btnWrapper.append(editBlock.btnEdit);
		btnWrapper.append(btnComplete);
		btnWrapper.append(btnRemove);

		btnComplete.addEventListener('click', () => {
			liText.classList.toggle('complete');
			liItem.classList.toggle('complete');
			isComplete = !isComplete;
			btnComplete.innerHTML = isComplete ? 'Не выполнено' : 'Выполнено';
		})
		btnRemove.addEventListener('click', () => {
			liItem.remove();
		})
		editBlock.btnEdit.addEventListener('click', () => {
			liItem.append(editBlock.editForm);
			editBlock.editInput.value = liText.textContent;
			editBlock.btnEdit.remove();
			editBlock.editForm.addEventListener('submit', event => {
				btnWrapper.prepend(editBlock.btnEdit);
				event.preventDefault();
				liText.textContent = editBlock.editInput.value;
				editBlock.editForm.remove();
			})
		})

		liText.textContent = itemEvent;
		liItem.classList.add('item');
		liItem.prepend(liText);
		liItem.prepend(btnWrapper);
		
		return {liItem, btnComplete, btnRemove};
	}

	

	document.addEventListener('DOMContentLoaded', () => {	
		const App = document.getElementById('app');
		let todoTitle = createTitleOfToDoList('Список дел');
		let todoForm = createFormOfToDoList();
		let todoList = createToDoList();
		const container = document.createElement('div');

		container.classList.add('_container');
		container.append(todoTitle);
		container.append(todoForm.form);
		container.append(todoList);
		App.append(container);

		todoForm.form.addEventListener('submit', event => {
			event.preventDefault();
			if(todoForm.input.value.trim()) {
				let item = createListItem(todoForm.input.value);
				todoList.append(item.liItem);
			}
			todoForm.input.value = '';
		});

	});

})();