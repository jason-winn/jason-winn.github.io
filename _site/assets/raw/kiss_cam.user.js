// ==UserScript==
// @name     VDO Ninja Director Toggle Button (Prompted, Multi-UUID Cycle with indicator)
// @match    *://vdo.ninja/*
// @run-at   document-end
// ==/UserScript==

(function () {
  if (!/[?&]director=/.test(location.search)) return;

  // Only show the confirm prompt once per tab load
  if (!sessionStorage.getItem('vdoToggleConfirmShown')) {
    if (!confirm('Enable toggle overlay for video switching?')) return;
    sessionStorage.setItem('vdoToggleConfirmShown', '1');
  }

  let visibleUUID = null;
  let killSwitch = true;  // START with both off

  function getUUIDs() {
    const els = Array.from(document.querySelectorAll('[data--u-u-i-d]'));
    return [...new Set(els.map(el => el.getAttribute('data--u-u-i-d')).filter(Boolean))];
  }

  function doSend(uuid, muted) {
    const msg = { directVideoMuted: muted, target: uuid };
    for (const i in session.pcs) {
      try { session.pcs[i].sendChannel.send(JSON.stringify(msg)); } catch (e) {}
    }
  }

  function updateIndicator() {
    const uuids = getUUIDs();

    if (killSwitch) {
      btn2.disabled = true;
      btn2.style.opacity = '0.4';
      btn2.style.cursor = 'default';
    } else {
      btn2.disabled = false;
      btn2.style.opacity = '1';
      btn2.style.cursor = 'pointer';
    }

    if (killSwitch || !visibleUUID || !uuids.includes(visibleUUID)) {
      badge.textContent = 'No Camera Active';
      badge.style.background = '#aaa';
      badge.style.color = '#000';
      return;
    }

    const idxInList = uuids.indexOf(visibleUUID);
    const displayNumber = idxInList + 1;
    const pastel = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#D7BAFF'];
    const color = pastel[idxInList % pastel.length];

    badge.textContent = `Camera ${displayNumber} Active`;
    badge.style.background = color;
    badge.style.color = '#000';
  }

  function sendStates() {
    const uuids = getUUIDs();
    const offList = [];
    const onList = [];
    
    uuids.forEach(u => {
      const shouldBeVisible = (!killSwitch && (u === visibleUUID));
      if (shouldBeVisible) {
        onList.push(u); // active feed(s)
      } else {
        offList.push(u); // feeds to turn off first
      }
    });
    
    const delayStep = 100; // increased delay from 50ms to 100ms
    
    // Send OFF commands first
    offList.forEach((u, idx) => {
      setTimeout(() => doSend(u, true), idx * delayStep);
    });
    
    // Then send ON commands after all OFF commands are out
    onList.forEach((u, idx) => {
      setTimeout(() => doSend(u, false), (offList.length + idx) * delayStep);
    });
    
    updateIndicator();
  }

  function toggleActiveCamera() {
    const uuids = getUUIDs();
    if (!uuids.length) return;

    // If killSwitch is on, disable it and show the *first* camera.
    if (killSwitch) {
      killSwitch = false;
      visibleUUID = uuids[0];
      sendStates();
      return;
    }

    if (uuids.length === 1) {
      visibleUUID = uuids[0];
    } else {
      if (!visibleUUID || !uuids.includes(visibleUUID)) {
        visibleUUID = uuids[0];
      } else {
        const currentIndex = uuids.indexOf(visibleUUID);
        const nextIndex = (currentIndex + 1) % uuids.length;
        visibleUUID = uuids[nextIndex];
      }
    }
    sendStates();
  }

  function bothOff() {
    killSwitch = true;
    sendStates();
  }

  // Hover effect styles
  const style = document.createElement('style');
  style.textContent = `
    .vdoBtn {
      position:relative;
      padding:25px 40px;
      font-size:26px;
      font-weight:bold;
      width:100%;
      border-radius:12px;
      cursor:pointer;
      transition:background 0.15s;
    }
    .vdoBtn:hover:not(:disabled) {
      background:rgba(255,255,255,0.25);
    }
    .vdoBtnRed:hover:not(:disabled) {
      background:rgba(255,0,0,0.25);
    }
  `;
  document.head.appendChild(style);

  // UI
  const overlay = document.createElement('div');
  overlay.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:black;z-index:999998;pointer-events:auto;';
  document.body.appendChild(overlay);

  const container = document.createElement('div');
  container.style = 'position:fixed;top:20px;left:25px;right:25px;text-align:center;z-index:999999;color:#fff;background:transparent;font-family:sans-serif;';

  const info = document.createElement('div');
  info.textContent = 'Tap button to switch between cameras';
  info.style = 'font-size:20px;margin-bottom:12px;font-weight:600;';
  container.appendChild(info);

  const btn1 = document.createElement('button');
  btn1.className = 'vdoBtn';
  btn1.style.border = '1px solid #fff';
  btn1.style.background = 'transparent';
  btn1.style.color = '#fff';
  btn1.style.marginBottom = '15px';
  btn1.onclick = toggleActiveCamera;

  const label = document.createElement('span');
  label.textContent = 'Toggle Active Camera';
  btn1.appendChild(label);

  const badge = document.createElement('span');
  badge.textContent = 'No Camera Active';
  badge.style = 'margin-left:12px;padding:6px 12px;border-radius:8px;background:#aaa;font-size:16px;font-weight:600;color:#000;';
  btn1.appendChild(badge);

  container.appendChild(btn1);

  const btn2 = document.createElement('button');
  btn2.className = 'vdoBtn vdoBtnRed';
  btn2.style.border = '1px solid #ff0000';
  btn2.style.background = 'transparent';
  btn2.style.color = '#ff0000';
  btn2.textContent = 'Both Cameras Off';
  btn2.onclick = bothOff;

  container.appendChild(btn2);
  document.body.appendChild(container);
})();
