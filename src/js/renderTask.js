export const renderTask = arrOFTasks => {
  return arrOFTasks.map(({ isDone, id, taskName, taskDetails }) => {
    return `
            <li class="task ${isDone ? 'is-done' : ''}" data-id="${id}">
                <span>
                    <input type="checkbox" data-js="checkbox" ${isDone ? 'checked' : ''}/>
                    <label></label>
                    <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                        <path d="M2 8.36364L6.23077 12L13 2"></path>
                    </svg>
                </span>
                <h3 class="task-title">
                    ${taskName}
                </h3>
                <p class="task-body"
                    data-task-details
                >
                    ${taskDetails || ''}
                </p>
                <button class="delete-task" data-js="delete">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"/>
                    </svg>
                </button>
            </li>
        `;
  }).join``;
};
