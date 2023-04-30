import { createEl, showDay, showTime } from "./util.js"


const createTalk = (talk) => {
  const card = createEl('article', 'card')
  card.classList.add('text-center', 'col')
  const cardHeader = createEl('header', 'card-header')
  cardHeader.appendChild(createEl('h3', 'card-title', talk.agendaInfo.name))
  card.appendChild(cardHeader)
  const cardBody = createEl('div', 'card-body')
  cardBody.innerHTML = talk.agendaInfo.description
  card.appendChild(cardBody)
  const cardFooter = createEl('footer', 'card-footer')
  cardFooter.classList.add('text-body-secondary')
  const dateTime = createEl('div', ['d-flex', 'justify-content-between'])
  dateTime.appendChild(createEl('span', 'card-text', showDay(talk.agendaInfo.agenda_date)))
  dateTime.appendChild(createEl('span', 'card-text', showTime(talk.agendaInfo.start_time_milli)))
  cardFooter.appendChild(dateTime)
  talk.agendaInfo.tags.split(",").forEach(tag => {
    let bage = 'bg-info'
    if (tag === 'Spanish' || tag === 'English') bage = 'bg-secondary'
    cardFooter.appendChild(createEl('span', ['badge', 'rounded-pill', 'mx-1', bage], tag))
  })
  const speakers = createEl('p', 'card-text', talk.speakers.map(speaker => speaker.name).join(', '))
  cardFooter.appendChild(speakers)
  card.appendChild(cardFooter)
  const div = createEl('div', 'col')
  div.appendChild(card)

  return div
}

export { createTalk }
