import { createEl, createRadioBtn } from './util.js';

const createDateBtnsGroup = (daysArr, groupeName, callBack) => {
  const group = createEl('div', 'btn-group');
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', 'Basic radio toggle button group');

  for(let day of daysArr) {
    group.appendChild(createRadioBtn(groupeName, day, callBack(day)))
  }
  const allBtn = createRadioBtn(groupeName, `all${groupeName}`, 'All')
  allBtn.querySelector('input').setAttribute('checked', 'checked');
  group.appendChild(allBtn)
  return group;
}

const createBtnsGroup = (labelArr, groupeName) => {
  const group = createEl('div', 'btn-group');
  group.classList.add('flex-wrap');
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', 'Basic radio toggle button group');

  for(let label of labelArr) {
    group.appendChild(createRadioBtn(groupeName, label, label))
  }
  const allBtn = createRadioBtn(groupeName, `all${groupeName}`, 'All')
  allBtn.querySelector('input').setAttribute('checked', 'checked');
  group.appendChild(allBtn)
  return group;
}

export { createDateBtnsGroup, createBtnsGroup }
