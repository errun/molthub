# Moltbot (formerly Clawdbot) — Installation & Troubleshooting Quickstart (Minimal)

> **Purpose:** Get Moltbot installed, running, and verifiable—fast.  
> **Focus:** Install → Verify → Fix common issues.  
> **Not included:** long background, deep security essays, or “all possible deployment methods.”

---

## 0) Preflight Checklist (Do This First)

### 0.1 Verify Node & npm
Moltbot typically requires **Node.js 22+**.

```bash
node -v
npm -v
```

### 0.2 Windows Recommendation
If you’re on Windows, **WSL2** is strongly recommended. Native Windows installs commonly hit CLI exposure / ENOENT / build-tool issues.

### 0.3 Confirm the gateway port isn’t blocked or occupied
Some setups use a default gateway port (often **18789**). If your environment differs, treat this as “the port shown by `moltbot doctor/status`”.

---

## 1) Choose an Install Path (3 options, no fluff)

### Option A — Installer Script (fastest, recommended)
**macOS / Linux**
```bash
curl -fsSL https://molt.bot/install.sh | bash
```

**Windows PowerShell**
```powershell
iwr -useb https://molt.bot/install.ps1 | iex
```

Useful flags (only the ones people actually use):
- `--no-onboard` : install only; configure later (automation/CI)
- `--install-method npm|git` : default is npm; use git if you want source builds

---

### Option B — Manual Global Install (more control)
```bash
npm install -g moltbot@latest
```

If you hit **sharp/libvips** build failures (common on macOS):
```bash
SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install -g moltbot@latest
```

---

### Option C — Install From Source (for contributors / debugging)
```bash
git clone <repo-url>
cd moltbot
pnpm install
pnpm build
```

Tip: while developing, run commands through pnpm (example):
```bash
pnpm moltbot doctor
```

---

## 2) Post-Install: Must-Run Verification Commands

### 2.1 Onboard (and optionally install daemon/service)
```bash
moltbot onboard --install-daemon
```

### 2.2 Diagnose
```bash
moltbot doctor
```

### 2.3 Status & Health
```bash
moltbot status
moltbot health
```

If a dashboard/UI exists in your setup:
```bash
moltbot dashboard
```

---

## 3) Troubleshooting (Symptom → Fast Fix)

### 3.1 `moltbot: command not found`
Most likely: global npm bin isn’t on your PATH, or an old/conflicting install exists.

1) Find the global prefix:
```bash
npm prefix -g
```

2) Ensure the global bin is in PATH (macOS/Linux examples):
```bash
echo 'export PATH="$(npm prefix -g)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

3) Clean reinstall:
```bash
npm uninstall -g moltbot
npm install -g moltbot@latest
```

---

### 3.2 `sharp` / `libvips` / `node-gyp` build failures
Try the “use prebuilt binaries” route first:
```bash
SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install -g moltbot@latest
```

If you’re on macOS and builds still fail, install the OS build toolchain (Xcode Command Line Tools) and retry.

---

### 3.3 Windows: install succeeds but no CLI / ENOENT issues
Best fix: **use WSL2**.  
If you must stay native, prefer the project’s supported package versions for Windows (often mentioned in release notes/issues) and ensure build tooling is installed.

---

### 3.4 Gateway won’t start (port in use / auth failures)
1) Run diagnosis:
```bash
moltbot doctor
```

2) Check whether the port is occupied (macOS/Linux):
```bash
lsof -i :18789
```

Resolve by stopping the conflicting process or changing Moltbot’s port in config, then restart the service.

---

### 3.5 Bot is “offline” in a channel (Telegram/Slack/etc.)
Usually: daemon not running, network/DNS issues, or bad credentials.

- Start with:
```bash
moltbot status
moltbot health
```

- Then check service logs (system-dependent):
  - Linux (systemd): `journalctl -u <service-name> -n 200 --no-pager`
  - macOS (launchd): use `launchctl` + unified logs as appropriate

---

## 4) Update & Uninstall (Clean Commands)

### Update (npm install)
```bash
npm i -g moltbot@latest
```

### Update (git/source)
```bash
git pull
pnpm install
pnpm build
```

### Uninstall (npm)
```bash
npm uninstall -g moltbot
```

Optional: remove config directory (only if you want a clean reset):
```bash
rm -rf ~/.moltbot
```

---

## 5) Safe Defaults (3 rules, keep it simple)

1) **Bind dashboard/UI to localhost** unless you *really* know what you’re doing.  
2) **Never commit or paste API keys** (use environment variables / secrets manager).  
3) **Prefer isolation** (WSL2, separate user account, or a dedicated machine) to reduce blast radius.

---

## Appendix: One-Line “How to Ask for Help”
When requesting support, include:
- OS + Node version (`node -v`)
- Install method (script / npm / source)
- Output of:
```bash
moltbot doctor
moltbot status
```
- Relevant log snippet (last ~100–200 lines)
