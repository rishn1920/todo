document.addEventListener("DOMContentLoaded", () => todo.init());

const todo = {
    taskCount: 0,
    form: document.todoForm,
    tasks: document.querySelector("#tasks"),
    init: function() {
        todo.bindSubmitHandler();
    },
    bindSubmitHandler: function() {
        const form = todo.form;
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (!form.title.value) {
                form.title.nextElementSibling.textContent = "Title is required.";
                form.title.classList.add("is-invalid");
                return false;
            } else {
                form.title.nextElementSibling.textContent = "";
                form.title.classList.remove("is-invalid");
            }
        
            if (form.dueDate.value && new Date(form.dueDate.value) == 'Invalid Date') {
                form.dueDate.value = '';
            }

            todo.addToList(form.title.value, form.dueDate.value ? form.dueDate.value : '-');
            form.reset();
            return false;
        });
    },
    addToList: function(title, date) {
        if (!todo.taskCount) {
            todo.tasks.innerHTML = "";
        }

        todo.taskCount++;
        const task = document.createElement("TR");
        task.innerHTML = `<td>${title}</td><td class="text-nowrap">${date}</td><td data-actions></td>`;
        todo.tasks.appendChild(task);
        todo.addActions(task);
    },
    removeFromList: function(task) {
        todo.taskCount--;
        task.remove();

        if (!todo.taskCount) todo.tasks.innerHTML = '<tr><td colspan="3" class="text-center">No task found</td></tr>';
    },
    addActions: function(task) {
        const actionsContainer = task.querySelector("[data-actions]");
        const deleteButton = document.createElement("button");

        deleteButton.classList.add("btn", "btn-danger", "btn-sm");
        deleteButton.textContent = "Delete";
        actionsContainer.appendChild(deleteButton);

        deleteButton.onclick = () => todo.removeFromList(task);
    }
};