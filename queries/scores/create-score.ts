import { supabase } from '../../utils/supabase-client';

export async function createScore(
  score: number,
  totalPossibleScore: number,
  completedAt: string,
  scoreId: number,
  userId: string
) {
  return supabase.from('scores').insert([
    {
      score,
      total_possible_score: totalPossibleScore,
      completed_at: completedAt,
      score_id: scoreId,
      user_id: userId
    }
  ]);
}
