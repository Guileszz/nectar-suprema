# Infraestrutura Global 5.0 — Migração Vercel/Supabase/Neon

## 📋 Visão Geral

Migração completa da infraestrutura legado (Nov-API FastAPI, SovereignTrafficV2, AutomationCore)
para a stack moderna de **Vercel + Supabase + Neon**, suportando a expansão global
(110 nichos, 3 mercados: BR, US, LATAM).

## 🏗️ Stack Moderna

| Componente     | Tecnologia           | Status        |
|----------------|----------------------|---------------|
| Frontend       | Vite + React + Tailwind | ✅ Configurado |
| Hosting        | Vercel               | ✅ Configurado |
| Database       | Neon (Postgres)      | ✅ Migrado     |
| Auth/Realtime  | Supabase             | 🔧 Pendente   |
| API Routes     | Vercel Serverless     | ✅ Criadas    |
| CI/CD          | GitHub Actions       | 🔧 Pendente   |

## 🗄️ Neon Database

**Projeto ID:** `small-sky-36458961`
**URI:** (armazenada em memória do Operations Architect)

### Tabelas Migradas (7 + 1 legacy)

| Tabela                | Colunas | Descrição                          |
|-----------------------|---------|------------------------------------|
| `niches`              | 11      | 110 nichos info-hybrid             |
| `funnels`             | 11      | 224+ funis de vendas               |
| `products`            | 9       | Produtos de informação             |
| `leads`               | 12      | Leads capturados                   |
| `sales`               | 11      | Vendas e transações                |
| `roi_tracking`        | 10      | ROI tracking por nicho             |
| `automation_workflows`| 8       | Workflows de automação             |
| `immutable_ledger`    | 8       | (Existente - legado)               |

### Índices Criados
- `idx_leads_email` — Busca rápida por email
- `idx_leads_niche` — Filtro por nicho
- `idx_sales_niche` — Relatórios por nicho
- `idx_sales_date` — Relatórios temporais
- `idx_roi_niche_date` — ROI tracking composto
- `idx_funnels_niche` — Funis por nicho

## 🌐 Site (Vercel)

**Path:** `/home/team/shared/info-hybrid-structure`
**Framework:** Vite + React + TypeScript + Tailwind CSS

### Estrutura
```
├── src/
│   ├── App.tsx                 # Componente principal
│   ├── main.tsx                # Entry point
│   ├── config/content.json     # Conteúdo multilíngue (BR/US/ES)
│   ├── components/
│   │   ├── Hero.tsx           # Seção hero
│   │   ├── Problem.tsx        # Seção problema
│   │   ├── Solution.tsx       # Seção solução
│   │   ├── SocialProof.tsx    # Prova social
│   │   ├── Pricing.tsx        # Preços + Order Bump
│   │   ├── FAQ.tsx            # FAQ
│   │   └── Footer.tsx         # Footer
│   └── lib/payments.ts        # Integração Kiwify/Hotmart
├── api/
│   ├── observe.ts             # Nov Observer (substitui FastAPI)
│   ├── status.ts              # Health check
│   ├── niches.ts              # Lista de nichos
│   ├── roi.ts                 # Cálculo de ROI
│   └── automation.ts          # Webhook de automação
├── vercel.json                # Configuração Vercel
└── package.json               # Dependências
```

### API Endpoints (Vercel Serverless)
| Endpoint              | Method | Descrição                          | Legado Substituído     |
|-----------------------|--------|------------------------------------|------------------------|
| `/api/observe`        | POST   | Predictive state monitoring        | Nov-API:8001/observe   |
| `/api/status`         | GET    | Health check / system status       | —                      |
| `/api/niches`         | GET    | Lista de nichos ativos             | —                      |
| `/api/roi`            | POST   | Cálculo e recomendação de ROI      | SovereignTrafficV2     |
| `/api/automation`     | POST   | Gatilho de workflows               | AutomationCore webhooks|

## 🔐 Variáveis de Ambiente

```env
DATABASE_URL=postgresql://neondb_owner:***@ep-damp-band-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require
GEMINI_API_KEY=***  (em credentials.env)
SOVEREIGN_ADM_TOKEN=SOVEREIGN_PULSE_999
```

## 📈 Próximos Passos (Backlog)

1. **Supabase Setup** — Criar projeto Supabase para auth + realtime + storage
2. **CI/CD Pipeline** — GitHub Actions para deploy automático em Vercel
3. **Seed Data** — Popular tabelas com dados dos 110 nichos (de niches_backup.json)
4. **Edge Functions** — Migrar automation workflows para Supabase Edge Functions
5. **Monitoring** — Integrar Sentry e BetterStack para observabilidade

## 🔗 Links Úteis

- **Site Público:** https://f4c2a14c8b654cad664bd7e3089725ec.ctonew.app (porta 3000)
- **Neon Console:** https://console.neon.tech (projeto: small-sky-36458961)
- **Repositório:** nectar-suprema-repo (GitHub Pages deploy)

---

*Documentação gerada pelo Operations_Architect — Infraestrutura Global 5.0*
*Última atualização: 2026-06-28*