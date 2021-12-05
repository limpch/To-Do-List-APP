(() => {
	let colorIs;
	let isHide = false;

	function createHeaderOfToDoList (titleText, fullList) {
		const headerBlock = document.createElement('div');
		const headerTitle = document.createElement('input');
		const deleteList = document.createElement('img');
		headerBlock.classList.add('header-block');
		headerTitle.classList.add('header-title');
		headerBlock.classList.add(`${colorIs + "-htb-bg"}`);
		headerTitle.classList.add(`${colorIs + "-htb-bg"}`);
		deleteList.classList.add('delete-list');

		headerTitle.placeholder = titleText;
		deleteList.alt = "Закрыть";
		deleteList.src = "IMG/ICONS/deleteList.png"
		headerTitle.setAttribute('maxlength', '25');
		headerTitle.setAttribute('autocomplete', 'off');
		headerTitle.setAttribute('spellcheck', 'false');
		headerBlock.prepend(headerTitle);
		headerBlock.append(deleteList);

		deleteList.addEventListener('click', () => {
			fullList.remove();
		});

		return headerBlock;
	}
	function createToDoList () {
		const listWrapper = document.createElement('div');
		const list = document.createElement('ul');
		listWrapper.classList.add('list-wrapper');
		listWrapper.classList.add(`${colorIs + '-text-color-bg'}`);
		list.classList.add('list');
		listWrapper.prepend(list);
		return {listWrapper, list};
	}
	function creacteCheckbox (itemText, FullItem) {
		let checkbox = document.createElement('div');
		checkbox.classList.add('checkbox');
		checkbox.addEventListener('click', () => {
			checkbox.classList.toggle('complete');
			itemText.classList.toggle('complete');
			FullItem.classList.toggle('completeFullItem');
			if(isHide)
				document.querySelectorAll('.completeFullItem').forEach(item => {item.classList.add('hide')});
		});
		return checkbox;
	}
	function createListItem(color) {
		const item = document.createElement('li');
		const rightBlock = document.createElement('div');
		const removeBtn = document.createElement('button');
		const removeBtnImg = document.createElement('img');

		const leftBlock = document.createElement('div');
		const itemText = document.createElement('input');
		const checkbox = creacteCheckbox(itemText, item);

		item.classList.add('item');
		rightBlock.classList.add('right-block');
		removeBtn.classList.add('remove-btn');
		removeBtnImg.classList.add('remove-btn-img');
		leftBlock.classList.add('left-block');
		itemText.classList.add('item-text');
		itemText.classList.add(`${color}-text-color-bg`);

		itemText.placeholder = "новая заметка...";
		removeBtnImg.src = "IMG/ICONS/remove.png";
		removeBtnImg.alt = "Удалить";

		removeBtnImg.addEventListener('click', () => {
			item.remove();
		});

		removeBtn.append(removeBtnImg);
		rightBlock.append(removeBtn);
		leftBlock.append(checkbox);
		leftBlock.append(itemText);
		item.append(leftBlock);
		item.append(rightBlock);
		return item;
	}
	function creacteAddBtn (listElement) {
		let addBtn = document.createElement('button');
		addBtn.classList.add('add-btn');
		addBtn.classList.add(`${colorIs + "-htb-bg"}`);
		addBtn.dataset.color = colorIs;
		addBtn.innerHTML = "+Добавить";
		addBtn.addEventListener('click', () => {
			listElement.listWrapper.append(createListItem(addBtn.dataset.color));
		});
		return addBtn;
	}
	function createTable(color) {
		colorIs = color;
		const todosBlock = document.getElementById('todos');
		const listElement = createToDoList();
		const fullListBlock = document.createElement('div');
		const headerElement = createHeaderOfToDoList('Название...', fullListBlock);

		fullListBlock.classList.add('full-list-block');

		fullListBlock.append(headerElement);
		fullListBlock.append(listElement.listWrapper);
		listElement.listWrapper.append(createListItem(color));
		fullListBlock.append(creacteAddBtn(listElement));
		todosBlock.append(fullListBlock);
	}
	function createPickColorItem(colorClass, text, pickColor) {
		const pickColorList = document.createElement('li');
		pickColorList.classList.add(colorClass);
		pickColorList.classList.add('circleItem');
		pickColorList.innerHTML = `${text}`;
		pickColorList.addEventListener('click', () => {
			createTable(colorClass);
			pickColor.classList.add('isHidden');
		});
		return pickColorList;
	}
	function createBottomMainHeader() {
		const pickColor = document.createElement('div');
		const hideCmpltElements = document.createElement('div');
		const hideCmpltElementsCheckbox = document.createElement('div');
		const hideCmpltElementsText = document.createElement('p');
		const pickColorList = document.createElement('ul');
		const pickColorItemRed = createPickColorItem('red','важное', pickColor);
		const pickColorItemYellow = createPickColorItem('yellow','работа', pickColor);
		const pickColorItemGreen = createPickColorItem('green','учеба', pickColor);
		const pickColorItemBlue = createPickColorItem('blue','дом', pickColor);
		const pickColorItemPurple = createPickColorItem('purple','развлечения', pickColor);
		
		pickColor.classList.add('pick-color');
		pickColor.classList.add('isHidden');
		pickColorList.classList.add('pickColor-list');
		hideCmpltElements.classList.add('hide-cmplt-elements');
		hideCmpltElementsCheckbox.classList.add('hide-cmplt-elements-checkbox');
		hideCmpltElementsText.classList.add('hide-cmplt-elements-text');

		hideCmpltElementsText.innerHTML = "спрятать выполненные дела";

		hideCmpltElements.append(hideCmpltElementsCheckbox);
		hideCmpltElements.append(hideCmpltElementsText);
		pickColorList.append(pickColorItemRed);
		pickColorList.append(pickColorItemYellow);
		pickColorList.append(pickColorItemGreen);
		pickColorList.append(pickColorItemBlue);
		pickColorList.append(pickColorItemPurple);
		pickColor.append(pickColorList);

		hideCmpltElementsCheckbox.addEventListener('click', () => {
			isHide = !isHide;
			hideCmpltElementsCheckbox.classList.toggle('hide');
			document.querySelectorAll('.completeFullItem').forEach(item => {item.classList.toggle('hide')});
		});
		
		return {pickColor, hideCmpltElements};
	}
	function createMainHeader() {
		const mainHeaderDiv = document.createElement('div');
		const nullDiv = document.createElement('div');
		const nullDiv2 = document.createElement('div');
		const mainHeaderTitle = document.createElement('div');
		const mainHeaderBtn = document.createElement('div');

		mainHeaderDiv.classList.add('main-header-div');
		mainHeaderTitle.classList.add('main-header-title');
		mainHeaderBtn.classList.add('main-header-btn');

		mainHeaderTitle.innerHTML = "Список дел";
		mainHeaderBtn.innerHTML = '+';

		mainHeaderDiv.append(nullDiv);
		mainHeaderDiv.append(mainHeaderTitle);
		mainHeaderDiv.append(mainHeaderBtn);
		mainHeaderDiv.append(nullDiv2);

		return {mainHeaderDiv, mainHeaderBtn}
	}
	document.addEventListener('DOMContentLoaded', () => {
		const todosCreateList = document.getElementById('todos-create-list');
		const mainHeaderElement = createMainHeader();
		const bottomMainHeaderElement = createBottomMainHeader();
		todosCreateList.append(mainHeaderElement.mainHeaderDiv);
		todosCreateList.append(bottomMainHeaderElement.pickColor);
		todosCreateList.append(bottomMainHeaderElement.hideCmpltElements);
		mainHeaderElement.mainHeaderBtn.addEventListener('click', () => {
			bottomMainHeaderElement.pickColor.classList.toggle('isHidden');
		});
	});

})();
