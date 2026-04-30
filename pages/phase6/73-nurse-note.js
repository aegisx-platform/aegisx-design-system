/* #73 Nurse's note · Focus / DAR */
(function(){
  if (!window.AX6) return;

  AX6.register(function nurseNoteSection(){
    const { h, section, sub, demo } = AX6;

    const dar = (letter, text) => h('div', {class:'nn__dar-row'},
      h('div', {class:`nn__dar-letter nn__dar-letter--${letter}`}, letter),
      h('div', {class:'nn__dar-text', html: text})
    );

    const entry = (opts) => {
      const { time, date, focusCat, focusName, focusTag, focusIcd,
              darD, darA, darR, nurse, role, signTime, cosign,
              vitals, amendNote, rowMod } = opts;

      const el = h('div', {class: `nn__entry${rowMod ? ' nn__entry--'+rowMod : ''}`});

      el.appendChild(h('div', {class:'nn__time'},
        h('strong', {}, time),
        h('div', {class:'nn__date'}, date)
      ));

      const focusCol = h('div', {class:'nn__focus'});
      if (focusCat) focusCol.appendChild(h('div', {class:'nn__focus-cat'}, focusCat));
      focusCol.appendChild(h('div', {class:'nn__focus-name'}, focusName));
      if (focusTag) focusCol.appendChild(h('div', {class:`nn__focus-tag nn__focus-tag--${focusTag}`}, focusTag));
      if (focusIcd) focusCol.appendChild(h('div', {class:'nn__focus-icd'}, focusIcd));
      el.appendChild(focusCol);

      const darCol = h('div', {class:'nn__dar'});
      if (darD) darCol.appendChild(dar('D', darD));
      if (darA) darCol.appendChild(dar('A', darA));
      if (darR) darCol.appendChild(dar('R', darR));
      if (vitals) {
        const vRow = h('div', {class:'nn__vitals'});
        for (const [label, val, mod] of vitals) {
          vRow.appendChild(h('div', {class:'nn__vit-pill'},
            label + ' ',
            h('strong', {}, val),
            mod ? h('span', {class:`nn__tok nn__tok--${mod}`}, mod) : null
          ));
        }
        darCol.appendChild(vRow);
      }
      if (amendNote) darCol.appendChild(h('div', {class:'nn__amend-note'}, '⚠ ' + amendNote));
      el.appendChild(darCol);

      const sigCol = h('div', {class:'nn__sig'});
      sigCol.appendChild(h('div', {class:'nn__sig-name'}, nurse));
      sigCol.appendChild(h('div', {class:'nn__sig-role'}, role));
      sigCol.appendChild(h('div', {class:'nn__sig-time'}, signTime));
      if (cosign) sigCol.appendChild(h('div', {class:'nn__sig-cosign'}, '✓ cosigned'));
      el.appendChild(sigCol);

      return el;
    };

    const card = h('div', {class:'nn'});

    card.appendChild(h('div', {class:'nn__head'},
      h('div', {},
        h('div', {class:'nn__title'}, "Nurse's Note — Focus / DAR"),
        h('div', {class:'nn__sub'}, 'AN · 67-12345 · สุดา ปัญญาดี · Ward 4 Med-Surg · IPD-2024-08-12')
      ),
      h('div', {class:'nn__filter'},
        h('div', {class:'nn__filter-tab nn__filter-tab--on'}, 'All'),
        h('div', {class:'nn__filter-tab'}, 'Problem'),
        h('div', {class:'nn__filter-tab'}, 'Routine'),
        h('div', {class:'nn__filter-tab'}, 'Event')
      )
    ));

    card.appendChild(h('div', {class:'nn__shift'},
      h('span', {}, h('strong', {}, 'Day shift'), ' · 07:00–15:00'),
      h('div', {class:'nn__shift-meta'},
        h('span', {}, 'RN · พยาบาล A'),
        h('span', {}, '2024-08-12')
      )
    ));

    card.appendChild(entry({
      time: '08:45', date: '12 ส.ค.',
      focusCat: 'Nursing diagnosis',
      focusName: 'Acute Pain',
      focusTag: 'problem',
      focusIcd: 'NANDA 00132',
      darD: 'ผู้ป่วยร้องเรียนปวดบริเวณแผลหน้าท้อง <strong>NRS <span class="nn__tok nn__tok--alert">8/10</span></strong>',
      darA: 'ประเมิน vital signs: <span class="nn__tok">BP 148/92</span> <span class="nn__tok nn__tok--alert">PR 108</span> — tachycardia',
      darR: 'ให้ Tramadol 50 mg IV · จัดท่า semi-Fowler · ประเมินซ้ำ 30 นาที',
      nurse: 'รัตนา สุขใจ', role: 'RN · Ward 4', signTime: '08:52', cosign: false
    }));

    card.appendChild(entry({
      time: '12:00', date: '12 ส.ค.',
      focusCat: 'Routine assessment',
      focusName: 'Vital signs & comfort',
      focusTag: 'routine',
      darD: 'ผู้ป่วยรายงานปวดลดลง <strong>NRS <span class="nn__tok nn__tok--ok">4/10</span></strong>',
      darA: 'Vital signs อยู่ในเกณฑ์ปกติ — hemodynamic stable',
      darR: 'Continue pain management plan · deep breathing',
      vitals: [
        ['BP', '132/84', null], ['PR', '88', null], ['RR', '18', null],
        ['Temp', '37.2°C', null], ['SpO₂', '98%', 'ok'], ['Pain', '4/10', 'warn']
      ],
      nurse: 'รัตนา สุขใจ', role: 'RN · Ward 4', signTime: '12:08', cosign: true
    }));

    card.appendChild(h('div', {class:'nn__shift'},
      h('span', {}, h('strong', {}, 'Evening shift'), ' · 15:00–23:00'),
      h('div', {class:'nn__shift-meta'},
        h('span', {}, 'RN · พยาบาล B'),
        h('span', {}, '2024-08-12')
      )
    ));

    card.appendChild(entry({
      time: '17:30', date: '12 ส.ค.',
      focusCat: 'Safety event',
      focusName: 'Fall risk reassessment',
      focusTag: 'event',
      rowMod: 'event',
      darD: 'Morse Fall Scale ประเมินได้ <strong>55 คะแนน</strong> (high risk)',
      darA: 'ติดป้าย fall precaution · ลง side rail ทั้ง 2 ข้าง',
      darR: 'ให้ bed alarm · ประเมินซ้ำทุก 4 ชั่วโมง',
      nurse: 'มาลี จันทร์เพ็ญ', role: 'RN · Ward 4', signTime: '17:42', cosign: false,
      amendNote: 'Amended 18:05 — เพิ่ม bed sensor'
    }));

    card.appendChild(h('div', {class:'nn__foot'},
      h('div', {class:'nn__foot-stats'},
        h('span', {}, 'Entries today: ', h('strong', {}, '3')),
        h('span', {}, 'Problems: ', h('strong', {}, '1')),
        h('span', {}, 'Routine: ', h('strong', {}, '1')),
        h('span', {}, 'Events: ', h('strong', {}, '1'))
      ),
      h('div', {class:'nn__btn-row'},
        h('button', {class:'nn__btn'}, 'Export PDF'),
        h('button', {class:'nn__btn nn__btn--primary'}, '+ Add note')
      )
    ));

    return section(
      'nno', '73',
      "Nurse's note (Focus / DAR)",
      'Structured nursing documentation: Focus (problem/event/routine), Data, Action, Response — with shift headers, vitals inline, and co-sign support.',
      sub(null, demo(card))
    );
  });
})();
