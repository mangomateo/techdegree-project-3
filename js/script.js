
const nameField = document.querySelector('#name');
nameField.focus();

const jobRoleTitle = document.querySelector('#title');
const jobRoleField = document.querySelector('#other-job-role');
jobRoleField.style.display = 'none';

jobRoleTitle.addEventListener('change', () => {
    jobRoleTitle.value === 'other' ? jobRoleField.style.display = 'inline-block' : jobRoleField.style.display = 'none';
});