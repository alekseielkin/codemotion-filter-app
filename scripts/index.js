import { agenda } from './agenda.js';
import { sortTalksByInfo, sortTalksByTag, showDay, showTime } from './util.js';
import { createDateBtnsGroup, createBtnsGroup } from './createGroups.js';

const filterForm = document.querySelector('.filter-form-js');
const btnGroupsContainer = document.querySelector('.btn-groups-container-js');
const respContainer = document.querySelector('.responce-js');

// DAYS
const days = new Set();
agenda.forEach(talk => days.add(talk.agendaInfo.agenda_date))
btnGroupsContainer.appendChild(createDateBtnsGroup(days, 'days', showDay));

// TIMES
const times = new Set();
agenda.forEach(talk => times.add(talk.agendaInfo.start_time_milli))
btnGroupsContainer.appendChild(createDateBtnsGroup(times, 'times', showTime));


// TAGS

const tags = new Set();
agenda.forEach(talk => {
  talk.agendaInfo.tags.split(",").forEach(tag => tags.add(tag))
})
tags.delete('')


btnGroupsContainer.appendChild(createBtnsGroup(tags, 'tags'));


console.log(tags);

filterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(filterForm);
  const day = formData.get('days');
  const time = formData.get('times');
  const tag = formData.getAll('tags');
  console.log(formData);
  let talks = agenda;
  if (day != 'alldays') {
    talks = sortTalksByInfo(talks, 'agenda_date', day);
  }
  if (time != 'alltimes'){
    talks = sortTalksByInfo(talks, 'start_time_milli', time);
  }
  if (tag != 'alltags'){
    talks = sortTalksByTag(talks, tag);
  }
  respContainer.innerHTML = '';
  console.log(talks);
  talks.forEach(talk => {
    const talkElement = document.createElement('div');
    talkElement.classList.add('talk');
    talkElement.innerHTML = `
      <h3>${talk.agendaInfo.name}</h3>
      <p>${talk.agendaInfo.description}</p>
      <p>tags: ${talk.agendaInfo.tags}</p>
      <p>${showDay(talk.agendaInfo.agenda_date)}</p>
      <p>${showTime(talk.agendaInfo.start_time_milli)}</p>
      <p>${talk.speakers.map(speaker => speaker.name)}</p>
    `;
    respContainer.appendChild(talkElement);
  });
});
