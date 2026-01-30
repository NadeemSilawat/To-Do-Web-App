import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const [boards, setBoards] = useState([]);
    const [newBoardTitle, setNewBoardTitle] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { logout } = useAuth();

    useEffect(() => {
        fetchBoards();
    }, []);

    async function fetchBoards() {
        try {
            const res = await api.get('/boards');
            setBoards(res.data);
        } catch (error) {
            console.error("Error fetching boards:", error);
            setError("Failed to fetch boards: " + (error.response?.data?.message || error.message));
        }
    }

    async function handleCreateBoard(e) {
        e.preventDefault();
        if (!newBoardTitle) {
            setError("Please enter a board title");
            return;
        }

        try {
            setError('');
            setLoading(true);
            const res = await api.post('/boards', { title: newBoardTitle });
            setBoards([...boards, res.data]);
            setNewBoardTitle('');
        } catch (error) {
            console.error("Error creating board:", error);
            setError("Failed to create board: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteBoard(id) {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/boards/${id}`);
            setBoards(boards.filter(b => b._id !== id));
        } catch (err) {
            console.error("Failed to delete board", err);
        }
    }

    async function handleLogout() {
        try {
            await logout();
        } catch {
            console.error("Failed to logout");
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100">
                            T
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-slate-800">Todo<span className="text-indigo-600">Master</span></span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-slate-600 font-semibold hover:text-red-600 transition-colors py-2 px-4 rounded-xl hover:bg-red-50"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-10">
                <header className="mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">My Workspace</h1>
                    <p className="text-slate-500 font-medium">Manage your projects and individual tasks in beautiful boards.</p>
                </header>

                {/* Create Board Section */}
                <section className="mb-12">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 mb-4 rounded-xl border border-red-100 flex items-center gap-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium">{error}</span>
                            <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                    <form onSubmit={handleCreateBoard} className="flex gap-4">
                        <div className="relative flex-1 group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                                placeholder="Name your new project board..."
                                value={newBoardTitle}
                                onChange={(e) => setNewBoardTitle(e.target.value)}
                            />
                        </div>
                        <button
                            disabled={loading}
                            className="px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating...' : 'Create Board'}
                        </button>
                    </form>
                </section>

                {/* Boards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {boards.map((board, idx) => (
                        <div
                            key={board._id}
                            className="group glass-card p-6 flex flex-col justify-between hover:shadow-2xl hover:shadow-slate-200 transition-all cursor-pointer animate-fade-in"
                            style={{ animationDelay: `${idx * 0.05}s` }}
                        >
                            <Link to={`/board/${board._id}`} className="block flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                        {board.title.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded">Board</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{board.title}</h3>
                                <p className="text-slate-400 text-sm font-medium">Created {new Date(board.createdAt).toLocaleDateString()}</p>
                            </Link>

                            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                                <button
                                    onClick={() => handleDeleteBoard(board._id)}
                                    className="flex items-center gap-1.5 text-slate-400 font-bold text-xs hover:text-red-500 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    DELETE BOARD
                                </button>
                            </div>
                        </div>
                    ))}

                    {boards.length === 0 && (
                        <div className="col-span-full py-20 text-center animate-fade-in">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0h-3m-9-4h18c1.104 0 2 .896 2 2v10c0 1.104-.896 2-2 2H3c-1.104 0-2-.896-2-2V7c0-1.104.896-2 2-2z" />
                                </svg>
                            </div>
                            <p className="text-slate-400 font-bold text-lg">No boards yet. Start by creating one!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
