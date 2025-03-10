// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDmhYKjvtbMUGddCybtfjmQyv20aylD_uY",
    authDomain: "thadosschool.firebaseapp.com",
    projectId: "thadosschool",
    storageBucket: "thadosschool.firebasestorage.app",
    messagingSenderId: "488603663388",
    appId: "1:488603663388:web:8165ee762628b3f833f3d9",
    measurementId: "G-1LSDF10EYX"
};

// Initialiser Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Lorsque l'utilisateur soumet le formulaire pour ajouter un enseignant
document.getElementById("enseignantForm").addEventListener("submit", (event) => {
    event.preventDefault();

    // Récupérer les informations du formulaire
    const enseignantNom = document.getElementById("enseignantNom").value;
    const enseignantEmail = document.getElementById("enseignantEmail").value;
    const enseignantMatiere = document.getElementById("enseignantMatiere").value;
    const optionClasseId = localStorage.getItem('optionClasseId');  // Récupérer l'ID de l'option/classe sélectionnée

    // Ajouter l'enseignant dans Firestore
    db.collection("enseignants").add({
        nom: enseignantNom,
        email: enseignantEmail,
        matiere: enseignantMatiere,
        optionClasseId: optionClasseId,  // Associer cet enseignant à l'option/classe
        dateAjout: firebase.firestore.FieldValue.serverTimestamp()  // Timestamp pour l'enregistrement
    })
    .then((docRef) => {
        console.log("Enseignant ajouté avec succès ! ID : ", docRef.id);
        alert("Enseignant ajouté avec succès !");
        document.getElementById("enseignantForm").reset();  // Réinitialiser le formulaire
    })
    .catch((error) => {
        console.error("Erreur lors de l'ajout de l'enseignant : ", error);
        alert("Erreur lors de l'ajout de l'enseignant.");
    });
});
