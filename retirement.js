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
    const invest = parseFloat(investIn.value);
    const add = parseFloat(addIn.value);
    const rate = parseFloat(rateIn.value);
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

    const retirementDate = new Date(dateValue);
    if (retirementDate.toString() === "Invalid Date") {
        $("#retire_date_error").textContent = dateIn.title;
        isValid = false;
    } else {
        const today = new Date();
        // Date math to get years
        years = retirementDate.getFullYear() - today.getFullYear();
        if (years <= 0) {
            $("#retire_date_error").textContent = "Date must be in a future year.";
            isValid = false;
        }
    }

// 4. Numeric Validations


        if (isNaN(invest) || invest <= 0) {
            $("#investment_error").textContent = investIn.title;
            isValid = false;
        }
        if (isNaN(add) || add < 0) {
            $("#add_error").textContent = addIn.title;
            isValid = false;
        }
        if (isNaN(rate) || rate <= 0 || rate > 20) {
            $("#rate_error").textContent = rateIn.title;
            isValid = false;
        }

// try catch for width
    try {
        if (!isValid) {
            throw new Error("Please correct the entries highlighted below.");
        }
        // Success state
        document.body.style.width = "350px";
        startProjection(name, invest, add, rate, years);

    } catch (e) {
        // Error state
        document.body.style.width = "700px";
        errBox.innerText = e.message;
    }
};


const startProjection = (name, bal, add, rate, years) => {
    statusMsg.textContent = `Live Projection: ${name}`;
    statusMsg.style.color = "red";
    let count = 1;
    let currentBal = bal;
    // TO-DO: startYear = the current year
    const startYear = new Date().getFullYear();

    let formattedBal = formatter.format(bal);
    output.innerHTML = `Year ${startYear} = ${formattedBal}`;

    projectionTimer = setInterval(() => {
        // Monthly interest calculation
        for (let i = 0; i < 12; i++) {
            currentBal = (currentBal + add) * (1 + (rate / 12 / 100));
        }

        // Update output with new line (Template Literal)
        output.innerHTML += `<br>Year ${startYear + count} = ${formatter.format(currentBal)}`;

        if (count >= years) {
            clearInterval(projectionTimer);
            statusMsg.textContent = `Projection Complete for ${name}`;
            statusMsg.style.color = "green";
        }
        count++;
    }, 500);
};

const setTestData = () => {
    resetForm();
    nameIn.value = "Kyler";
    emailIn.value = "kyler@example.com";
    investIn.value = "50000";
    addIn.value = "200";
    rateIn.value = "6";
    dateIn.value = "2035-01-01";
};

const resetForm = () => {
    if (projectionTimer) clearInterval(projectionTimer);
    form.reset();

    output.innerHTML = "";
    statusMsg.textContent = "";
    errBox.innerText = "";

    // Reset error spans
    document.querySelectorAll(".error").forEach(s => s.textContent = "*");

    document.body.style.width = "350px";
    nameIn.focus();
};

document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", processEntries);
    form.addEventListener("reset", resetForm);
    testData.addEventListener("click", setTestData);
});