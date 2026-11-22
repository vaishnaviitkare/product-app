export function getCategoryVariant(
  category: string
): 'primary' | 'secondary' | 'success' | 'warning' | 'purple' | 'amber' | 'slate' {
  const cat = category.toLowerCase();
  if (cat.includes('smart') || cat.includes('phone') || cat.includes('tech')) return 'primary';
  if (cat.includes('laptop') || cat.includes('comp')) return 'secondary';
  if (cat.includes('fragrance') || cat.includes('beauty')) return 'purple';
  if (cat.includes('skin') || cat.includes('care')) return 'success';
  if (cat.includes('groc') || cat.includes('food')) return 'amber';
  if (cat.includes('home') || cat.includes('furn')) return 'warning';
  return 'slate';
}
