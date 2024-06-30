import Action from './action'
import Metadata from './metadata'


export default interface Event { 
    id: string
    object: string
    actor_id: string
    actor_name: string
    group: string
    action: Action
    target_id: string
    location: string
    occurred_at: string
    metadata: Metadata
}