// ============================================================
// CNC Tchad — Admin CMS JavaScript
// ============================================================

const API = '';
let token = localStorage.getItem('cnc_token');
let currentAdmin = JSON.parse(localStorage.getItem('cnc_admin') || '{}');

// ---- Auth Guard ----
if (!token && !window.location.pathname.includes('login')) {
  window.location.href = '/admin/login';
}

// ---- Helpers ----
function headers(isJson = true) {
  const h = { Authorization: `Bearer ${token}` };
  if (isJson) h['Content-Type'] = 'application/json';
  return h;
}

async function apiFetch(url, options = {}) {
  const res = await fetch(API + url, options);
  if (res.status === 401 || res.status === 403) {
    logout();
    return null;
  }
  return res;
}

function showToast(msg, isError = false) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast' + (isError ? ' error' : '');
  t.style.display = 'block';
  setTimeout(() => { t.style.display = 'none'; }, 3000);
}

function statusBadge(statut) {
  return `<span class="badge-statut badge-${statut}">${statut.replace('_', ' ')}</span>`;
}

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('fr-FR');
}

function logout() {
  localStorage.removeItem('cnc_token');
  localStorage.removeItem('cnc_admin');
  window.location.href = '/admin/login';
}

function refreshIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// ---- Modal ----
function openModal(type, data = null) {
  const modalBox = document.querySelector('.modal-box');
  modalBox.classList.remove('modal-lg', 'modal-xl');
  if (type === 'article') modalBox.classList.add('modal-lg');

  document.getElementById('modal').style.display = 'flex';
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  if (type === 'article') {
    title.textContent = data ? 'Modifier l\'article' : 'Nouvel article';
    body.innerHTML = `
      <form id="articleForm" class="form" enctype="multipart/form-data">
        <div class="form-row">
          <div class="form-group"><label>Titre de l'article *</label><input name="titre" value="${data?.titre || ''}" placeholder="Titre accrocheur..." required /></div>
          <div class="form-group"><label>Lien permanent (Slug) *</label><input name="slug" value="${data?.slug || ''}" placeholder="ex: reunion-conseil-2025" required /></div>
        </div>
        
        <div class="form-row" style="grid-template-columns: 1fr 1fr 1fr;">
          <div class="form-group"><label>Catégorie</label>
            <select name="categorie">
              <option value="communique" ${data?.categorie === 'communique' ? 'selected' : ''}>Communiqué</option>
              <option value="enquete" ${data?.categorie === 'enquete' ? 'selected' : ''}>Enquête</option>
              <option value="evenement" ${data?.categorie === 'evenement' ? 'selected' : ''}>Événement</option>
            </select>
          </div>
          <div class="form-group"><label>Statut</label>
            <select name="statut">
              <option value="brouillon" ${data?.statut === 'brouillon' ? 'selected' : ''}>Brouillon</option>
              <option value="publie" ${data?.statut === 'publie' ? 'selected' : ''}>Publié</option>
              <option value="archive" ${data?.statut === 'archive' ? 'selected' : ''}>Archivé</option>
            </select>
          </div>
          <div class="form-group"><label>Date de publication</label>
            <input type="date" name="date_publication" value="${data?.date_publication?.slice(0, 10) || ''}" />
          </div>
        </div>

        <div class="form-group"><label>Résumé court (Extrait)</label><textarea name="extrait" rows="2" placeholder="Une brève introduction pour la liste des actualités...">${data?.extrait || ''}</textarea></div>
        <div class="form-group"><label>Contenu complet de l'article</label><textarea name="contenu" rows="10" placeholder="Écrivez votre article ici...">${data?.contenu || ''}</textarea></div>
        
        <div class="form-card" style="padding: 16px; margin-bottom: 20px; background: #f8fafc; border-style: dashed;">
          <div class="form-row">
            <div class="form-group"><label>Image via URL</label><input name="image_url" value="${data?.image_url || ''}" placeholder="https://image-externe.com/photo.jpg" /></div>
            <div class="form-group"><label>Ou Télécharger un fichier</label><input type="file" name="image" accept="image/*" /></div>
          </div>
          ${data?.image_path ? `
          <div style="margin-top:10px;">
            <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:4px;">Image actuelle :</p>
            <img src="/${data.image_path}" style="max-height:120px; border-radius:8px; border: 1px solid var(--border);" />
          </div>` : ''}
        </div>

        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" onclick="closeModal()">Annuler</button>
          <button type="submit" class="btn btn-primary" style="padding: 12px 24px;">
            <i data-lucide="${data ? 'save' : 'plus'}" class="icon-sm" style="margin-right: 8px;"></i> ${data ? 'Enregistrer les modifications' : 'Publier l\'article'}
          </button>
        </div>
      </form>`;
    document.getElementById('articleForm').onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const url = data ? `/api/articles/admin/${data.id}` : '/api/articles/admin';
      const method = data ? 'PUT' : 'POST';
      const res = await apiFetch(url, { method, headers: { Authorization: `Bearer ${token}` }, body: fd });
      if (res?.ok) { showToast(data ? 'Article mis à jour !' : 'Article créé !'); closeModal(); loadArticles(); }
      else showToast('Erreur lors de l\'enregistrement', true);
    };
  }



  if (type === 'document') {
    title.textContent = data ? 'Modifier le document' : 'Nouveau document';
    body.innerHTML = `
      <form id="documentForm" enctype="multipart/form-data">
        <div class="form-group"><label>Titre *</label><input name="titre" value="${data?.titre || ''}" required /></div>
        <div class="form-group"><label>Catégorie</label>
          <select name="categorie">
            <option>Lois & Règlements</option><option>Rapports annuels</option>
            <option>Études économiques</option><option>Guides pratiques</option>
            <option>Formulaires</option><option>Avis</option>
          </select>
        </div>
        <div class="form-group"><label>Fichier (PDF, Word, Excel)</label><input type="file" name="fichier" accept=".pdf,.doc,.docx,.xls,.xlsx" /></div>
        <div class="form-group"><label>Date</label><input type="date" name="date_publication" value="${data?.date_publication?.slice(0,10) || ''}" /></div>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" onclick="closeModal()">Annuler</button>
          <button type="submit" class="btn btn-primary">
            <i data-lucide="${data ? 'save' : 'upload'}" class="icon-sm" style="margin-right: 6px;"></i> ${data ? 'Mettre à jour' : 'Uploader'}
          </button>
        </div>
      </form>`;
    document.getElementById('documentForm').onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const url = data ? `/api/documents/admin/${data.id}` : '/api/documents/admin';
      const method = data ? 'PUT' : 'POST';
      const res = await apiFetch(url, { method, headers: { Authorization: `Bearer ${token}` }, body: fd });
      if (res?.ok) { showToast('Document enregistré !'); closeModal(); loadDocuments(); }
      else showToast('Erreur', true);
    };
  }

  if (type === 'galerie') {
    title.textContent = data ? 'Modifier la photo' : 'Nouvelle photo';
    body.innerHTML = `
      <form id="galerieForm" enctype="multipart/form-data">
        <div class="form-group"><label>Titre *</label><input name="titre" value="${data?.titre || ''}" required /></div>
        <div class="form-group"><label>Description</label><textarea name="description" rows="2">${data?.description || ''}</textarea></div>
        <div class="form-row">
          <div class="form-group"><label>Catégorie</label>
            <select name="categorie">
              <option>Réunions du Conseil</option><option>Sessions de sensibilisation</option>
              <option>Partenariats</option><option>Événements</option><option>Enquêtes & Investigations</option>
            </select>
          </div>
          <div class="form-group"><label>Date</label><input type="date" name="date_evenement" value="${data?.date_evenement?.slice(0,10) || ''}" /></div>
        </div>
        <div class="form-group"><label>Image</label><input type="file" name="image" accept="image/*" /></div>
        <div class="form-group"><label>Ordre d'affichage</label><input type="number" name="ordre" value="${data?.ordre || 0}" /></div>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" onclick="closeModal()">Annuler</button>
          <button type="submit" class="btn btn-primary">
            <i data-lucide="${data ? 'save' : 'plus'}" class="icon-sm" style="margin-right: 6px;"></i> ${data ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>
      </form>`;
    document.getElementById('galerieForm').onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const url = data ? `/api/galerie/admin/${data.id}` : '/api/galerie/admin';
      const method = data ? 'PUT' : 'POST';
      const res = await apiFetch(url, { method, headers: { Authorization: `Bearer ${token}` }, body: fd });
      if (res?.ok) { showToast('Photo enregistrée !'); closeModal(); loadGalerie(); }
      else showToast('Erreur', true);
    };
  }

  if (type === 'mission') {
    title.textContent = data ? 'Modifier la mission' : 'Nouvelle mission';
    body.innerHTML = `
      <form id="missionForm">
        <div class="form-group"><label>Titre *</label><input name="titre" value="${data?.titre || ''}" required /></div>
        <div class="form-group"><label>Description</label><textarea name="description" rows="3">${data?.description || ''}</textarea></div>
        <div class="form-row">
          <div class="form-group"><label>Icône (Lucide)</label><input name="icone" value="${data?.icone || 'shield'}" placeholder="shield, zap, users..." /></div>
          <div class="form-group"><label>Ordre</label><input type="number" name="ordre" value="${data?.ordre || 0}" /></div>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" onclick="closeModal()">Annuler</button>
          <button type="submit" class="btn btn-primary">Enregistrer</button>
        </div>
      </form>`;
    document.getElementById('missionForm').onsubmit = async (e) => {
      e.preventDefault();
      const body = Object.fromEntries(new FormData(e.target));
      const url = data ? `/api/missions/admin/${data.id}` : '/api/missions/admin';
      const method = data ? 'PUT' : 'POST';
      const res = await apiFetch(url, { method, headers: headers(), body: JSON.stringify(body) });
      if (res?.ok) { showToast('Mission enregistrée !'); closeModal(); loadMissions(); }
    };
  }

  if (type === 'historique') {
    title.textContent = data ? 'Modifier la date' : 'Ajouter une date';
    body.innerHTML = `
      <form id="historiqueForm">
        <div class="form-group"><label>Année *</label><input name="annee" value="${data?.annee || ''}" placeholder="ex: 2024" required /></div>
        <div class="form-group"><label>Description</label><textarea name="description" rows="3">${data?.description || ''}</textarea></div>
        <div class="form-group"><label>Ordre</label><input type="number" name="ordre" value="${data?.ordre || 0}" /></div>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" onclick="closeModal()">Annuler</button>
          <button type="submit" class="btn btn-primary">Enregistrer</button>
        </div>
      </form>`;
    document.getElementById('historiqueForm').onsubmit = async (e) => {
      e.preventDefault();
      const body = Object.fromEntries(new FormData(e.target));
      // Note: Missions endpoint used for historical timeline in this context
      const url = data ? `/api/missions/admin/historique/${data.id}` : '/api/missions/admin/historique';
      const method = data ? 'PUT' : 'POST';
      const res = await apiFetch(url, { method, headers: headers(), body: JSON.stringify(body) });
      if (res?.ok) { showToast('Historique mis à jour !'); closeModal(); loadHistorique(); }
    };
  }

  if (type === 'faq') {
    title.textContent = data ? 'Modifier la FAQ' : 'Nouvelle question';
    body.innerHTML = `
      <form id="faqForm">
        <div class="form-group"><label>Question *</label><input name="question" value="${data?.question || ''}" required /></div>
        <div class="form-group"><label>Réponse</label><textarea name="reponse" rows="4">${data?.reponse || ''}</textarea></div>
        <div class="form-row">
          <div class="form-group"><label>Thème</label><input name="theme" value="${data?.theme || ''}" placeholder="Procédure, Droit..." /></div>
          <div class="form-group"><label>Ordre</label><input type="number" name="ordre" value="${data?.ordre || 0}" /></div>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" onclick="closeModal()">Annuler</button>
          <button type="submit" class="btn btn-primary">Enregistrer</button>
        </div>
      </form>`;
    document.getElementById('faqForm').onsubmit = async (e) => {
      e.preventDefault();
      const body = Object.fromEntries(new FormData(e.target));
      const url = data ? `/api/faq/admin/${data.id}` : '/api/faq/admin';
      const method = data ? 'PUT' : 'POST';
      const res = await apiFetch(url, { method, headers: headers(), body: JSON.stringify(body) });
      if (res?.ok) { showToast('FAQ mise à jour !'); closeModal(); loadFAQ(); }
    };
  }

  if (type === 'processus') {
    title.textContent = data ? 'Modifier l\'étape' : 'Ajouter une étape';
    body.innerHTML = `
      <form id="processusForm">
        <div class="form-group"><label>Titre *</label><input name="titre" value="${data?.titre || ''}" required /></div>
        <div class="form-group"><label>Description</label><textarea name="description" rows="3">${data?.description || ''}</textarea></div>
        <div class="form-group"><label>Ordre</label><input type="number" name="ordre" value="${data?.ordre || 0}" /></div>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" onclick="closeModal()">Annuler</button>
          <button type="submit" class="btn btn-primary">Enregistrer</button>
        </div>
      </form>`;
    document.getElementById('processusForm').onsubmit = async (e) => {
      e.preventDefault();
      const body = Object.fromEntries(new FormData(e.target));
      const url = data ? `/api/missions/admin/etapes/${data.id}` : '/api/missions/admin/etapes';
      const method = data ? 'PUT' : 'POST';
      const res = await apiFetch(url, { method, headers: headers(), body: JSON.stringify(body) });
      if (res?.ok) { showToast('Étape enregistrée !'); closeModal(); loadProcessus(); }
    };
  }

  if (type === 'service') {
    title.textContent = data ? 'Modifier le service' : 'Ajouter un service';
    body.innerHTML = `
      <form id="serviceForm">
        <div class="form-group"><label>Titre *</label><input name="titre" value="${data?.titre || ''}" required /></div>
        <div class="form-group"><label>Description</label><textarea name="description" rows="2">${data?.description || ''}</textarea></div>
        <div class="form-row">
          <div class="form-group"><label>Icône</label><input name="icone" value="${data?.icone || ''}" placeholder="Search, FileText..." /></div>
          <div class="form-group"><label>Lien</label><input name="lien" value="${data?.lien || ''}" placeholder="/plaintes" /></div>
        </div>
        <div class="form-group"><label>Ordre</label><input type="number" name="ordre" value="${data?.ordre || 0}" /></div>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" onclick="closeModal()">Annuler</button>
          <button type="submit" class="btn btn-primary">Enregistrer</button>
        </div>
      </form>`;
    document.getElementById('serviceForm').onsubmit = async (e) => {
      e.preventDefault();
      const body = Object.fromEntries(new FormData(e.target));
      const url = data ? `/api/services/admin/${data.id}` : '/api/services/admin';
      const method = data ? 'PUT' : 'POST';
      const res = await apiFetch(url, { method, headers: headers(), body: JSON.stringify(body) });
      if (res?.ok) { showToast('Service mis à jour !'); closeModal(); loadServices(); }
    };
  }

  if (type === 'membre') {
    title.textContent = data ? 'Modifier le membre' : 'Nouveau membre';
    body.innerHTML = `
      <form id="membreForm" enctype="multipart/form-data">
        <div class="form-group"><label>Nom complet *</label><input name="nom" value="${data?.nom || ''}" required /></div>
        <div class="form-group"><label>Fonction</label><input name="fonction" value="${data?.fonction || ''}" /></div>
        <div class="form-group"><label>Biographie</label><textarea name="bio" rows="3">${data?.bio || ''}</textarea></div>
        <div class="form-row">
          <div class="form-group"><label>Initiales</label><input name="initiales" value="${data?.initiales || ''}" maxlength="3" /></div>
          <div class="form-group"><label>Ordre</label><input type="number" name="ordre" value="${data?.ordre || 0}" /></div>
        </div>
        <div class="form-group"><label>Photo</label><input type="file" name="photo" accept="image/*" /></div>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" onclick="closeModal()">Annuler</button>
          <button type="submit" class="btn btn-primary">
            <i data-lucide="${data ? 'save' : 'plus'}" class="icon-sm" style="margin-right: 6px;"></i> ${data ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>
      </form>`;
    document.getElementById('membreForm').onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const url = data ? `/api/membres/admin/${data.id}` : '/api/membres/admin';
      const method = data ? 'PUT' : 'POST';
      const res = await apiFetch(url, { method, headers: { Authorization: `Bearer ${token}` }, body: fd });
      if (res?.ok) { showToast('Membre enregistré !'); closeModal(); loadMembres(); }
      else showToast('Erreur', true);
    };
  }

  if (type === 'plainte-detail') {
    title.textContent = `Plainte — ${data.reference}`;
    body.innerHTML = `
      <div class="form-group"><strong>Plaignant :</strong> ${data.prenom || ''} ${data.nom || 'Anonyme'}</div>
      <div class="form-group"><strong>Email :</strong> ${data.email || '—'} | <strong>Tél :</strong> ${data.telephone || '—'}</div>
      <div class="form-group"><strong>Entreprise concernée :</strong> ${data.entreprise_concernee || '—'}</div>
      <div class="form-group"><strong>Description :</strong><br/><p style="margin-top:6px; line-height:1.6">${data.description}</p></div>
      <div class="form-group"><strong>Statut :</strong>
        <select id="detailStatut" class="form-select-sm" style="margin-left:8px">
          <option value="recue" ${data.statut === 'recue' ? 'selected' : ''}>Reçue</option>
          <option value="en_cours" ${data.statut === 'en_cours' ? 'selected' : ''}>En cours</option>
          <option value="traitee" ${data.statut === 'traitee' ? 'selected' : ''}>Traitée</option>
          <option value="classee" ${data.statut === 'classee' ? 'selected' : ''}>Classée</option>
        </select>
      </div>
      <div class="form-group"><label>Note interne</label><textarea id="detailNote" rows="3">${data.note_interne || ''}</textarea></div>
      <div class="modal-actions">
        ${data.email ? `<a href="mailto:${data.email}?subject=Votre plainte ${data.reference}" class="btn btn-ghost"><i data-lucide="mail" class="icon-sm" style="margin-right: 6px;"></i> Répondre par email</a>` : ''}
        <button class="btn btn-primary" onclick="savePlainte(${data.id})">
          <i data-lucide="save" class="icon-sm" style="margin-right: 6px;"></i> Enregistrer
        </button>
      </div>`;
  }

  if (type === 'admin') {
    title.textContent = 'Nouveau compte administrateur';
    body.innerHTML = `
      <form id="adminForm">
        <div class="form-group"><label>Identifiant *</label><input name="username" required /></div>
        <div class="form-group"><label>Email</label><input type="email" name="email" /></div>
        <div class="form-group"><label>Mot de passe *</label><input type="password" name="password" required /></div>
        <div class="form-group"><label>Rôle</label>
          <select name="role">
            <option value="editeur">Éditeur</option>
            <option value="lecteur">Lecteur</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" onclick="closeModal()">Annuler</button>
          <button type="submit" class="btn btn-primary">
            <i data-lucide="plus" class="icon-sm" style="margin-right: 6px;"></i> Créer
          </button>
        </div>
      </form>`;
    document.getElementById('adminForm').onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const body = Object.fromEntries(fd.entries());
      const res = await apiFetch('/api/admin/admins', { method: 'POST', headers: headers(), body: JSON.stringify(body) });
      if (res?.ok) { showToast('Compte créé !'); closeModal(); loadAdmins(); }
      else showToast('Erreur', true);
    };
  }
  
  refreshIcons();
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// ---- Data Loaders ----
async function loadArticles() {
  const res = await apiFetch('/api/articles/admin/all', { headers: headers() });
  if (!res) return;
  const articles = await res.json();
  const tb = document.getElementById('articlesTableBody');
  if (!tb) return;
  tb.innerHTML = articles.length === 0 ? `<tr><td colspan="5" class="loading">Aucun article</td></tr>` :
    articles.map(a => `<tr>
      <td><strong>${a.titre}</strong></td>
      <td>${a.categorie || '—'}</td>
      <td>${formatDate(a.date_publication)}</td>
      <td>${statusBadge(a.statut)}</td>
      <td>
        <button class="btn btn-ghost btn-sm" onclick='openModal("article", ${JSON.stringify(a).replace(/'/g, "&#39;")})' title="Modifier"><i data-lucide="edit-2" class="icon-sm"></i></button>
        <button class="btn btn-danger btn-sm" onclick="deleteItem('articles', ${a.id})" title="Supprimer"><i data-lucide="trash-2" class="icon-sm"></i></button>
      </td>
    </tr>`).join('');
    
  refreshIcons();
}



async function loadDocuments() {
  const res = await apiFetch('/api/documents', { headers: headers() });
  if (!res) return;
  const items = await res.json();
  const tb = document.getElementById('documentsTableBody');
  if (!tb) return;
  tb.innerHTML = items.length === 0 ? `<tr><td colspan="5" class="loading">Aucun document</td></tr>` :
    items.map(d => `<tr>
      <td>${d.titre}</td>
      <td>${d.categorie || '—'}</td>
      <td><span class="badge-statut badge-publie"><i data-lucide="file" class="icon-sm" style="vertical-align: middle; margin-right: 4px;"></i> ${d.type_fichier}</span></td>
      <td>${formatDate(d.date_publication)}</td>
      <td>
        <button class="btn btn-ghost btn-sm" onclick='openModal("document", ${JSON.stringify(d).replace(/'/g, "&#39;")})' title="Modifier"><i data-lucide="edit-2" class="icon-sm"></i></button>
        <button class="btn btn-danger btn-sm" onclick="deleteItem('documents', ${d.id})" title="Supprimer"><i data-lucide="trash-2" class="icon-sm"></i></button>
      </td>
    </tr>`).join('');
    
  refreshIcons();
}

async function loadGalerie() {
  const res = await apiFetch('/api/galerie/admin/all', { headers: headers() });
  if (!res) return;
  const items = await res.json();
  const grid = document.getElementById('galerieGrid');
  if (!grid) return;
  grid.innerHTML = items.length === 0 ? '<p class="loading">Aucune photo</p>' :
    items.map(g => `
      <div class="galerie-card">
        <div class="galerie-thumb">
          ${g.image_path ? `<img src="/${g.image_path}" alt="${g.titre}" />` : '<i data-lucide="image" style="width: 48px; height: 48px; opacity: 0.5;"></i>'}
        </div>
        <div class="galerie-info">
          <p>${g.titre}</p>
          <span>${g.categorie || '—'}</span>
          <div style="margin-top:8px; display:flex; gap:6px;">
            <button class="btn btn-ghost btn-sm" onclick='openModal("galerie", ${JSON.stringify(g).replace(/'/g, "&#39;")})'><i data-lucide="edit-2" class="icon-sm"></i></button>
            <button class="btn btn-danger btn-sm" onclick="deleteItem('galerie', ${g.id})"><i data-lucide="trash-2" class="icon-sm"></i></button>
          </div>
        </div>
      </div>`).join('');
      
  refreshIcons();
}

async function loadPlaintes() {
  const statut = document.getElementById('filtrePlaintes')?.value;
  const url = '/api/plaintes/admin/all' + (statut ? `?statut=${statut}` : '');
  const res = await apiFetch(url, { headers: headers() });
  if (!res) return;
  const items = await res.json();
  const tb = document.getElementById('plaintesTableBody');
  if (!tb) return;
  document.getElementById('badgePlaintes').textContent = items.filter(p => p.statut === 'recue').length;
  tb.innerHTML = items.length === 0 ? `<tr><td colspan="5" class="loading">Aucune plainte</td></tr>` :
    items.map(p => `<tr>
      <td><code>${p.reference}</code></td>
      <td>${p.prenom || ''} ${p.nom || 'Anonyme'}</td>
      <td>${formatDate(p.created_at)}</td>
      <td>${statusBadge(p.statut)}</td>
      <td><button class="btn btn-ghost btn-sm" onclick='openModal("plainte-detail", ${JSON.stringify(p).replace(/'/g, "&#39;")})'><i data-lucide="eye" class="icon-sm" style="margin-right: 4px;"></i> Voir</button></td>
    </tr>`).join('');
    
  refreshIcons();
}

async function savePlainte(id) {
  const statut = document.getElementById('detailStatut').value;
  const note = document.getElementById('detailNote').value;
  await apiFetch(`/api/plaintes/admin/${id}/statut`, { method: 'PATCH', headers: headers(), body: JSON.stringify({ statut }) });
  await apiFetch(`/api/plaintes/admin/${id}/note`, { method: 'PUT', headers: headers(), body: JSON.stringify({ note_interne: note }) });
  showToast('Plainte mise à jour !');
  closeModal();
  loadPlaintes();
}

async function loadMembres() {
  const res = await apiFetch('/api/membres', {});
  if (!res) return;
  const items = await res.json();
  const tb = document.getElementById('membresTableBody');
  if (!tb) return;
  tb.innerHTML = items.length === 0 ? `<tr><td colspan="5" class="loading">Aucun membre</td></tr>` :
    items.map(m => `<tr>
      <td>${m.nom}</td>
      <td>${m.fonction || '—'}</td>
      <td>${m.ordre}</td>
      <td>${m.actif ? '<i data-lucide="check-circle" class="icon-sm" style="color: var(--success);"></i>' : '<i data-lucide="x-circle" class="icon-sm" style="color: var(--danger);"></i>'}</td>
      <td>
        <button class="btn btn-ghost btn-sm" onclick='openModal("membre", ${JSON.stringify(m).replace(/'/g, "&#39;")})' title="Modifier"><i data-lucide="edit-2" class="icon-sm"></i></button>
        <button class="btn btn-danger btn-sm" onclick="deleteItem('membres', ${m.id})" title="Supprimer"><i data-lucide="trash-2" class="icon-sm"></i></button>
      </td>
    </tr>`).join('');
    
  refreshIcons();
}

async function loadPresident() {
  const res = await apiFetch('/api/parametres', {});
  if (!res) return;
  const data = await res.json();
  const f = id => document.getElementById(id);
  if (f('presidentNom')) f('presidentNom').value = data.president_nom || '';
  if (f('presidentTitre')) f('presidentTitre').value = data.president_titre || '';
  if (f('presidentMessage')) f('presidentMessage').value = data.president_message || '';
  if (f('heroTitle')) f('heroTitle').value = data.hero_title || '';
  if (f('heroSubtitle')) f('heroSubtitle').value = data.hero_subtitle || '';
  if (f('horairesOuverture')) f('horairesOuverture').value = data.horaires_ouverture || '';
  if (f('siegeSocial')) f('siegeSocial').value = data.siege_social || '';
  if (f('presP1')) f('presP1').value = data.presentation_p1 || '';
  if (f('presP2')) f('presP2').value = data.presentation_p2 || '';
  if (f('presP3')) f('presP3').value = data.presentation_p3 || '';
  if (f('footerDescription')) f('footerDescription').value = data.footer_description || '';
  if (f('footerTelephone')) f('footerTelephone').value = data.footer_telephone || '';
  if (f('footerEmail')) f('footerEmail').value = data.footer_email || '';
  if (f('footerAdresse')) f('footerAdresse').value = data.footer_adresse || '';
}

async function loadMissions() {
  const res = await apiFetch('/api/missions', {});
  const items = await res.json();
  const tb = document.getElementById('missionsTableBody');
  if (!tb) return;
  tb.innerHTML = items.map(m => `<tr>
    <td><strong>${m.titre}</strong></td>
    <td><i data-lucide="${m.icone}"></i> ${m.icone}</td>
    <td>${m.ordre}</td>
    <td>
      <button class="btn btn-ghost btn-sm" onclick='openModal("mission", ${JSON.stringify(m).replace(/'/g, "&#39;")})'><i data-lucide="edit-2" class="icon-sm"></i></button>
      <button class="btn btn-danger btn-sm" onclick="deleteItem('missions', ${m.id})"><i data-lucide="trash-2" class="icon-sm"></i></button>
    </td>
  </tr>`).join('');
  refreshIcons();
}

async function loadHistorique() {
  const res = await apiFetch('/api/missions/historique', {});
  const items = await res.json();
  const tb = document.getElementById('historiqueTableBody');
  if (!tb) return;
  tb.innerHTML = items.map(h => `<tr>
    <td>${h.annee}</td>
    <td>${h.description}</td>
    <td>${h.ordre}</td>
    <td>
      <button class="btn btn-ghost btn-sm" onclick='openModal("historique", ${JSON.stringify(h).replace(/'/g, "&#39;")})'><i data-lucide="edit-2" class="icon-sm"></i></button>
      <button class="btn btn-danger btn-sm" onclick="deleteHistory(${h.id})"><i data-lucide="trash-2" class="icon-sm"></i></button>
    </td>
  </tr>`).join('');
  refreshIcons();
}

async function deleteHistory(id) {
  if (!confirm('Supprimer ?')) return;
  await apiFetch(`/api/missions/admin/historique/${id}`, { method: 'DELETE', headers: headers() });
  loadHistorique();
}

async function loadProcessus() {
  const data = await apiFetch('/api/missions/admin/etapes');
  const tbody = document.getElementById('processusTableBody');
  tbody.innerHTML = data.map(i => `
    <tr>
      <td><span class="badge badge-outline">${i.ordre}</span></td>
      <td><strong>${i.titre}</strong></td>
      <td><p class="text-truncate" style="max-width: 300px;">${i.description}</p></td>
      <td style="text-align: right;">
        <button class="btn btn-sm btn-ghost" onclick="editItem('processus', ${i.id})"><i data-lucide="edit-2" class="w-4 h-4"></i></button>
        <button class="btn btn-sm btn-ghost text-destructive" onclick="deleteItem('processus', ${i.id})"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      </td>
    </tr>
  `).join('');
  lucide.createIcons();
}

async function loadFAQ() {
  const res = await apiFetch('/api/faq', {});
  const items = await res.json();
  const tb = document.getElementById('faqTableBody');
  if (!tb) return;
  tb.innerHTML = items.map(f => `<tr>
    <td><strong>${f.question}</strong></td>
    <td>${f.theme || '—'}</td>
    <td>${f.ordre}</td>
    <td>
      <button class="btn btn-ghost btn-sm" onclick='openModal("faq", ${JSON.stringify(f).replace(/'/g, "&#39;")})'><i data-lucide="edit-2" class="icon-sm"></i></button>
      <button class="btn btn-danger btn-sm" onclick="deleteItem('faq', ${f.id})"><i data-lucide="trash-2" class="icon-sm"></i></button>
    </td>
  </tr>`).join('');
  refreshIcons();
}

async function loadServices() {
  const res = await apiFetch('/api/services', {});
  const items = await res.json();
  const tb = document.getElementById('servicesTableBody');
  if (!tb) return;
  tb.innerHTML = items.map(s => `<tr>
    <td><strong>${s.titre}</strong></td>
    <td><i data-lucide="${s.icone}"></i> ${s.icone}</td>
    <td>${s.lien}</td>
    <td>${s.ordre}</td>
    <td>
      <button class="btn btn-ghost btn-sm" onclick='openModal("service", ${JSON.stringify(s).replace(/'/g, "&#39;")})'><i data-lucide="edit-2" class="icon-sm"></i></button>
      <button class="btn btn-danger btn-sm" onclick="deleteItem('services', ${s.id})"><i data-lucide="trash-2" class="icon-sm"></i></button>
    </td>
  </tr>`).join('');
  refreshIcons();
}

async function loadAdmins() {
  const res = await apiFetch('/api/admin/admins', { headers: headers() });
  if (!res) return;
  const items = await res.json();
  const tb = document.getElementById('adminsTableBody');
  if (!tb) return;
  tb.innerHTML = items.map(a => `<tr>
    <td><strong>${a.username}</strong></td>
    <td>${a.email || '—'}</td>
    <td><span class="badge-statut ${a.role === 'super_admin' ? 'badge-publie' : 'badge-brouillon'}">${a.role}</span></td>
    <td>${a.actif ? '<i data-lucide="check-circle" class="icon-sm" style="color: var(--success); vertical-align: middle; margin-right: 4px;"></i> Actif' : '<i data-lucide="x-circle" class="icon-sm" style="color: var(--danger); vertical-align: middle; margin-right: 4px;"></i> Désactivé'}</td>
    <td>${a.derniere_connexion ? formatDate(a.derniere_connexion) : 'Jamais'}</td>
    <td>
      <button class="btn btn-danger btn-sm" onclick="deleteItem('admins', ${a.id})"><i data-lucide="user-x" class="icon-sm" style="margin-right: 4px;"></i> Désactiver</button>
    </td>
  </tr>`).join('');
  
  refreshIcons();
}

async function loadStats() {
  const [arts, gal, docs] = await Promise.all([
    apiFetch('/api/articles?limit=100').then(r => r?.json()).catch(() => []),
    apiFetch('/api/galerie').then(r => r?.json()).catch(() => []),
    apiFetch('/api/documents').then(r => r?.json()).catch(() => []),
  ]);
  const plaints = await apiFetch('/api/plaintes/admin/all', { headers: headers() }).then(r => r?.json()).catch(() => []);
  const f = id => document.getElementById(id);
  if (f('statArticles')) f('statArticles').textContent = (arts || []).length;
  if (f('statGalerie')) f('statGalerie').textContent = (gal || []).length;
  if (f('statDocuments')) f('statDocuments').textContent = (docs || []).length;
  if (f('statPlaintes')) f('statPlaintes').textContent = (plaints || []).length;
  if (f('badgePlaintes')) f('badgePlaintes').textContent = (plaints || []).filter(p => p.statut === 'recue').length;
}

async function deleteItem(resource, id) {
  if (!confirm('Confirmer la suppression ?')) return;
  const res = await apiFetch(`/api/${resource}/admin/${id}`, { method: 'DELETE', headers: headers() });
  if (res?.ok || res?.status === 204) {
    showToast('Supprimé !');
    const loaders = { articles: loadArticles, documents: loadDocuments, galerie: loadGalerie, membres: loadMembres, admins: loadAdmins, missions: loadMissions, faq: loadFAQ, services: loadServices };
    loaders[resource]?.();
  } else showToast('Erreur lors de la suppression', true);
}

// ---- Navigation ----
function navigateTo(section) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
  const nav = document.querySelector(`[data-section="${section}"]`);
  if (nav) nav.classList.add('active');
  const sec = document.getElementById(`section-${section}`);
  if (sec) sec.classList.add('active');
  document.getElementById('pageTitle').textContent = nav?.textContent.trim() || 'Tableau de bord';

  const loaders = {
    accueil: loadStats,
    actualites: loadArticles,
    documents: loadDocuments,
    galerie: loadGalerie,
    president: loadPresident,
    membres: loadMembres,
    missions: loadMissions,
    historique: loadHistorique,
    processus: loadProcessus,
    faq: loadFAQ,
    services_list: loadServices,
    plaintes: loadPlaintes,
    admins: loadAdmins,
  };
  loaders[section]?.();
}

// ---- Init Dashboard ----
if (!window.location.pathname.includes('login')) {
  // Afficher les infos admin
  const adminNameEl = document.getElementById('adminName');
  const adminRoleEl = document.getElementById('adminRole');
  if (adminNameEl) adminNameEl.textContent = currentAdmin.username || 'Admin';
  if (adminRoleEl) adminRoleEl.textContent = currentAdmin.role || '';

  // Afficher les éléments super_admin
  if (currentAdmin.role === 'super_admin') {
    document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'flex');
  }

  // Navigation
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(el.dataset.section);
    });
  });

  // Déconnexion
  document.getElementById('logoutBtn')?.addEventListener('click', logout);

  // Formulaire Président
  document.getElementById('presidentForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const res = await apiFetch('/api/parametres/admin', {
      method: 'PUT', headers: { Authorization: `Bearer ${token}` }, body: fd
    });
    if (res?.ok) showToast('Paramètres enregistrés !');
    else showToast('Erreur', true);
  });

  // Filtre plaintes
  document.getElementById('filtrePlaintes')?.addEventListener('change', loadPlaintes);

  // Chargement initial
  navigateTo('accueil');

  // Fermer modal via overlay
  document.getElementById('modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
  });
  
  // Rendu initial des icônes
  refreshIcons();
}
