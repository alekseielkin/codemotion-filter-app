import { agenda } from './agenda.js';
import { sortTalksByInfo, createEl, createRadioBtn, showDay, showTime } from './util.js';

const filterForm = document.querySelector('.filter-form-js');
const btnGroupsContainer = document.querySelector('.btn-groups-container-js');
const respContainer = document.querySelector('.responce-js');

// DAYS
const days = new Set();

agenda.forEach(talk => days.add(talk.agendaInfo.agenda_date))

const createDateBtnsGroup = (daysArr, groupeName) => {
  const group = createEl('div', 'btn-group');
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', 'Basic radio toggle button group');

  for(let day of daysArr) {
    group.appendChild(createRadioBtn('days', day, showDay(day)))
  }
  const allBtn = createRadioBtn('days', 'all', 'All')
  allBtn.querySelector('input').setAttribute('checked', 'checked');
  group.appendChild(allBtn)
  return group;
}

btnGroupsContainer.appendChild(createDateBtnsGroup(days, 'days'));


;

filterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(filterForm);
  const days = formData.get('days');
  console.log(formData);
  console.log(days);
  let talks = agenda;
  if (days != 'all') {
    talks = sortTalksByInfo(agenda, 'agenda_date', days);
  }
  respContainer.innerHTML = '';
  talks.forEach(talk => {
    const talkElement = document.createElement('div');
    talkElement.classList.add('talk');
    talkElement.innerHTML = `
      <h3>${talk.agendaInfo.name}</h3>
      <p>${talk.agendaInfo.description}</p>
      <p>${talk.speakers.map(speaker => speaker.name)}</p>
    `;
    respContainer.appendChild(talkElement);
  });
});
