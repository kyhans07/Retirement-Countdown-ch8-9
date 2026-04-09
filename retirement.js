"use strict";

// Defer in HTML allows us to grab these immediately at the top
const $ = selector => document.querySelector(selector);

const nameIn    = $("#client_name");
const emailIn   = $("#email");
const investIn  = $("#investment");
const addIn     = $("#monthly_add");
const rateIn    = $("#rate");
const dateIn    = $("#retirement_date");
const errBox    = $("#error_message");
const statusMsg = $("#status_message");
const output    = $("#projection_output");
const form      = $("#projection_form");
const testData  = $("#test_data");

let projectionTimer = null;

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const processEntries = (evt) => {
    let isValid = true;
    let years = 0;

    evt.preventDefault();
    resetForm()

    // Grab the values for validation
    const name = nameIn.value;
    const email = emailIn.value;
    const dateValue = dateIn.value;

    // Ensure the name is not blank
    if (name.trim() === "") {
        $("#name_error").textContent = nameIn.title;
        isValid = false;
    }
// Make sure the email is valid
    const emailPattern = /^[\w.\-]+@[\w.\-]+\.[a-zA-Z]+$/;
    if (!emailPattern.test(email)) {
        $("#email_error").textContent = emailIn.title;
        isValid = false;
    }
    if (!dateValue.trim()){
        $("#retire_date_error").textContent = dateIn.title;
        isValid = false;
    } else {
// Get Date objects for the current data and the date the user inputted for
        retirement
        const current = new Date();
        const date = new Date(dateValue);

    // TODO: Numeric Validations

    /* TODO: Code try-catch logic
        try
            if not valid then throw error "Please correct the entries highlighted below."
            document.body.style.width = "350px";
            startProjection(nameIn.value, invest, add, rate, years);
         catch(e)
            set the body width to 700px (like code above)
            errBox.innerText = e.message;
     */
};

const startProjection = (name, bal, add, rate, years) => {
    statusMsg.textContent = `Live Projection: ${name}`;
    statusMsg.style.color = "red";
    let count = 1;

    // TO-DO: startYear = the current year
    const startYear = new Date().getFullYear();

    let formattedBal = formatter.format(bal);
    output.innerHTML = `Year ${startYear} = ${formattedBal}`;

    /* TODO: setup an interval to do the following
        for (let i = 0; i < 12; i++) {
            bal = ((bal + add) * (1 + (rate / 12 / 100))).toFixed(2);
        }
        format the balance like the starting code above
        update the output like the starting code above
        if count is >= years
            clear interval
            update the statusMsg like the starting code above
            set the statusMsg color to green like the starting code above
        end if
        add one to the count
     */
};

const setTestData = () => {
    resetForm();
    // TODO: set default values for all input fields
};

const resetForm = () => {
    /* TODO:
        clear all input fields
        clear the interval
        document.querySelectorAll(".error").forEach(s => s.textContent = "*");
        set the body width to 350px (like code above)
        set the focus to the name input field
     */
};

document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", processEntries);
    form.addEventListener("reset", resetForm);
    testData.addEventListener("click", setTestData);
});