import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useRealtimeEvents(sdgId: number, onUpdate: () => void) {
  useEffect(() => {
    const channel = supabase
      .channel(`public:sdg_events:sdg_id=eq.${sdgId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sdg_events',
          filter: `sdg_id=eq.${sdgId}`
        },
        (payload) => {
          console.log('Change received!', payload)
          onUpdate()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [sdgId, onUpdate])
}