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

// Fonction pour ajouter un Enseignant
document.getElementById("enseignantForm").addEventListener("submit", (event) => {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    const name = document.getElementById("name").value;
    const email = name.toLowerCase().replace(/\s+/g, '') + "@thados.com";  // Email basé sur le nom
    const password = "thados";  // Mot de passe par défaut

    // Créer un objet enseignant
    const enseignant = {
        name: name,
        email: email,
        password: password,
    };

    // Ajouter l'enseignant à Firestore
    db.collection("enseignants").add(enseignant)
        .then(() => {
            alert("Enseignant ajouté avec succès !");
            document.getElementById("enseignantForm").reset();
        })
        .catch((error) => {
            console.error("Erreur lors de l'ajout de l'enseignant : ", error);
        });
});

// Fonction pour ajouter une Option
document.getElementById("optionForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const option = document.getElementById("option").value;

    // Ajouter l'option à Firestore
    db.collection("options").add({ name: option })
        .then(() => {
            alert("Option ajoutée avec succès !");
            document.getElementById("optionForm").reset();
        })
        .catch((error) => {
            console.error("Erreur lors de l'ajout de l'option : ", error);
        });
});

// Fonction pour ajouter une Classe
document.getElementById("classeForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const classe = document.getElementById("classe").value;

    // Ajouter la classe à Firestore
    db.collection("classes").add({ name: classe })
        .then(() => {
            alert("Classe ajoutée avec succès !");
            document.getElementById("classeForm").reset();
        })
        .catch((error) => {
            console.error("Erreur lors de l'ajout de la classe : ", error);
        });
});

// Fonction pour ajouter un Cours
document.getElementById("coursForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const cours = document.getElementById("cours").value;
    const optionCours = document.getElementById("optionCours").value;

    // Ajouter le cours à Firestore
    db.collection("cours").add({
        name: cours,
        option: optionCours
    })
    .then(() => {
        alert("Cours ajouté avec succès !");
        document.getElementById("coursForm").reset();
    })
    .catch((error) => {
        console.error("Erreur lors de l'ajout du cours : ", error);
    });
});

// Fonction pour afficher les erreurs sur la page
function afficherErreur(message) {
    const errorContainer = document.getElementById('errorContainer');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorContainer.style.display = 'block';
}

// Intercepter les erreurs JavaScript non capturées
window.onerror = function (msg, url, lineNo, columnNo, error) {
    const message = `Message : ${msg} | URL : ${url} | Ligne : ${lineNo} | Colonne : ${columnNo}`;
    afficherErreur(message);
    // Retourner false pour empêcher l'affichage de l'alerte native du navigateur
    return false;
};