// Track Complaint Function for Users
function trackComplaint() {
    const trackingID = document.getElementById('trackingID').value.trim();
    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];
    const complaint = complaints.find(c => c.trackingID === trackingID);

    const resultDiv = document.getElementById('trackResult');
    if (complaint) {
        resultDiv.innerHTML = `<p><strong>Status:</strong> ${complaint.status}</p>`;
    } else {
        resultDiv.innerHTML = '<p style="color: red;">Complaint not found!</p>';
    }
}

// View and Update Complaints for Admin
function viewComplaints() {
    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];
    const complaintList = document.getElementById('complaintList');
    const isAdmin = localStorage.getItem('userRole') === 'admin'; // Fixed admin check

    if (complaints.length === 0) {
        complaintList.innerHTML = '<p>No complaints found.</p>';
        return;
    }

    complaintList.innerHTML = complaints.map((c, index) => `
        <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
            <p><strong>Name:</strong> ${c.name}</p>
            <p><strong>Roll Number:</strong> ${c.roll}</p>
            <p><strong>Complaint:</strong> ${c.complaint}</p>
            <p><strong>Tracking ID:</strong> ${c.trackingID}</p>
            <p><strong>Status:</strong> ${c.status}</p>
            ${isAdmin ? `<select onchange="updateStatus(${index}, this.value)">
                <option value="Pending" ${c.status === 'Pending' ? 'selected' : ''}>Pending</option>
                <option value="In Progress" ${c.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Resolved" ${c.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
            </select>
            <button onclick="deleteComplaint(${index})">Delete</button>` : ''} <!-- Admin only controls -->
        </div>
    `).join('');
}

// Update Complaint Status (Only Admin)
function updateStatus(index, newStatus) {
    if (localStorage.getItem('userRole') !== 'admin') { // Prevent non-admin updates
        alert("You are not authorized to change the status.");
        return;
    }
    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];
    complaints[index].status = newStatus;
    localStorage.setItem('complaints', JSON.stringify(complaints));
    viewComplaints();
}

// Delete Complaint (Only Admin)
function deleteComplaint(index) {
    if (localStorage.getItem('userRole') !== 'admin') { // Prevent non-admin deletions
        alert("You are not authorized to delete complaints.");
        return;
    }
    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];
    complaints.splice(index, 1);
    localStorage.setItem('complaints', JSON.stringify(complaints));
    viewComplaints();
}
