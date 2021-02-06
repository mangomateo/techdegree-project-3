
const nameField = document.querySelector('#name');
const jobRoleTitle = document.querySelector('#title');
const jobRoleField = document.querySelector('#other-job-role');
const shirtDesignField = document.querySelector('#design');
const shirtColorField = document.querySelector('#color');
const shirtColorOptions = shirtColorField.children;
const activityOptions = document.querySelector('#activities-box');
const totalCost = document.querySelector('#activities-cost');
let updatedCost = 0;

nameField.focus();

jobRoleField.style.display = 'none';

jobRoleTitle.addEventListener('change', () => {
    jobRoleTitle.value === 'other' ? jobRoleField.style.display = 'inline-block' : jobRoleField.style.display = 'none';
});

shirtColorField.disabled = true;

// Listen for any changes to the T-Shirt design field, and update color choices accordingly
shirtDesignField.addEventListener('change', () => {
    shirtColorField.disabled = false;
    

    // Check for which value was selected and set or remove the hidden attribute on color options accordingly
    if (shirtDesignField.value === 'js puns') {
        shirtColorOptions[0].setAttribute('hidden', true);
        for (let i = 1; i < shirtColorOptions.length; i++) {
            if (shirtColorOptions[i].getAttribute('data-theme') === 'heart js') {
                shirtColorOptions[i].setAttribute('hidden', true);
            } else {
                shirtColorOptions[i].removeAttribute('hidden');
            }
        }
    } else if (shirtDesignField.value === 'heart js') {
        shirtColorOptions[0].setAttribute('hidden', true);
        for (let i = 1; i < shirtColorOptions.length; i++) {
            if (shirtColorOptions[i].getAttribute('data-theme') === 'js puns') {
                shirtColorOptions[i].setAttribute('hidden', true);
            } else {
                shirtColorOptions[i].removeAttribute('hidden');
            }
        }
    }
    shirtColorField.value = shirtColorOptions[0];
});


// Update totalCost based on activities that have been selected
activityOptions.addEventListener('change', e => {
    let activityCost = e.target.getAttribute('data-cost');
    
    if (e.target.tagName === 'INPUT' && e.target.checked === true) {
        updatedCost += parseInt(activityCost);
    } else if (e.target.tagName === 'INPUT' && e.target.checked === false) {
        updatedCost -= parseInt(activityCost);
    }
    
    totalCost.innerHTML = `Total: $${ updatedCost }`
});