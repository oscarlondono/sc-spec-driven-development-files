import { cn } from '@/lib/utils';

describe('cn utility', () => {
  describe('basic class merging', () => {
    it('returns an empty string when called with no arguments', () => {
      expect(cn()).toBe('');
    });

    it('returns a single class unchanged', () => {
      expect(cn('text-sm')).toBe('text-sm');
    });

    it('joins multiple classes with a space', () => {
      expect(cn('text-sm', 'font-bold')).toBe('text-sm font-bold');
    });

    it('joins three or more classes', () => {
      expect(cn('flex', 'items-center', 'gap-2')).toBe('flex items-center gap-2');
    });
  });

  describe('falsy value handling', () => {
    it('ignores false', () => {
      expect(cn('text-sm', false)).toBe('text-sm');
    });

    it('ignores undefined', () => {
      expect(cn('text-sm', undefined)).toBe('text-sm');
    });

    it('ignores null', () => {
      expect(cn('text-sm', null)).toBe('text-sm');
    });

    it('ignores empty string', () => {
      expect(cn('text-sm', '')).toBe('text-sm');
    });

    it('supports conditional classes via a ternary', () => {
      const active = true;
      expect(cn('base', active ? 'bg-primary' : 'bg-muted')).toBe('base bg-primary');
    });

    it('omits the falsy branch of a conditional class', () => {
      const active = false;
      expect(cn('base', active && 'bg-primary')).toBe('base');
    });
  });

  describe('Tailwind conflict resolution (twMerge)', () => {
    it('last padding class wins when two p- utilities conflict', () => {
      expect(cn('p-4', 'p-8')).toBe('p-8');
    });

    it('last text-size class wins when two text- size utilities conflict', () => {
      expect(cn('text-sm', 'text-lg')).toBe('text-lg');
    });

    it('last background-color class wins', () => {
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    });

    it('non-conflicting classes are both kept', () => {
      const result = cn('text-sm', 'font-bold');
      expect(result).toContain('text-sm');
      expect(result).toContain('font-bold');
    });
  });

  describe('object and array syntax (clsx)', () => {
    it('accepts an object with boolean values', () => {
      expect(cn({ 'text-sm': true, 'font-bold': false })).toBe('text-sm');
    });

    it('accepts an array of classes', () => {
      expect(cn(['flex', 'items-center'])).toBe('flex items-center');
    });

    it('handles nested arrays', () => {
      expect(cn(['flex', ['items-center', 'gap-2']])).toBe('flex items-center gap-2');
    });
  });
});
