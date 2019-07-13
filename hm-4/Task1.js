'use strict';



// Создай объект notepad для работы с массивом заметок. Каждая заметка это объект следующего формата:

// id: string | integer
// title: string
// body: string
// priority: integer [0-2]
// id - уникальный идентификатор объекта, чтобы можно было найти его в коллекции, строка.
// title - заголовок заметки, строка.
// body - текст заметки, строка.
// priority - значение приоритета, от 0 (низкий) до 2 (высокий).
// Вот карта приоритетов, используй ее.

const Priority = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};
// Напиши код для работы методов данного объекта.

const notepad = {
    notes: [],
    getNotes() {
      return this.notes

    },
    findNoteById(id) {
      for (let key of this.notes) {
        if (key.id === id) {
          return key;
        }
      }
  
    },
    saveNote(note) {
      this.notes.push(note);
      return note;
    },
    deleteNote(id) {
      const delObj = this.findNoteById(id);
      this.notes.splice(this.notes.indexOf(delObj), 1)
    },
    updateNoteContent(id, updatedContent) {
      const updObj = this.findNoteById(id);
      // this.findNoteById.title = updatedContent.title
      let final = Object.assign({}, updObj, updatedContent);
      return final
    },
    updateNotePriority(id, priority) {
      const changPrior = this.findNoteById(id);
      changPrior.priority = priority;
      return changPrior
    },
    filterNotesByQuery(query) {
      let newArr = [];
      for (let key of this.notes) {
        for (const i in key) {

          let lowCaseTitle = key.title.toLowerCase();
          let lowCaseBody = key.body.toLowerCase();

          if (lowCaseTitle.includes(query.toLowerCase()) || lowCaseBody.includes(query.toLowerCase())) {
            newArr.push(key)
            return newArr
          }
        }
      }
    },

      filterNotesByPriority(priority) {
        let newArrPrior = [];
        for (let key of this.notes) {
        if(key.priority === priority){
          newArrPrior.push(key)
         console.log(newArrPrior);
          return newArrPrior
        }
          }
      }
    };





    // Далее идет код для проверки работоспособности объекта, вставь его в конец скрипта. Твоя реализация методов объекта notepad должна проходить этот тест.
    /*
     * Добавляю 4 заметки и смотрю что получилось
     */
    notepad.saveNote({
      id: 'id-1',
      title: 'JavaScript essentials',
      body: 'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
      priority: Priority.HIGH,
    });

    notepad.saveNote({
      id: 'id-2',
      title: 'Refresh HTML and CSS',
      body: 'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
      priority: Priority.NORMAL,
    });

    notepad.saveNote({
      id: 'id-3',
      title: 'Get comfy with Frontend frameworks',
      body: 'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
      priority: Priority.NORMAL,
    });

    notepad.saveNote({
      id: 'id-4',
      title: 'Winter clothes',
      body: "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
      priority: Priority.LOW,
    });


    // console.log(notepad.notes);
    console.log('Все текущие заметки: ', notepad.getNotes());

    /*
     * Зима уже близко, пора поднять приоритет на покупку одежды
     */
    notepad.updateNotePriority('id-4', Priority.NORMAL);

    console.log(
      'Заметки после обновления приоритета для id-4: ',
      notepad.getNotes(),
    );

    /*
     * Решил что фреймворки отложу немного, понижаю приоритет
     */
    notepad.updateNotePriority('id-3', Priority.LOW);

    console.log(
      'Заметки после обновления приоритета для id-3: ',
      notepad.getNotes(),
    );

    /*
     * Решил отфильтровать заметки по слову html
     */
    console.log(
      'Отфильтровали заметки по ключевому слову "html": ',
      notepad.filterNotesByQuery('html'),
    );

    /*
     * Решил отфильтровать заметки по слову javascript
     */
    console.log(
      'Отфильтровали заметки по ключевому слову "javascript": ',
      notepad.filterNotesByQuery('javascript'),
    );

    /*
     * Хочу посмотреть только заметки с нормальным приоритетом
     */
    console.log(
      'Отфильтровали заметки по нормальному приоритету: ',
      notepad.filterNotesByPriority(Priority.NORMAL),
    );

    /*
     * Обновим контент заметки с id-3
     */
    notepad.updateNoteContent('id-3', {
      title: 'Get comfy with React.js or Vue.js',
    });

    console.log(
      'Заметки после обновления контента заметки с id-3: ',
      notepad.getNotes(),
    );

    /*
     * Повторил HTML и CSS, удаляю запись c id-2
     */
    notepad.deleteNote('id-2');
    console.log('Заметки после удаления с id -2: ', notepad.getNotes());