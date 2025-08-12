const draggable1 = document.getElementById('item1');
const draggable2 = document.getElementById('item2');
const draggable3 = document.getElementById('item3');
const dropzones = document.querySelectorAll('.dropzone');

draggable1.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id); // Store the ID of the dragged element
});

draggable2.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
});

draggable3.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
});

dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault(); // Allow dropping
        dropzone.classList.add('hovered');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('hovered');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(data);
        dropzone.appendChild(draggedElement); // Move the element to the dropzone
        dropzone.classList.remove('hovered');
    });
});