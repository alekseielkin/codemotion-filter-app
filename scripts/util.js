const sortTalksByInfo = (talks, key, value) => {
  return talks.filter(talk => talk.agendaInfo[key] === value);
}

const sortTalksByTag = (talks, tag) => {
  return talks.filter(talk => talk.agendaInfo.tags.includes(tag));
}

const createEl = ( tag, className, text ) => {
  const $element = document.createElement(tag)
  if (className) {
      if (Array.isArray(className)) {
          className.forEach(item => {
              $element.classList.add(item);
          })
      } else {
          $element.classList.add(className);
      }
  }
  if (text) { $element.innerText = text }
  return $element
}

const createRadioBtn = (name, value, text) => {
  const pare = document.createDocumentFragment();
  const radio = createEl('input', 'btn-check')
  radio.setAttribute('type', 'radio');
  radio.setAttribute('name', name);
  radio.setAttribute('value', value);
  radio.setAttribute('id', value);
  radio.setAttribute('autocomplete', 'off');
  const label = createEl('label', 'btn', text);
  label.classList.add('btn-outline-primary');
  label.setAttribute('for', value);
  pare.appendChild(radio);
  pare.appendChild(label);
  return pare;
}

// date and time:

const showDay = (data) => {
  const date = new Date(data);
  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);

  return formatter.format(date);
}

const showTime = (data) => {
  const time = new Date(parseInt(data));
  const options = {
    timeZone: "Europe/Madrid",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);

  return formatter.format(time);
}


export { sortTalksByInfo, sortTalksByTag, createEl, createRadioBtn, showDay, showTime }
