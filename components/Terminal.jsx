'use client';

import React, { useState, useRef, useEffect } from 'react';
import { bio, services, projects, techStacks, education } from '@/lib/content';

const HISTORY_KEY = 'bm-terminal-history';

function buildCommands() {
  return {
    help: () => [
      'AVAILABLE COMMANDS:',
      '  about        who is brian',
      '  skills       tech stack overview',
      '  projects     shipped work',
      '  services     what brian offers',
      '  education    academic background',
      '  contact      how to reach brian',
      '  social       links',
      '  theme        toggle light/dark',
      '  sudo hire brian   do it',
      '  clear        wipe the screen',
    ],
    about: () => [bio.name.toUpperCase(), bio.role, bio.location, '', bio.summary],
    whoami: () => ['guest — but brian is who you came for. try: about'],
    skills: () => techStacks.map((s) => `${s.group.toUpperCase().padEnd(18)} ${s.items.join(', ')}`),
    projects: () => projects.map((p) => `${p.num}  ${p.title.padEnd(26)} [${p.tags[0]}]`),
    services: () => services.map((s, i) => `${String(i + 1).padStart(2, '0')}  ${s.title}`),
    education: () => education.map((e) => `${e.school} — ${e.detail}`),
    contact: () => [`EMAIL  ${bio.email}`, `PHONE  ${bio.phone}`, `BASE   ${bio.location}`],
    social: () => [`GITHUB  ${bio.github}`],
    date: () => [new Date().toString()],
    echo: (args) => [args.join(' ')],
    theme: () => {
      const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('bm-theme', next);
      return [`theme set to ${next}`];
    },
    sudo: (args) => {
      if (args.join(' ') === 'hire brian') {
        window.location.hash = '#contact';
        return ['[sudo] permission granted. routing you to the inquiry form...'];
      }
      return ['sudo: only `sudo hire brian` is permitted on this machine'];
    },
    fortune: () => {
      const f = [
        'Every pipeline must be monitored.',
        'Ship it, then measure it.',
        'The best DNS record is the one you documented.',
        'Row-Level Security or it did not happen.',
      ];
      return [f[Math.floor(Math.random() * f.length)]];
    },
  };
}

export default function Terminal() {
  const [lines, setLines] = useState([
    'BRIAN MUKWE TERMINAL v1.0 — type `help` to begin',
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      setHistory(JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'));
    } catch {}
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const run = (raw) => {
    const cmdLine = raw.trim();
    if (!cmdLine) return;
    const nextHistory = [...history, cmdLine].slice(-50);
    setHistory(nextHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
    setHistIdx(-1);

    const [cmd, ...args] = cmdLine.split(/\s+/);
    const commands = buildCommands();

    if (cmd === 'clear') {
      setLines([]);
      return;
    }
    const handler = commands[cmd.toLowerCase()];
    const output = handler
      ? handler(args)
      : [`command not found: ${cmd} — try \`help\``];
    setLines((prev) => [...prev, `$ ${cmdLine}`, ...output, '']);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      if (history[idx] !== undefined) {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput('');
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = Object.keys(buildCommands()).concat('clear').filter((c) => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) setInput(matches[0] + ' ');
      else if (matches.length > 1) setLines((prev) => [...prev, matches.join('  ')]);
    }
  };

  return (
    <div
      className="border border-line bg-black text-left font-mono text-xs"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 px-4 py-2 border-b border-line">
        <span className="w-2.5 h-2.5 rounded-full bg-orange"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-lime-off"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-lime"></span>
        <span className="ml-2 text-[10px] tracking-widest uppercase text-green-off-white-2">guest@brianmukwe: ~</span>
      </div>
      <div ref={scrollRef} className="h-64 overflow-y-auto p-4 text-green-off-white-1 whitespace-pre-wrap leading-relaxed">
        {lines.map((l, i) => (
          <div key={i} className={l.startsWith('$') ? 'text-lime' : ''}>{l || ' '}</div>
        ))}
        <div className="flex">
          <span className="text-lime mr-2">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal input"
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent outline-none text-green-off-white-1 caret-lime"
          />
        </div>
      </div>
    </div>
  );
}
