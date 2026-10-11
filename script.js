"use strict";
const projets = [
  { titre: "Plan d’adressage IPv4 d’une école", description: "Préparer un plan d’adressage pour séparer l’administration, les salles de cours et le laboratoire.", categorie: "reseau", image: "img/profils1.jpg", statut: "À réaliser", outils: ["IPv4", "Masques", "Sous-réseaux"] },
  { titre: "Maquette réseau d’une petite entreprise", description: "Dessiner puis simuler un réseau simple avec des postes, des commutateurs et un routeur.", categorie: "reseau", image: "img/profils2.jpg", statut: "À réaliser", outils: ["LAN", "Switch", "Routeur"] },
  { titre: "Étude d’un Wi-Fi pour visiteurs", description: "Proposer une configuration Wi-Fi simple et présenter les bonnes pratiques de sécurité.", categorie: "reseau", image: "img/profils3.jpg", statut: "À réaliser", outils: ["Wi-Fi", "Sécurité", "Documentation"] },
  { titre: "Découverte des services réseau", description: "Étudier le rôle de DHCP et DNS et préparer une fiche de configuration.", categorie: "systeme", image: "img/profils4.jpg", statut: "À réaliser", outils: ["DHCP", "DNS", "Systèmes"] },
  { titre: "Organisation de fichiers partagés", description: "Concevoir une structure de dossiers et décrire des règles d’accès pour les utilisateurs.", categorie: "systeme", image: "img/profils5.jpg", statut: "À réaliser", outils: ["Fichiers", "Permissions", "Organisation"] },
  { titre: "Portfolio étudiant", description: "Présenter mon parcours et mes compétences avec une page adaptée aux téléphones et aux ordinateurs.", categorie: "web", image: "img/profils6.jpg", statut: "En cours", outils: ["HTML5", "CSS3", "Bootstrap", "JavaScript"] }
];

const liste = document.querySelector("#liste-projets");

function afficherProjets(tableau) {
  let html = "";
  tableau.forEach(p => {
    const classeStatut = p.statut === "En cours" ? "in-progress" : "";
    const outils = p.outils.map(o => `<span>${o}</span>`).join("");
    html += `
      <div class="col">
        <article class="project-card">
          <div class="project-art"><img src="${p.image}" alt="Image du projet : ${p.titre}" loading="lazy"></div>
          <div class="card-body">
            <span class="project-status ${classeStatut}">${p.statut}</span>
            <h3 class="card-title">${p.titre}</h3>
            <p class="card-text">${p.description}</p>
            <div class="project-tools">${outils}</div>
          </div>
        </article>
      </div>`;
  });
  liste.innerHTML = html;
}
afficherProjets(projets);

const boutons = document.querySelectorAll("#filtres button");
boutons.forEach(bouton => {
  bouton.addEventListener("click", () => {
    boutons.forEach(b => b.classList.remove("active"));
    bouton.classList.add("active");
    const categorie = bouton.getAttribute("data-categorie");
    if (categorie === "tous") {
      afficherProjets(projets);
    } else {
      afficherProjets(projets.filter(p => p.categorie === categorie));
    }
  });
});

const btnTheme = document.querySelector("#btn-theme");
btnTheme.addEventListener("click", () => {
  const html = document.documentElement;
  if (html.getAttribute("data-bs-theme") === "dark") {
    html.setAttribute("data-bs-theme", "light");
    btnTheme.textContent = "Mode sombre";
  } else {
    html.setAttribute("data-bs-theme", "dark");
    btnTheme.textContent = "Mode clair";
  }
});
const btnTop = document.querySelector("#btn-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btnTop.classList.remove("d-none");
  } else {
    btnTop.classList.add("d-none");
  }
});
btnTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.querySelector("#annee").textContent = new Date().getFullYear();

const form = document.querySelector("#form-contact");
const zoneMessage = document.querySelector("#form-message");
const EMAIL = "VOTRE-EMAIL-ICI@example.com"; 
form.addEventListener("submit", event => {
  event.preventDefault();
  const nom = document.querySelector("#nom");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");

  const nomOk = nom.value.trim().length >= 2;
  const emailOk = email.value.includes("@") && email.value.includes(".");
  const messageOk = message.value.trim().length >= 10;

  nom.classList.toggle("is-invalid", !nomOk);
  email.classList.toggle("is-invalid", !emailOk);
  message.classList.toggle("is-invalid", !messageOk);

  if (nomOk && emailOk && messageOk) {
    const sujet = "Message du portfolio - " + nom.value;
    const corps = message.value + "\n\n" + nom.value + " (" + email.value + ")";
    window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(sujet) + "&body=" + encodeURIComponent(corps);
    zoneMessage.innerHTML = '<div class="alert alert-success">Votre application e-mail va s’ouvrir.</div>';
  } else {
    zoneMessage.innerHTML = '<div class="alert alert-danger">Vérifiez les champs signalés.</div>';
  }
});
