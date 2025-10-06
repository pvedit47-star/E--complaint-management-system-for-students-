// ADMIN LOGIN (Corrected with secure claim check)
const adminLoginForm = document.getElementById('admin-login-form');

if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('admin-email').value;
        const password = document.getElementById('admin-password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;

                // Securely check for the admin custom claim
                return user.getIdTokenResult();
            })
            .then(idTokenResult => {
                // The 'admin' property will be true if the custom claim was set
                if (idTokenResult.claims.admin === true) {
                    console.log('Admin verified. Redirecting to dashboard.');
                    window.location = "admin-dashboard.html";
                } else {
                    alert("You do not have admin privileges!");
                    auth.signOut();
                }
            })
            .catch(err => {
                alert("Login failed: " + err.message);
            });
    });
}


// ADMIN DASHBOARD FUNCTIONALITY (This part remains the same)
auth.onAuthStateChanged(user => {
    if (!user) {
        return;
    }

    const complaintList = document.getElementById('complaint-list');
    if (!complaintList) { // Don't run if we're not on the dashboard page
        return;
    }

    // This query will now be allowed by your security rules because the user has the admin claim
    db.collection('complaints').orderBy('date', 'desc')
        .onSnapshot(snapshot => {
            let html = "";
            snapshot.forEach(doc => {
                const c = doc.data();
                html += `<tr>
                    <td>${c.studentName || 'N/A'}</td>
                    <td>${c.studentEmail || 'N/A'}</td>
                    <td>${c.title}</td>
                    <td>${c.category}</td>
                    <td>${c.description}</td>
                    <td id="status-${doc.id}">${c.status}</td>
                    <td>
                        <select id="select-${doc.id}">
                            <option value="Pending" ${c.status === "Pending" ? "selected" : ""}>Pending</option>
                            <option value="In Progress" ${c.status === "In Progress" ? "selected" : ""}>In Progress</option>
                            <option value="Resolved" ${c.status === "Resolved" ? "selected" : ""}>Resolved</option>
                        </select>
                        <button onclick="updateStatus('${doc.id}')">Update</button>
                    </td>
                </tr>`;
            });
            complaintList.innerHTML = html;
        });
});

// Function to update status (This part remains the same)
function updateStatus(id) {
    const newStatus = document.getElementById(`select-${id}`).value;
    db.collection('complaints').doc(id).update({
        status: newStatus
    }).then(() => {
        alert("Status updated!");
    }).catch(err => {
        alert("Error updating status: " + err.message);
    });
}