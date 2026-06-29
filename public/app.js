// ============================================
// ПРОВЕРКА СЕССИИ (упрощенная)
// ============================================

(function() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    try {
        const user = JSON.parse(currentUser);
        if (!user.isLoggedIn) {
            window.location.href = 'login.html';
            return;
        }
        console.log('👋 Добро пожаловать, ' + user.name + '!');
    } catch (e) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
})();

// Показываем имя пользователя
document.addEventListener('DOMContentLoaded', () => {
    try {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user && user.isLoggedIn) {
            const userInfo = document.getElementById('userInfo');
            const userNameDisplay = document.getElementById('userNameDisplay');
            if (userInfo && userNameDisplay) {
                userInfo.style.display = 'flex';
                userNameDisplay.textContent = `👤 ${user.name}`;
            }
        }
    } catch (e) {}
});

// ВЫХОД
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

// ============================================
// ДАЛЬШЕ ВЕСЬ ТВОЙ КОД С ГЕРОЯМИ
// ============================================
// ... (весь heroesData и остальной код)
// ============================================
// ПРОВЕРКА СЕССИИ
// ============================================

function checkSession() {
  // Проверяем, не на странице ли логина мы уже
  if (window.location.pathname.includes('login.html')) {
    return null;
  }

  const currentUser = localStorage.getItem('currentUser');
  
  if (!currentUser) {
    window.location.href = 'login.html';
    return null;
  }

  try {
    const user = JSON.parse(currentUser);
    if (!user.isLoggedIn) {
      window.location.href = 'login.html';
      return null;
    }
    return user;
  } catch (e) {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
    return null;
  }
}

// Проверяем сессию
const user = checkSession();

if (user) {
  console.log(`👋 Привет, ${user.name}! (ID: ${user.id})`);
  
  document.addEventListener('DOMContentLoaded', () => {
    const userInfo = document.getElementById('userInfo');
    const userNameDisplay = document.getElementById('userNameDisplay');
    
    if (userInfo && userNameDisplay) {
      userInfo.style.display = 'flex';
      userNameDisplay.textContent = `👤 ${user.name}`;
    }
  });
}

// ============================================
// ВЫХОД
// ============================================

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
});
// ============================================
// ДАЛЬШЕ ВЕСЬ ТВОЙ КОД С ГЕРОЯМИ
// ============================================

// ДАННЫЕ ГЕРОЕВ - ЗДЕСЬ ВСТАВЛЯЙ СВОИ ГИФКИ
// ДАННЫЕ ГЕРОЕВ - ЗДЕСЬ ВСТАВЛЯЙ СВОИ ГИФКИ И PNG
const heroesData = [
  {
    id: 1,
    name: 'Pudge',
    icon: 'gifs/pudge.gif',
    role: 'Mid',
    roleClass: 'mid',
    rarity: 'legendary',
    winrate: 52.3,
    builds: {
      core: [
        { name: "Aghanim's Shard", icon: 'items/shard.png' },
        { name: 'Blink Dagger', icon: 'items/blink_dagger.png' },
        { name: 'Aether Lens', icon: 'items/aether_lens.png' },
        { name: 'Force Staff', icon: 'items/force_staff.png' }
      ],
      situational: [
        { name: 'Lotus Orb', icon: 'items/lotus_orb.png' },
        { name: 'Pipe of Insight', icon: 'items/pipe.png' },
        { name: 'Aeon Disk', icon: 'items/aeon.png' }
      ],
      luxury: [
        { name: 'Aghanim Scepter ', icon: 'items/aghanim_scepter.png' },
        { name: 'Abyssal Blade', icon: 'items/abyssal.png' },
        { name: 'Scythe of Vyse', icon: 'items/hex.png' }
      ]
    },
    skills: [
      { key: 'Q', name: 'Meat Hook', icon: 'skills/meat_hook.png' },
      { key: 'W', name: 'Rot', icon: 'skills/rot.png' },
      { key: 'E', name: 'Flesh Heap', icon: 'skills/flesh_heap.png' },
      { key: 'R', name: 'Dismember', icon: 'skills/dismember.png' }
    ]
  },
  {
    id: 2,
    name: 'Invoker',
    icon: 'gifs/invoker.gif',
    role: 'Mid',
    roleClass: 'mid',
    rarity: 'legendary',
    winrate: 48.7,
    builds: {
      core: [
        { name: "Aghanim's Scepter", icon: 'items/aghanim_scepter.png' },
        { name: 'Orchid Malevolence', icon: 'items/orchid.png' },
        { name: 'Travel Boots', icon: 'items/travel_boots.png' },
        { name: 'Black King Bar', icon: 'items/bkb.png' }
      ],
      situational: [
        { name: "Linken's Sphere", icon: 'items/linkens_sphere.png' },
        { name: "Shiva's Guard", icon: 'items/shivas_guard.png' },
        { name: "Eul's Scepter", icon: 'items/euls_scepter.png' }
      ],
      luxury: [
        { name: 'Scythe of Vyse', icon: 'items/hex.png' },
        { name: 'Octarine Core', icon: 'items/octarine_core.png' },
        { name: 'Wind Waker', icon: 'items/wind_waker.png' }
      ]
    },
    skills: [
      { key: 'Q', name: 'Quas', icon: 'skills/quas.png' },
      { key: 'W', name: 'Wex', icon: 'skills/wex.png' },
      { key: 'E', name: 'Exort', icon: 'skills/exort.png' },
      { key: 'R', name: 'Invoke', icon: 'skills/invoke.png' }
    ]
  },
  {
    id: 3,
    name: 'Phantom Assassin',
    icon: 'gifs/phantom_assassin.gif',
    role: 'Carry',
    roleClass: 'carry',
    rarity: 'mythical',
    winrate: 51.8,
    builds: {
      core: [
        { name: 'Battle Fury', icon: 'items/battle_fury.png' },
        { name: 'Desolator', icon: 'items/desolator.png' },
        { name: 'Black King Bar', icon: 'items/bkb.png' },
        { name: 'Power Treads', icon: 'items/power_treads.png' }
      ],
      situational: [
        { name: 'Satanic', icon: 'items/satanic.png' },
        { name: 'Butterfly', icon: 'items/butterfly.png' },
        { name: 'Manta Style', icon: 'items/manta_style.png' }
      ],
      luxury: [
        { name: 'Divine Rapier', icon: 'items/divine_rapier.png' },
        { name: 'Abyssal Blade', icon: 'items/abyssal_blade.png' },
        { name: 'Nullifier', icon: 'items/nullifier.png' }
      ]
    },
    skills: [
      { key: 'Q', name: 'Stifling Dagger', icon: 'skills/stifling_dagger.png' },
      { key: 'W', name: 'Phantom Strike', icon: 'skills/phantom_strike.png' },
      { key: 'E', name: 'Blur', icon: 'skills/blur.png' },
      { key: 'R', name: 'Coup de Grace', icon: 'skills/coup_de_grace.png' }
    ]
  },
  {
    id: 4,
    name: 'Axe',
    icon: 'gifs/axe.gif',
    role: 'Offlane',
    roleClass: 'offlane',
    rarity: 'common',
    winrate: 53.1,
    builds: {
      core: [
        { name: 'Vanguard', icon: 'items/vanguard.png' },
        { name: 'Blink Dagger', icon: 'items/blink_dagger.png' },
        { name: 'Blade Mail', icon: 'items/blade_mail.png' },
        { name: 'Phase Boots', icon: 'items/phase_boots.png' }
      ],
      situational: [
        { name: 'Crimson Guard', icon: 'items/crimson_guard.png' },
        { name: 'Pipe of Insight', icon: 'items/pipe_of_insight.png' },
        { name: 'Lotus Orb', icon: 'items/lotus_orb.png' }
      ],
      luxury: [
        { name: 'Heart of Tarrasque', icon: 'items/heart_of_tarrasque.png' },
        { name: "Shiva's Guard", icon: 'items/shivas_guard.png' },
        { name: "Aghanim's Scepter", icon: 'items/aghanims_scepter.png' }
      ]
    },
    skills: [
      { key: 'Q', name: "Berserker's Call", icon: 'skills/berserkers_call.png' },
      { key: 'W', name: 'Battle Hunger', icon: 'skills/battle_hunger.png' },
      { key: 'E', name: 'Counter Helix', icon: 'skills/counter_helix.png' },
      { key: 'R', name: 'Culling Blade', icon: 'skills/culling_blade.png' }
    ]
  },
  {
    id: 5,
    name: 'Crystal Maiden',
    icon: 'gifs/crystal_maiden.gif',
    role: 'Support',
    roleClass: 'support',
    rarity: 'common',
    winrate: 50.5,
    builds: {
      core: [
        { name: 'Glimmer Cape', icon: 'items/glimmer_cape.png' },
        { name: 'Force Staff', icon: 'items/force_staff.png' },
        { name: 'Tranquil Boots', icon: 'items/tranquil_boots.png' },
        { name: 'Aether Lens', icon: 'items/aether_lens.png' }
      ],
      situational: [
        { name: "Eul's Scepter", icon: 'items/euls_scepter.png' },
        { name: 'Ghost Scepter', icon: 'items/ghost_scepter.png' },
        { name: 'Blink Dagger', icon: 'items/blink_dagger.png' }
      ],
      luxury: [
        { name: "Aghanim's Scepter", icon: 'items/aghanims_scepter.png' },
        { name: "Shiva's Guard", icon: 'items/shivas_guard.png' },
        { name: 'Octarine Core', icon: 'items/octarine_core.png' }
      ]
    },
    skills: [
      { key: 'Q', name: 'Crystal Nova', icon: 'skills/crystal_nova.png' },
      { key: 'W', name: 'Frostbite', icon: 'skills/frostbite.png' },
      { key: 'E', name: 'Arcane Aura', icon: 'skills/arcane_aura.png' },
      { key: 'R', name: 'Freezing Field', icon: 'skills/freezing_field.png' }
    ]
  },
  {
    id: 6,
    name: 'Storm Spirit',
    icon: 'gifs/storm.gif',
    role: 'Mid',
    roleClass: 'mid',
    rarity: 'rare',
    winrate: 49.2,
    builds: {
      core: [
        { name: 'Bloodstone', icon: 'items/bloodstone.png' },
        { name: 'Orchid Malevolence', icon: 'items/orchid_malevolence.png' },
        { name: 'Travel Boots', icon: 'items/travel_boots.png' },
        { name: 'Black King Bar', icon: 'items/bkb.png' }
      ],
      situational: [
        { name: "Linken's Sphere", icon: 'items/linkens_sphere.png' },
        { name: "Shiva's Guard", icon: 'items/shivas_guard.png' },
        { name: 'Scythe of Vyse', icon: 'items/scythe_of_vyse.png' }
      ],
      luxury: [
        { name: 'Aghanim Scepter', icon: 'items/Aghanim_Scepter.png' },
        { name: 'Octarine Core', icon: 'items/octarine_core.png' },
        { name: 'Dagon 5', icon: 'items/dagon_5.png' }
      ]
    },
    skills: [
      { key: 'Q', name: 'Static Remnant', icon: 'skills/static_remnant.png' },
      { key: 'W', name: 'Electric Vortex', icon: 'skills/electric_vortex.png' },
      { key: 'E', name: 'Overload', icon: 'skills/overload.png' },
      { key: 'R', name: 'Ball Lightning', icon: 'skills/ball_lightning.png' }
    ]
  },
  {
    id: 7,
    name: 'Terrorblade',
    icon: 'gifs/terrorblade.gif',
    role: 'Carry',
    roleClass: 'carry',
    rarity: 'mythical',
    winrate: 47.9,
    builds: {
      core: [
        { name: 'Manta Style', icon: 'items/manta_style.png' },
        { name: 'Butterfly', icon: 'items/butterfly.png' },
        { name: 'Eye of Skadi', icon: 'items/eye_of_skadi.png' },
        { name: 'Power Treads', icon: 'items/power_treads.png' }
      ],
      situational: [
        { name: 'Black King Bar', icon: 'items/bkb.png' },
        { name: 'Satanic', icon: 'items/satanic.png' },
        { name: 'Hurricane Pike', icon: 'items/Hurricane_Pike.png' }
      ],
      luxury: [
        { name: 'Divine Rapier', icon: 'items/divine_rapier.png' },
        { name: "Aghanim's Scepter", icon: 'items/aghanims_scepter.png' },
        { name: 'Daedalus', icon: 'items/daedalus.png' }
      ]
    },
    skills: [
      { key: 'Q', name: 'Reflection', icon: 'skills/reflection.png' },
      { key: 'W', name: 'Conjure Image', icon: 'skills/conjure_image.png' },
      { key: 'E', name: 'Metamorphosis', icon: 'skills/metamorphosis.png' },
      { key: 'R', name: 'Sunder', icon: 'skills/sunder.png' }
    ]
  },
  {
    id: 8,
    name: 'Rubick',
    icon: 'gifs/rubick.gif',
    role: 'Support',
    roleClass: 'support',
    rarity: 'rare',
    winrate: 51.0,
    builds: {
      core: [
        { name: 'Blink Dagger', icon: 'items/blink_dagger.png' },
        { name: "Aghanim's Scepter", icon: 'items/aghanims_scepter.png' },
        { name: 'Force Staff', icon: 'items/force_staff.png' },
        { name: 'Tranquil Boots', icon: 'items/tranquil_boots.png' }
      ],
      situational: [
        { name: "Eul's Scepter", icon: 'items/euls_scepter.png' },
        { name: 'Ghost Scepter', icon: 'items/ghost_scepter.png' },
        { name: 'Aether Lens', icon: 'items/aether_lens.png' }
      ],
      luxury: [
        { name: 'Octarine Core', icon: 'items/octarine_core.png' },
        { name: "Shiva's Guard", icon: 'items/shivas_guard.png' },
        { name: 'Scythe of Vyse', icon: 'items/scythe_of_vyse.png' }
      ]
    },
    skills: [
      { key: 'Q', name: 'Telekinesis', icon: 'skills/telekinesis.png' },
      { key: 'W', name: 'Fade Bolt', icon: 'skills/fade_bolt.png' },
      { key: 'E', name: 'Arcane Supremacy', icon: 'skills/Arcane_Supremacy.png' },
      { key: 'R', name: 'Spell Steal', icon: 'skills/spell_steal.png' }
    ]
  },
  {
    id: 9,
    name: 'Mars',
    icon: 'gifs/mars.png',
    role: 'Offlane',
    roleClass: 'offlane',
    rarity: 'uncommon',
    winrate: 52.7,
    builds: {
      core: [
        { name: 'Blink Dagger', icon: 'items/blink_dagger.png' },
        { name: 'Vanguard', icon: 'items/vanguard.png' },
        { name: 'Desolator', icon: 'items/desolator.png' },
        { name: 'Phase Boots', icon: 'items/phase_boots.png' }
      ],
      situational: [
        { name: 'Pipe of Insight', icon: 'items/pipe_of_insight.png' },
        { name: 'Black King Bar', icon: 'items/bkb.png' },
        { name: 'Lotus Orb', icon: 'items/lotus_orb.png' }
      ],
      luxury: [
        { name: "Aghanim's Scepter", icon: 'items/aghanims_scepter.png' },
        { name: 'Abyssal Blade', icon: 'items/abyssal_blade.png' },
        { name: 'Scythe of Vyse', icon: 'items/scythe_of_vyse.png' }
      ]
    },
    skills: [
      { key: 'Q', name: "Spear of Mars", icon: 'skills/spear_of_mars.png' },
      { key: 'W', name: "God's Rebuke", icon: 'skills/gods_rebuke.png' },
      { key: 'E', name: 'Bulwark', icon: 'skills/bulwark.png' },
      { key: 'R', name: 'Arena of Blood', icon: 'skills/arena_of_blood.png' }
    ]
  },
  {
    id: 10,
    name: 'Lion',
    icon: 'gifs/lion.gif',
    role: 'Support',
    roleClass: 'support',
    rarity: 'common',
    winrate: 49.8,
    builds: {
      core: [
        { name: 'Blink Dagger', icon: 'items/blink_dagger.png' },
        { name: 'Aether Lens', icon: 'items/aether_lens.png' },
        { name: 'Glimmer Cape', icon: 'items/glimmer_cape.png' },
        { name: 'Tranquil Boots', icon: 'items/tranquil_boots.png' }
      ],
      situational: [
        { name: 'Force Staff', icon: 'items/force_staff.png' },
        { name: 'Ghost Scepter', icon: 'items/ghost_scepter.png' },
        { name: "Eul's Scepter", icon: 'items/euls_scepter.png' }
      ],
      luxury: [
        { name: "Aghanim's Scepter", icon: 'items/aghanims_scepter.png' },
        { name: 'Octarine Core', icon: 'items/octarine_core.png' },
        { name: 'Aeon Disk', icon: 'items/aeon.png' }
      ]
    },
    skills: [
      { key: 'Q', name: 'Earth Spike', icon: 'skills/earth_spike.png' },
      { key: 'W', name: 'Hex', icon: 'skills/hex.png' },
      { key: 'E', name: 'Mana Drain', icon: 'skills/mana_drain.png' },
      { key: 'R', name: 'Finger of Death', icon: 'skills/finger_of_death.png' }
    ]
  },
  {
    id: 11,
    name: 'Shadow Fiend',
    icon: 'gifs/shadow_fiend.gif',
    role: 'Mid',
    roleClass: 'mid',
    rarity: 'mythical',
    winrate: 48.5,
    builds: {
      core: [
        { name: 'Shadow Blade', icon: 'items/shadow_blade.png' },
        { name: "Eul's Scepter", icon: 'items/euls_scepter.png' },
        { name: 'Power Treads', icon: 'items/power_treads.png' },
        { name: 'Black King Bar', icon: 'items/bkb.png' }
      ],
      situational: [
        { name: 'Silver Edge', icon: 'items/silver_edge.png' },
        { name: 'Butterfly', icon: 'items/butterfly.png' },
        { name: 'Daedalus', icon: 'items/daedalus.png' }
      ],
      luxury: [
        { name: 'Eye of Skadi', icon: 'items/eye_of_skadi.png' },
        { name: 'Satanic', icon: 'items/satanic.png' },
        { name: 'Manta Style', icon: 'items/manta_style.png' }
      ]
    },
    skills: [
      { key: 'Q', name: 'Shadowraze', icon: 'skills/shadowraze.png' },
      { key: 'W', name: 'Necromastery', icon: 'skills/necromastery.png' },
      { key: 'E', name: 'Presence of the Dark Lord', icon: 'skills/presence_of_the_dark_lord.png' },
      { key: 'R', name: 'Requiem of Souls', icon: 'skills/requiem_of_souls.png' }
    ]
  },
  {
    id: 12,
    name: 'Oracle',
    icon: 'gifs/oracle.gif',
    role: 'Support',
    roleClass: 'support',
    rarity: 'rare',
    winrate: 50.9,
    builds: {
      core: [
        { name: 'Force Staff', icon: 'items/force_staff.png' },
        { name: 'Glimmer Cape', icon: 'items/glimmer_cape.png' },
        { name: 'Tranquil Boots', icon: 'items/tranquil_boots.png' },
        { name: 'Aether Lens', icon: 'items/aether_lens.png' }
      ],
      situational: [
        { name: "Eul's Scepter", icon: 'items/euls_scepter.png' },
        { name: 'Ghost Scepter', icon: 'items/ghost_scepter.png' },
        { name: 'Blink Dagger', icon: 'items/blink_dagger.png' }
      ],
      luxury: [
        { name: "Aghanim's Scepter", icon: 'items/aghanims_scepter.png' },
        { name: 'Octarine Core', icon: 'items/octarine_core.png' },
        { name: 'Aeon Disk', icon: 'items/aeon.png' }
      ]
    },
    skills: [
      { key: 'Q', name: "Fortune's End", icon: 'skills/fortunes_end.png' },
      { key: 'W', name: "Fate's Edict", icon: 'skills/fates_edict.png' },
      { key: 'E', name: 'Purifying Flames', icon: 'skills/purifying_flames.png' },
      { key: 'R', name: 'False Promise', icon: 'skills/false_promise.png' }
    ]
  }
];

// DOM элементы
const grid = document.getElementById('heroesGrid');
const searchInput = document.getElementById('heroSearch');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('heroModal');
const modalClose = document.getElementById('modalClose');

let selectedHeroId = null;
let currentFilter = 'all';

// Рендер героев
function renderHeroes(filter = 'all', search = '') {
  const filtered = heroesData.filter(hero => {
    const matchFilter = filter === 'all' || hero.roleClass === filter;
    const matchSearch = hero.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  grid.innerHTML = filtered.map(hero => {
    const iconHtml = hero.icon ?
      `<img src="${hero.icon}" class="hero-icon-img" alt="${hero.name}">` :
      `<div class="hero-icon-placeholder">${hero.name.charAt(0)}</div>`;

    return `
      <div class="hero-card ${hero.rarity} ${selectedHeroId === hero.id ? 'selected' : ''}"
           data-id="${hero.id}"
           onclick="selectHero(${hero.id})">
        <div class="winrate-tooltip">📊 ${hero.winrate}% &lt;7k</div>
        <div class="hero-icon">
          ${iconHtml}
        </div>
        <div class="hero-name">${hero.name}</div>
        <div class="hero-role-tag">${hero.role}</div>
      </div>
    `;
  }).join('');
}

// Выбор героя с анимацией
function selectHero(id) {
  const hero = heroesData.find(h => h.id === id);
  if (!hero) return;

  if (selectedHeroId === id) {
    selectedHeroId = null;
    renderHeroes(currentFilter, searchInput.value);
    return;
  }

  selectedHeroId = id;
  renderHeroes(currentFilter, searchInput.value);
  showModal(hero);
}

// Показать модалку
function showModal(hero) {
  const modalIcon = document.getElementById('modalIcon');
  if (hero.icon) {
    modalIcon.innerHTML = `<img src="${hero.icon}" class="modal-hero-icon-img" alt="${hero.name}">`;
  } else {
    modalIcon.innerHTML = `<div class="modal-hero-placeholder">${hero.name.charAt(0)}</div>`;
  }

  document.getElementById('modalName').textContent = hero.name;
  document.getElementById('modalRole').textContent = hero.role;
  document.getElementById('modalWinrate').textContent = hero.winrate + '%';

  const buildItems = document.getElementById('buildItems');
  const buildTabs = document.querySelectorAll('.build-tab');

  function renderBuild(type) {
    const items = hero.builds[type] || [];
    buildItems.innerHTML = items.map(item => `
      <div class="build-item">
        <img src="${item.icon}" class="item-icon-img" alt="${item.name}">
        ${item.name}
      </div>
    `).join('');
  }

  buildTabs.forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.build === 'core') tab.classList.add('active');
  });
  renderBuild('core');

  buildTabs.forEach(tab => {
    tab.onclick = () => {
      buildTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderBuild(tab.dataset.build);
    };
  });

  const skillOrder = document.getElementById('skillOrder');
  skillOrder.innerHTML = hero.skills.map(skill => `
    <div class="skill-item">
      <span class="skill-key">${skill.key}</span>
      <img src="${skill.icon}" class="skill-icon-img" alt="${skill.name}">
      ${skill.name}
    </div>
  `).join('');

  modal.classList.add('active');
}

// Закрыть модалку
function closeModal() {
  modal.classList.remove('active');
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Поиск
searchInput.addEventListener('input', () => {
  renderHeroes(currentFilter, searchInput.value);
});

// Фильтры
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderHeroes(currentFilter, searchInput.value);
  });
});

// Инициализация
renderHeroes();
