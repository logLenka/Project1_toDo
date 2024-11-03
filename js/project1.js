

// Add event listener to the 'options_priority' dropdown
document.getElementById('options_priority').addEventListener('change', function() {
    // Update the 'textfield_priority' input with the selected value
    document.getElementById('textfield_priority').value = this.value;
});

// Add event listener to the 'options_status' dropdown
document.getElementById('options_status').addEventListener('change', function() {
    // Update the 'textfield_status' input with the selected value
    document.getElementById('textfield_status').value = this.value;
});


// Function to validate input fields
function validateInput() {
    //try {
    let name = document.getElementById('textfield');
    let priority = document.getElementById('textfield_priority');
    let status = document.getElementById('textfield_status');
    let errorMsg = '';

    // Resetting the previous error styles
    name.style.borderColor = '';
    priority.style.borderColor = '';
    status.style.borderColor = '';
    document.getElementById('error_msg').innerHTML = '';

    // Check if any field is empty
    if (name.value.length < 1 || priority.value.length < 1 || status.value.length < 1) {
        
        errorMsg = 'the field cannot be empty\n';
        if (name.value.length < 1){name.style.borderColor = 'red';}
        else if (priority.value.length < 1){priority.style.borderColor = 'red';}
        else if (status.value.length < 1){status.style.borderColor = 'red';}
        
        // Display error message
        var h = document.createElement("b") ;
        var t = document.createTextNode(errorMsg);
        h.appendChild(t);
        document.getElementById('error_msg').appendChild(h);
        // return false;
    }

    else if (name.value.length > 20) {
        // Truncate the name if it's too long
        name.value = name.value.substring(0,20);
        
        saveData()
        clearTable('data')
        showdata()
    }
    // return true
    
    else {
        saveData()
        clearTable('data')
        showdata()
}}

// function insertRows() {
//     let table = document.getElementById('data').getElementsByTagName('tbody')[0];
//     let newRow = table.insertRow();
//     var values = document.getElementById('formular').querySelectorAll('input[type="text"]');

//     // const taskName = document.getElementById('textfield').value;
//     // const priority = document.getElementById('options_priority').value;
//     // const status = document.getElementById('options_status').value;

//     // const values = [taskName, priority, status]

//     for (var i = 0; i < values.length; i++) {
//         newRow.insertCell(i).innerHTML = values[i].value
//     }

//     // const currentList = JSON.parse(localStorage.getItem("todoList"));
//     // localStorage.setItem("todolist", JSON.stringify({
//     // 	list: [
//     // 		{name: "", priority:"", status:"" }
//     // 	]
//     // }))

    

//     let actionCell = newRow.insertCell(values.length);
//     actionCell.innerHTML = '<button onclick="removeRow(this)">Remove</button>';
// }


// Function to remove a row from the table and localStorage
function removeRow(button) {
    let JSONdata = JSON.parse(localStorage.getItem('formData1'));
    let row = button.parentNode.parentNode;

    JSONdata.splice(row.rowIndex-1, 1)
    localStorage.setItem('formData1', JSON.stringify(JSONdata));
    row.parentNode.removeChild(row);
}

// Initialize localStorage if it doesn't exist
if(localStorage.getItem('formData1') === null) {
    let JSONdata=[];
    localStorage.setItem('formData1', JSON.stringify(JSONdata))
}

// Function to save data to localStorage
function saveData() {
    
    let JSONdata = JSON.parse(localStorage.getItem('formData1'));

    let task = document.getElementById('textfield').value;
    let priority = document.getElementById('textfield_priority').value;
    let status = document.getElementById('textfield_status').value;

// Create a JSON object
    let formData2 = {
        task: task,
        priority: priority,
        status: status
    };

    // Save object in an array
    JSONdata.push(formData2);
    localStorage.setItem('formData1', JSON.stringify(JSONdata));
    // alert('Data saved to localStorage!');
}

// Function to display data from localStorage in the table
function showdata(){
    let JSONdata = JSON.parse(localStorage.getItem('formData1'));

    let table = document.getElementById('data').getElementsByTagName('tbody')[0];
    
    let rows = []
    let row = []

    // Prepare rows data
    for (let i = 0; i < JSONdata.length; i++) {
        rows.push([JSONdata[i].task, JSONdata[i].priority, JSONdata[i].status])
    }

    // Insert rows into the table
    for (let i = 0; i < rows.length; i++) {
        row = rows[i]
        let newRow = table.insertRow();
        for (let j = 0; j < row.length; j++) {
            newRow.insertCell(j).innerHTML = row[j]
        } 
    let actionCell = newRow.insertCell(row.length);
    console.log(row.length)
    actionCell.innerHTML = '<button onclick="removeRow(this)">Remove</button>';
    }

    // for (let i = 0; i < JSONdata.length; i++) {
    //     table += "<tr><td>" + (i) + "</td><td>" + JSONdata[i].task + "</td><td>" + JSONdata[i].priority + "</td><td>" + JSONdata[i].status; 
    // }
}

// Function to clear the table
function clearTable(tableId) {
    var table = document.getElementById(tableId);

    if (table) {
        var rowCount = table.rows.length;

        for (var i = rowCount - 1; i > 0; i--) {
            table.deleteRow(i);
        }
    } else {
        console.error('Table not found!');
    }
}

// Display data on page load
showdata()

