const entriesContainer = document.getElementById('entriesContainer');
const journalEntry = document.getElementById('journalEntry');
const entryTitle = document.getElementById('entryTitle');
const titleError = document.querySelector('.titleError');
const textError = document.querySelector('.textError');

const loadEntries = () => {
  const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  entriesContainer.innerHTML = '';

  if (entries.length === 0) {
    entriesContainer.innerHTML = `<p>No notes yet.<br> Start your journey here by writing notes.</p>`;
  } else{
    entriesContainer.innerHTML = `<h3>Your Notes</h3>`
  }

  entries.forEach((entry, index) => {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');
    entryDiv.innerHTML = `
      <h3>${entry.title}</h3><br>
      <p>${entry.text}</p>
      <span>Saved on: ${entry.date}</span>
      <div class="actions">
        <button class="edit" onclick="editEntry(${index})">Edit</button>
        <button class="delete" onclick="deleteEntry(${index})">Delete</button>
      </div>
    `;
    entriesContainer.appendChild(entryDiv);
  });
};

const saveEntry = () => {
  const title = entryTitle.value.trim();
  const text = journalEntry.value.trim();
  
  if (title === '' && text === '') {
    alert('Please enter both a title and a reflection text before saving.');
    return;
  }

  if (title === '') {
    titleError.textContent = 'Please enter a title';
    entryTitle.style.border = '1px solid red';
    return;
  } else{
    titleError.textContent = '';
    entryTitle.style.border = '1px solid #ccc';
  }  
  
  
  if (text === '') {
    textError.textContent = 'Please enter a text';
    journalEntry.style.border = '1px solid red';
    return;
  } else{
    textError.textContent = '';
    journalEntry.style.border = '1px solid #ccc';
  }

  
  

  

  const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  const newEntry = {
    title,
    text,
    date: new Date().toLocaleString(),
  };
  entries.push(newEntry);
  localStorage.setItem('journalEntries', JSON.stringify(entries));
  entryTitle.value = '';
  journalEntry.value = '';
  loadEntries();
};

const editEntry = (index) => {
  const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  const entryToEdit = entries[index];
  entryTitle.value = entryToEdit.title;
  entryTitle.select();
  journalEntry.value = entryToEdit.text;
  journalEntry.focus();
  entries.splice(index, 1);
  localStorage.setItem('journalEntries', JSON.stringify(entries));
  loadEntries();
};


const deleteEntry = (index) => {
  if (confirm('Are you sure you want to delete this note?')) {
    const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    entries.splice(index, 1);
    localStorage.setItem('journalEntries', JSON.stringify(entries));
    loadEntries();
  }
};

loadEntries();
