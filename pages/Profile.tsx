import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, login, logout, isAdmin } = useAuth();
  const { t, lang, setLang } = useLanguage();
  const [phone, setPhone] = React.useState('');
  const navigate = useNavigate();

  if (!user) {
    return (
        <div className="p-8 flex flex-col items-center justify-center h-[80vh] space-y-4 max-w-md mx-auto">
            <h1 className="text-3xl font-bold">{t.login}</h1>
            <p className="text-slate-500 text-center mb-4">Enter your phone number to access your orders and profile.</p>
            <input 
                type="tel" 
                placeholder="+998..." 
                className="w-full p-4 border rounded-xl bg-white focus:border-red-600 outline-none transition-colors"
                value={phone}
                onChange={e => setPhone(e.target.value)}
            />
            <button 
                onClick={() => login(phone || '+998901234567')}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-red-700 transition-colors"
            >
                {t.login}
            </button>
            <p className="text-xs text-slate-400 mt-4 text-center">
                Demo Admin Access: Enter <span className="font-mono text-slate-600 font-bold bg-slate-100 px-1 rounded">+998901234567</span>
            </p>
        </div>
    )
  }

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
            <div className="w-20 h-20 bg-slate-200 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img src="https://ui-avatars.com/api/?name=KFC+User&background=E4002B&color=fff&size=128" alt="Avatar" className="w-full h-full" />
            </div>
            <div>
                 <h1 className="text-3xl font-black text-slate-900">{user.name}</h1>
                 <p className="text-slate-500 font-medium">{user.phone}</p>
            </div>
        </div>
        
        {isAdmin && (
            <button 
                onClick={() => navigate('/admin')}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 mb-6 shadow-lg shadow-slate-200 hover:bg-slate-800 transition-colors"
            >
                <LayoutDashboard size={20} /> 
                <span>Open Admin Panel</span>
            </button>
        )}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
            <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-red-600 rounded-full"></span>
                {t.settings}
            </h2>
            <div className="space-y-6">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-600 font-medium">{t.notification}</span>
                    <div className="w-12 h-6 bg-red-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                </div>
                <div className="py-2">
                    <div className="flex justify-between mb-3">
                        <span className="text-slate-600 font-medium">{t.language}</span>
                    </div>
                    <div className="flex bg-slate-100 p-1.5 rounded-xl">
                        {(['uz', 'ru', 'en'] as const).map((l) => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                                    lang === l ? 'bg-white text-red-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                {l.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <button onClick={logout} className="w-full py-4 text-red-600 font-bold bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
            {t.logout}
        </button>
    </div>
  );
};

export default Profile;