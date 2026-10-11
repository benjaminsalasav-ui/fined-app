import React, { createContext, useState, useCallback, useContext, useEffect, useRef } from 'react';
import { checkNewAchievements } from '../data/achievements';
import { AuthContext } from './AuthContext';
import { getItem, setItem } from '../services/storage';

export const AppContext = createContext({});

const INITIAL_STATS = {
  lessonsCompleted: 0,
  completedLessons: [],    // IDs de lecciones completadas
  quizzesCompleted: 0,
  perfectQuizzes: 0,
  modulesCompleted: [],
  simulationsCompleted: 0,
  points: 0,
  achievementsUnlocked: [],
};

const statsKey = (id) => `@fined_stats_${id}`;

export function AppProvider({ children }) {
  const { user, profile } = useContext(AuthContext);
  const userName = user?.name || 'Estudiante';

  const [userStats, setUserStats] = useState(INITIAL_STATS);
  const loadedRef = useRef(false);

  // Carga el progreso guardado del usuario al iniciar sesión.
  useEffect(() => {
    if (!user) return;
    loadedRef.current = false;
    (async () => {
      const saved = await getItem(statsKey(user.id));
      setUserStats(saved || INITIAL_STATS);
      loadedRef.current = true;
    })();
  }, [user]);

  // Guarda el progreso cada vez que cambia (después de la carga inicial).
  useEffect(() => {
    if (!user || !loadedRef.current) return;
    setItem(statsKey(user.id), userStats);
  }, [userStats, user]);

  const checkAndUnlock = useCallback((newStats) => {
    const newAch = checkNewAchievements(newStats, newStats.achievementsUnlocked);
    if (newAch.length > 0) {
      const updatedStats = {
        ...newStats,
        achievementsUnlocked: [...newStats.achievementsUnlocked, ...newAch.map(a => a.id)],
        points: newStats.points + newAch.reduce((s, a) => s + a.points, 0),
      };
      setUserStats(updatedStats);
      return newAch;
    }
    setUserStats(newStats);
    return [];
  }, []);

  const completeLesson = useCallback((moduleId, lessonId) => {
    setUserStats(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;

      // Check if module is now complete
      const { MODULES } = require('../data/modules');
      const mod = MODULES.find(m => m.id === moduleId);
      const allLessonIds = mod?.lessons.map(l => l.id) || [];
      const newCompleted = [...prev.completedLessons, lessonId];
      const moduleNowComplete = allLessonIds.every(id => newCompleted.includes(id));

      const newStats = {
        ...prev,
        lessonsCompleted: prev.lessonsCompleted + 1,
        completedLessons: newCompleted,
        points: prev.points + 5,
        modulesCompleted: moduleNowComplete && !prev.modulesCompleted.includes(moduleId)
          ? [...prev.modulesCompleted, moduleId]
          : prev.modulesCompleted,
      };

      const newAch = checkNewAchievements(newStats, newStats.achievementsUnlocked);
      if (newAch.length > 0) {
        return {
          ...newStats,
          achievementsUnlocked: [...newStats.achievementsUnlocked, ...newAch.map(a => a.id)],
          points: newStats.points + newAch.reduce((s, a) => s + a.points, 0),
        };
      }
      return newStats;
    });
    return [];
  }, []);

  const completeQuiz = useCallback((moduleId, lessonId, perfect) => {
    let newAchievements = [];
    setUserStats(prev => {
      const newStats = {
        ...prev,
        quizzesCompleted: prev.quizzesCompleted + 1,
        perfectQuizzes: perfect ? prev.perfectQuizzes + 1 : prev.perfectQuizzes,
        points: prev.points + (perfect ? 20 : 10),
      };
      const newAch = checkNewAchievements(newStats, newStats.achievementsUnlocked);
      newAchievements = newAch;
      if (newAch.length > 0) {
        return {
          ...newStats,
          achievementsUnlocked: [...newStats.achievementsUnlocked, ...newAch.map(a => a.id)],
          points: newStats.points + newAch.reduce((s, a) => s + a.points, 0),
        };
      }
      return newStats;
    });
    return newAchievements;
  }, []);

  const completeSimulation = useCallback(() => {
    setUserStats(prev => {
      const newStats = {
        ...prev,
        simulationsCompleted: prev.simulationsCompleted + 1,
        points: prev.points + 15,
      };
      const newAch = checkNewAchievements(newStats, newStats.achievementsUnlocked);
      if (newAch.length > 0) {
        return {
          ...newStats,
          achievementsUnlocked: [...newStats.achievementsUnlocked, ...newAch.map(a => a.id)],
          points: newStats.points + newAch.reduce((s, a) => s + a.points, 0),
        };
      }
      return newStats;
    });
  }, []);

  return (
    <AppContext.Provider value={{
      userName,
      userLevel: profile?.level || null,
      userStats,
      completeLesson,
      completeQuiz,
      completeSimulation,
    }}>
      {children}
    </AppContext.Provider>
  );
}
