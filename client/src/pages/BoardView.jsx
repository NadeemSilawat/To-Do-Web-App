import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';

export default function BoardView() {
    const { id } = useParams();
    const [board, setBoard] = useState(null);
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        // In a real app we might fetch board details separately or rely on previous state
        // For now, let's just get todos. And we assume we can fetch board title differently or just generic
        fetchTodos();
    }, [id]);

    async function fetchTodos() {
        try {
            const res = await api.get(`/todos/${id}`);
            setTodos(res.data);
        } catch (error) {
            console.error("Error fetch todos", error);
        }
    }

    async function handleCreateTodo(e) {
        e.preventDefault();
        if (!newTodo) return;

        try {
            const res = await api.post('/todos', {
                content: newTodo,
                boardId: id
            });
            setTodos([...todos, res.data]);
            setNewTodo('');
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    }

    async function toggleTodo(todo) {
        try {
            const status = todo.status === 'done' ? 'todo' : 'done';
            const res = await api.put(`/todos/${todo._id}`, { status });
            setTodos(todos.map(t => t._id === todo._id ? res.data : t));
        } catch (err) {
            console.error("Error updating todo", err);
        }
    }

    async function deleteTodo(todoId) {
        try {
            await api.delete(`/todos/${todoId}`);
            setTodos(todos.filter(t => t._id !== todoId));
        } catch (err) {
            console.error("Error deleting todo", err);
        }
    }

    return (
        <div className="min-h-screen bg-[#020617] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black">
            <nav className="glass-dark sticky top-0 z-50 border-b border-slate-800">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-slate-400 font-bold hover:text-indigo-400 transition-colors py-2 group">
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Workspace
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-slate-900"></div>
                            <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-slate-900"></div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 py-12 animate-slide-up">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 leading-tight">Project Tasks</h2>
                        <p className="text-slate-500 font-medium mt-3 text-lg">Track your progress and get things done.</p>
                    </div>

                    <div className="flex gap-3">
                        <div className="bg-slate-800/80 border border-slate-700 text-indigo-300 px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                            {todos.filter(t => t.status === 'done').length}/{todos.length} Completed
                        </div>
                    </div>
                </div>

                <form onSubmit={handleCreateTodo} className="mb-12 flex gap-4">
                    <div className="relative flex-1 group">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <svg className="w-6 h-6 text-slate-500 group-focus-within:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="w-full pl-14 pr-4 py-5 bg-slate-900/50 border border-slate-700 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium text-lg"
                            placeholder="What needs to be done?"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                        />
                    </div>
                    <button className="btn-glow px-10 py-5 text-lg rounded-2xl">
                        Add Task
                    </button>
                </form>

                <div className="space-y-4">
                    {todos.length === 0 && (
                        <div className="py-24 text-center border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
                            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                                </svg>
                            </div>
                            <p className="text-slate-400 font-bold text-lg">No tasks yet. Start by adding one above.</p>
                        </div>
                    )}

                    {todos.map((todo, idx) => (
                        <div
                            key={todo._id}
                            style={{ animationDelay: `${idx * 0.05}s` }}
                            className={`group p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between hover:border-indigo-500/30 hover:bg-slate-800/80 transition-all animate-slide-up ${todo.status === 'done' ? 'opacity-60 grayscale-[0.5]' : ''}`}
                        >
                            <div className="flex items-center gap-5 flex-1 cursor-pointer" onClick={() => toggleTodo(todo)}>
                                <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${todo.status === 'done' ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/40' : 'border-slate-600 group-hover:border-indigo-500 bg-slate-950'}`}>
                                    {todo.status === 'done' && (
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <span className={`text-xl font-medium transition-all ${todo.status === 'done' ? 'line-through text-slate-500' : 'text-slate-200 group-hover:text-white'}`}>
                                    {todo.content}
                                </span>
                            </div>
                            <button
                                onClick={() => deleteTodo(todo._id)}
                                className="p-3 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
