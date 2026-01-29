<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
    <!-- HERO PROFILE -->
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,165,0,0.25),transparent_60%)]"></div>
      <div class="max-w-6xl mx-auto px-6 py-16 relative">
        <div class="flex flex-col md:flex-row md:items-center gap-8">
          <img
            src="https://i.pravatar.cc/160?img=32"
            class="w-32 h-32 rounded-3xl ring-4 ring-orange-500/40 shadow-2xl"
          />
          <div class="flex-1">
            <h1 class="text-3xl md:text-4xl font-bold tracking-tight">Customer Name</h1>
            <p class="text-white/70 mt-1">Premium Restaurant Member</p>

            <div class="mt-4 flex flex-wrap gap-3">
              <span class="px-4 py-1.5 rounded-full text-xs bg-orange-500/20 text-orange-300 border border-orange-500/30">VIP</span>
              <span class="px-4 py-1.5 rounded-full text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Active</span>
              <span class="px-4 py-1.5 rounded-full text-xs bg-sky-500/20 text-sky-300 border border-sky-500/30">Loyal</span>
            </div>
          </div>

          <button class="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-black font-bold shadow-lg transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>

    <!-- STATS -->
    <div class="max-w-6xl mx-auto px-6 -mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.label" class="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow">
        <p class="text-3xl font-bold text-orange-400">{{ stat.value }}</p>
        <p class="text-white/60 text-sm mt-1">{{ stat.label }}</p>
      </div>
    </div>

    <!-- MAIN -->
    <div class="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- ACCOUNT -->
      <div class="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
        <h2 class="font-semibold text-lg mb-6">Account Information</h2>
        <div class="space-y-5 text-sm">
          <div class="flex justify-between">
            <span class="text-white/60">Email</span>
            <span class="font-medium">customer@mail.com</span>
          </div>
          <div class="flex justify-between">
            <span class="text-white/60">Phone</span>
            <span class="font-medium">0812‑3456‑7890</span>
          </div>
          <div class="flex justify-between">
            <span class="text-white/60">Member Since</span>
            <span class="font-medium">2025</span>
          </div>
        </div>
      </div>

      <!-- LOYALTY -->
      <div class="bg-gradient-to-br from-orange-500 to-amber-400 rounded-3xl p-6 text-black shadow-xl">
        <h2 class="font-semibold text-lg">Loyalty Points</h2>
        <p class="text-black/70 text-sm">Use points for discount</p>
        <div class="mt-8 text-center">
          <p class="text-5xl font-extrabold">{{ loyaltyPoints }}</p>
          <p class="text-sm">POINTS</p>
        </div>
      </div>

      <!-- QUICK ACTION -->
      <div class="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
        <h2 class="font-semibold text-lg mb-6">Quick Actions</h2>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <button class="py-3 rounded-xl bg-white/10 hover:bg-white/20">Orders</button>
          <button class="py-3 rounded-xl bg-white/10 hover:bg-white/20">Vouchers</button>
          <button class="py-3 rounded-xl bg-white/10 hover:bg-white/20">Support</button>
          <button class="py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30">Logout</button>
        </div>
      </div>
    </div>

    <!-- ORDER HISTORY -->
    <div class="max-w-6xl mx-auto px-6 pb-16">
      <div class="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
        <h2 class="font-semibold text-lg mb-6">Order History</h2>
        <div class="space-y-5">
          <div
            v-for="order in orders"
            :key="order.invoice"
            class="flex items-center justify-between bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition"
          >
            <div>
              <p class="font-medium">{{ order.invoice }}</p>
              <p class="text-white/60 text-sm">{{ order.date }}</p>
            </div>
            <div class="text-right">
              <p class="font-semibold">Rp {{ order.total.toLocaleString() }}</p>
              <span
                :class="order.status === 'Selesai'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-yellow-500/20 text-yellow-300'"
                class="text-xs px-3 py-1 rounded-full"
              >
                {{ order.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const loyaltyPoints = 320

const stats = [
  { label: 'Orders', value: 18 },
  { label: 'Spent', value: '1.8M' },
  { label: 'Points Used', value: 120 },
  { label: 'Vouchers', value: 3 }
]

const orders = [
  { invoice: 'INV-00123', date: '12 Jan 2026', total: 125000, status: 'Selesai' },
  { invoice: 'INV-00110', date: '05 Jan 2026', total: 78000, status: 'Selesai' },
  { invoice: 'INV-00098', date: '28 Des 2025', total: 54000, status: 'Pending' }
]
</script>

<style scoped>
/* FALLBACK PREMIUM CSS (tanpa Tailwind) */
:root{
  --bg:#0b0f14;--card:rgba(255,255,255,.08);--border:rgba(255,255,255,.12);
  --accent:#f59e0b;--muted:rgba(255,255,255,.65);
}
*{box-sizing:border-box}
body{margin:0}
.min-h-screen{min-height:100vh;background:radial-gradient(60% 40% at 50% 0%,rgba(245,158,11,.25),transparent 60%),linear-gradient(135deg,#0b0f14,#020617);color:#fff;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto}
.max-w-6xl{max-width:1100px;margin:0 auto}
.px-6{padding-left:24px;padding-right:24px}
.py-16{padding-top:64px;padding-bottom:64px}
.py-12{padding-top:48px;padding-bottom:48px}
.pb-16{padding-bottom:64px}
.flex{display:flex}
.grid{display:grid}
.gap-8{gap:32px}
.gap-6{gap:24px}
.items-center{align-items:center}
.justify-between{justify-content:space-between}
.rounded-3xl{border-radius:24px}
.rounded-2xl{border-radius:16px}
.shadow-xl{box-shadow:0 20px 50px rgba(0,0,0,.45)}
.backdrop{backdrop-filter:blur(14px)}
.card{background:var(--card);border:1px solid var(--border)}
.hero{padding:64px 24px}
.avatar{width:128px;height:128px;border-radius:20px;object-fit:cover;box-shadow:0 25px 60px rgba(0,0,0,.6);border:4px solid rgba(245,158,11,.4)}
.btn{padding:12px 18px;border-radius:16px;background:var(--accent);color:#000;font-weight:700;border:none;cursor:pointer}
.badge{padding:6px 12px;border-radius:999px;font-size:12px;border:1px solid rgba(245,158,11,.35);background:rgba(245,158,11,.18);color:#ffdd9e}
.stats{margin-top:-40px}
.stat{padding:20px;border-radius:16px;background:var(--card);border:1px solid var(--border)}
.stat .v{font-size:28px;font-weight:800;color:#fbbf24}
.h{font-size:28px;font-weight:800}
.sub{color:var(--muted)}
.section{padding:24px}
.list{display:grid;gap:12px}
.row{display:flex;justify-content:space-between}
.order{display:flex;justify-content:space-between;align-items:center;padding:16px;border-radius:16px;background:rgba(255,255,255,.06);border:1px solid var(--border)}
.chip{font-size:12px;padding:6px 10px;border-radius:999px}
.ok{background:rgba(16,185,129,.2);color:#a7f3d0}
.pd{background:rgba(245,158,11,.2);color:#fde68a}
@media(min-width:1024px){.lg-3{grid-template-columns:repeat(3,1fr)}.lg-4{grid-template-columns:repeat(4,1fr)}}
</style>
