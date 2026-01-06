// Discovari AI – minimal front-end interactions
(function(){
  const sections = [...document.querySelectorAll('.section')];
  const navBtns = [...document.querySelectorAll('[data-goto]')];
  const setActive = (hash)=>{
    const id = hash?.replace('#','') || 'landing';
    sections.forEach(s=>s.classList.toggle('active', s.id===id));
    if(location.hash !== '#'+id) history.replaceState({},'', '#'+id);
  };
  navBtns.forEach(b=>b.addEventListener('click', (e)=>{
    const to = b.getAttribute('data-goto');
    const mode = b.getAttribute('data-mode');
    if(mode==='contractor') localStorage.setItem('mode','contractor');
    setActive(to);
  }));
  setActive(location.hash);

  // Report -> diagnosis mock
  const startBtn = document.getElementById('startProcessing');
  const spinner = document.getElementById('spinner');
  startBtn?.addEventListener('click', ()=>{
    spinner.classList.remove('hidden');
    setTimeout(()=>{
      spinner.classList.add('hidden');
      // simple pseudo diagnosis
      const cat = 'Roof Leak';
      const est = 'R8,500 – R12,000';
      const time = '2–4 hours';
      const conf = '0.86';
      document.getElementById('diagCategory').textContent = cat;
      document.getElementById('diagEstimate').textContent = est;
      document.getElementById('diagTime').textContent = time;
      document.getElementById('diagConfidence').textContent = conf;
      setActive('#diagnosis');
    }, 1200);
  });

  // Insurance modal
  const modal = document.getElementById('coverageModal');
  const benefitsList = document.getElementById('modalBenefits');
  const modalTitle = document.getElementById('modalTitle');
  const modalPremium = document.getElementById('modalPremium');
  let chosenCoverage = null;

  document.querySelectorAll('.periodic-grid .cell').forEach(cell=>{
    cell.addEventListener('click',()=>{
      const part = cell.dataset.part;
      const premium = cell.dataset.premium;
      const benefits = (cell.dataset.benefits||'').split(';').map(s=>s.trim()).filter(Boolean);
      modalTitle.textContent = part + ' Coverage';
      modalPremium.textContent = premium;
      benefitsList.innerHTML = benefits.map(b=>`<li>${b}</li>`).join('');
      modal.classList.remove('hidden');
      chosenCoverage = { part, premium, benefits };
    });
  });
  document.getElementById('btnAddCoverage')?.addEventListener('click',()=>{
    localStorage.setItem('coverage', JSON.stringify(chosenCoverage));
    modal.classList.add('hidden');
    setActive('#matching');
  });
  modal?.addEventListener('click', (e)=>{ if(e.target===modal) modal.classList.add('hidden'); });

  // Matching list mock
  const matchList = document.getElementById('matchList');
  function renderMatches(){
    if(!matchList) return;
    const teams = [
      {name:'Skyline Roofing Co.', rating:4.9, eta:'18 min', size:3, now:true},
      {name:'AquaSeal Pros', rating:4.8, eta:'25 min', size:4, now:false},
      {name:'Blueprint Builders', rating:4.7, eta:'32 min', size:2, now:true},
    ];
    matchList.innerHTML = teams.map(t=>`
      <div class="match">
        <div>
          <strong>${t.name}</strong>
          <div class="meta"><span>★ ${t.rating}</span><span>ETA ${t.eta}</span><span>${t.size} ppl</span></div>
        </div>
        <div class="cta-row">
          ${t.now?'<span class="badge-now">Available Now</span>':''}
          <button class="btn btn-orange" data-team="${t.name}">Book Now</button>
        </div>
      </div>`).join('');
    matchList.querySelectorAll('[data-team]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        localStorage.setItem('team', btn.dataset.team);
        setActive('#tracking');
      });
    });
  }
  renderMatches();

  // Chat mock
  const feed = document.getElementById('chatFeed');
  const input = document.getElementById('chatInput');
  const send = document.getElementById('chatSend');
  send?.addEventListener('click', ()=>{
    if(!input.value.trim()) return;
    const el = document.createElement('div');
    el.className='msg you';
    el.textContent = input.value;
    feed.appendChild(el);
    feed.scrollTop = feed.scrollHeight;
    input.value='';
  });

  // Payment summary hydration
  function hydratePayment(){
    const cov = localStorage.getItem('coverage');
    if(cov){
      const { part, premium } = JSON.parse(cov);
      const ins = document.getElementById('ins');
      if(ins) ins.textContent = `${part} (R${premium}/mo)`;
    }
  }
  hydratePayment();

  // Pay -> confirmation
  document.getElementById('payBtn')?.addEventListener('click',()=>{
    const svc = document.getElementById('svc').textContent;
    const amt = document.getElementById('amt').textContent;
    const hasCoverage = !!localStorage.getItem('coverage');
    const summary = `Cost: ${amt} • Service: ${svc}`;
    document.getElementById('confirmSummary').textContent = summary;
    if(hasCoverage){
      document.getElementById('discountBlock').classList.remove('hidden');
      document.getElementById('discCode').textContent = 'RENOVATE-20-' + Math.random().toString(36).slice(2,7).toUpperCase();
    }
    setActive('#confirmation');
  });
})();
