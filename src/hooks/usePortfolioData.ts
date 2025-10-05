import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { PortfolioData } from '../types/portfolio';

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const [
        { data: profile },
        { data: skills },
        { data: education },
        { data: experience },
        { data: projects },
        { data: achievements },
        { data: socialLinks },
      ] = await Promise.all([
        supabase.from('profile').select('*').maybeSingle(),
        supabase.from('skills').select('*').order('order_index'),
        supabase.from('education').select('*').order('order_index'),
        supabase.from('experience').select('*').order('order_index'),
        supabase.from('projects').select('*').order('order_index'),
        supabase.from('achievements').select('*').order('order_index'),
        supabase.from('social_links').select('*').maybeSingle(),
      ]);

      if (profile && skills && education && experience && projects && achievements && socialLinks) {
        setData({
          profile: {
            name: profile.name,
            title: profile.title,
            level: profile.level,
            hp: profile.hp,
            maxHp: profile.max_hp,
            avatar: profile.avatar,
          },
          about: profile.about,
          skills: skills.map(s => ({ name: s.name, level: s.level })),
          education: education.map(e => ({
            degree: e.degree,
            institution: e.institution,
            years: e.years,
            levelGain: e.level_gain,
          })),
          experience: experience.map(e => ({
            title: e.title,
            company: e.company,
            period: e.period,
            description: e.description,
          })),
          projects: projects.map(p => ({
            title: p.title,
            description: p.description,
            techStack: p.tech_stack,
            status: p.status as 'Completed' | 'Ongoing',
            progress: p.progress,
            role: p.role,
          })),
          achievements: achievements.map(a => ({
            title: a.title,
            description: a.description,
          })),
          social: {
            linkedin: socialLinks.linkedin,
            github: socialLinks.github,
            email: socialLinks.email,
          },
        });
      }
    } catch (err) {
      setError('Failed to load portfolio data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
}
