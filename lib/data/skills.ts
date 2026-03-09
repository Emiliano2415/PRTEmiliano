export type SkillCategory = {
  name: string
  iconName: 'Zap' | 'Globe' | 'BarChart2' | 'MessageSquare'
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Programming & Automation',
    iconName: 'Zap',
    skills: ['Python', 'Pandas', 'Scripting', 'Git'],
  },
  {
    name: 'Web Development',
    iconName: 'Globe',
    skills: ['React', 'Next.js', 'HTML/CSS', 'Flask', 'REST APIs'],
  },
  {
    name: 'Data & Analysis',
    iconName: 'BarChart2',
    skills: ['SQL', 'Excel', 'Database Management', 'Data Cleaning'],
  },
  {
    name: 'Languages',
    iconName: 'MessageSquare',
    skills: ['Spanish (Native)', 'English (B2)'],
  },
]
