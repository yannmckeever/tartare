// Navigation simple : affiche la section demandée et met à jour le lien actif
document.addEventListener('DOMContentLoaded', function(){
  const links = document.querySelectorAll('.main-nav a');
  const pages = document.querySelectorAll('.page');
  const form = document.querySelector('.contact-form');
  const formNote = document.getElementById('formNote');
  const sendBtn = document.getElementById('sendBtn');

  function showPage(id){
    pages.forEach(p => p.id === id ? p.classList.add('active') : p.classList.remove('active'));
    links.forEach(a => a.dataset.target === id ? a.classList.add('active') : a.classList.remove('active'));
    // change hash without jumping
    if(history.replaceState) history.replaceState(null, '', '#' + id);
  }

  links.forEach(a => {
    a.addEventListener('click', (e) =>{
      e.preventDefault();
      const target = a.dataset.target;
      showPage(target);
      window.scrollTo({top:0, behavior:'smooth'});
    });
  });

  // Si un hash est présent au chargement, l'utiliser
  const initialHash = location.hash ? location.hash.replace('#','') : 'accueil';
  showPage(initialHash);

  // Formulaire (simulé)
  if(sendBtn){
    sendBtn.addEventListener('click', ()=>{
      const nom = form.querySelector('input[name="nom"]').value.trim();
      const email = form.querySelector('input[name="email"]').value.trim();
      const message = form.querySelector('textarea[name="message"]').value.trim();
      if(!nom || !email || !message){
        formNote.textContent = 'Merci de remplir tous les champs.';
        formNote.style.color = '#b3122a';
        return;
      }
      // Affichage de confirmation (ici on ne poste rien)
      formNote.textContent = 'Merci ' + nom + ' — message reçu ! Nous répondrons bientôt.';
      formNote.style.color = 'green';
      form.reset();
    });
  }
});