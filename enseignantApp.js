// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDmhYKjvtbMUGddCybtfjmQyv20aylD_uY",
    authDomain: "thadosschool.firebaseapp.com",
    projectId: "thadosschool",
    storageBucket: "thadosschool.appspot.com",
    messagingSenderId: "488603663388",
    appId: "1:488603663388:web:8165ee762628b3f833f3d9",
    measurementId: "G-1LSDF10EYX"
};

// Initialiser Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Récupérer les Classes depuis la base de données
function loadClasses() {
    const classeSelection = document.getElementById("classeSelection");
    db.collection("classes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const classe = doc.data().name;
            const option = document.createElement("option");
            option.value = classe;
            option.textContent = classe;
            classeSelection.appendChild(option);
        });
    }).catch((error) => {
        console.error("Erreur lors du chargement des classes : ", error);
    });
}

// Récupérer les Cours depuis la base de données
function loadCourses() {
    const coursSelection = document.getElementById("coursSelection");
    db.collection("matieres").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const matiere = doc.data().name;
            const option = document.createElement("option");
            option.value = matiere;
            option.textContent = matiere;
            coursSelection.appendChild(option);
        });
    }).catch((error) => {
        console.error("Erreur lors du chargement des cours : ", error);
    });
}

// Charger les Classes et Cours lors du chargement de la page
document.addEventListener("DOMContentLoaded", function() {
    loadClasses();
    loadCourses();
});

// Ajouter un Enseignant
document.getElementById("enseignantForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const enseignantNom = document.getElementById("enseignantNom").value;
    const enseignantEmail = document.getElementById("enseignantEmail").value;
    const classeSelection = document.getElementById("classeSelection").value;
    const coursSelection = document.getElementById("coursSelection").value;

    // Ajouter l'enseignant à la base de données
    db.collection("enseignants").add({
        nom: enseignantNom,
        email: enseignantEmail,
        classe: classeSelection,
        cours: coursSelection,
        dateAjout: firebase.firestore.FieldValue.serverTimestamp() // Timestamp pour l'ajout
    })
    .then(() => {
        alert("Enseignant ajouté avec succès !");
        document.getElementById("enseignantForm").reset(); // Réinitialiser le formulaire
    })
    .catch((error) => {
        console.error("Erreur lors de l'ajout de l'enseignant : ", error);
        alert("Erreur lors de l'ajout de l'enseignant.");
    });
});
