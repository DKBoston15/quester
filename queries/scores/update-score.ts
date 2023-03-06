import { supabase } from '../../utils/supabase-client';

export async function updateScore(
  id: number,
  score: number,
  totalPossibleScore: number,
  completedAt: string,
  scoreId: number,
  userId: string
) {
  return supabase
    .from('scores')
    .update({
      score,
      total_possible_score: totalPossibleScore,
      completed_at: completedAt,
      score_id: scoreId
    })
    .eq('user_id', userId)
    .eq('score_id', id);
}
