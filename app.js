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

// Récupérer les éléments du formulaire
const optionForm = document.getElementById('optionForm');
const coursForm = document.getElementById('coursForm');
const coursList = document.getElementById('coursList');

// Lorsque l'option et la classe sont sélectionnées
optionForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const option = document.getElementById('option').value;
    const classe = document.getElementById('classe').value;

    // Sauvegarder l'option et la classe dans Firestore
    db.collection("options_classes").add({
        option: option,
        classe: classe,
        cours: []
    }).then((docRef) => {
        console.log("Données enregistrées : ", docRef.id);
        coursList.classList.remove('hidden');
        localStorage.setItem('optionClasseId', docRef.id); // Stocker l'ID de l'option/classe pour la page suivante
    }).catch((error) => {
        console.error("Erreur lors de l'ajout de l'option et de la classe : ", error);
    });
});

// Ajouter un cours à l'option et classe sélectionnées
coursForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const cours = document.getElementById('cours').value;
    const optionClasseId = localStorage.getItem('optionClasseId'); // Récupérer l'ID de l'option/classe

    db.collection("options_classes").doc(optionClasseId).update({
        cours: firebase.firestore.FieldValue.arrayUnion(cours)
    }).then(() => {
        alert("Cours ajouté avec succès !");
        coursForm.reset();
    }).catch((error) => {
        console.error("Erreur lors de l'ajout du cours : ", error);
    });
});
