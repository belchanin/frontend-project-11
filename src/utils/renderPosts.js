export default (parent, items) => {
  const container = parent;
  container.innerHTML = '';

  const card = document.createElement('div');
  const cardBody = document.createElement('div');
  const cardTitle = document.createElement('h2');
  const list = document.createElement('ul');

  card.classList.add('card', 'border-0');
  cardBody.classList.add('card-body');
  cardTitle.classList.add('card-title', 'h4');
  list.classList.add('list-group', 'border-0', 'rounded-0');

  cardTitle.textContent = 'Посты';

  items.forEach(({ title, link }) => {
    const item = document.createElement('li');
    const itemLink = document.createElement('a');
    const button = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    itemLink.classList.add('fw-bold');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');

    itemLink.setAttribute('href', link);
    itemLink.setAttribute('data-id', '2');
    itemLink.setAttribute('target', '_blank');
    itemLink.setAttribute('rel', 'noopener noreferrer');
    button.setAttribute('type', 'button');
    button.setAttribute('data-id', '2');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');

    itemLink.textContent = title;
    button.textContent = 'Просмотр';

    item.appendChild(itemLink);
    item.appendChild(button);

    list.appendChild(item);
  });

  cardBody.appendChild(cardTitle);

  card.appendChild(cardBody);
  card.appendChild(list);

  container.appendChild(card);
};
