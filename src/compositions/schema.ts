// Zod schemas for Hagicode Update Bulletin video template
import { z } from 'zod';

// Tag/category types for update items
export const TagSchema = z.enum([
  'feature',
  'bugfix',
  'improvement',
  'ai',
  'ui',
  'performance',
  'other',
]);

// Highlight item - major feature/update with detailed description
export const HighlightItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, '标题不能为空'),
  description: z.string().min(1, '描述不能为空'),
  screenshot: z.string().optional(),
  tags: z.array(TagSchema).optional().default([]),
});

// Minor item - smaller updates, bug fixes, improvements
export const MinorItemSchema = z.object({
  category: TagSchema,
  title: z.string().min(1, '标题不能为空'),
  description: z.string().optional(),
});

// Complete update bulletin data structure
export const UpdateBulletinDataSchema = z.object({
  version: z.string().regex(/^v?\d+\.\d+\.\d+(-.*)?$/, '版本号格式不正确，应为 v1.2.0 格式'),
  releaseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日期格式不正确，应为 YYYY-MM-DD 格式'),
  summary: z.string().optional(),
  highlights: z.array(HighlightItemSchema).min(0).max(20, '重点修改项最多 20 个'),
  minorItems: z.array(MinorItemSchema).min(0).max(20, '次要修改项最多 20 个'),
});

// TypeScript type exports
export type UpdateBulletinData = z.infer<typeof UpdateBulletinDataSchema>;
export type HighlightItem = z.infer<typeof HighlightItemSchema>;
export type MinorItem = z.infer<typeof MinorItemSchema>;
export type Tag = z.infer<typeof TagSchema>;

// Helper function to validate data
export const validateUpdateData = (data: unknown): UpdateBulletinData => {
  return UpdateBulletinDataSchema.parse(data);
};
