// ═══════════════════════════════════════════════════
//   F1 UNIVERSE — MAIN JAVASCRIPT
//   Save as: f1.js  (must be in same folder as f1.html)
// ═══════════════════════════════════════════════════

// ─── NAVIGATION ───────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  document.querySelectorAll('.nav-links a').forEach(function(a) { a.classList.remove('active'); });
  var page = document.getElementById(id);
  if (page) page.classList.add('active');
  var nav = document.getElementById('nav-' + id);
  if (nav) nav.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('navLinks').classList.remove('open');
  if (id === 'standings') setTimeout(animateBars, 300);
  if (id === 'compare') buildComparison();
}

// ─── DARK / LIGHT TOGGLE ──────────────────────
document.getElementById('darkToggle').addEventListener('click', function() {
  var html = document.documentElement;
  if (html.getAttribute('data-theme') === 'dark') {
    html.setAttribute('data-theme', 'light');
    this.textContent = '🌙';
  } else {
    html.setAttribute('data-theme', 'dark');
    this.textContent = '☀️';
  }
});

// ─── CARS ─────────────────────────────────────
var carsData = [
  {team:'RED BULL RACING',model:'Red Bull RB22',color:'#3185FC',bg:'#1E3A5F',img:'https://i.pinimg.com/736x/ed/db/8b/eddb8b9e6f51dd8ee19a849858a85a4c.jpg',desc:"All-new Honda RBPT 2026 power unit. Verstappen and Tsunoda carry Red Bull's hopes into a new regulatory era after four straight Constructors' titles.",hp:'1000+',weight:'798kg',speed:'355km/h',engine:'Honda RBPT',url:'https://www.redbullracing.com'},
  {team:'SCUDERIA FERRARI',model:'Ferrari SF-26',color:'#FF4444',bg:'#8B0000',img:'https://i.pinimg.com/736x/07/c9/10/07c91002bab66e21f5476d4f496d1eb7.jpg',desc:'The SF-26 pairs the greatest driver lineup in F1 — Hamilton and Leclerc — with a redesigned Ferrari power unit built from scratch for 2026.',hp:'1000+',weight:'798kg',speed:'352km/h',engine:'Ferrari',url:'https://www.ferrari.com/en-EN/formula1'},
  {team:'MERCEDES-AMG F1',model:'Mercedes W17',color:'#00D2BE',bg:'#003333',img:'https://i.pinimg.com/736x/ec/28/7a/ec287aa25b95d3c42bfd57c140c708ba.jpg',desc:'The Silver Arrows are dominant in 2026. W17 won the opening two races with Russell and Antonelli. Mercedes PU is the benchmark of the new era.',hp:'1000+',weight:'798kg',speed:'350km/h',engine:'Mercedes',url:'https://www.mercedesamgf1.com'},
  {team:'McLAREN F1 TEAM',model:'McLaren MCL40',color:'#FF8000',bg:'#3D1700',img:'https://i.pinimg.com/736x/cc/a7/c6/cca7c6e52f026b4b51f1881705da0d07.jpg',desc:"2024 Constructors' Champions enter 2026 with Norris and Piastri on customer Mercedes power. McLaren are genuine title contenders.",hp:'1000+',weight:'798kg',speed:'354km/h',engine:'Mercedes',url:'https://www.mclaren.com/racing'},
  {team:'ASTON MARTIN ARAMCO',model:'Aston Martin AMR26',color:'#00A36C',bg:'#003320',img:'https://i.pinimg.com/736x/4d/ab/6a/4dab6a554146e39d720ad6def7dc1d96.jpg',desc:'British racing green returns. Alonso and Stroll pilot the AMR26 with a Mercedes customer PU. Aston Martin target podium returns after a tough 2025.',hp:'1000+',weight:'798kg',speed:'340km/h',engine:'Mercedes',url:'https://www.astonmartinf1.com'},
  {team:'BWT ALPINE F1',model:'Alpine A526',color:'#0090FF',bg:'#001A40',img:'https://i.pinimg.com/736x/21/c5/61/21c561787e36cff3690e74522e58c57f.jpg',desc:"Alpine switches to Mercedes customer power in 2026. Gasly leads the French team's charge with revised aerodynamics for the new regulations.",hp:'1000+',weight:'798kg',speed:'336km/h',engine:'Mercedes',url:'https://www.alpinecars.com/en/formula-1'},
  {team:'WILLIAMS RACING',model:'Williams FW47',color:'#1DB5FF',bg:'#001A3F',img:'https://i.pinimg.com/736x/20/56/67/2056671546da8fa77dae5d2d2e1a9bcc.jpg',desc:"The most successful British constructor in history returns with Sainz and Albon. The FW47 is Williams' most technically advanced car in over a decade.",hp:'1000+',weight:'798kg',speed:'338km/h',engine:'Mercedes',url:'https://www.williamsf1.com'},
  {team:'HAAS F1 TEAM',model:'Haas VF-26',color:'#B6BABD',bg:'#1A1A1A',img:'https://i.pinimg.com/736x/77/09/e3/7709e3baa9e7284d8ac16e2e22818037.jpg',desc:'Haas returns with Bearman and Ocon on Ferrari customer power. The VF-26 aims to build on a solid 2025 campaign in the ultracompetitive midfield.',hp:'1000+',weight:'798kg',speed:'334km/h',engine:'Ferrari',url:'https://www.haasf1team.com'},
  {team:'VISA RACING BULLS',model:'Racing Bulls VCARB 02',color:'#6692FF',bg:'#0D1B4A',img:'https://i.pinimg.com/736x/6a/d6/5a/6ad65a78b1f9ab8ac5b03bdd35cca11f.jpg',desc:"Red Bull's sister team with Hadjar and Lawson. The VCARB 02 runs Honda RBPT power and serves as a talent pipeline to the senior Red Bull squad.",hp:'1000+',weight:'798kg',speed:'339km/h',engine:'Honda RBPT',url:'https://www.visacashapprb.com'},
  {team:'AUDI F1 TEAM',model:'Audi A26',color:'#C80000',bg:'#1A0000',img:'https://i.pinimg.com/1200x/f2/7c/25/f27c25d597e1b19f35b162b1c3f59821.jpg',desc:"Audi's works F1 debut! The A26 marks Germany's biggest manufacturer entry since BMW. Hulkenberg and Bortoleto pilot Audi's entirely new power unit.",hp:'1000+',weight:'798kg',speed:'337km/h',engine:'Audi',url:'https://www.audi.com/en/motorsport.html'},
  {team:'CADILLAC F1 TEAM',model:'Cadillac CF1-01',color:'#CCCCCC',bg:'#1A1A1A',img:'https://i.pinimg.com/736x/a5/5d/28/a55d2837cdc20fa78889ee649a5a6cff.jpg',desc:'America is back in F1! The first US works constructor since 1986 — Cadillac backed by GM enters with Perez and Bottas driving the debut CF1-01.',hp:'1000+',weight:'798kg',speed:'330km/h',engine:'Ferrari (customer)',url:'https://www.cadillacracing.com'},
];
function buildCars() {
  var grid = document.getElementById('carsGrid');
  if (!grid) return;
  grid.innerHTML = carsData.map(function(c) {
    return '<div class="car-card"><div class="car-card-img"><img src="' + c.img + '" alt="' + c.model + '" loading="lazy"/></div><div class="car-card-body"><span class="car-team-badge" style="background:' + c.bg + ';color:' + c.color + ';">' + c.team + '</span><div class="car-card-title">' + c.model + '</div><div class="car-card-desc">' + c.desc + '</div><div class="car-stats"><div class="car-stat"><div class="car-stat-val">' + c.hp + '</div><div class="car-stat-label">HP</div></div><div class="car-stat"><div class="car-stat-val">' + c.weight + '</div><div class="car-stat-label">Weight</div></div><div class="car-stat"><div class="car-stat-val">' + c.speed + '</div><div class="car-stat-label">Top Speed</div></div><div class="car-stat"><div class="car-stat-val">' + c.engine + '</div><div class="car-stat-label">PU</div></div></div><a href="' + c.url + '" target="_blank" class="car-link">OFFICIAL SITE &#8594;</a></div></div>';
  }).join('');
}
buildCars();

// ─── DRIVERS ──────────────────────────────────
var driversData = [
  {name:'George Russell',num:'63',team:'Mercedes',nat:'🇬🇧',color:'#00D2BE',img:'https://i.pinimg.com/1200x/9f/7f/63/9f7f6367f480ca8a5872da5753cd9c37.jpg',titles:0,wins:'5+',age:27,note:'2026 Championship Leader. Won Australia opener.'},
  {name:'Kimi Antonelli',num:'12',team:'Mercedes',nat:'🇮🇹',color:'#00D2BE',img:'https://i.pinimg.com/736x/25/5e/ad/255eadaf7b72ef3299add764c7517fd1.jpg',titles:0,wins:'1',age:18,note:'Youngest race winner in 2026. Won China GP.'},
  {name:'Lewis Hamilton',num:'44',team:'Ferrari',nat:'🇬🇧',color:'#FF2200',img:'https://i.pinimg.com/736x/75/f7/03/75f7032f02e0e79291f6de2f9b3ae583.jpg',titles:7,wins:'103+',age:40,note:'Seven-time WDC. First Ferrari podium at China (P3).'},
  {name:'Charles Leclerc',num:'16',team:'Ferrari',nat:'🇲🇨',color:'#FF2200',img:'https://i.pinimg.com/736x/f5/65/6a/f5656ae07c5c1acbeea501f7b0100d01.jpg',titles:0,wins:'20+',age:27,note:'Monaco hero. P3 Australia, P4 China. Title contender.'},
  {name:'Max Verstappen',num:'1',team:'Red Bull',nat:'🇳🇱',color:'#3185FC',img:'https://i.pinimg.com/736x/87/ea/1d/87ea1dbba20b2fb0f42d5759f2d42d96.jpg',titles:4,wins:'62+',age:27,note:'4x World Champion 2021-24. Fighting in new era.'},
  {name:'Yuki Tsunoda',num:'22',team:'Red Bull',nat:'🇯🇵',color:'#3185FC',img:'https://i.pinimg.com/736x/e7/52/4e/e7524ea95ec040f148412a1be120d50f.jpg',titles:0,wins:'0',age:24,note:'Promoted to Red Bull. Japanese crowd favourite at Suzuka.'},
  {name:'Lando Norris',num:'4',team:'McLaren',nat:'🇬🇧',color:'#FF8000',img:'https://i.pinimg.com/1200x/a3/d3/61/a3d361e398865ce08e4915801af82fba.jpg',titles:0,wins:'6+',age:25,note:'2025 fan favourite. P5 Australia. Title contender in MCL40.'},
  {name:'Oscar Piastri',num:'81',team:'McLaren',nat:'🇦🇺',color:'#FF8000',img:'https://i.pinimg.com/736x/84/dc/d1/84dcd1815774227c21c100e4ba24a4b3.jpg',titles:0,wins:'5+',age:23,note:'Young Australian star. 2025 race winner. Strong 2026 start.'},
  {name:'Fernando Alonso',num:'14',team:'Aston Martin',nat:'🇪🇸',color:'#00A36C',img:'https://i.pinimg.com/1200x/7c/7a/7d/7c7a7d3a853b50b30c87927d7c826099.jpg',titles:2,wins:'32',age:44,note:'El Plan continues. Legend still racing at 44.'},
  {name:'Lance Stroll',num:'18',team:'Aston Martin',nat:'🇨🇦',color:'#00A36C',img:'https://i.pinimg.com/1200x/0b/db/19/0bdb1936c7fbe49ce4e1019c9e6ea769.jpg',titles:0,wins:'0',age:26,note:'Son of Aston Martin owner Lawrence Stroll. F1 veteran.'},
  {name:'Pierre Gasly',num:'10',team:'Alpine',nat:'🇫🇷',color:'#0090FF',img:'https://i.pinimg.com/1200x/b7/10/4a/b7104a6e289b3b5646d1b694ea9e0d49.jpg',titles:0,wins:'1',age:28,note:'Italian GP winner 2020. Leading Alpine 2026 rebuild.'},
  {name:'Jack Doohan',num:'7',team:'Alpine',nat:'🇦🇺',color:'#0090FF',img:'https://i.pinimg.com/736x/35/0c/3a/350c3a4f3a6cd51d61c80b44d4dd2ddb.jpg',titles:0,wins:'0',age:21,note:'Australian rookie talent. Former F2 front-runner.'},
  {name:'Carlos Sainz',num:'55',team:'Williams',nat:'🇪🇸',color:'#1DB5FF',img:'https://i.pinimg.com/736x/36/51/a2/3651a289b686e9489fd088b7fc44e980.jpg',titles:0,wins:'4',age:30,note:'2024 season star. Brings race-winning pedigree to Williams.'},
  {name:'Alexander Albon',num:'23',team:'Williams',nat:'🇹🇭',color:'#1DB5FF',img:'https://i.pinimg.com/736x/1a/9f/f4/1a9ff4d0ec2318f6a0f5358f2c329d51.jpg',titles:0,wins:'0',age:28,note:'Williams stalwart. Outperforms the car every weekend.'},
  {name:'Oliver Bearman',num:'87',team:'Haas',nat:'🇬🇧',color:'#B6BABD',img:'https://i.pinimg.com/736x/2f/d8/26/2fd8264e33a34a405e7664f18769e7f7.jpg',titles:0,wins:'0',age:19,note:'Impressive 2026 debut. P7 in Australia on opening weekend.'},
  {name:'Esteban Ocon',num:'31',team:'Haas',nat:'🇫🇷',color:'#B6BABD',img:'https://i.pinimg.com/736x/03/a1/a1/03a1a1e842c76990ea4f11b612cac193.jpg',titles:0,wins:'1',age:28,note:'Hungarian GP 2021 winner. Experienced midfield operator.'},
  {name:'Isack Hadjar',num:'6',team:'Racing Bulls',nat:'🇫🇷',color:'#6692FF',img:'https://i.pinimg.com/1200x/74/a6/dd/74a6dda4b659841876144f385ec4d678.jpg',titles:0,wins:'0',age:19,note:'F2 champion graduate. French-Algerian star of the future.'},
  {name:'Liam Lawson',num:'30',team:'Racing Bulls',nat:'🇳🇿',color:'#6692FF',img:'https://i.pinimg.com/736x/be/b2/75/beb27524bc311f98e0cf9aba39874dfa.jpg',titles:0,wins:'0',age:22,note:'New Zealand racer. Consistent points scorer in the VCARB.'},
  {name:'Nico Hulkenberg',num:'27',team:'Audi',nat:'🇩🇪',color:'#C80000',img:'https://i.pinimg.com/1200x/c9/6a/08/c96a085602f35a99ffd8858ce4d2201e.jpg',titles:0,wins:'0',age:37,note:"German veteran. Leading Audi's historic F1 works debut."},
  {name:'Gabriel Bortoleto',num:'5',team:'Audi',nat:'🇧🇷',color:'#C80000',img:'https://i.pinimg.com/1200x/91/45/f1/9145f121b0241c9add63b83436828da4.jpg',titles:0,wins:'0',age:20,note:'2024 F2 Champion. Brazilian prodigy on his F1 debut.'},
  {name:'Sergio Perez',num:'11',team:'Cadillac',nat:'🇲🇽',color:'#CCCCCC',img:'https://i.pinimg.com/736x/d0/32/2d/d0322db078a8230022c970d11a35e0fe.jpg',titles:0,wins:'13+',age:35,note:"Experienced race winner. Leading Cadillac's F1 debut campaign."},
  {name:'Valtteri Bottas',num:'77',team:'Cadillac',nat:'🇫🇮',color:'#CCCCCC',img:'https://i.pinimg.com/1200x/bc/28/8a/bc288aa2990a1e783b5a1b600458afda.jpg',titles:0,wins:'10',age:35,note:'Former Mercedes stalwart. Brings championship experience to Cadillac.'},
];
function buildDrivers() {
  var grid = document.getElementById('driversGrid');
  if (!grid) return;
  grid.innerHTML = driversData.map(function(d) {
    return '<div class="driver-profile-card" style="border-top:3px solid ' + d.color + ';"><div style="position:relative;"><img class="driver-photo" src="' + d.img + '" alt="' + d.name + '" loading="lazy"/><div style="position:absolute;top:.4rem;right:.65rem;font-family:Orbitron,sans-serif;font-size:2.2rem;font-weight:900;color:rgba(255,255,255,.11);">' + d.num + '</div></div><div class="driver-card-body"><div style="font-family:Orbitron,sans-serif;font-size:.57rem;color:' + d.color + ';letter-spacing:.18em;margin-bottom:.27rem;">' + d.team + ' \u2022 #' + d.num + ' \u2022 ' + d.nat + '</div><div style="font-family:Orbitron,sans-serif;font-size:1rem;font-weight:900;margin-bottom:.45rem;">' + d.name + '</div><div style="color:var(--text-muted);font-size:.82rem;line-height:1.58;margin-bottom:.8rem;">' + d.note + '</div><div style="display:flex;gap:.55rem;"><div style="text-align:center;background:var(--bg3);border-radius:6px;padding:.42rem .65rem;flex:1;"><div style="font-family:Orbitron,sans-serif;color:var(--red);font-weight:900;font-size:.95rem;">' + d.titles + 'x</div><div style="font-size:.62rem;color:var(--text-muted);">WDC</div></div><div style="text-align:center;background:var(--bg3);border-radius:6px;padding:.42rem .65rem;flex:1;"><div style="font-family:Orbitron,sans-serif;color:var(--red);font-weight:900;font-size:.95rem;">' + d.wins + '</div><div style="font-size:.62rem;color:var(--text-muted);">Wins</div></div><div style="text-align:center;background:var(--bg3);border-radius:6px;padding:.42rem .65rem;flex:1;"><div style="font-family:Orbitron,sans-serif;color:var(--red);font-weight:900;font-size:.95rem;">' + d.age + '</div><div style="font-size:.62rem;color:var(--text-muted);">Age</div></div></div></div></div>';
  }).join('');
}
buildDrivers();

// ─── TEAMS ────────────────────────────────────
var teamsData = [
  {name:'Mercedes-AMG Petronas',base:'Brackley, United Kingdom',color:'#00D2BE',img:'https://i.pinimg.com/736x/09/5e/4c/095e4c19d7f609e23bbe73b28372b579.jpg',wcc:'9x WCC',engine:'Mercedes PU',est:'1954',drivers:'Russell & Antonelli',desc:'Dominant in 2026 with two wins in two races. Eight consecutive WCC titles 2014-2021. The benchmark for the new 2026 power unit era.'},
  {name:'Scuderia Ferrari',base:'Maranello, Italy',color:'#FF2200',img:'https://i.pinimg.com/736x/60/e8/b4/60e8b48ce86080fe0a16d798e5aac5fb.jpg',wcc:'16x WCC',engine:'Ferrari PU',est:'1950',drivers:'Hamilton & Leclerc',desc:"F1's most iconic team. 75 years of racing. Hamilton and Leclerc chasing constructors' glory together."},
  {name:'Red Bull Racing',base:'Milton Keynes, United Kingdom',color:'#3185FC',img:'https://i.pinimg.com/1200x/28/ee/6c/28ee6c55b8e3d6414342daf10d97fe5a.jpg',wcc:'6x WCC',engine:'Honda RBPT',est:'2005',drivers:'Verstappen & Tsunoda',desc:'Four consecutive Constructors titles 2022-2025. Now faces the toughest regulation reset since 2014.'},
  {name:'McLaren F1 Team',base:'Woking, United Kingdom',color:'#FF8000',img:'https://i.pinimg.com/736x/42/8d/f4/428df42edf1939ed0961861286c93980.jpg',wcc:'8x WCC',engine:'Mercedes PU',est:'1966',drivers:'Norris & Piastri',desc:"Home of Senna, Prost and Hakkinen. Won the 2024 Constructors' Championship. Norris and Piastri are title contenders every weekend."},
  {name:'Aston Martin Aramco F1',base:'Silverstone, United Kingdom',color:'#00A36C',img:'https://i.pinimg.com/736x/66/70/51/667051b1aa72d36c8e4aefc205d72bd1.jpg',wcc:'0x WCC',engine:'Mercedes PU',est:'2021',drivers:'Alonso & Stroll',desc:'Dramatic podium surge in 2023 with Alonso. The Aston Martin factory and Saudi Aramco money power ambitious goals.'},
  {name:'BWT Alpine F1 Team',base:'Enstone, UK / Viry-Chatillon, France',color:'#0090FF',img:'https://i.pinimg.com/736x/55/fb/d5/55fbd5e42b5b3a2589247ebeb23d5ef6.jpg',wcc:'2x WCC',engine:'Mercedes PU',est:'2021 (as Alpine)',drivers:'Gasly & Doohan',desc:'Formerly Renault. Now running Mercedes customer power in 2026 after Renault PU withdrawal.'},
  {name:'Williams Racing',base:'Grove, United Kingdom',color:'#1DB5FF',img:'https://i.pinimg.com/736x/fc/6e/e7/fc6ee7fc1b1730ad13f14e7e9ebd0c24.jpg',wcc:'9x WCC',engine:'Mercedes PU',est:'1977',drivers:'Sainz & Albon',desc:'The most successful British constructor in F1 history. Sainz brings race-winning pedigree to the FW47.'},
  {name:'MoneyGram Haas F1 Team',base:'Kannapolis, USA',color:'#B6BABD',img:'https://i.pinimg.com/1200x/b6/0f/0f/b60f0f9cccd7eeab516244d60bc2ff52.jpg',wcc:'0x WCC',engine:'Ferrari PU',est:'2016',drivers:'Bearman & Ocon',desc:'Haas operates as an innovative customer-car model using Ferrari power. Bearman and Ocon target consistent points in 2026.'},
  {name:'Visa Cash App Racing Bulls',base:'Faenza, Italy',color:'#6692FF',img:'https://i.pinimg.com/736x/b7/15/ec/b715ec88436f96c5271b7e63d1c8bf8e.jpg',wcc:'0x WCC',engine:'Honda RBPT',est:'1985 (as Minardi)',drivers:'Hadjar & Lawson',desc:'Red Bull junior team. Pathway to Red Bull for Verstappen, Perez and many more F1 stars.'},
  {name:'Audi F1 Team',base:'Hinwil, Switzerland',color:'#C80000',img:'https://i.pinimg.com/1200x/cb/92/97/cb92974fb461bcb3648658c2c82ef622.jpg',wcc:'0x WCC',engine:'Audi PU',est:'2026',drivers:'Hulkenberg & Bortoleto',desc:"Audi's long-awaited F1 debut in 2026! Took over Kick Sauber and invested heavily in their own power unit from scratch."},
  {name:'Cadillac F1 Team',base:'Concord, North Carolina, USA',color:'#CCCCCC',img:'https://i.pinimg.com/736x/92/3d/58/923d581d5325793b207ccba147d50ed5.jpg',wcc:'0x WCC',engine:'Ferrari (customer)',est:'2026',drivers:'Perez & Bottas',desc:"America is back! The first new US constructor since 1986, Cadillac backed by GM debuts as the 11th team."},
];
function buildTeams() {
  var grid = document.getElementById('teamsGrid');
  if (!grid) return;
  grid.innerHTML = teamsData.map(function(t) {
    return '<div class="team-card" style="border-top:3px solid ' + t.color + ';"><img class="team-card-img" src="' + t.img + '" alt="' + t.name + '" loading="lazy"/><div class="team-card-body"><div class="team-card-name">' + t.name + '</div><div class="team-card-base">📍 ' + t.base + '</div><div class="team-badge-row" style="margin-bottom:.75rem;"><span class="team-badge gold">' + t.wcc + '</span><span class="team-badge">' + t.engine + '</span><span class="team-badge">Est. ' + t.est + '</span></div><div style="font-family:Share Tech Mono,monospace;font-size:.68rem;color:' + t.color + ';margin-bottom:.6rem;">DRIVERS: ' + t.drivers + '</div><p style="color:var(--text-muted);font-size:.82rem;line-height:1.6;">' + t.desc + '</p></div></div>';
  }).join('');
}
buildTeams();

// ─── STANDINGS ────────────────────────────────
var standingsDrivers = [
  {pos:1,name:'George Russell',team:'Mercedes',nat:'🇬🇧',pts:43,color:'#00D2BE'},
  {pos:2,name:'Kimi Antonelli',team:'Mercedes',nat:'🇮🇹',pts:37,color:'#00D2BE'},
  {pos:3,name:'Charles Leclerc',team:'Ferrari',nat:'🇲🇨',pts:30,color:'#FF2200'},
  {pos:4,name:'Lewis Hamilton',team:'Ferrari',nat:'🇬🇧',pts:24,color:'#FF2200'},
  {pos:5,name:'Lando Norris',team:'McLaren',nat:'🇬🇧',pts:20,color:'#FF8000'},
  {pos:6,name:'Max Verstappen',team:'Red Bull',nat:'🇳🇱',pts:16,color:'#3185FC'},
  {pos:7,name:'Oliver Bearman',team:'Haas',nat:'🇬🇧',pts:14,color:'#B6BABD'},
  {pos:8,name:'Arvid Lindblad',team:'Racing Bulls',nat:'🇬🇧',pts:10,color:'#6692FF'},
  {pos:9,name:'Gabriel Bortoleto',team:'Audi',nat:'🇧🇷',pts:8,color:'#C80000'},
  {pos:10,name:'Pierre Gasly',team:'Alpine',nat:'🇫🇷',pts:6,color:'#0090FF'},
  {pos:11,name:'Oscar Piastri',team:'McLaren',nat:'🇦🇺',pts:5,color:'#FF8000'},
  {pos:12,name:'Fernando Alonso',team:'Aston Martin',nat:'🇪🇸',pts:4,color:'#00A36C'},
  {pos:13,name:'Isack Hadjar',team:'Racing Bulls',nat:'🇫🇷',pts:3,color:'#6692FF'},
  {pos:14,name:'Carlos Sainz',team:'Williams',nat:'🇪🇸',pts:2,color:'#1DB5FF'},
  {pos:15,name:'Esteban Ocon',team:'Haas',nat:'🇫🇷',pts:1,color:'#B6BABD'},
  {pos:16,name:'Lance Stroll',team:'Aston Martin',nat:'🇨🇦',pts:0,color:'#00A36C'},
  {pos:17,name:'Liam Lawson',team:'Racing Bulls',nat:'🇳🇿',pts:0,color:'#6692FF'},
  {pos:18,name:'Sergio Perez',team:'Cadillac',nat:'🇲🇽',pts:0,color:'#CCCCCC'},
  {pos:19,name:'Valtteri Bottas',team:'Cadillac',nat:'🇫🇮',pts:0,color:'#CCCCCC'},
  {pos:20,name:'Alexander Albon',team:'Williams',nat:'🇹🇭',pts:0,color:'#1DB5FF'},
  {pos:21,name:'Jack Doohan',team:'Alpine',nat:'🇦🇺',pts:0,color:'#0090FF'},
  {pos:22,name:'Nico Hulkenberg',team:'Audi',nat:'🇩🇪',pts:0,color:'#C80000'},
];
var standingsConstructors = [
  {pos:1,name:'Mercedes',nat:'🇩🇪',pts:80,color:'#00D2BE'},{pos:2,name:'Ferrari',nat:'🇮🇹',pts:54,color:'#FF2200'},
  {pos:3,name:'McLaren',nat:'🇬🇧',pts:25,color:'#FF8000'},{pos:4,name:'Red Bull Racing',nat:'🇦🇹',pts:19,color:'#3185FC'},
  {pos:5,name:'Haas',nat:'🇺🇸',pts:15,color:'#B6BABD'},{pos:6,name:'Racing Bulls',nat:'🇮🇹',pts:13,color:'#6692FF'},
  {pos:7,name:'Audi',nat:'🇩🇪',pts:8,color:'#C80000'},{pos:8,name:'Alpine',nat:'🇫🇷',pts:6,color:'#0090FF'},
  {pos:9,name:'Aston Martin',nat:'🇬🇧',pts:4,color:'#00A36C'},{pos:10,name:'Williams',nat:'🇬🇧',pts:2,color:'#1DB5FF'},
  {pos:11,name:'Cadillac',nat:'🇺🇸',pts:0,color:'#CCCCCC'},
];
function buildStandings(data, cid, maxPts) {
  var el = document.getElementById(cid);
  if (!el) return;
  el.innerHTML = data.map(function(item, i) {
    return '<div class="standings-row' + (i < 3 ? ' top3' : '') + '"><div class="pos">' + item.pos + '</div><div class="nat">' + item.nat + '</div><div class="name-block"><div class="driver-full">' + item.name + '</div><div class="team-name">' + (item.team || '') + '</div></div><div class="bar-wrap"><div class="bar-bg"><div class="bar-fill" style="width:0%;background:' + item.color + ';" data-width="' + Math.round(item.pts / maxPts * 100) + '%"></div></div></div><div class="pts-label">' + item.pts + '</div></div>';
  }).join('');
}
buildStandings(standingsDrivers, 'driversTab', 43);
buildStandings(standingsConstructors, 'constructorsTab', 80);
function animateBars() {
  document.querySelectorAll('.bar-fill').forEach(function(b) { b.style.width = b.dataset.width; });
}
function switchTab(btn, tabId) {
  document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
  document.querySelectorAll('.tab-content').forEach(function(t) { t.classList.remove('active'); });
  btn.classList.add('active');
  document.getElementById(tabId).classList.add('active');
  setTimeout(animateBars, 100);
}

// ─── CIRCUITS ─────────────────────────────────
var circuits = [
  {flag:'🇬🇧',name:'Silverstone Circuit',country:'Northamptonshire, United Kingdom',img:'https://i.pinimg.com/1200x/f8/59/76/f85976e7778fc6fcc4df923e671b6ecf.jpg',length:'5.891km',laps:'52',corners:'18',drs:'2 (Active Aero)',lapRecord:'1:27.097',topSpeed:'332 km/h',downforce:'High',firstRace:'1950',desc:'Home of the British GP since 1950 and birthplace of the World Championship. Maggots-Becketts-Chapel complex is the greatest sequence of corners in F1.',corners_detail:'Copse • Maggots-Becketts-Chapel • Hangar Straight • Stowe • Club • Abbey',records:[{label:'Lap Record',val:'1:27.097 — M. Verstappen (2020)'},{label:'Race Distance',val:'306.198 km'},{label:'Top Speed',val:'332 km/h'},{label:'First GP Winner',val:'1950 — Nino Farina'},{label:'Most Wins',val:'Lewis Hamilton (8)'}],mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2441!2d-1.017!3d52.073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4877b5a1bbc25b6f%3A0x2e4e65c1a56da83e!2sSilverstone+Circuit!5e0!3m2!1sen!2suk!4v1700000000000'},
  {flag:'🇮🇹',name:'Autodromo Nazionale Monza',country:'Monza, Italy',img:'https://i.pinimg.com/1200x/73/86/94/73869458e2fb608935974b6911d2a436.jpg',length:'5.793km',laps:'53',corners:'11',drs:'2 (Active Aero)',lapRecord:'1:21.046',topSpeed:'372 km/h',downforce:'Ultra-Low',firstRace:'1950',desc:'The Temple of Speed. Ultra-low downforce and blistering straights deliver the fastest F1 lap speeds. The tifosi make every Italian GP electric.',corners_detail:'Variante del Rettifilo • Curva Grande • Roggia • Lesmo 1&2 • Variante Ascari • Parabolica',records:[{label:'Lap Record',val:'1:21.046 — R. Barrichello (2004)'},{label:'Race Distance',val:'306.720 km'},{label:'Top Speed',val:'372 km/h'},{label:'First GP Winner',val:'1950 — Nino Farina'},{label:'Most Wins',val:'Schumacher (5)'}],mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d9.289!3d45.617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786bb67c5e2e7f7%3A0x7c9d7c8a8c4f4b3e!2sAutodromo+Nazionale+Monza!5e0!3m2!1sen!2sit!4v1700000000000'},
  {flag:'🇲🇨',name:'Circuit de Monaco',country:'Monte Carlo, Monaco',img:'https://i.pinimg.com/1200x/0c/1e/ba/0c1eba884aa44b76ecabf369208d6a8c.jpg',length:'3.337km',laps:'78',corners:'19',drs:'1 (Active Aero)',lapRecord:'1:10.166',topSpeed:'296 km/h',downforce:'Maximum',firstRace:'1950',desc:"The jewel in the crown. Zero margin for error around Monaco's streets — Casino Square, Fairmont Hairpin, the Tunnel. F1's ultimate challenge.",corners_detail:'Sainte Devote • Casino Square • Grand Hotel Hairpin • Portier • Tunnel • Chicane • Rascasse',records:[{label:'Lap Record',val:'1:10.166 — L. Hamilton (2021)'},{label:'Race Distance',val:'260.286 km'},{label:'Top Speed',val:'296 km/h'},{label:'First GP Winner',val:'1950 — Fangio'},{label:'Most Wins',val:'Ayrton Senna (6)'}],mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500!2d7.421!3d43.737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cdc7d0b83ed7e9%3A0x1a3a4fc43a26427f!2sCircuit+de+Monaco!5e0!3m2!1sen!2smc!4v1700000000000'},
  {flag:'🇯🇵',name:'Suzuka International Racing Course',country:'Suzuka, Japan',img:'https://i.pinimg.com/1200x/82/f0/d7/82f0d7b9e743d796e75564a48f2d76db.jpg',length:'5.807km',laps:'53',corners:'18',drs:'2 (Active Aero)',lapRecord:'1:30.983',topSpeed:'328 km/h',downforce:'Medium-High',firstRace:'1987',desc:"Ranked #1 circuit by drivers. Suzuka's figure-8 layout, Esses, Degner Curves, 130R and Spoon corner demand complete commitment from every wheel.",corners_detail:'Turn 1 • Esses S1-S5 • Dunlop Curve • Degner 1&2 • Hairpin • Spoon Curve • 130R • Chicane',records:[{label:'Lap Record',val:'1:30.983 — L. Hamilton (2019)'},{label:'Race Distance',val:'307.471 km'},{label:'Top Speed',val:'328 km/h'},{label:'First GP Winner',val:'1987 — G. Berger'},{label:'Most Wins',val:'Schumacher (6)'}],mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d136.534!3d34.844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600441fc9a9eb601%3A0x8fdc5685f8b82c48!2sSuzuka+Circuit!5e0!3m2!1sen!2sjp!4v1700000000000'},
  {flag:'🇺🇸',name:'Circuit of the Americas',country:'Austin, Texas, USA',img:'https://i.pinimg.com/1200x/5e/e0/e0/5ee0e07e325b39c7c08ab9afb01f5f11.jpg',length:'5.513km',laps:'56',corners:'20',drs:'2 (Active Aero)',lapRecord:'1:36.169',topSpeed:'327 km/h',downforce:'High',firstRace:'2012',desc:"America's premier F1 circuit. The uphill Turn 1, stadium Esses and overtaking on the back straight make COTA one of the most exciting venues.",corners_detail:'Turn 1 Uphill • Esses 2-9 • Hairpin T11 • Turns 12-15 • Back Straight • T16-T20',records:[{label:'Lap Record',val:'1:36.169 — C. Leclerc (2019)'},{label:'Race Distance',val:'308.405 km'},{label:'Top Speed',val:'327 km/h'},{label:'First GP Winner',val:'2012 — L. Hamilton'},{label:'Most Wins',val:'Hamilton (5)'}],mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d-97.635!3d30.134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b4ace97e8e5d3%3A0x7a3c6b3d0e3b5c7a!2sCircuit+of+The+Americas!5e0!3m2!1sen!2sus!4v1700000000000'},
  {flag:'🇧🇭',name:'Bahrain International Circuit',country:'Sakhir, Bahrain',img:'https://i.pinimg.com/1200x/42/a7/b3/42a7b39a0a90389a1691754cc8776c9d.jpg',length:'5.412km',laps:'57',corners:'15',drs:'3 (Active Aero)',lapRecord:'1:31.447',topSpeed:'332 km/h',downforce:'Medium',firstRace:'2004',desc:'The season opener since 2021. Bahrain under floodlights in the desert delivers genuine overtaking through three long straights.',corners_detail:'T1-2 • T3 • T5-6 • T9 • T10 Hairpin • T11 • T13-14 • T15',records:[{label:'Lap Record',val:'1:31.447 — P. de la Rosa (2005)'},{label:'Race Distance',val:'308.238 km'},{label:'Top Speed',val:'332 km/h'},{label:'First GP Winner',val:'2004 — Schumacher'},{label:'Most Wins',val:'Hamilton (5)'}],mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d50.511!3d26.032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e48f96e3547e95b%3A0x26e254a48c9d3c26!2sBahrain+International+Circuit!5e0!3m2!1sen!2sbh!4v1700000000000'},
  {flag:'🇸🇬',name:'Marina Bay Street Circuit',country:'Singapore',img:'https://i.pinimg.com/1200x/29/08/ef/2908ef1f67762f8bf1b9bd10af744ee9.jpg',length:'4.940km',laps:'61',corners:'23',drs:'3 (Active Aero)',lapRecord:'1:41.905',topSpeed:'315 km/h',downforce:'Maximum',firstRace:'2008',desc:"F1's iconic night race under brilliant floodlights. 23 corners, extreme humidity and unpredictable safety cars make Singapore unmissable.",corners_detail:'T1-2 Anderson Bridge • T3 Singapore Sling • T7-10 Esplanade • T18 Raffles • T20-23',records:[{label:'Lap Record',val:'1:41.905 — K. Magnussen (2018)'},{label:'Race Distance',val:'308.706 km'},{label:'Top Speed',val:'315 km/h'},{label:'First GP Winner',val:'2008 — Alonso'},{label:'Most Wins',val:'Vettel (5)'}],mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d103.864!3d1.291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19b9800bcef5%3A0x3024c11c5e944c7e!2sMarina+Bay+Street+Circuit!5e0!3m2!1sen!2ssg!4v1700000000000'},
  {flag:'🇦🇺',name:'Albert Park Circuit',country:'Melbourne, Victoria, Australia',img:'https://i.pinimg.com/1200x/0a/81/0e/0a810e7caab1abce4ed39e273fedb231.jpg',length:'5.278km',laps:'58',corners:'16',drs:'4 (Active Aero)',lapRecord:'1:20.260',topSpeed:'326 km/h',downforce:'Medium',firstRace:'1996',desc:'The 2026 season opener. Beautiful parkland setting around a lake in Melbourne. Russell won the first race of 2026 here for Mercedes.',corners_detail:'T1-2 • T3 Lakeside Drive • T9 • Jones Chicane • T11-12 • T14 • T15 • T16',records:[{label:'Lap Record',val:'1:20.260 — C. Leclerc (2022)'},{label:'Race Distance',val:'306.124 km'},{label:'Top Speed',val:'326 km/h'},{label:'2026 Winner',val:'George Russell'},{label:'Most Wins',val:'Schumacher (4)'}],mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d144.968!3d-37.849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642a70ef3ad11%3A0x7f35c26a2d9e3e25!2sAlbert+Park+Circuit!5e0!3m2!1sen!2sau!4v1700000000000'},
  {flag:'🇧🇪',name:'Circuit de Spa-Francorchamps',country:'Stavelot, Belgium',img:'https://i.pinimg.com/1200x/dd/27/e9/dd27e96eb55af2ed807792c313c66f44.jpg',length:'7.004km',laps:'44',corners:'19',drs:'2 (Active Aero)',lapRecord:'1:41.252',topSpeed:'369 km/h',downforce:'Medium',firstRace:'1950',desc:'The greatest race circuit in the world. Eau Rouge-Raidillon, Pouhon and Blanchimont — Spa is F1 at its most magnificent.',corners_detail:'La Source • Eau Rouge • Raidillon • Kemmel Straight • Pouhon • Fagnes • Blanchimont • Bus Stop',records:[{label:'Lap Record',val:'1:41.252 — V. Bottas (2018)'},{label:'Race Distance',val:'308.052 km'},{label:'Top Speed',val:'369 km/h'},{label:'First GP Winner',val:'1950 — Fangio'},{label:'Most Wins',val:'Senna (5)'}],mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d5.972!3d50.437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c073f4f91c1d8f%3A0x7a59c1437a7f8a49!2sCircuit+de+Spa-Francorchamps!5e0!3m2!1sen!2sbe!4v1700000000000'},
  {flag:'🇳🇱',name:'Circuit Zandvoort',country:'Zandvoort, Netherlands',img:'https://i.pinimg.com/1200x/18/64/5b/18645b6b9a6b779c8117d7c9da871bee.jpg',length:'4.259km',laps:'72',corners:'14',drs:'2 (Active Aero)',lapRecord:'1:11.097',topSpeed:'310 km/h',downforce:'High',firstRace:'1952',desc:'The Dutch GP returned in 2021 to incredible scenes. Banked corners like Hugenholtz and Arie Luyendyk create a unique challenge — Orange Army passion.',corners_detail:'Tarzan • Gerlachbocht • Hugenholtz • Arie Luyendyk (banked) • Scheivlak • Marlboro • Mastersbocht',records:[{label:'Lap Record',val:'1:11.097 — M. Verstappen (2021)'},{label:'Race Distance',val:'306.648 km'},{label:'Top Speed',val:'310 km/h'},{label:'First GP Winner',val:'1952 — Ascari'},{label:'Most Wins',val:'Verstappen (3, 2021-23)'}],mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d4.540!3d52.388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5eda98ff79d83%3A0xa48e394cded12b97!2sCircuit+Zandvoort!5e0!3m2!1sen!2snl!4v1700000000000'},
];
function buildCircuits() {
  var grid = document.getElementById('circuitsGrid');
  if (!grid) return;
  grid.innerHTML = circuits.map(function(c, i) {
    return '<div class="circuit-card" onclick="openModal(' + i + ')"><img class="circuit-img" src="' + c.img + '" alt="' + c.name + '" loading="lazy"/><div class="circuit-card-header"><div class="circuit-flag">' + c.flag + '</div><div class="circuit-name">' + c.name + '</div><div class="circuit-country">' + c.country + '</div></div><div class="circuit-card-body"><div class="circuit-stat-row"><div class="circuit-stat"><div class="circuit-stat-val">' + c.length + '</div><div class="circuit-stat-lbl">Length</div></div><div class="circuit-stat"><div class="circuit-stat-val">' + c.laps + '</div><div class="circuit-stat-lbl">Laps</div></div><div class="circuit-stat"><div class="circuit-stat-val">' + c.corners + '</div><div class="circuit-stat-lbl">Corners</div></div></div><p style="color:var(--text-muted);font-size:.8rem;line-height:1.6;">' + c.desc.substring(0, 100) + '...</p><div style="color:var(--accent);font-family:Orbitron,sans-serif;font-size:.63rem;font-weight:700;margin-top:.7rem;">VIEW FULL DETAILS &#8594;</div></div></div>';
  }).join('');
}
buildCircuits();
function openModal(idx) {
  var c = circuits[idx];
  document.getElementById('modalImg').src = c.img;
  document.getElementById('modalFlag').textContent = c.flag;
  document.getElementById('modalTitle').textContent = c.name;
  document.getElementById('modalSubtitle').textContent = c.country + ' · First GP: ' + c.firstRace;
  document.getElementById('modalStats').innerHTML = [{val:c.length,lbl:'Track Length'},{val:c.laps+' laps',lbl:'Total Laps'},{val:c.corners,lbl:'Corners'},{val:c.drs,lbl:'DRS / Active Aero'},{val:c.topSpeed,lbl:'Top Speed'},{val:c.downforce,lbl:'Downforce'}].map(function(s){return '<div class="modal-stat"><div class="modal-stat-val">'+s.val+'</div><div class="modal-stat-lbl">'+s.lbl+'</div></div>';}).join('');
  document.getElementById('modalDesc').innerHTML = '<p>'+c.desc+'</p><p style="margin-top:.7rem;"><strong style="font-family:Orbitron,sans-serif;font-size:.7rem;letter-spacing:.1em;color:var(--text);">KEY CORNERS:</strong><br/><span style="color:var(--accent);font-family:Share Tech Mono,monospace;font-size:.77rem;">'+c.corners_detail+'</span></p>';
  document.getElementById('modalRecords').innerHTML = '<h4>// RECORDS &amp; FACTS</h4>'+c.records.map(function(r){return '<div class="record-row"><span class="record-label">'+r.label+'</span><span class="record-val">'+r.val+'</span></div>';}).join('');
  document.getElementById('modalMap').innerHTML = '<iframe src="'+c.mapSrc+'" width="100%" height="100%" style="border:none;display:block;" allowfullscreen loading="lazy"></iframe>';
  document.getElementById('circuitModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('circuitModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('circuitModal').addEventListener('click', function(e) { if (e.target === this) closeModal(); });

// ─── CALENDAR ─────────────────────────────────
var champions = {1950:'Nino Farina (Alfa Romeo)',1951:'Juan Manuel Fangio (Alfa Romeo)',1952:'Alberto Ascari (Ferrari)',1953:'Alberto Ascari (Ferrari)',1954:'Juan Manuel Fangio (Maserati/Mercedes)',1955:'Juan Manuel Fangio (Mercedes)',1956:'Juan Manuel Fangio (Ferrari)',1957:'Juan Manuel Fangio (Maserati)',1958:'Mike Hawthorn (Ferrari)',1959:'Jack Brabham (Cooper-Climax)',1960:'Jack Brabham (Cooper-Climax)',1961:'Phil Hill (Ferrari)',1962:'Graham Hill (BRM)',1963:'Jim Clark (Lotus-Climax)',1964:'John Surtees (Ferrari)',1965:'Jim Clark (Lotus-Climax)',1966:'Jack Brabham (Brabham-Repco)',1967:'Denny Hulme (Brabham-Repco)',1968:'Graham Hill (Lotus-Ford)',1969:'Jackie Stewart (Matra-Ford)',1970:'Jochen Rindt (Lotus-Ford)',1971:'Jackie Stewart (Tyrrell-Ford)',1972:'Emerson Fittipaldi (Lotus-Ford)',1973:'Jackie Stewart (Tyrrell-Ford)',1974:'Emerson Fittipaldi (McLaren-Ford)',1975:'Niki Lauda (Ferrari)',1976:'James Hunt (McLaren-Ford)',1977:'Niki Lauda (Ferrari)',1978:'Mario Andretti (Lotus-Ford)',1979:'Jody Scheckter (Ferrari)',1980:'Alan Jones (Williams-Ford)',1981:'Nelson Piquet (Brabham-Ford)',1982:'Keke Rosberg (Williams-Ford)',1983:'Nelson Piquet (Brabham-BMW)',1984:'Niki Lauda (McLaren-TAG)',1985:'Alain Prost (McLaren-TAG)',1986:'Alain Prost (McLaren-TAG)',1987:'Nelson Piquet (Williams-Honda)',1988:'Ayrton Senna (McLaren-Honda)',1989:'Alain Prost (McLaren-Honda)',1990:'Ayrton Senna (McLaren-Honda)',1991:'Ayrton Senna (McLaren-Honda)',1992:'Nigel Mansell (Williams-Renault)',1993:'Alain Prost (Williams-Renault)',1994:'Michael Schumacher (Benetton-Ford)',1995:'Michael Schumacher (Benetton-Renault)',1996:'Damon Hill (Williams-Renault)',1997:'Jacques Villeneuve (Williams-Renault)',1998:'Mika Hakkinen (McLaren-Mercedes)',1999:'Mika Hakkinen (McLaren-Mercedes)',2000:'Michael Schumacher (Ferrari)',2001:'Michael Schumacher (Ferrari)',2002:'Michael Schumacher (Ferrari)',2003:'Michael Schumacher (Ferrari)',2004:'Michael Schumacher (Ferrari)',2005:'Fernando Alonso (Renault)',2006:'Fernando Alonso (Renault)',2007:'Kimi Raikkonen (Ferrari)',2008:'Lewis Hamilton (McLaren-Mercedes)',2009:'Jenson Button (Brawn-Mercedes)',2010:'Sebastian Vettel (Red Bull)',2011:'Sebastian Vettel (Red Bull)',2012:'Sebastian Vettel (Red Bull)',2013:'Sebastian Vettel (Red Bull)',2014:'Lewis Hamilton (Mercedes)',2015:'Lewis Hamilton (Mercedes)',2016:'Nico Rosberg (Mercedes)',2017:'Lewis Hamilton (Mercedes)',2018:'Lewis Hamilton (Mercedes)',2019:'Lewis Hamilton (Mercedes)',2020:'Lewis Hamilton (Mercedes)',2021:'Max Verstappen (Red Bull)',2022:'Max Verstappen (Red Bull)',2023:'Max Verstappen (Red Bull)',2024:'Max Verstappen (Red Bull)',2025:'Season completed — champion TBD',2026:'TBD — Season in progress'};
var calendarData = {
  2024:{races:[{round:1,flag:'🇧🇭',name:'Bahrain GP',circuit:'BIC Sakhir',country:'Bahrain',date:'2 Mar',winner:'Max Verstappen'},{round:2,flag:'🇸🇦',name:'Saudi Arabian GP',circuit:'Jeddah Corniche',country:'Saudi Arabia',date:'9 Mar',winner:'Max Verstappen'},{round:3,flag:'🇦🇺',name:'Australian GP',circuit:'Albert Park',country:'Australia',date:'24 Mar',winner:'Carlos Sainz'},{round:4,flag:'🇯🇵',name:'Japanese GP',circuit:'Suzuka',country:'Japan',date:'7 Apr',winner:'Max Verstappen'},{round:5,flag:'🇨🇳',name:'Chinese GP',circuit:'Shanghai',country:'China',date:'21 Apr',winner:'Max Verstappen'},{round:6,flag:'🇺🇸',name:'Miami GP',circuit:'Miami Autodrome',country:'United States',date:'5 May',winner:'Lando Norris'},{round:7,flag:'🇮🇹',name:'Emilia Romagna GP',circuit:'Imola',country:'Italy',date:'19 May',winner:'Max Verstappen'},{round:8,flag:'🇲🇨',name:'Monaco GP',circuit:'Monaco',country:'Monaco',date:'26 May',winner:'Charles Leclerc'},{round:9,flag:'🇨🇦',name:'Canadian GP',circuit:'Montreal',country:'Canada',date:'9 Jun',winner:'Max Verstappen'},{round:10,flag:'🇪🇸',name:'Spanish GP',circuit:'Barcelona',country:'Spain',date:'23 Jun',winner:'Max Verstappen'},{round:11,flag:'🇦🇹',name:'Austrian GP',circuit:'Red Bull Ring',country:'Austria',date:'30 Jun',winner:'George Russell'},{round:12,flag:'🇬🇧',name:'British GP',circuit:'Silverstone',country:'United Kingdom',date:'7 Jul',winner:'Lewis Hamilton'},{round:13,flag:'🇭🇺',name:'Hungarian GP',circuit:'Hungaroring',country:'Hungary',date:'21 Jul',winner:'Oscar Piastri'},{round:14,flag:'🇧🇪',name:'Belgian GP',circuit:'Spa',country:'Belgium',date:'28 Jul',winner:'Lewis Hamilton'},{round:15,flag:'🇳🇱',name:'Dutch GP',circuit:'Zandvoort',country:'Netherlands',date:'25 Aug',winner:'Lando Norris'},{round:16,flag:'🇮🇹',name:'Italian GP',circuit:'Monza',country:'Italy',date:'1 Sep',winner:'Charles Leclerc'},{round:17,flag:'🇦🇿',name:'Azerbaijan GP',circuit:'Baku City Circuit',country:'Azerbaijan',date:'15 Sep',winner:'Oscar Piastri'},{round:18,flag:'🇸🇬',name:'Singapore GP',circuit:'Marina Bay',country:'Singapore',date:'22 Sep',winner:'Lando Norris'},{round:19,flag:'🇺🇸',name:'US GP',circuit:'COTA Austin',country:'United States',date:'20 Oct',winner:'Charles Leclerc'},{round:20,flag:'🇲🇽',name:'Mexican GP',circuit:'Hermanos Rodriguez',country:'Mexico',date:'27 Oct',winner:'Carlos Sainz'},{round:21,flag:'🇧🇷',name:'Sao Paulo GP',circuit:'Interlagos',country:'Brazil',date:'3 Nov',winner:'Max Verstappen'},{round:22,flag:'🇺🇸',name:'Las Vegas GP',circuit:'Las Vegas Strip',country:'United States',date:'23 Nov',winner:'Carlos Sainz'},{round:23,flag:'🇶🇦',name:'Qatar GP',circuit:'Losail',country:'Qatar',date:'1 Dec',winner:'Max Verstappen'},{round:24,flag:'🇦🇪',name:'Abu Dhabi GP',circuit:'Yas Marina',country:'UAE',date:'8 Dec',winner:'Lando Norris'}]},
  2026:{races:[{round:1,flag:'🇦🇺',name:'Australian GP',circuit:'Albert Park',country:'Australia',date:'8 Mar',winner:'George Russell'},{round:2,flag:'🇨🇳',name:'Chinese GP',circuit:'Shanghai',country:'China',date:'15 Mar',winner:'Kimi Antonelli'},{round:3,flag:'🇯🇵',name:'Japanese GP',circuit:'Suzuka',country:'Japan',date:'29 Mar',winner:'LIVE NOW'},{round:4,flag:'🇺🇸',name:'Miami GP',circuit:'Miami Autodrome',country:'United States',date:'3 May',winner:'TBD'},{round:5,flag:'🇨🇦',name:'Canadian GP',circuit:'Gilles Villeneuve',country:'Canada',date:'24 May',winner:'TBD'},{round:6,flag:'🇪🇸',name:'Spanish GP',circuit:'Barcelona-Catalunya',country:'Spain',date:'7 Jun',winner:'TBD'},{round:7,flag:'🇪🇸',name:'Madrid GP',circuit:'IFEMA Madrid Street',country:'Spain',date:'22 Jun',winner:'TBD'},{round:8,flag:'🇦🇹',name:'Austrian GP',circuit:'Red Bull Ring',country:'Austria',date:'28 Jun',winner:'TBD'},{round:9,flag:'🇬🇧',name:'British GP',circuit:'Silverstone',country:'United Kingdom',date:'5 Jul',winner:'TBD'},{round:10,flag:'🇧🇪',name:'Belgian GP',circuit:'Spa-Francorchamps',country:'Belgium',date:'26 Jul',winner:'TBD'},{round:11,flag:'🇭🇺',name:'Hungarian GP',circuit:'Hungaroring',country:'Hungary',date:'2 Aug',winner:'TBD'},{round:12,flag:'🇳🇱',name:'Dutch GP',circuit:'Zandvoort',country:'Netherlands',date:'30 Aug',winner:'TBD'},{round:13,flag:'🇮🇹',name:'Italian GP',circuit:'Monza',country:'Italy',date:'6 Sep',winner:'TBD'},{round:14,flag:'🇦🇿',name:'Azerbaijan GP',circuit:'Baku City Circuit',country:'Azerbaijan',date:'19 Sep',winner:'TBD'},{round:15,flag:'🇸🇬',name:'Singapore GP',circuit:'Marina Bay',country:'Singapore',date:'3 Oct',winner:'TBD'},{round:16,flag:'🇺🇸',name:'US GP',circuit:'COTA Austin',country:'United States',date:'18 Oct',winner:'TBD'},{round:17,flag:'🇲🇽',name:'Mexican GP',circuit:'Hermanos Rodriguez',country:'Mexico',date:'25 Oct',winner:'TBD'},{round:18,flag:'🇧🇷',name:'Sao Paulo GP',circuit:'Interlagos',country:'Brazil',date:'8 Nov',winner:'TBD'},{round:19,flag:'🇺🇸',name:'Las Vegas GP',circuit:'Las Vegas Strip',country:'United States',date:'21 Nov',winner:'TBD'},{round:20,flag:'🇶🇦',name:'Qatar GP',circuit:'Losail',country:'Qatar',date:'29 Nov',winner:'TBD'},{round:21,flag:'🇦🇪',name:'Abu Dhabi GP',circuit:'Yas Marina',country:'UAE',date:'6 Dec',winner:'TBD'}]}
};
var decades = ['1950s','1960s','1970s','1980s','1990s','2000s','2010s','2020s'];
var currentDecade = '2020s';
function decadeYears(d) {
  var start = 1950 + decades.indexOf(d) * 10;
  var arr = [];
  for (var i = 0; i < 10; i++) { if (start + i <= 2026) arr.push(start + i); }
  return arr;
}
function buildDecadeTabs() {
  document.getElementById('decadeTabs').innerHTML = decades.map(function(d) {
    return '<button class="decade-tab' + (d === currentDecade ? ' active' : '') + '" onclick="selectDecade(\'' + d + '\',this)">' + d + '</button>';
  }).join('');
}
function selectDecade(d, btn) {
  currentDecade = d;
  document.querySelectorAll('.decade-tab').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  buildYearTabs(d);
}
function buildYearTabs(decade) {
  var years = decadeYears(decade);
  var latest = years[years.length - 1];
  document.getElementById('yearTabs').innerHTML = years.map(function(y) {
    return '<button class="year-tab' + (y === latest ? ' active' : '') + '" onclick="loadCalendar(' + y + ',this)">' + y + '</button>';
  }).join('');
  loadCalendar(latest, document.querySelector('.year-tab.active'));
}
function loadCalendar(year, btn) {
  document.querySelectorAll('.year-tab').forEach(function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  var champion = champions[year] || 'Data not available';
  var data = calendarData[year];
  var isTBD = champion.indexOf('TBD') >= 0 || champion.indexOf('Season') >= 0;
  var html = '<div class="year-champion-banner"><div class="champion-trophy">' + (isTBD ? '⏳' : '🏆') + '</div><div class="champion-text"><h3>' + year + ' WORLD CHAMPION</h3><h2>' + champion + '</h2>' + (!isTBD ? '<p>Season Champion · ' + year + ' Formula 1 World Championship</p>' : '<p>Season details being updated</p>') + '</div></div>';
  if (data) {
    html += '<div class="calendar-grid">' + data.races.map(function(r) {
      var isLive = r.winner === 'LIVE NOW';
      var isDone = r.winner && r.winner !== 'TBD' && !isLive;
      return '<div class="race-card' + (isLive ? ' live' : '') + '"><div class="race-round">ROUND ' + r.round + ' \u00b7 ' + r.date + '</div><div class="race-flag">' + r.flag + '</div><div class="race-name">' + r.name + '</div><div class="race-circuit">\uD83D\uDCCD ' + r.circuit + '</div><div class="race-country">\uD83C\uDF0D ' + r.country + '</div>' + (isDone ? '<div class="race-winner">\uD83C\uDFC6 ' + r.winner + '</div>' : isLive ? '<div class="race-winner" style="color:var(--green);">\uD83D\uDD34 LIVE NOW</div>' : '<div class="race-scheduled">Scheduled</div>') + '</div>';
    }).join('') + '</div>';
  } else {
    html += '<div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:2rem;text-align:center;max-width:580px;margin:0 auto;"><div style="font-size:2.8rem;margin-bottom:.9rem;">📋</div><div style="font-family:Orbitron,sans-serif;font-size:.95rem;font-weight:900;margin-bottom:.7rem;">' + year + ' SEASON CHAMPION</div><div style="color:var(--text-muted);font-size:.92rem;line-height:1.7;margin-bottom:1.1rem;"><strong style="color:var(--gold);">' + champion + '</strong></div><a href="https://www.formula1.com/en/results/' + year + '/races" target="_blank" class="btn btn-outline btn-sm">VIEW ' + year + ' RESULTS ON F1.COM &#8594;</a></div>';
  }
  document.getElementById('calendarContent').innerHTML = html;
}
buildDecadeTabs();
buildYearTabs('2020s');

// ─── LEGENDS ──────────────────────────────────
var legendsData = [
  {name:'Juan Manuel Fangio',nat:'🇦🇷',era:'1950s',img:'https://i.pinimg.com/736x/a7/18/55/a7185549118c4c131dc04d767c14bf41.jpg',titles:5,wins:24,years:'1950-1958',desc:'The original greatest. Five World Championships across four different constructors. Set a win percentage of 46.15% that stood for decades. Fangio defined what a racing champion could be.'},
  {name:'Ayrton Senna',nat:'🇧🇷',era:'1980s-1990s',img:'https://i.pinimg.com/1200x/f4/4a/1f/f44a1fc600bcb67baf9518b673934c54.jpg',titles:3,wins:41,years:'1984-1994',desc:'The heart and soul of F1. Three World Championships. 65 pole positions — a record for years. His battles with Prost, Monaco mastery and tragic death at Imola 1994 made him immortal.'},
  {name:'Michael Schumacher',nat:'🇩🇪',era:'1990s-2000s',img:'https://i.pinimg.com/1200x/b3/ca/aa/b3caaa22a4f14ed46482dbbc4021589a.jpg',titles:7,wins:91,years:'1991-2012',desc:'The benchmark. Seven World Championships, 91 victories — both records stood until Hamilton. Dominated 2000-2004 like no driver before or since.'},
  {name:'Lewis Hamilton',nat:'🇬🇧',era:'2000s-2020s',img:'https://i.pinimg.com/736x/cf/e1/65/cfe1654ce1f2785316e9fba7e66f5aae.jpg',titles:7,wins:103,years:'2007-present',desc:'The statistical greatest. Seven World Championships, 103 race wins — the all-time record. Hamilton redefined what was possible in F1 and is still racing in 2026 with Ferrari, chasing title #8.'},
  {name:'Alain Prost',nat:'🇫🇷',era:'1980s-1990s',img:'https://i.pinimg.com/736x/6b/f5/c3/6bf5c3bdbb7416ad0dd03e2d2d7f5bbf.jpg',titles:4,wins:51,years:'1980-1993',desc:"The Professor. Four World Championships, 51 wins achieved through meticulous racecraft and strategic genius. The perfect counter to Senna's raw emotion."},
  {name:'Sebastian Vettel',nat:'🇩🇪',era:'2010s',img:'https://i.pinimg.com/1200x/98/d7/30/98d730b0b44f0ccc1c6333bf362fb35e.jpg',titles:4,wins:53,years:'2007-2022',desc:'Four consecutive World Championships 2010-2013. 53 race victories. Youngest World Champion at 23. Became a passionate sustainability advocate after retirement.'},
  {name:'Max Verstappen',nat:'🇳🇱',era:'2020s',img:'https://i.pinimg.com/736x/d7/c2/0d/d7c20d73be8ff00e9a382a75aadb490a.jpg',titles:4,wins:62,years:'2015-present',desc:'The modern-day giant. Four consecutive World Championships 2021-2024. Redefined F1 dominance with a record-breaking 2023 season (19 wins). Still racing in 2026.'},
  {name:'Niki Lauda',nat:'🇦🇹',era:'1970s-1980s',img:'https://i.pinimg.com/736x/bc/96/dd/bc96ddcbf36a7beb0876d7c429f3077b.jpg',titles:3,wins:25,years:'1971-1985',desc:"The lion who cheated death. Three World Championships. His greatest achievement was returning to racing six weeks after his near-fatal Nurburgring fire in 1976. Lauda defined raw courage."},
  {name:'Jim Clark',nat:'🏴󠁧󠁢󠁳󠁣󠁴󠁿',era:'1960s',img:'https://i.pinimg.com/1200x/ed/79/6b/ed796b95d62420f96b470e91cde9ba67.jpg',titles:2,wins:25,years:'1960-1968',desc:'The natural genius. Two World Championships and considered the most naturally gifted F1 driver of all time. Led 72% of laps he ever started. Tragically lost at Hockenheim in 1968.'},
];
function buildLegends() {
  var grid = document.getElementById('legendsGrid');
  if (!grid) return;
  grid.innerHTML = legendsData.map(function(l) {
    return '<div class="legend-card"><img class="legend-photo" src="' + l.img + '" alt="' + l.name + '" loading="lazy"/><div class="legend-body"><div class="legend-era">' + l.era + ' \u2022 ' + l.nat + '</div><div class="legend-name">' + l.name + '</div><div class="legend-nat">' + l.years + '</div><div class="legend-stat-row"><div class="legend-stat"><div class="legend-stat-val">' + l.titles + '\xd7</div><div class="legend-stat-lbl">WDC Titles</div></div><div class="legend-stat"><div class="legend-stat-val">' + l.wins + '</div><div class="legend-stat-lbl">Race Wins</div></div></div><div class="legend-desc">' + l.desc + '</div></div></div>';
  }).join('');
}
buildLegends();

// ─── COMPARE ──────────────────────────────────
var compareSpecs = {
  'Mercedes W17':{img:'https://i.pinimg.com/736x/ec/28/7a/ec287aa25b95d3c42bfd57c140c708ba.jpg',team:'Mercedes-AMG F1',hp:1050,weight:796,speed:350,downforce:72,engine:'Mercedes',fuel:'100% Sustainable',tires:'Pirelli C1-C5',gearbox:'8-speed semi-auto'},
  'Ferrari SF-26':{img:'https://i.pinimg.com/736x/07/c9/10/07c91002bab66e21f5476d4f496d1eb7.jpg',team:'Scuderia Ferrari',hp:1020,weight:798,speed:352,downforce:70,engine:'Ferrari',fuel:'100% Sustainable',tires:'Pirelli C1-C5',gearbox:'8-speed semi-auto'},
  'Red Bull RB22':{img:'https://i.pinimg.com/736x/ed/db/8b/eddb8b9e6f51dd8ee19a849858a85a4c.jpg',team:'Red Bull Racing',hp:1010,weight:798,speed:355,downforce:68,engine:'Honda RBPT',fuel:'100% Sustainable',tires:'Pirelli C1-C5',gearbox:'8-speed semi-auto'},
  'McLaren MCL40':{img:'https://i.pinimg.com/736x/cc/a7/c6/cca7c6e52f026b4b51f1881705da0d07.jpg',team:'McLaren F1 Team',hp:1048,weight:798,speed:354,downforce:71,engine:'Mercedes',fuel:'100% Sustainable',tires:'Pirelli C1-C5',gearbox:'8-speed semi-auto'},
  'Aston Martin AMR26':{img:'https://i.pinimg.com/736x/4d/ab/6a/4dab6a554146e39d720ad6def7dc1d96.jpg',team:'Aston Martin Aramco',hp:1040,weight:799,speed:340,downforce:73,engine:'Mercedes',fuel:'100% Sustainable',tires:'Pirelli C1-C5',gearbox:'8-speed semi-auto'},
  'Alpine A526':{img:'https://i.pinimg.com/736x/21/c5/61/21c561787e36cff3690e74522e58c57f.jpg',team:'BWT Alpine F1',hp:1038,weight:798,speed:336,downforce:70,engine:'Mercedes',fuel:'100% Sustainable',tires:'Pirelli C1-C5',gearbox:'8-speed semi-auto'},
  'Williams FW47':{img:'https://i.pinimg.com/736x/20/56/67/2056671546da8fa77dae5d2d2e1a9bcc.jpg',team:'Williams Racing',hp:1038,weight:798,speed:338,downforce:69,engine:'Mercedes',fuel:'100% Sustainable',tires:'Pirelli C1-C5',gearbox:'8-speed semi-auto'},
  'Haas VF-26':{img:'https://i.pinimg.com/736x/77/09/e3/7709e3baa9e7284d8ac16e2e22818037.jpg',team:'Haas F1 Team',hp:1020,weight:799,speed:334,downforce:67,engine:'Ferrari',fuel:'100% Sustainable',tires:'Pirelli C1-C5',gearbox:'8-speed semi-auto'},
  'Racing Bulls VCARB 02':{img:'https://i.pinimg.com/736x/6a/d6/5a/6ad65a78b1f9ab8ac5b03bdd35cca11f.jpg',team:'Visa Racing Bulls',hp:1010,weight:798,speed:339,downforce:68,engine:'Honda RBPT',fuel:'100% Sustainable',tires:'Pirelli C1-C5',gearbox:'8-speed semi-auto'},
  'Audi A26':{img:'https://i.pinimg.com/1200x/f2/7c/25/f27c25d597e1b19f35b162b1c3f59821.jpg',team:'Audi F1 Team',hp:995,weight:800,speed:337,downforce:66,engine:'Audi',fuel:'100% Sustainable',tires:'Pirelli C1-C5',gearbox:'8-speed semi-auto'},
  'Cadillac CF1-01':{img:'https://i.pinimg.com/736x/a5/5d/28/a55d2837cdc20fa78889ee649a5a6cff.jpg',team:'Cadillac F1 Team',hp:1020,weight:800,speed:330,downforce:65,engine:'Ferrari (customer)',fuel:'100% Sustainable',tires:'Pirelli C1-C5',gearbox:'8-speed semi-auto'},
};
var compareBuilt = false;
function buildComparison() {
  var sel1 = document.getElementById('carSelect1');
  var sel2 = document.getElementById('carSelect2');
  if (!compareBuilt) {
    var keys = Object.keys(compareSpecs);
    keys.forEach(function(k, i) {
      sel1.add(new Option(k, k, false, i === 0));
      sel2.add(new Option(k, k, false, i === 2));
    });
    compareBuilt = true;
  }
  updateComparison();
}
function updateComparison() {
  var k1 = document.getElementById('carSelect1').value;
  var k2 = document.getElementById('carSelect2').value;
  var a = compareSpecs[k1]; var b = compareSpecs[k2];
  if (!a || !b) return;
  var metrics = [{label:'Power Output',key:'hp',unit:'hp',higherWins:true},{label:'Min Weight',key:'weight',unit:'kg',higherWins:false},{label:'Top Speed',key:'speed',unit:'km/h',higherWins:true},{label:'Downforce Score',key:'downforce',unit:'/100',higherWins:true}];
  var textMetrics = [{label:'Engine Supplier',key:'engine'},{label:'Fuel Type',key:'fuel'},{label:'Tires',key:'tires'},{label:'Gearbox',key:'gearbox'}];
  function panel(key, spec, other) {
    var rows = metrics.map(function(m) {
      var wins = m.higherWins ? (spec[m.key] > other[m.key]) : (spec[m.key] < other[m.key]);
      return '<div class="compare-stat-row"><div class="compare-stat-label">' + m.label + '</div><div class="compare-stat-val ' + (wins ? 'winner' : 'loser') + '">' + spec[m.key] + m.unit + '</div></div>';
    }).join('');
    var textRows = textMetrics.map(function(m) {
      return '<div class="compare-stat-row"><div class="compare-stat-label">' + m.label + '</div><div class="compare-stat-val" style="color:var(--text);">' + spec[m.key] + '</div></div>';
    }).join('');
    return '<div class="compare-car-panel" style="border-top:4px solid var(--red);"><img class="compare-car-img" src="' + spec.img + '" alt="' + key + '"/><div class="compare-car-body"><div class="compare-car-name">' + key + '</div><div class="compare-car-team">' + spec.team + '</div>' + rows + textRows + '</div></div>';
  }
  document.getElementById('compareResult').innerHTML = panel(k1, a, b) + panel(k2, b, a);
}

// ─── RATINGS ──────────────────────────────────
var userRating = 0;
function setRating(n) {
  userRating = n;
  document.querySelectorAll('#starPicker span').forEach(function(s, i) { s.classList.toggle('active', i < n); });
}
function submitReview() {
  var name = document.getElementById('reviewName').value.trim();
  var loc = document.getElementById('reviewLocation').value.trim();
  var type = document.getElementById('reviewType').value;
  var text = document.getElementById('reviewText').value.trim();
  if (!name || !text || !userRating) { alert('Please fill in your name, review and select a star rating!'); return; }
  var card = document.createElement('div');
  card.className = 'review-card';
  card.innerHTML = '<div class="review-header"><div><div class="reviewer-name">' + name + '</div><div class="reviewer-tag">' + type + (loc ? ' \u00b7 ' + loc : '') + '</div></div><div class="review-stars">' + '\u2b50'.repeat(userRating) + '</div></div><div class="review-text">' + text + '</div><span class="review-badge">NEW REVIEW</span>';
  document.getElementById('reviewsGrid').prepend(card);
  document.getElementById('reviewName').value = '';
  document.getElementById('reviewLocation').value = '';
  document.getElementById('reviewText').value = '';
  setRating(0);
  var ok = document.getElementById('reviewSuccess');
  ok.style.display = 'block';
  setTimeout(function() { ok.style.display = 'none'; }, 4000);
}
