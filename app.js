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

// Fonction pour ajouter une Matière
document.getElementById("matiereForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const matiere = document.getElementById("matiere").value;

    // Ajouter la matière à Firestore
    db.collection("matieres").add({
        name: matiere,
        dateAjout: firebase.firestore.FieldValue.serverTimestamp() // Timestamp pour l'ajout
    })
    .then(() => {
        alert("Matière ajoutée avec succès !");
        document.getElementById("matiereForm").reset(); // Réinitialiser le formulaire
    })
    .catch((error) => {
        console.error("Erreur lors de l'ajout de la matière : ", error);
        alert("Erreur lors de l'ajout de la matière.");
    });
});

// Fonction pour ajouter une Classe
document.getElementById("classeForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const classe = document.getElementById("classe").value;

    // Ajouter la classe à Firestore
    db.collection("classes").add({
        name: classe,
        dateAjout: firebase.firestore.FieldValue.serverTimestamp() // Timestamp pour l'ajout
    })
    .then(() => {
        alert("Classe ajoutée avec succès !");
        document.getElementById("classeForm").reset(); // Réinitialiser le formulaire
    })
    .catch((error) => {
        console.error("Erreur lors de l'ajout de la classe : ", error);
        alert("Erreur lors de l'ajout de la classe.");
    });
});
