// STUDENT SIGNUP & LOGIN
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

// Signup
if(signupForm){
  signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email,password)
    .then((userCredential)=>{
      const user = userCredential.user;
      // Save additional info to Firestore
      db.collection('students').doc(user.uid).set({
        name: name,
        email: email
      })
      .then(()=>{
        alert('Signup successful!');
        window.location = "student-login.html";
      });
    })
    .catch((error)=>{
      alert(error.message);
    });
  });
}

// Login
if(loginForm){
  loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email,password)
    .then((userCredential)=>{
      window.location = "submit-complaint.html"; // redirect to submit complaint page
    })
    .catch((error)=>{
      alert(error.message);
    });
  });
}
