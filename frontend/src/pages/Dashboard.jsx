import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Eye,
  TrendingUp,
  IndianRupee,
  LogOut,
  LayoutDashboard,
  Video,
  Share2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import api from '../api';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [platform, setPlatform] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem('creatoriq_user') || '{}');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get(`/dashboard/overview?platform=${platform}`);
        setData(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('creatoriq_token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [platform, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('creatoriq_token');
    localStorage.removeItem('creatoriq_user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
        Loading CreatorIQ Analytics...
      </div>
    );
  }

  const kpis = data?.kpis || {};

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-5">
        <div>
          <div className="flex items-center gap-2.5 mb-6">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">CreatorIQ</span>
          </div>

          {/* Role Badge */}
          <div className="mb-6 p-3 rounded-xl bg-slate-800/70 border border-slate-700/60">
            <p className="text-xs text-slate-400">Signed in as</p>
            <p className="text-sm font-semibold truncate">{storedUser.full_name || 'Creator'}</p>
            <span className="inline-block mt-1.5 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {storedUser.role || 'creator'}
            </span>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Overview Dashboard
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                activeTab === 'content'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              Content Performance
            </button>

            <button
              onClick={() => setActiveTab('integrations')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                activeTab === 'integrations'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Share2 className="w-4 h-4" />
              Social Integrations
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 px-3 py-2 rounded-lg hover:bg-slate-800/60 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Creator Analytics Overview</h1>
            <p className="text-sm text-slate-400">
              Real-time multi-platform engagement, audience growth, and monetization metrics
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Platforms</option>
              <option value="youtube">YouTube</option>
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
              <option value="twitter">X (Twitter)</option>
            </select>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <KpiCard
            title="Total Followers"
            value={kpis.total_followers?.toLocaleString('en-IN')}
            growth={kpis.followers_growth}
            icon={<Users className="w-5 h-5 text-indigo-400" />}
          />
          <KpiCard
            title="Total Views (30d)"
            value={kpis.total_views?.toLocaleString('en-IN')}
            growth={kpis.views_growth}
            icon={<Eye className="w-5 h-5 text-sky-400" />}
          />
          <KpiCard
            title="Avg. Engagement Rate"
            value={`${kpis.engagement_rate}%`}
            growth={kpis.engagement_growth}
            icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
          />
          <KpiCard
            title="Monthly Revenue"
            value={`₹${kpis.monthly_revenue_inr?.toLocaleString('en-IN')}`}
            growth={kpis.revenue_growth}
            icon={<IndianRupee className="w-5 h-5 text-amber-400" />}
          />
        </div>

        {/* Charts Row */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
            {/* Area Chart: Views Growth */}
            <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-base font-semibold mb-4">Weekly Views Growth Trend</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data?.growth_trend || []}>
                    <defs>
                      <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="#6366f1"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#viewsGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart: Platform Engagement Breakdown */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-base font-semibold mb-4">Engagement by Platform</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data?.platform_engagement || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="platform" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
                    />
                    <Legend />
                    <Bar dataKey="likes" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="shares" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Top Performing Content Table */}
        {(activeTab === 'overview' || activeTab === 'content') && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
            <h2 className="text-base font-semibold mb-4">Top Performing Content</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-xs uppercase text-slate-400">
                    <th className="py-3 px-4">Content Title</th>
                    <th className="py-3 px-4">Platform</th>
                    <th className="py-3 px-4">Views</th>
                    <th className="py-3 px-4">Engagement Rate</th>
                    <th className="py-3 px-4">Watch Time (Hrs)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 text-sm">
                  {(data?.top_content || []).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40">
                      <td className="py-3.5 px-4 font-medium text-white">{item.title}</td>
                      <td className="py-3.5 px-4 text-slate-300">{item.platform}</td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {item.views.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400">
                          {item.engagement_rate}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{item.watch_time_hrs} hrs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Connected Accounts Section */}
        {activeTab === 'integrations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(data?.connected_accounts || []).map((acc) => (
              <div
                key={acc.platform}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-white">{acc.platform}</h3>
                  <p className="text-sm text-slate-400">{acc.handle}</p>
                  <p className="text-xs text-slate-500 mt-1">Last Sync: {acc.last_sync}</p>
                </div>
                <div className="flex items-center gap-2">
                  {acc.status === 'connected' ? (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full">
                      <CheckCircle2 className="w-4 h-4" /> Connected
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full">
                      <XCircle className="w-4 h-4" /> Not Connected
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function KpiCard({ title, value, growth, icon }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-400">{title}</span>
        <div className="p-2 bg-slate-800 rounded-lg">{icon}</div>
      </div>
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <span className="text-xs font-medium text-emerald-400">{growth}</span>
      </div>
    </div>
  );
}